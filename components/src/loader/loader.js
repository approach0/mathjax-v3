import './lib/loader.js';

import {Loader, CONFIG} from '../../../mathjax3/components/loader.js';
import {combineDefaults} from '../../../mathjax3/components/global.js';
import {dependencies, paths, provides} from '../dependencies.js';

combineDefaults(MathJax.config.loader, 'dependencies', dependencies);
combineDefaults(MathJax.config.loader, 'paths', paths);
combineDefaults(MathJax.config.loader, 'provides', provides);

Loader.load(...CONFIG.load)
    .then(() => CONFIG.ready())
    .catch((message, name) => CONFIG.failed(message, name));
