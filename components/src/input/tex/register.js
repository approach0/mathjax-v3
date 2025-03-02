import {TeX} from '../../../../mathjax3/input/tex.js';
import {insert} from '../../../../mathjax3/util/Options.js';

export function registerTeX(packageList) {
    if (MathJax.startup) {
        MathJax.startup.registerConstructor('tex', TeX);
        MathJax.startup.useInput('tex');
        if (!MathJax.config.tex) {
            MathJax.config.tex = {};
        }
        let packages = MathJax.config.tex.packages;
        MathJax.config.tex.packages = packageList;
        if (packages) {
            insert(MathJax.config.tex, {packages});
        }
    }
}
