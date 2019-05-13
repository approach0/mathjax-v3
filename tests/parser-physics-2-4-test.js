import {ParserTest} from './parser-tests.js';
import 'mathjax3/input/tex/physics/PhysicsConfiguration.js';

class ParserPhysicsTest2_4 extends ParserTest {

  constructor() {
    super();
    this.packages = ['base', 'physics'];
  }
};

let parserTest = new ParserPhysicsTest2_4();


parserTest.runTest(
  'Vector_Gradient_0', '\\gradient ',
  {"kind":"math","texClass":0,"attributes":{"display":"block"},"inherited":{"displaystyle":true,"scriptlevel":0},"properties":{},"childNodes":[{"kind":"mrow","texClass":0,"attributes":{},"inherited":{"displaystyle":true,"scriptlevel":0},"properties":{},"childNodes":[{"kind":"mi","texClass":0,"attributes":{"mathvariant":"bold"},"inherited":{"displaystyle":true,"scriptlevel":0,"mathvariant":"italic"},"properties":{},"childNodes":[{"kind":"text","text":"∇"}]}],"isInferred":true}]}
);


parserTest.runTest(
  'Vector_Gradient_1', '\\gradient(\\frac{a}{b})',
  {"kind":"math","texClass":1,"attributes":{"display":"block"},"inherited":{"displaystyle":true,"scriptlevel":0},"properties":{},"childNodes":[{"kind":"mrow","texClass":1,"attributes":{},"inherited":{"displaystyle":true,"scriptlevel":0},"properties":{},"childNodes":[{"kind":"mi","texClass":1,"attributes":{"mathvariant":"bold"},"inherited":{"displaystyle":true,"scriptlevel":0,"mathvariant":"italic"},"properties":{"fnOP":true},"childNodes":[{"kind":"text","text":"∇"}]},{"kind":"mo","texClass":-1,"attributes":{},"inherited":{"displaystyle":true,"scriptlevel":0,"form":"infix"},"properties":{},"childNodes":[{"kind":"text","text":"⁡"}],"isEmbellished":true},{"kind":"mrow","texClass":4,"attributes":{},"inherited":{"displaystyle":true,"scriptlevel":0},"properties":{"open":"(","close":")"},"childNodes":[{"kind":"mo","texClass":4,"attributes":{},"inherited":{"displaystyle":true,"scriptlevel":0,"form":"prefix","fence":true,"stretchy":true,"symmetric":true},"properties":{},"childNodes":[{"kind":"text","text":"("}],"isEmbellished":true},{"kind":"mfrac","texClass":null,"attributes":{},"inherited":{"displaystyle":true,"scriptlevel":0},"properties":{},"childNodes":[{"kind":"mi","texClass":0,"attributes":{},"inherited":{"displaystyle":false,"scriptlevel":0,"mathvariant":"italic"},"properties":{},"childNodes":[{"kind":"text","text":"a"}]},{"kind":"mi","texClass":0,"attributes":{},"inherited":{"displaystyle":false,"scriptlevel":0,"mathvariant":"italic"},"properties":{"texprimestyle":true},"childNodes":[{"kind":"text","text":"b"}]}]},{"kind":"mo","texClass":5,"attributes":{},"inherited":{"displaystyle":true,"scriptlevel":0,"form":"postfix","fence":true,"stretchy":true,"symmetric":true},"properties":{},"childNodes":[{"kind":"text","text":")"}],"isEmbellished":true}]}],"isInferred":true}]}
);


parserTest.runTest(
  'Vector_Gradient_2', '\\gradient[\\frac{a}{b}]',
  {"kind":"math","texClass":1,"attributes":{"display":"block"},"inherited":{"displaystyle":true,"scriptlevel":0},"properties":{},"childNodes":[{"kind":"mrow","texClass":1,"attributes":{},"inherited":{"displaystyle":true,"scriptlevel":0},"properties":{},"childNodes":[{"kind":"mi","texClass":1,"attributes":{"mathvariant":"bold"},"inherited":{"displaystyle":true,"scriptlevel":0,"mathvariant":"italic"},"properties":{"fnOP":true},"childNodes":[{"kind":"text","text":"∇"}]},{"kind":"mo","texClass":-1,"attributes":{},"inherited":{"displaystyle":true,"scriptlevel":0,"form":"infix"},"properties":{},"childNodes":[{"kind":"text","text":"⁡"}],"isEmbellished":true},{"kind":"mrow","texClass":4,"attributes":{},"inherited":{"displaystyle":true,"scriptlevel":0},"properties":{"open":"[","close":"]"},"childNodes":[{"kind":"mo","texClass":4,"attributes":{},"inherited":{"displaystyle":true,"scriptlevel":0,"form":"prefix","fence":true,"stretchy":true,"symmetric":true},"properties":{},"childNodes":[{"kind":"text","text":"["}],"isEmbellished":true},{"kind":"mfrac","texClass":null,"attributes":{},"inherited":{"displaystyle":true,"scriptlevel":0},"properties":{},"childNodes":[{"kind":"mi","texClass":0,"attributes":{},"inherited":{"displaystyle":false,"scriptlevel":0,"mathvariant":"italic"},"properties":{},"childNodes":[{"kind":"text","text":"a"}]},{"kind":"mi","texClass":0,"attributes":{},"inherited":{"displaystyle":false,"scriptlevel":0,"mathvariant":"italic"},"properties":{"texprimestyle":true},"childNodes":[{"kind":"text","text":"b"}]}]},{"kind":"mo","texClass":5,"attributes":{},"inherited":{"displaystyle":true,"scriptlevel":0,"form":"postfix","fence":true,"stretchy":true,"symmetric":true},"properties":{},"childNodes":[{"kind":"text","text":"]"}],"isEmbellished":true}]}],"isInferred":true}]}
);


parserTest.runTest(
  'Vector_Gradient_3', '\\gradient{\\frac{a}{b}}',
  {"kind":"math","texClass":1,"attributes":{"display":"block"},"inherited":{"displaystyle":true,"scriptlevel":0},"properties":{},"childNodes":[{"kind":"mrow","texClass":1,"attributes":{},"inherited":{"displaystyle":true,"scriptlevel":0},"properties":{},"childNodes":[{"kind":"mi","texClass":1,"attributes":{"mathvariant":"bold"},"inherited":{"displaystyle":true,"scriptlevel":0,"mathvariant":"italic"},"properties":{"fnOP":true},"childNodes":[{"kind":"text","text":"∇"}]},{"kind":"mo","texClass":-1,"attributes":{},"inherited":{"displaystyle":true,"scriptlevel":0,"form":"infix"},"properties":{},"childNodes":[{"kind":"text","text":"⁡"}],"isEmbellished":true},{"kind":"mfrac","texClass":null,"attributes":{},"inherited":{"displaystyle":true,"scriptlevel":0},"properties":{},"childNodes":[{"kind":"mi","texClass":0,"attributes":{},"inherited":{"displaystyle":false,"scriptlevel":0,"mathvariant":"italic"},"properties":{},"childNodes":[{"kind":"text","text":"a"}]},{"kind":"mi","texClass":0,"attributes":{},"inherited":{"displaystyle":false,"scriptlevel":0,"mathvariant":"italic"},"properties":{"texprimestyle":true},"childNodes":[{"kind":"text","text":"b"}]}]}],"isInferred":true}]}
);


parserTest.runTest(
  'Vector_Gradient_4', '\\grad ',
  {"kind":"math","texClass":0,"attributes":{"display":"block"},"inherited":{"displaystyle":true,"scriptlevel":0},"properties":{},"childNodes":[{"kind":"mrow","texClass":0,"attributes":{},"inherited":{"displaystyle":true,"scriptlevel":0},"properties":{},"childNodes":[{"kind":"mi","texClass":0,"attributes":{"mathvariant":"bold"},"inherited":{"displaystyle":true,"scriptlevel":0,"mathvariant":"italic"},"properties":{},"childNodes":[{"kind":"text","text":"∇"}]}],"isInferred":true}]}
);


parserTest.runTest(
  'Vector_Gradient_5', '\\grad(\\frac{a}{b})',
  {"kind":"math","texClass":1,"attributes":{"display":"block"},"inherited":{"displaystyle":true,"scriptlevel":0},"properties":{},"childNodes":[{"kind":"mrow","texClass":1,"attributes":{},"inherited":{"displaystyle":true,"scriptlevel":0},"properties":{},"childNodes":[{"kind":"mi","texClass":1,"attributes":{"mathvariant":"bold"},"inherited":{"displaystyle":true,"scriptlevel":0,"mathvariant":"italic"},"properties":{"fnOP":true},"childNodes":[{"kind":"text","text":"∇"}]},{"kind":"mo","texClass":-1,"attributes":{},"inherited":{"displaystyle":true,"scriptlevel":0,"form":"infix"},"properties":{},"childNodes":[{"kind":"text","text":"⁡"}],"isEmbellished":true},{"kind":"mrow","texClass":4,"attributes":{},"inherited":{"displaystyle":true,"scriptlevel":0},"properties":{"open":"(","close":")"},"childNodes":[{"kind":"mo","texClass":4,"attributes":{},"inherited":{"displaystyle":true,"scriptlevel":0,"form":"prefix","fence":true,"stretchy":true,"symmetric":true},"properties":{},"childNodes":[{"kind":"text","text":"("}],"isEmbellished":true},{"kind":"mfrac","texClass":null,"attributes":{},"inherited":{"displaystyle":true,"scriptlevel":0},"properties":{},"childNodes":[{"kind":"mi","texClass":0,"attributes":{},"inherited":{"displaystyle":false,"scriptlevel":0,"mathvariant":"italic"},"properties":{},"childNodes":[{"kind":"text","text":"a"}]},{"kind":"mi","texClass":0,"attributes":{},"inherited":{"displaystyle":false,"scriptlevel":0,"mathvariant":"italic"},"properties":{"texprimestyle":true},"childNodes":[{"kind":"text","text":"b"}]}]},{"kind":"mo","texClass":5,"attributes":{},"inherited":{"displaystyle":true,"scriptlevel":0,"form":"postfix","fence":true,"stretchy":true,"symmetric":true},"properties":{},"childNodes":[{"kind":"text","text":")"}],"isEmbellished":true}]}],"isInferred":true}]}
);


parserTest.runTest(
  'Vector_Gradient_6', '\\grad[\\frac{a}{b}]',
  {"kind":"math","texClass":1,"attributes":{"display":"block"},"inherited":{"displaystyle":true,"scriptlevel":0},"properties":{},"childNodes":[{"kind":"mrow","texClass":1,"attributes":{},"inherited":{"displaystyle":true,"scriptlevel":0},"properties":{},"childNodes":[{"kind":"mi","texClass":1,"attributes":{"mathvariant":"bold"},"inherited":{"displaystyle":true,"scriptlevel":0,"mathvariant":"italic"},"properties":{"fnOP":true},"childNodes":[{"kind":"text","text":"∇"}]},{"kind":"mo","texClass":-1,"attributes":{},"inherited":{"displaystyle":true,"scriptlevel":0,"form":"infix"},"properties":{},"childNodes":[{"kind":"text","text":"⁡"}],"isEmbellished":true},{"kind":"mrow","texClass":4,"attributes":{},"inherited":{"displaystyle":true,"scriptlevel":0},"properties":{"open":"[","close":"]"},"childNodes":[{"kind":"mo","texClass":4,"attributes":{},"inherited":{"displaystyle":true,"scriptlevel":0,"form":"prefix","fence":true,"stretchy":true,"symmetric":true},"properties":{},"childNodes":[{"kind":"text","text":"["}],"isEmbellished":true},{"kind":"mfrac","texClass":null,"attributes":{},"inherited":{"displaystyle":true,"scriptlevel":0},"properties":{},"childNodes":[{"kind":"mi","texClass":0,"attributes":{},"inherited":{"displaystyle":false,"scriptlevel":0,"mathvariant":"italic"},"properties":{},"childNodes":[{"kind":"text","text":"a"}]},{"kind":"mi","texClass":0,"attributes":{},"inherited":{"displaystyle":false,"scriptlevel":0,"mathvariant":"italic"},"properties":{"texprimestyle":true},"childNodes":[{"kind":"text","text":"b"}]}]},{"kind":"mo","texClass":5,"attributes":{},"inherited":{"displaystyle":true,"scriptlevel":0,"form":"postfix","fence":true,"stretchy":true,"symmetric":true},"properties":{},"childNodes":[{"kind":"text","text":"]"}],"isEmbellished":true}]}],"isInferred":true}]}
);


parserTest.runTest(
  'Vector_Gradient_7', '\\grad{\\frac{a}{b}}',
  {"kind":"math","texClass":1,"attributes":{"display":"block"},"inherited":{"displaystyle":true,"scriptlevel":0},"properties":{},"childNodes":[{"kind":"mrow","texClass":1,"attributes":{},"inherited":{"displaystyle":true,"scriptlevel":0},"properties":{},"childNodes":[{"kind":"mi","texClass":1,"attributes":{"mathvariant":"bold"},"inherited":{"displaystyle":true,"scriptlevel":0,"mathvariant":"italic"},"properties":{"fnOP":true},"childNodes":[{"kind":"text","text":"∇"}]},{"kind":"mo","texClass":-1,"attributes":{},"inherited":{"displaystyle":true,"scriptlevel":0,"form":"infix"},"properties":{},"childNodes":[{"kind":"text","text":"⁡"}],"isEmbellished":true},{"kind":"mfrac","texClass":null,"attributes":{},"inherited":{"displaystyle":true,"scriptlevel":0},"properties":{},"childNodes":[{"kind":"mi","texClass":0,"attributes":{},"inherited":{"displaystyle":false,"scriptlevel":0,"mathvariant":"italic"},"properties":{},"childNodes":[{"kind":"text","text":"a"}]},{"kind":"mi","texClass":0,"attributes":{},"inherited":{"displaystyle":false,"scriptlevel":0,"mathvariant":"italic"},"properties":{"texprimestyle":true},"childNodes":[{"kind":"text","text":"b"}]}]}],"isInferred":true}]}
);


parserTest.printTime();
