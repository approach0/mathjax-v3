import './lib/liteDOM.js';

import {liteAdaptor} from '../../../../mathjax3/adaptors/liteAdaptor.js';

if (MathJax.startup) {
    MathJax.startup.registerConstructor('liteAdaptor', liteAdaptor);
    MathJax.startup.useAdaptor('liteAdaptor', true);
}
