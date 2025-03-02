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
 * @fileoverview  Implements the SVGmath wrapper for the MmlMath object
 *
 * @author dpvc@mathjax.org (Davide Cervone)
 */

import {SVGWrapper, SVGConstructor} from '../Wrapper.js';
import {CommonMath, CommonMathMixin} from '../../common/Wrappers/math.js';
import {MmlMath} from '../../../core/MmlTree/MmlNodes/math.js';
import {StyleList} from '../../common/CssStyles.js';

/*****************************************************************/
/**
 * The SVGmath wrapper for the MmlMath object
 *
 * @template N  The HTMLElement node class
 * @template T  The Text node class
 * @template D  The Document class
 */
export class SVGmath<N, T, D> extends CommonMathMixin<SVGConstructor<N, T, D>>(SVGWrapper) {

    public static kind = MmlMath.prototype.kind;

    public static styles: StyleList = {
        'mjx-container[jax="SVG"][display="true"]': {
            display: 'block',
            'text-align': 'center',
            margin: '1em 0'
        },
        'mjx-container[jax="SVG"][justify="left"]': {
            'text-align': 'left'
        },
        'mjx-container[jax="SVG"][justify="right"]': {
            'text-align': 'right'
        }
    };

    /**
     * @override
     */
    public toSVG(parent: N) {
        super.toSVG(parent);
        const adaptor = this.adaptor;
        const display = (this.node.attributes.get('display') === 'block');
        if (display) {
            adaptor.setAttribute(this.jax.container, 'display', 'true');
        }
        const [align, shift] = this.getAlignShift();
        if (align !== 'center') {
            adaptor.setAttribute(this.jax.container, 'justify', align);
        }
        if (display && shift) {
            this.jax.shift = shift;
        }
        const attributes = this.node.attributes;
        const speech = attributes.get('data-semantic-speech') as string;
        if (speech && !attributes.get('aria-label')) {
            const id = this.getTitleID();
            const label = this.svg('title', {id}, [this.text(speech)]);
            adaptor.insert(label, adaptor.firstChild(this.element));
            adaptor.setAttribute(this.element, 'aria-labeledby', id);
            for (const child of this.childNodes[0].childNodes) {
                adaptor.setAttribute(child.element, 'aria-hidden', 'true');
            }
        }
    }

    /**
     * @return {string}  A unique ID to use for aria-labeledby title elements
     */
    protected getTitleID() {
        return 'mjx-svg-title-' + String(this.jax.options.titleID++);
    }

    /**
     * @override
     */
    public setChildPWidths(recompute: boolean, w: number = null, clear: boolean = true) {
        return super.setChildPWidths(recompute,
                                     this.parent ? w : this.metrics.containerWidth / this.jax.pxPerEm,
                                     false);
    }

}
