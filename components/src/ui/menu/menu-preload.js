import './lib/menu.js';

import {MenuHandler} from '../../../../mathjax3/ui/menu/MenuHandler.js';

if (MathJax.startup && typeof window !== 'undefined') {
    MathJax.startup.extendHandler(handler => MenuHandler(handler), 20);
}

