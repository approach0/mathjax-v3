import {Loader} from '../../../mathjax3/components/loader.js';

Loader.preLoad(
    'loader', 'startup',
    'core',
    'input/tex', 'input/mml',
    'output/svg', 'output/svg/fonts/tex.js',
    'ui/menu'
);
