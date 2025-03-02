/*************************************************************
 *
 *  Copyright (c) 2018 The MathJax Consortium
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
 * @fileoverview  Implements a startup module that allows dynamically
 *                loaded components to register themselves, and then
 *                creates MathJax methods for typesetting and converting
 *                math based on the registered components.
 *
 * @author dpvc@mathjax.org (Davide Cervone)
 */

import {MathJax as MJGlobal, MathJaxObject as MJObject,
        MathJaxConfig as MJConfig, combineWithMathJax, combineDefaults} from './global.js';

import {MathDocument} from '../core/MathDocument.js';
import {MathItem, STATE} from '../core/MathItem.js';
import {MmlNode} from '../core/MmlTree/MmlNode.js';
import {Handler} from '../core/Handler.js';
import {InputJax, AbstractInputJax} from '../core/InputJax.js';
import {OutputJax, AbstractOutputJax} from '../core/OutputJax.js';
import {CommonOutputJax} from '../output/common/OutputJax.js';
import {DOMAdaptor} from '../core/DOMAdaptor.js';
import {PrioritizedList} from '../util/PrioritizedList.js';
import {OptionList} from '../util/Options.js';

import {TeX} from '../input/tex.js';


/**
 * Update the configuration structure to include the startup configuration
 */
export interface MathJaxConfig extends MJConfig {
    startup?: {
        input?: string[];        // The names of the input jax to use
        output?: string;         // The name for the output jax to use
        handler?: string;        // The handler to register
        adaptor?: string;        // The name for the DOM adaptor to use
        document?: any;          // The document (or fragment or string) to work in
        elements?: any[];        // The elements to typeset (default is document body)
        typeset?: boolean;       // Perform initial typeset?
        ready?: () => void;      // Function to perform when components are ready
        pageReady?: () => void;  // Function to perform when page is ready
        [name: string]: any;     // Other configuration blocks
    };
};

/**
 * Generic types for the standard MathJax objects
 */
export type MATHDOCUMENT = MathDocument<any, any, any>;
export type MATHITEM = MathItem<any, any, any>;
export type HANDLER = Handler<any, any, any>;
export type DOMADAPTOR = DOMAdaptor<any, any, any>;
export type INPUTJAX = InputJax<any, any, any>;
export type OUTPUTJAX = OutputJax<any, any, any>;
export type COMMONJAX = CommonOutputJax<any, any, any, any, any, any, any>;
export type TEX = TeX<any, any, any>;

/**
 * A function to extend a handler class
 */
export type HandlerExtension = (handler: HANDLER) => HANDLER;

/**
 * Update the MathJax object to inclide the startup information
 */
export interface MathJaxObject extends MJObject {
    config: MathJaxConfig;
    startup: {
        constructors: {[name: string]: any};
        input: INPUTJAX[];
        output: OUTPUTJAX;
        handler: HANDLER;
        adaptor: DOMADAPTOR;
        elements: any[];
        document: MATHDOCUMENT;
        promise: Promise<void>;
        pagePromise: Promise<void>;
        registerConstructor(name: string, constructor: any): void;
        useHander(name: string, force?: boolean): void;
        useAdaptor(name: string, force?: boolean): void;
        useOutput(name: string, force?: boolean): void;
        useInput(name:string, force?: boolean): void;
        extendHandler(extend: HandlerExtension): void;
        toMML(node: MmlNode): string;
        defaultReady(): void;
        getComponents(): void;
        makeMethods(): void;
        makeTypesetMethods(): void;
        makeOutputMethods(iname: string, oname: string, input: INPUTJAX): void;
        makeMmlMethods(name: string, input: INPUTJAX): void;
        makeResetMethod(name: string, input: INPUTJAX): void;
        getInputJax(): INPUTJAX[];
        getOutputJax(): OUTPUTJAX;
        getAdaptor(): DOMADAPTOR;
        getHandler(): HANDLER;
    };
    [name: string]: any;    // Needed for the methods created by the startup module
}

/*
 * Access to the browser document
 */
declare var global: {document: Document};

/**
 * The implementation of the startup module
 */
export namespace Startup {

    /**
     * The array of handler extensions
     */
    const extensions = new PrioritizedList<HandlerExtension>();

    let visitor: any;  // the visitor for toMML();
    let mathjax: any;  // the mathjax variable from mathjax.js

    /**
     * The constructors (or other data) registered by the loaded packages
     */
    export const constructors: {[name: string]: any} = {};

    /**
     * The array of InputJax instances (created after everything is loaded)
     */
    export let input: INPUTJAX[] = [];

    /**
     * The OutputJax instance (created after everything is loaded)
     */
    export let output: OUTPUTJAX = null;

    /**
     * The Handler instance (created after everything is loaded)
     */
    export let handler: HANDLER = null;

    /**
     * The DOMAdaptor instance (created after everything is loaded)
     */
    export let adaptor: DOMADAPTOR = null;

    /**
     * The elements to process (set when typeset or conversion method is called)
     */
    export let elements: any[] = null;

    /**
     * The MathDocument instance being used (based on the browser DOM or configuration value)
     */
    export let document: MATHDOCUMENT = null;

    /**
     * The promise for the default typesetting, if one is performed
     */
    export let promise: Promise<void> = null;

    /**
     * A promise that is resolved when the page is loaded and ready to be processed
     */
    export let pagePromise: Promise<void> = new Promise<void>((resolve, reject) => {
        const doc = global.document;
        if (!doc || !doc.readyState || doc.readyState === 'complete' || doc.readyState === 'interactive') {
            resolve();
        } else {
            const listener = () => resolve();
            doc.defaultView.addEventListener('load', listener, true);
            doc.defaultView.addEventListener('DOMContentLoaded', listener, true);
        }
    });

    /**
     * @param {MmlNode} node   The root of the tree to convert to serialized MathML
     * @return {string}        The serialized MathML from the tree
     */
    export function toMML(node: MmlNode) {
        return visitor.visitTree(node, document);
    };

    /**
     * @param {string} name      The identifier for the constructor
     * @param {any} constructor  The constructor function for the named object
     */
    export function registerConstructor(name: string, constructor: any) {
        constructors[name] = constructor;
    };

    /**
     * @param {string} name      The identifier for the Handler to use
     * @param {boolean} force    True to force the Handler to be used even if one is already registered
     */
    export function useHandler(name: string, force: boolean = false) {
        if (!CONFIG.handler || force) {
            CONFIG.handler = name;
        }
    };

    /**
     * @param {string} name      The identifier for the DOMAdaptor to use
     * @param {boolean} force    True to force the DOMAdaptor to be used even if one is already registered
     */
    export function useAdaptor(name: string, force: boolean = false) {
        if (!CONFIG.adaptor || force) {
            CONFIG.adaptor = name;
        }
    };

    /**
     * @param {string} name      The identifier for the InputJax to use
     * @param {boolean} force    True to force the InputJax to be used even if the configuration already
     *                             included an array of input jax
     */
    export function useInput(name: string, force: boolean = false) {
        if (!inputSpecified || force) {
            CONFIG.input.push(name);
        }
    };

    /**
     * @param {string} name      The identifier for the OutputJax to use
     * @param {boolean} force    True to force the OutputJax to be used even if one is already registered
     */
    export function useOutput(name: string, force: boolean = false) {
        if (!CONFIG.output || force) {
            CONFIG.output = name;
        }
    };

    /**
     * @param {HandlerExtension} extend    A function to extend the handler class
     * @param {number} priority            The priority of the extension
     */
    export function extendHandler(extend: HandlerExtension, priority: number = 10) {
        extensions.add(extend, priority);
    };

    /**
     * The default ready() function called when all the packages have been loaded
     *   (setting MathJax.startup.ready in the configuration will override this,
     *    but you can call MathJax.startup.defaultReady() within your own ready function
     *    if needed, or can use the individual methods below to perform portions
     *    of the default startup actions.)
     */
    export function defaultReady() {
        getComponents();
        makeMethods();
        if (CONFIG.pageReady) {
            //
            //  Add in the user's pageReady function, which runs when the page content is
            //    ready, but before the initial typesetting call.
            //
            pagePromise = pagePromise.then(CONFIG.pageReady);
        }
        promise = (CONFIG.typeset && MathJax.TypesetPromise ?
                   pagePromise.then(MathJax.TypesetPromise) : pagePromise);
    };

    /**
     * Create the instances of the registered components
     */
    export function getComponents() {
        visitor = new MathJax._.core.MmlTree.SerializedMmlVisitor.SerializedMmlVisitor();
        mathjax = MathJax._.mathjax.mathjax;
        input = getInputJax();
        output = getOutputJax();
        adaptor = getAdaptor();
        handler = getHandler();
    };

    /**
     * Make the typeset and conversion methods based on the registered components
     *
     * If there are both input and output jax,
     *   Make Typeset() and TypesetPromise() methods using the given jax,
     *    and TypesetClear() to clear the existing math items
     * For each input jax
     *   Make input2mml() and input2mmlPromise() conversion metods and inputReset() method
     *   If there is a registered output jax
     *     Make input2output() and input2outputPromise conversion methods and outputStylesheet() method
     */
    export function makeMethods() {
        if (!handler) return;
        mathjax.handlers.register(handler);
        getDocument();
        if (input && output) {
            makeTypesetMethods();
        }
        const oname = (output ? output.name.toLowerCase() : '');
        for (const jax of input) {
            const iname = jax.name.toLowerCase();
            makeMmlMethods(iname, jax);
            makeResetMethod(iname, jax);
            if (output) {
                makeOutputMethods(iname, oname, jax);
            }
        }
    };

    /**
     * Create the Typeset(elements?), TypesetPromise(elements?), and TypesetClear() methods.
     *
     * The first two call the document's render() function, the latter
     *   wrapped in handleRetriesFor() and returning the resulting promise.
     *
     * TypeseClear() clears all the MathItems from the document.
     */
    export function makeTypesetMethods() {
        MathJax.Typeset = (elements: any = null) => {
            document.options.elements = elements;
            document.render();
        };
        MathJax.TypesetPromise = (elements: any = null) => {
            document.options.elements = elements;
            return mathjax.handleRetriesFor(() => {
                document.render();
            })
        };
        MathJax.TypesetClear = () => document.clear();
    };

    /**
     * Make the input2output(math, options?) and input2outuputPromise(math, options?) methods,
     *   and outputStylesheet() method, where "input" and "output" are replaced by the
     *   jax names (e.g., tex2chtml() and chtmlStyleSheet()).
     *
     * The first two perform the document's convert() call, with the Promise version wrapped in
     *   handlerRetriesFor() and returning the resulting promise.  The return value is the
     *   DOM object for the converted math.  Use MathJax.startup.adaptor.outerHTML(result)
     *   to get the serialized string version of the output.
     *
     * The outputStylesheet() method returns the styleSheet object for the output.
     * Use MathJax.startup.adaptor.innerHTML(MathJax.outputStylesheet()) to get the serialized
     *   version of the stylesheet.
     * The getMetricsFor(node, display) method returns the metric data for the given node
     *
     * @param {string} iname     The name of the input jax
     * @param {string} oname     The name of the output jax
     * @param {INPUTJAX} input   The input jax instance
     */
    export function makeOutputMethods(iname: string, oname: string, input: INPUTJAX) {
        const name = iname + '2' + oname;
        MathJax[name] =
            (math: string, options: OptionList = {}) => {
                options.format = input.name;
                return document.convert(math, options);
            };
        MathJax[name + 'Promise'] =
            (math: string, options: OptionList = {}) => {
                options.format = input.name;
                return mathjax.handleRetriesFor(() => document.convert(math, options));
            };
        MathJax[oname + 'Stylesheet'] = () => output.styleSheet(document);
        if (output instanceof CommonOutputJax) {
            MathJax.getMetricsFor = (node: any, display: boolean) => {
                return (output as COMMONJAX).getMetricsFor(node, display);
            }
        }
    };

    /**
     * Make the input2mml(math, options?) and input2mmlPromise(math, options?) methods,
     *   where "input" is replaced by the name of the input jax (e.g., "tex2mml").
     *
     * These convert the math to its serialized MathML representation.
     *   The second wraps the conversion in handleRetriesFor() and
     *   returns the resulting promise.
     *
     * @param {string} name     The name of the input jax
     * @param {input} INPUTJAX  The input jax itself
     */
    export function makeMmlMethods(name: string, input: INPUTJAX) {
        MathJax[name + '2mml'] =
            (math: string, options: OptionList = {}) => {
                options.end = STATE.CONVERT;
                options.format = input.name;
                return toMML(document.convert(math, options));
            };
        MathJax[name + '2mmlPromise'] =
            (math: string, options: OptionList = {}) => {
                options.end = STATE.CONVERT;
                options.format = input.name;
                return mathjax.handleRetriesFor(() => toMML(document.convert(math, options)));
            };
    };

    /**
     * Creates the inputReset() method, where "input" is replaced by the input jax name (e.g., "texReset()).
     *
     * The texReset() method clears the equation numbers and labels
     *
     * @param {string} name     The name of the input jax
     * @param {input} INPUTJAX  The input jax itself
     */
    export function makeResetMethod(name: string, input: INPUTJAX) {
        if (name === 'tex') {
            MathJax.texReset = () => (input as TEX).parseOptions.tags.reset();
        }
    };

    /**
     * @return {INPUTJAX[]}  The array of instances of the registered input jax
     */
    export function getInputJax() {
        const jax = [] as INPUTJAX[];
        for (const name of CONFIG.input) {
            const inputClass = constructors[name];
            if (inputClass) {
                jax.push(new inputClass(MathJax.config[name]));
            } else {
                throw Error('Input Jax "' + name + '" is not defined (has it been loaded?)');
            }
        }
        return jax;
    };

    /**
     * @return {OUTPUTJAX}   The instance of the registered output jax
     */
    export function getOutputJax() {
        const name = CONFIG.output;
        if (!name) return null;
        const outputClass = constructors[name];
        if (!outputClass) {
            throw Error('Output Jax "' + name + '" is not defined (has it been loaded?)');
        }
        return new outputClass(MathJax.config[name]) as OUTPUTJAX;
    };

    /**
     * @return {DOMADAPTOR}  The instance of the registered DOMAdator (the registered constructor
     *                         in this case is a function that creates the adaptor, not a class)
     */
    export function getAdaptor() {
        const name = CONFIG.adaptor;
        if (!name || name === 'none') return null;
        const adaptor = constructors[name];
        if (!adaptor) {
            throw Error('DOMAdaptor "' + name + '" is not defined (has it been loaded?)');
        }
        return adaptor(MathJax.config[name]) as DOMADAPTOR;
    };

    /**
     * @return {HANDLER}  The instance of the registered Handler, extended by the registered extensions
     */
    export function getHandler() {
        const name = CONFIG.handler;
        if (!name || name === 'none' || !adaptor) return null;
        const handlerClass = constructors[name];
        if (!handlerClass) {
            throw Error('Handler "' + name + '" is not defined (has it been loaded?)');
        }
        let handler = new handlerClass(adaptor, 5);
        for (const extend of extensions) {
            handler = extend.item(handler);
        }
        return handler;
    };

    /**
     * Create the document with the given input and output jax
     *
     * @returns {MathDocument}   The MathDocument with the configured input and output jax
     */
    export function getDocument() {
        document = mathjax.document(CONFIG.document, {...MathJax.config.options, InputJax: input, OutputJax: output});
        return document;
    }
};

/**
 * Export the global MathJax object for convenience
 */
export const MathJax = MJGlobal as MathJaxObject;

/*
 * If the startup module hasn't been added to the MathJax variable,
 *   Add the startup configuration and data objects, and create
 *   the initial typeset and conversion calls.
 */
if (typeof MathJax._.startup === 'undefined') {

    combineDefaults(MathJax.config, 'startup', {
        input: [],
        output: '',
        handler: null,
        adaptor: null,
        document: (typeof document === 'undefined' ? '' : document),
        elements: null,
        typeset: true,
        ready: Startup.defaultReady.bind(Startup)
    });
    combineWithMathJax({
        startup: Startup,
        options: {}
    });

}

/**
 * Export the loader configuration for convenience
 */
export const CONFIG = MathJax.config.startup;


/*
 * Tells if the user configuration included input jax or not
 */
const inputSpecified = CONFIG.input.length !== 0;
