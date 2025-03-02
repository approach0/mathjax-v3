/*************************************************************
 *
 *  Copyright (c) 2019 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

/**
 * @fileoverview  Implements a subclass of ContextMenu specific to MathJax
 *
 * @author dpvc@mathjax.org (Davide Cervone)
 */

import {mathjax} from '../../mathjax.js';

import {MathItem, STATE} from '../../core/MathItem.js';
import {OutputJax} from '../../core/OutputJax.js';
import {MathJaxObject as StartupObject} from '../../components/startup.js';
import {MathJaxObject as LoaderObject} from '../../components/loader.js';
import {OptionList, userOptions, defaultOptions, expandable} from '../../util/Options.js';

import {MJContextMenu} from './MJContextMenu.js';
import {MmlVisitor} from './MmlVisitor.js';
import {SelectableInfo} from './SelectableInfo.js';
import {MenuMathDocument} from './MenuHandler.js';

/*==========================================================================*/

/**
 * Declare the MathJax global and the navigator object (to check platform for MacOS)
 */
declare namespace window {
    const MathJax: StartupObject & LoaderObject;
    const navigator: {platform: string}
}

/**
 * True when platform is a Mac (so we can enable CMD menu item for zoom trigger)
 */
const isMac = (typeof window !== 'undefined' &&
               window.navigator && window.navigator.platform.substr(0,3) === 'Mac');

/*==========================================================================*/

/**
 * The various values that are stored in the menu
 */
export interface MenuSettings {
    texHints: boolean;
    semantics: boolean;
    zoom: string;
    zscale: string;
    renderer: string;
    alt: boolean;
    cmd: boolean;
    ctrl: boolean;
    shift: boolean;
    scale: string;
    explorer: boolean;
    highlight: string;
    background: string;
    foreground: string;
    speech: boolean;
    subtitles: boolean;
    speechrules: string;
    autocollapse: boolean;
    collapsible: boolean;
    inTabOrder: boolean;
}

export type HTMLMATHITEM = MathItem<HTMLElement, Text, Document>;

/*==========================================================================*/

/**
 * The Menu object that handles the MathJax contextual menu and its actions
 */
export class Menu {

    /**
     * The key for the localStorage for the menu settings
     */
    public static MENU_STORAGE = 'MathJax-Menu-Settings';

    /**
     * The options for the menu, including the default settings, the various output jax
     * and the list of annotation types and their encodings
     */
    public static OPTIONS: OptionList = {
        settings: {
            texHints: true,
            semantics: false,
            zoom: 'NoZoom',
            zscale: '200%',
            renderer: 'CHTML',
            alt: false,
            cmd: false,
            ctrl: false,
            shift: false,
            scale: 1,
            explorer: false,
            highlight: 'None',
            background: 'Blue',
            foreground: 'Black',
            speech: true,
            subtitles: false,
            speechrules: 'mathspeak-default',
            autocollapse: false,
            collapsible: false,
            inTabOrder: true,
        },
        jax: {
            CHTML: null,
            SVG: null
        },
        annotationTypes: expandable({
            TeX: ['TeX', 'LaTeX', 'application/x-tex'],
            StarMath: ['StarMath 5.0'],
            Maple: ['Maple'],
            ContentMathML: ['MathML-Content', 'application/mathml-content+xml'],
            OpenMath: ['OpenMath']
        })
    };

    /**
     * The number of startup modules that are currently being loaded
     */
    protected static loading: number = 0;

    /**
     * Promises for the loading components
     */
    protected static loadingPromises: Map<string, Promise<void>> = new Map();

    /**
     * A promise that is resolved when all components are loaded
     */
    protected static _loadingPromise: Promise<void> = null;

    /**
     * Functions used to resolve or reject the _loadingPromise
     */
    protected static _loadingOK: Function = null;
    protected static _loadingFailed: Function = null;

    /**
     * The options for this menu
     */
    public options: OptionList;

    /**
     * The current settings for this menu (the variables attached to the menu's pool)
     */
    public settings: MenuSettings = null;

    /**
     * The original settings (with page options factored in) for use with the reset command
     */
    public defaultSettings: MenuSettings = null;

    /**
     * The contextual menu object that is managed by this Menu
     */
    public menu: MJContextMenu = null;

    /**
     * A MathML serializer that has options corresponding to the menu settings
     */
    public MmlVisitor = new MmlVisitor<HTMLElement, Text, Document>();

    /**
     * The MathDocument in which we are working
     */
    protected document: MenuMathDocument;

    /**
     * Instances of the various output jax that we can switch to
     */
    protected jax: {[name: string]: OutputJax<HTMLElement, Text, Document>} = {
        CHTML: null,
        SVG: null
    };

    /**
     * The minium initial state for pending rerender requests (so final rerender gets the right start)
     */
    protected rerenderStart: number = STATE.LAST;

    /**
     * @returns {boolean}   true when the menu is loading some component
     */
    public get isLoading() {
        return Menu.loading > 0;
    }

    /**
     * @returns {Promise}   A promise that is resolved when all pending loads are complete
     */
    public get loadingPromise() {
        if (!this.isLoading) {
            return Promise.resolve();
        }
        if (!Menu._loadingPromise) {
            Menu._loadingPromise = new Promise<void>((ok, failed) => {
                Menu._loadingOK = ok;
                Menu._loadingFailed = failed;
            });
        }
        return Menu._loadingPromise;
    }

    /*======================================================================*/

    /**
     * The "About MathJax" info box
     */
    protected about = new ContextMenu.Info(
        '<b style="font-size:120%;">MathJax</b> v' + mathjax.version,
        () => {
            const lines = [] as string[];
            lines.push('Input Jax: ' + this.document.inputJax.map(jax => jax.name).join(', '));
            lines.push('Output Jax: ' + this.document.outputJax.name);
            lines.push('Document Type: ' + this.document.kind);
            return lines.join('<br/>');
        },
        '<a href="https://www.mathjax.org">www.mathjax.org</a>'
    );

    /**
     * The "MathJax Help" info box
     */
    protected help = new ContextMenu.Info(
        '<b>MathJax Help</b>',
        () => {
            return [
                '<p><b>MathJax</b> is a JavaScript library that allows page',
                ' authors to include mathematics within their web pages.',
                ' As a reader, you don\'t need to do anything to make that happen.</p>',
                '<p><b>Browsers</b>: MathJax works with all modern browsers including',
                ' Edge, Firefox, Chrome, Safari, Opera, and most mobile browsers.</p>',
                '<p><b>Math Menu</b>: MathJax adds a contextual menu to equations.',
                ' Right-click or CTRL-click on any mathematics to access the menu.</p>',
                '<div style="margin-left: 1em;">',
                '<p><b>Show Math As:</b> These options allow you to view the formula\'s',
                ' source markup (as MathML or in its original format).</p>',
                '<p><b>Copy to Clipboard:</b> These options copy the formula\'s source markup,',
                ' as MathML or in its original format, to the clipboard',
                ' (in browsers that support that).</p>',
                '<p><b>Math Settings:</b> These give you control over features of MathJax,',
                ' such the size of the mathematics, and the mechanism used',
                ' to display equations.</p>',
                '<p><b>Accessibility</b>: MathJax can work with screen',
                ' readers to make mathematics accessible to the visually impaired.',
                ' Turn on the explorer to enable generation of speech strings',
                ' and the ability to investigate expressions interactively.</p>',
                '<p><b>Language</b>: This menu lets you select the language used by MathJax',
                ' for its menus and warning messages. (Not yet implemented in version 3.)</p>',
                '</div>',
                '<p><b>Math Zoom</b>: If you are having difficulty reading an',
                ' equation, MathJax can enlarge it to help you see it better, or',
                ' you can scall all the math on the page to make it larger.',
                ' Turn these features on in the <b>Math Settings</b> menu.</p>',
                '<p><b>Preferences</b>: MathJax uses your browser\'s localStorage database',
                ' to save the preferences set via this menu locally in your browser.  These',
                ' are not used to track you, and are not transferred or used remotely by',
                ' MathJax in any way.</p>'
            ]. join('\n');
        },
        '<a href="https://www.mathjax.org">www.mathjax.org</a>'
    );

    /**
     * The "Show As MathML" info box
     */
    protected mathmlCode = new SelectableInfo(
        'MathJax MathML Expression',
        () => {
            if (!this.menu.mathItem) return '';
            const text = this.toMML(this.menu.mathItem);
            return '<pre>' + this.formatSource(text) + '</pre>';
        },
        ''
    );

    /**
     * The "Show As (original form)" info box
     */
    protected originalText = new SelectableInfo(
        'MathJax Original Source',
        () => {
            if (!this.menu.mathItem) return '';
            const text = this.menu.mathItem.math;
            return '<pre style="font-size:125%; margin:0">' + this.formatSource(text) + '</pre>';
        },
        ''
    );

    /**
     * The "Show As Annotation" info box
     */
    protected annotationText = new SelectableInfo(
        'MathJax Annotation Text',
        () => {
            if (!this.menu.mathItem) return '';
            const text = this.menu.annotation;
            return '<pre style="font-size:125%; margin:0">' + this.formatSource(text) + '</pre>';
        },
        ''
    );

    /**
     * The info box for zoomed expressions
     */
    protected zoomBox = new ContextMenu.Info(
        'MathJax Zoomed Expression',
        () => {
            if (!this.menu.mathItem) return '';
            const element = (this.menu.mathItem.typesetRoot as any).cloneNode(true) as HTMLElement;
            element.style.margin = '0';
            const scale = 1.25 * parseFloat(this.settings.zscale);  // 1.25 is to reverse the default 80% font-size
            return '<div style="font-size: ' + scale + '%">' + element.outerHTML + '</div>';
        },
        ''
    );

    /*======================================================================*/

    /**
     * Accept options in addition to the MathDocument, and set up the menu based
     *  on the defaults, the passed options, and the user's saved settings.
     *
     * @param {MenuMathDocument} document   The MathDcument where this menu will post
     * @param {OptionList} options          The options for the menu
     * @override
     */
    constructor(document: MenuMathDocument, options: OptionList = {}) {
        this.document = document;
        this.options = userOptions(defaultOptions({}, (this.constructor as typeof Menu).OPTIONS), options);
        this.initSettings();
        this.mergeUserSettings();
        this.initMenu();
    }

    /**
     * Set up the settings and jax objects, and transfer the output jax name and scale to the settings
     */
    protected initSettings() {
        this.settings = this.options.settings;
        this.jax = this.options.jax;
        const jax = this.document.outputJax;
        this.jax[jax.name] = jax;
        this.settings.renderer = jax.name;
        this.settings.scale = jax.options.scale;
        this.defaultSettings = Object.assign({}, this.settings);
    }

    /**
     * Create the menu object, attach the info boxes to it, and output any CSS needed for it
     */
    protected initMenu() {
        this.menu = MJContextMenu.parse({
            menu: {
                id: 'MathJax_Menu',
                pool: [
                    this.variable<boolean>('texHints'),
                    this.variable<boolean>('semantics'),
                    this.variable<string> ('zoom'),
                    this.variable<string> ('zscale'),
                    this.variable<string> ('renderer', (jax: string) => this.setRenderer(jax)),
                    this.variable<boolean>('alt'),
                    this.variable<boolean>('cmd'),
                    this.variable<boolean>('ctrl'),
                    this.variable<boolean>('shift'),
                    this.variable<string> ('scale', (scale: string) => this.setScale(scale)),
                    this.variable<boolean>('explorer', (explore: boolean) => this.setExplorer(explore)),
                    this.variable<string> ('highlight'),
                    this.variable<string> ('background'),
                    this.variable<string> ('foreground'),
                    this.variable<boolean>('speech'),
                    this.variable<boolean>('subtitles'),
                    this.variable<string> ('speechrules'),
                    this.variable<boolean>('autocollapse'),
                    this.variable<boolean>('collapsible', (collapse: boolean) => this.setCollapsible(collapse)),
                    this.variable<boolean>('inTabOrder', (tab: boolean) => this.setTabOrder(tab))
                ],
                items: [
                    this.submenu('Show', 'Show Math As', [
                        this.command('MathMLcode', 'MathML Code', () => this.mathmlCode.post()),
                        this.command('Original', 'Original Form', () => this.originalText.post()),
                        this.submenu('Annotation', 'Annotation')
                    ]),
                    this.submenu('Copy', 'Copy to Clipboard', [
                        this.command('MathMLcode', 'MathML Code', () => this.copyMathML()),
                        this.command('Original', 'Original Form', () => this.copyOriginal()),
                        this.submenu('Annotation', 'Annotation')
                    ]),
                    this.rule(),
                    this.submenu('Settings', 'Math Settings',[
                        this.submenu('Renderer', 'Math Renderer', this.radioGroup('renderer', [['CHTML'], ['SVG']])),
                        this.rule(),
                        this.submenu('ZoomTrigger', 'Zoom Trigger', [
                            this.command('ZoomNow', 'Zoom Once Now', () => this.zoom(null, '', this.menu.mathItem)),
                            this.rule(),
                            this.radioGroup('zoom', [
                                ['Click'], ['DoubleClick', 'Double-Click'], ['NoZoom', 'No Zoom']
                            ]),
                            this.rule(),
                            this.label('TriggerRequires', 'Trigger Requires:'),
                            this.checkbox((isMac ? 'Option' : 'Alt'), (isMac ? 'Option' : 'Alt'), 'alt'),
                            this.checkbox('Command', 'Command', 'cmd', {hidden: !isMac}),
                            this.checkbox('Control', 'Control', 'ctrl', {hiddne: isMac}),
                            this.checkbox('Shift', 'Shift', 'shift')
                        ]),
                        this.submenu('ZoomFactor', 'Zoom Factor', this.radioGroup('zscale', [
                            ['150%'], ['175%'], ['200%'], ['250%'], ['300%'], ['400%']
                        ])),
                        this.rule(),
                        this.command('Scale', 'Scale All Math...', () => this.scaleAllMath()),
                        this.rule(),
                        this.checkbox('texHints', 'Add TeX hints to MathML', 'texHints'),
                        this.checkbox('semantics', 'Add original as annotation', 'semantics'),
                        this.rule(),
                        this.command('Reset', 'Reset to defaults', () => this.resetDefaults())
                    ]),
                    this.submenu('Accessibility', 'Accessibility', [
                        this.submenu('Explorer', 'Explorer', [
                            this.checkbox('Active', 'Active', 'explorer'),
                            this.rule(),
                            this.submenu('Highlight', 'Highlight', this.radioGroup('highlight', [
                                ['None'], ['Hover'], ['Flame']
                            ]), true),
                            this.submenu('Background', 'Background', this.radioGroup('background', [
                                ['Blue'], ['Red'], ['Green'], ['Yellow'], ['Cyan'], ['Magenta'], ['White'], ['Black']
                            ])),
                            this.submenu('Foreground', 'Foreground', this.radioGroup('foreground', [
                                ['Black'], ['White'], ['Magenta'], ['Cyan'], ['Yellow'], ['Green'], ['Red'], ['Blue']
                            ])),
                            this.rule(),
                            this.checkbox('Speech', 'Speech Output', 'speech'),
                            this.checkbox('Subtitles', 'Subtities', 'subtitles'),
                            this.rule(),
                            this.submenu('Mathspeak', 'Mathspeak Rules', this.radioGroup('speechrules', [
                                ['mathspeak-default', 'Verbose'],
                                ['mathspeak-brief', 'Brief'],
                                ['mathspeak-sbrief', 'Superbrief']
                            ])),
                            this.submenu('ChromeVox', 'ChromeVox Rules', this.radioGroup('speechrules', [
                                ['chromvox-default', 'Verbose'],
                                ['chromevox-short', 'Short'],
                                ['chromevox-alternative', 'Alternative']
                            ]))
                        ]),
                        this.rule(),
                        this.checkbox('Collapsible', 'Collapsible Math', 'collapsible'),
                        this.checkbox('AutoCollapse', 'Auto Collapse', 'autocollapse', {disabled: true}),
                        this.rule(),
                        this.checkbox('InTabOrder', 'Include in Tab Order', 'inTabOrder')
                    ]),
                    this.submenu('Language', 'Language'),
                    this.rule(),
                    this.command('About', 'About MathJax', () => this.about.post()),
                    this.command('Help', 'MathJax Help', () => this.help.post())
                ]
            }
        }) as MJContextMenu;
        const menu = this.menu;
        this.about.attachMenu(menu);
        this.help.attachMenu(menu);
        this.originalText.attachMenu(menu);
        this.annotationText.attachMenu(menu);
        this.mathmlCode.attachMenu(menu);
        this.zoomBox.attachMenu(menu);
        this.checkLoadableItems();
        this.enableExplorerItems(this.settings.explorer);
        menu.showAnnotation = this.annotationText;
        menu.copyAnnotation = this.copyAnnotation.bind(this);
        menu.annotationTypes = this.options.annotationTypes;
        ContextMenu.CssStyles.addInfoStyles(this.document.document as any);
        ContextMenu.CssStyles.addMenuStyles(this.document.document as any);
    }

    /**
     * Check whether the startup and loader modules are available, and
     *   if not, disable the a11y modules (since we can't load them
     *   or know if they are available).
     * Otherwise, check if any need to be loaded
     */
    protected checkLoadableItems() {
        const MathJax = window.MathJax;
        if (MathJax && MathJax._ && MathJax.loader && MathJax.startup) {
            if (this.settings.collapsible && (!MathJax._.a11y || !MathJax._.a11y.complexity)) {
                this.loadA11y('complexity');
            }
            if (this.settings.explorer && (!MathJax._.a11y || !MathJax._.a11y.explorer)) {
                this.loadA11y('explorer');
            }
        } else {
            const menu = this.menu;
            for (const name of Object.keys(this.jax)) {
                if (!this.jax[name]) {
                    menu.findID('Settings', 'Renderer', name).disable();
                }
            }
            menu.findID('Accessibility', 'Explorer').disable();
            menu.findID('Accessibility', 'AutoCollapse').disable();
            menu.findID('Accessibility', 'Collapsible').disable();
        }
    }

    /**
     * Enable/disable the Explorer submenu items
     *
     * @param {boolean} enable  True to enable, false to disable
     */
    protected enableExplorerItems(enable: boolean) {
        const menu = (this.menu.findID('Accessibility', 'Explorer') as ContextMenu.Submenu).getSubmenu();
        for (const item of menu.getItems().slice(3)) {
            if (!(item instanceof ContextMenu.Rule)) {
                enable ? item.enable() : item.disable();
            }
        }

    }

    /*======================================================================*/

    /**
     * Look up the saved settings from localStorage and merge them into the menu settings
     */
    protected mergeUserSettings() {
        try {
            const settings = localStorage.getItem(Menu.MENU_STORAGE);
            if (!settings) return;
            Object.assign(this.settings, JSON.parse(settings));
        } catch (err) {
            console.log('MathJax localStorage error: ' + err.message);
        }
    }

    /**
     * Save any non-default menu settings in localStorage
     */
    protected saveUserSettings() {
        const settings = {} as {[key: string]: any};
        for (const name of Object.keys(this.settings) as (keyof MenuSettings)[]) {
            if (this.settings[name] !== this.defaultSettings[name]) {
                settings[name] = this.settings[name];
            }
        }
        try {
            if (Object.keys(settings).length) {
                localStorage.setItem(Menu.MENU_STORAGE, JSON.stringify(settings));
            } else {
                localStorage.removeItem(Menu.MENU_STORAGE);
            }
        } catch (err) {
            console.log('MathJax localStorage error: ' + err.message);
        }
    }

    /*======================================================================*/

    /**
     * @param {string} scale   The new scaling value
     */
    protected setScale(scale: string) {
        this.document.outputJax.options.scale = parseFloat(scale);
        this.document.rerender();
    }

    /**
     * If the jax is already on record, just use it, otherwise load the new one
     *
     * @param {string} jax   The name of the jax to switch to
     */
    protected setRenderer(jax: string) {
        if (this.jax[jax]) {
            this.setOutputJax(jax);
        } else {
            const name = jax.toLowerCase();
            this.loadComponent('output/' + name, () => {
                const startup = window.MathJax.startup;
                if (name in startup.constructors) {
                    startup.useOutput(name, true);
                    startup.output = startup.getOutputJax();
                    this.jax[jax] = startup.output;
                    this.setOutputJax(jax);
                }
            });
        }
    }

    /**
     * Set up the new jax and link it to the document, then rerender the math
     *
     * @param {string} jax   The name of the jax to switch to
     */
    protected setOutputJax(jax: string) {
        this.jax[jax].setAdaptor(this.document.adaptor);
        this.document.outputJax = this.jax[jax];
        this.rerender();
    }

    /**
     * @param {boolean} tab   True for including math in the tab order, false for not
     */
    protected setTabOrder(tab: boolean) {
        this.menu.getStore().inTaborder(tab);
    }

    /**
     * @param {boolean} explore   True to enable the explorer, false to not
     */
    protected setExplorer(explore: boolean) {
        this.enableExplorerItems(explore);
        if (!explore || (window.MathJax._.a11y && window.MathJax._.a11y.explorer)) {
            this.rerender(this.settings.collapsible ? STATE.RERENDER : STATE.COMPILED);
        } else {
            this.loadA11y('explorer');
        }
    }

    /**
     * @param {boolean} collapse   True to enable collapsible math, false to not
     */
    protected setCollapsible(collapse: boolean) {
        if (!collapse || (window.MathJax._.a11y && window.MathJax._.a11y.complexity)) {
            this.rerender(STATE.COMPILED);
        } else {
            this.loadA11y('complexity');
        }
    }

    /**
     * Request the scaling value from the user and save it in the settings
     */
    protected scaleAllMath() {
        const scale = (parseFloat(this.settings.scale) * 100).toFixed(1).replace(/.0$/, '');
        const percent = prompt('Scale all mathematics (compared to surrounding text) by', scale + '%');
        if (percent) {
            if (percent.match(/^\s*\d+(\.\d*)?\s*%?\s*$/)) {
                const scale = parseFloat(percent) / 100;
                if (scale) {
                    this.setScale(String(scale));
                } else {
                    alert('The scale should not be zero');
                }
            } else {
                alert('The scale should be a percentage (e.g., 120%)');
            }
        }
    }

    /**
     * Reset all menu settings to the (page) defaults
     */
    protected resetDefaults() {
        Menu.loading++;    // pretend we're loading, to suppress rerendering for each variable change
        const pool = this.menu.getPool();
        const settings = this.defaultSettings;
        for (const name of Object.keys(this.settings) as (keyof MenuSettings)[]) {
            const variable = pool.lookup(name);
            if (variable) {
                variable.setValue(settings[name] as (string | boolean));
                const item = (variable as any).items[0];
                if (item) {
                    item.executeCallbacks_();
                }
            } else {
                this.settings[name] = settings[name];
            }
        }
        Menu.loading--;
        this.rerender(STATE.COMPILED);
    }

    /*======================================================================*/

    /**
     * Check if a component is loading, and restart if it is
     *
     * @param {string} name        The name of the component to check if it is loading
     */
    public checkComponent(name: string) {
        const promise = Menu.loadingPromises.get(name);
        if (promise) {
            mathjax.retryAfter(promise);
        }
    }

    /**
     * Attempt to load a component and perform a callback when done
     */
    protected loadComponent(name: string, callback: () => void) {
        if (Menu.loadingPromises.has(name)) return;
        const loader = window.MathJax.loader;
        if (!loader) return;
        Menu.loading++;
        const promise = loader.load(name).then(() => {
            Menu.loading--;
            Menu.loadingPromises.delete(name);
            callback();
            if (Menu.loading === 0 && Menu._loadingPromise) {
                Menu._loadingPromise = null;
                Menu._loadingOK();
            }
        }).catch((err) => {
            if (Menu._loadingPromise) {
                Menu._loadingPromise = null;
                Menu._loadingFailed(err);
            } else {
                console.log(err);
            }
        });
        Menu.loadingPromises.set(name, promise);
    }

    /**
     * Attempt to load an a11y component
     *
     * @param {string} component   The name of the a11y component to load
     */
    public loadA11y(component: string) {
        const noEnrich = !STATE.ENRICHED;
        this.loadComponent('a11y/' + component, () => {
            const startup = window.MathJax.startup;
            //
            // Unregister the handler and get a new one (since the component
            // will have added a handler extension), then register the new one
            //
            mathjax.handlers.unregister(startup.handler);
            startup.handler = startup.getHandler();
            mathjax.handlers.register(startup.handler);
            //
            // Save the old document and get a new one, attaching the
            //   original menu (this), and transfering any math items
            //   from the original document, then rerender with the
            //   updated document (from the new handler)
            //
            const document = this.document;
            this.document = startup.getDocument();
            this.document.menu = this;
            this.transferMathList(document);
            if (!Menu._loadingPromise) {
                this.rerender(component === 'complexity' || noEnrich ? STATE.COMPILED : STATE.TYPESET);
            }
        });
    }

    /**
     * @param {MenuMathDocument} document  The original document whose list is to be transferred
     */
    protected transferMathList(document: MenuMathDocument) {
        const MathItem = this.document.options.MathItem;  // This has been updated by the new handler
        for (const item of document.math) {
            const math = new MathItem();    // Make a new MathItem
            Object.assign(math, item);      // Copy the old data to the new math item
            this.document.math.push(math);  // Add it to the current document
        }
    }

    /**
     * @param {string} text   The text to be displayed in an Info box
     * @returns {string}      The text with HTML specials being escaped
     */
    protected formatSource(text: string) {
        return text.trim().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    /**
     * @param {MathItem} math   The MathItem to serialize as MathML
     * @returns {string}        The serialized version of the internal MathML
     */
    protected toMML(math: HTMLMATHITEM) {
        return this.MmlVisitor.visitTree(math.root, math, {
            texHints: this.settings.texHints,
            semantics: (this.settings.semantics && math.inputJax.name !== 'MathML')
        });
    }

    /*======================================================================*/

    /**
     * @param {MouseEvent|null} event   The event triggering the zoom (or null for from a menu pick)
     * @param {string} type             The type of event occurring (click, dblclick)
     * @param {MathItem} math           The MathItem triggering the event
     */
    protected zoom(event: MouseEvent, type: string, math: HTMLMATHITEM) {
        if (!event || this.isZoomEvent(event, type)) {
            this.menu.mathItem = math;
            if (event) {
                //
                // The zoomBox.post() below assumes the menu is open,
                //   so if this zoom() call is from an event (not the menu),
                //   make sure the menu is open before posting the zoom box
                //
                this.menu.post(event);
            }
            this.zoomBox.post();
        }
    }

    /**
     * @param {MouseEvent} Event   The event triggering the zoom action
     * @param {string} zoom        The type of event (click, dblclick) that occurred
     * @returns {boolean}          True if the event is the right type and has the needed modifiers
     */
    protected isZoomEvent(event: MouseEvent, zoom: string) {
        return (this.settings.zoom === zoom &&
                (!this.settings.alt   || event.altKey) &&
                (!this.settings.ctrl  || event.ctrlKey) &&
                (!this.settings.cmd   || event.metaKey) &&
                (!this.settings.shift || event.shiftKey));
    }

    /**
     * Rerender the output if we aren't in the middle of loading a new component
     *   (in which case, we will rerender in the callback performed  after it is loaded)
     *
     * @param {number=} start   The state at which to start rerendering
     */
    protected rerender(start: number = STATE.TYPESET) {
        this.rerenderStart = Math.min(start, this.rerenderStart);
        if (!Menu.loading) {
            this.document.rerender(this.rerenderStart);
            this.rerenderStart = STATE.LAST;
        }
    }

    /**
     * Copy the serialzied MathML to the clipboard
     */
    protected copyMathML() {
        this.copyToClipboard(this.toMML(this.menu.mathItem));
    }

    /**
     * Copy the original form to the clipboard
     */
    protected copyOriginal() {
        this.copyToClipboard(this.menu.mathItem.math);
    }

    /**
     * Copy the original annotation text to the clipboard
     */
    public copyAnnotation() {
        this.copyToClipboard(this.menu.annotation);
    }

    /**
     * @param {string} text   The text to be copied ot the clopboard
     */
    protected copyToClipboard(text: string) {
        const input = document.createElement('textarea');
        input.value = text;
        input.setAttribute('readonly', '');
        input.style.cssText = 'height: 1px; width: 1px; padding: 1px; position: absolute; left: -10px';
        document.body.appendChild(input);
        input.select();
        try {
            document.execCommand('copy');
        } catch (error) {
            alert('Can\'t copy to clipboard: ' + error.message);
        }
        document.body.removeChild(input);
    }

    /*======================================================================*/

    /**
     * @param {MathItem} math   The math to attach the context menu and zoom triggers to
     */
    public addMenu(math: HTMLMATHITEM) {
        const element = math.typesetRoot;
        element.addEventListener('contextmenu', () => this.menu.mathItem = math, true);
        element.addEventListener('keydown', () => this.menu.mathItem = math, true);
        element.addEventListener('click', (event: MouseEvent) => this.zoom(event, 'Click', math), true);
        element.addEventListener('dblclick', (event: MouseEvent) => this.zoom(event,'DoubleClick', math), true);
        this.menu.getStore().insert(element);
    }

    /**
     * Clear the information about stored context menus
     */
    public clear() {
        this.menu.getStore().clear();
    }

    /*======================================================================*/

    /**
     * Create JSON for a variable constrolling a menu setting
     *
     * @param {keyof MenuSettings} name   The setting for which to make a variable
     * @param {(T) => void} action        Optional function to perform after setting the value
     * @returns {Object}                  The JSON for the variable
     *
     * @tempate T    The type of variable being defined
     */
    public variable<T extends (string | boolean)>(name: keyof MenuSettings, action?: (value: T) => void) {
        return {
            name: name,
            getter: () => this.settings[name],
            setter: (value: T) => {
                this.settings[name] = value;
                action && action(value);
                this.saveUserSettings();
            }
        };
    }

    /**
     * Create JSON for a submenu item
     *
     * @param {string} id           The id for the item
     * @param {string} content      The content for the item
     * @param {any[]} entries       The JSON for the entries
     * @param {boolean=} disabled   True if this item is diabled initially
     * @returns {Object}            The JSON for the submenu item
     */
    public submenu(id: string, content: string, entries: any[] = [], disabled: boolean = false) {
        let items = [] as Array<Object>;
        for (const entry of entries) {
            if (Array.isArray(entry)) {
                items = items.concat(entry);
            } else {
                items.push(entry);
            }
        }
        return {type: 'submenu', id, content, menu: {items}, disabled: (items.length === 0) || disabled};
    }

    /**
     * Create JSON for a command item
     *
     * @param {string} id           The id for the item
     * @param {string} content      The content for the item
     * @param {() => void} action   The action function for the command
     * @param {Object} other        Other values to include in the generated JSON object
     * @returns {Object}            The JSON for the command item
     */
    public command(id: string, content: string, action: () => void, other: Object = {}) {
        return Object.assign({type: 'command', id, content, action}, other);
    }

    /**
     * Create JSON for a checkbox item
     *
     * @param {string} id           The id for the item
     * @param {string} content      The content for the item
     * @param {string} variable     The (pool) variable to attach to this checkbox
     * @param {Object} other        Other values to include in the generated JSON object
     * @returns {Object}            The JSON for the checkbox item
     */
    public checkbox(id: string, content: string, variable: string, other: Object = {}) {
        return Object.assign({type: 'checkbox', id, content, variable}, other);
    }

    /**
     * Create JSON for a group of connected radio buttons
     *
     * @param {string} variable     The (pool) variable to attach to each radio button
     * @param {string[][]} radios   An array of [string] or [string, string], giving the id and content
     *                                for each radio button (if only one string is given it is ued for both)
     * @returns {Object[]}          An array of JSON objects for radion buttons
     */
    public radioGroup(variable: string, radios: string[][]) {
        return radios.map(def => this.radio(def[0], def[1] || def[0], variable));
    }

    /**
     * Create JSON for a radio button item
     *
     * @param {string} id           The id for the item
     * @param {string} content      The content for the item
     * @param {string} variable     The (pool) variable to attach to this radio button
     * @param {Object} other        Other values to include in the generated JSON object
     * @returns {Object}            The JSON for the radio button item
     */
    public radio(id: string, content: string, variable: string, other: Object = {}) {
        return Object.assign({type: 'radio', id, content, variable}, other);
    }

    /**
     * Create JSON for a label item
     *
     * @param {string} id           The id for the item
     * @param {string} content      The content for the item
     * @returns {Object}            The JSON for the label item
     */
    public label(id: string, content: string) {
        return {type: 'label', id, content};
    }

    /**
     * Create JSON for a menu rule
     *
     * @returns {Object}            The JSON for the rule item
     */
    public rule() {
        return {type: 'rule'};
    }

    /*======================================================================*/

}

