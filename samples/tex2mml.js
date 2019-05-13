import {MathJax} from '../mathjax3/mathjax.js';

import {TeX} from '../mathjax3/input/tex.js';
import {RegisterHTMLHandler} from '../mathjax3/handlers/html.js';
import {chooseAdaptor} from '../mathjax3/adaptors/chooseAdaptor.js';
import '../mathjax3/input/tex/bussproofs/BussproofsConfiguration.js';
import '../mathjax3/input/tex/AllPackages.js';

RegisterHTMLHandler(chooseAdaptor());

let html = MathJax.document('<html></html>', {
  InputJax: new TeX({packages: AllPackages.push('bussproofs')})
});

import {SerializedMmlVisitor as MmlVisitor} from '../mathjax3/core/MmlTree/SerializedMmlVisitor.js';
let visitor = new MmlVisitor();
let toMml = (node => visitor.visitTree(node, html.document));

MathJax.handleRetriesFor(() => {

    let math = html.convert(process.argv[3] || '', {end: STATE.CONVERT});
    math.setTeXclass();
    console.log(toMml(math));

}).catch(err => console.log(err.stack));
