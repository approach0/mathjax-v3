import {ParserTest} from './parser-tests.js';
import 'mathjax3/input/tex/physics/PhysicsConfiguration.js';

class ParserPhysicsTest5_4 extends ParserTest {

  constructor() {
    super();
    this.packages = ['base', 'physics'];
  }
};

let parserTest = new ParserPhysicsTest5_4();


parserTest.runTest(
  'Derivatives_Differ_0', '\\dd',
  {"kind": "math",
   "texClass": 0,
   "attributes": {"display": "block"},
   "inherited": {"displaystyle": true,
                 "scriptlevel": 0},
   "properties": {},
   "childNodes": [
     {"kind": "mrow",
      "texClass": 0,
      "attributes": {},
      "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
      "properties": {},
      "childNodes": [
        {"kind": "TeXAtom",
         "texClass": 0,
         "attributes": {},
         "inherited": {"displaystyle": true,
                       "scriptlevel": 0},
         "properties": {},
         "childNodes": [
           {"kind": "mrow",
            "texClass": 0,
            "attributes": {},
            "inherited": {"displaystyle": true,
                          "scriptlevel": 0},
            "properties": {},
              "childNodes": [
                {"kind": "mi",
                  "texClass": 0,
                  "attributes": {"mathvariant": "normal"},
                  "inherited": {"displaystyle": true,
                    "scriptlevel": 0,
                    "mathvariant": "italic"},
                  "properties": {},
                  "childNodes": [
                    {"kind": "text",
                      "text": "d"}]}],
              "isInferred": true}]}],
      "isInferred": true}]}
);


parserTest.runTest(
  'Derivatives_Differ_1', '\\dd x',
  {"kind": "math",
   "texClass": 0,
   "attributes": {"display": "block"},
   "inherited": {"displaystyle": true,
                 "scriptlevel": 0},
   "properties": {},
   "childNodes": [
     {"kind": "mrow",
      "texClass": 0,
      "attributes": {},
      "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
      "properties": {},
      "childNodes": [
        {"kind": "TeXAtom",
         "texClass": 0,
         "attributes": {},
         "inherited": {"displaystyle": true,
                       "scriptlevel": 0},
         "properties": {},
         "childNodes": [
           {"kind": "mrow",
            "texClass": 0,
            "attributes": {},
            "inherited": {"displaystyle": true,
                          "scriptlevel": 0},
            "properties": {},
            "childNodes": [
              {"kind": "mi",
               "texClass": 0,
               "attributes": {"mathvariant": "normal"},
               "inherited": {"displaystyle": true,
                    "scriptlevel": 0,
                    "mathvariant": "italic"},
                  "properties": {},
                  "childNodes": [
                    {"kind": "text",
                      "text": "d"}]}],
              "isInferred": true}]},
        {"kind": "mi",
          "texClass": 0,
          "attributes": {},
          "inherited": {"displaystyle": true,
            "scriptlevel": 0,
            "mathvariant": "italic"},
          "properties": {},
          "childNodes": [
            {"kind": "text",
              "text": "x"}]}],
      "isInferred": true}]}
);


parserTest.runTest(
  'Derivatives_Differ_2', '\\dd{x}',
  {"kind": "math",
   "texClass": 1,
   "attributes": {"display": "block"},
   "inherited": {"displaystyle": true,
                 "scriptlevel": 0},
   "properties": {},
   "childNodes": [
     {"kind": "mrow",
      "texClass": 1,
      "attributes": {},
      "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
      "properties": {},
      "childNodes": [
        {"kind": "TeXAtom",
         "texClass": 1,
         "attributes": {},
         "inherited": {"displaystyle": true,
                       "scriptlevel": 0},
         "properties": {"texClass": 1},
         "childNodes": [
           {"kind": "mrow",
            "texClass": 0,
            "attributes": {},
            "inherited": {"displaystyle": true,
                          "scriptlevel": 0},
            "properties": {},
            "childNodes": [
              {"kind": "TeXAtom",
               "texClass": 0,
               "attributes": {},
               "inherited": {"displaystyle": true,
                             "scriptlevel": 0},
               "properties": {},
               "childNodes": [
                 {"kind": "mrow",
                  "texClass": 0,
                  "attributes": {},
                  "inherited": {"displaystyle": true,
                        "scriptlevel": 0},
                      "properties": {},
                      "childNodes": [
                        {"kind": "mi",
                          "texClass": 0,
                          "attributes": {"mathvariant": "normal"},
                          "inherited": {"displaystyle": true,
                            "scriptlevel": 0,
                            "mathvariant": "italic"},
                          "properties": {},
                          "childNodes": [
                            {"kind": "text",
                              "text": "d"}]}],
                      "isInferred": true}]},
                {"kind": "mi",
                  "texClass": 0,
                  "attributes": {},
                  "inherited": {"displaystyle": true,
                    "scriptlevel": 0,
                    "mathvariant": "italic"},
                  "properties": {},
                  "childNodes": [
                    {"kind": "text",
                      "text": "x"}]}],
              "isInferred": true}]}],
      "isInferred": true}]}
);


parserTest.runTest(
  'Derivatives_Differ_3', '\\dd[3]{x}',
  {"kind": "math",
   "texClass": 1,
   "attributes": {"display": "block"},
   "inherited": {"displaystyle": true,
                 "scriptlevel": 0},
   "properties": {},
   "childNodes": [
     {"kind": "mrow",
      "texClass": 1,
      "attributes": {},
      "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
      "properties": {},
      "childNodes": [
        {"kind": "TeXAtom",
         "texClass": 1,
         "attributes": {},
         "inherited": {"displaystyle": true,
                       "scriptlevel": 0},
         "properties": {"texClass": 1},
         "childNodes": [
           {"kind": "mrow",
            "texClass": -1,
            "attributes": {},
            "inherited": {"displaystyle": true,
                          "scriptlevel": 0},
            "properties": {},
            "childNodes": [
              {"kind": "msup",
               "texClass": -1,
               "attributes": {},
               "inherited": {"displaystyle": true,
                             "scriptlevel": 0},
               "properties": {},
               "childNodes": [
                 {"kind": "TeXAtom",
                  "texClass": 0,
                  "attributes": {},
                  "inherited": {"displaystyle": true,
                                "scriptlevel": 0},
                  "properties": {},
                  "childNodes": [
                    {"kind": "mrow",
                     "texClass": 0,
                     "attributes": {},
                     "inherited": {"displaystyle": true,
                                   "scriptlevel": 0},
                     "properties": {},
                     "childNodes": [
                       {"kind": "mi",
                        "texClass": 0,
                              "attributes": {"mathvariant": "normal"},
                              "inherited": {"displaystyle": true,
                                "scriptlevel": 0,
                                "mathvariant": "italic"},
                              "properties": {},
                              "childNodes": [
                                {"kind": "text",
                                  "text": "d"}]}],
                          "isInferred": true}]},
                    {"kind": "TeXAtom",
                      "texClass": 0,
                      "attributes": {},
                      "inherited": {"displaystyle": false,
                        "scriptlevel": 1},
                      "properties": {},
                      "childNodes": [
                        {"kind": "mrow",
                          "texClass": 0,
                          "attributes": {},
                          "inherited": {"displaystyle": false,
                            "scriptlevel": 1},
                          "properties": {},
                          "childNodes": [
                            {"kind": "mn",
                              "texClass": 0,
                              "attributes": {},
                              "inherited": {"displaystyle": false,
                                "scriptlevel": 1},
                              "properties": {},
                              "childNodes": [
                                {"kind": "text",
                                  "text": "3"}]}],
                          "isInferred": true}]}]},
                {"kind": "mi",
                  "texClass": 0,
                  "attributes": {},
                  "inherited": {"displaystyle": true,
                    "scriptlevel": 0,
                    "mathvariant": "italic"},
                  "properties": {},
                  "childNodes": [
                    {"kind": "text",
                      "text": "x"}]}],
              "isInferred": true}]}],
      "isInferred": true}]}
);


parserTest.runTest(
  'Derivatives_Differ_4', '\\dd[3]x',
  {"kind": "math",
   "texClass": -1,
   "attributes": {"display": "block"},
   "inherited": {"displaystyle": true,
                 "scriptlevel": 0},
   "properties": {},
   "childNodes": [
     {"kind": "mrow",
      "texClass": -1,
      "attributes": {},
      "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
      "properties": {},
      "childNodes": [
        {"kind": "msup",
         "texClass": -1,
         "attributes": {},
         "inherited": {"displaystyle": true,
                       "scriptlevel": 0},
         "properties": {},
         "childNodes": [
           {"kind": "TeXAtom",
            "texClass": 0,
            "attributes": {},
            "inherited": {"displaystyle": true,
                          "scriptlevel": 0},
            "properties": {},
            "childNodes": [
              {"kind": "mrow",
               "texClass": 0,
               "attributes": {},
               "inherited": {"displaystyle": true,
                             "scriptlevel": 0},
               "properties": {},
               "childNodes": [
                 {"kind": "mi",
                  "texClass": 0,
                  "attributes": {"mathvariant": "normal"},
                  "inherited": {"displaystyle": true,
                                "scriptlevel": 0,
                                "mathvariant": "italic"},
                  "properties": {},
                  "childNodes": [
                    {"kind": "text",
                     "text": "d"}]}],
                  "isInferred": true}]},
            {"kind": "TeXAtom",
              "texClass": 0,
              "attributes": {},
              "inherited": {"displaystyle": false,
                "scriptlevel": 1},
              "properties": {},
              "childNodes": [
                {"kind": "mrow",
                  "texClass": 0,
                  "attributes": {},
                  "inherited": {"displaystyle": false,
                    "scriptlevel": 1},
                  "properties": {},
                  "childNodes": [
                    {"kind": "mn",
                      "texClass": 0,
                      "attributes": {},
                      "inherited": {"displaystyle": false,
                        "scriptlevel": 1},
                      "properties": {},
                      "childNodes": [
                        {"kind": "text",
                          "text": "3"}]}],
                  "isInferred": true}]}]},
        {"kind": "mi",
          "texClass": 0,
          "attributes": {},
          "inherited": {"displaystyle": true,
            "scriptlevel": 0,
            "mathvariant": "italic"},
          "properties": {},
          "childNodes": [
            {"kind": "text",
              "text": "x"}]}],
      "isInferred": true}]}
);


parserTest.runTest(
  'Derivatives_Differ_5', '\\dd(\\frac{\\frac{\\cos}{\\theta}}{\\theta})',
  {"kind": "math",
   "texClass": 0,
   "attributes": {"display": "block"},
   "inherited": {"displaystyle": true,
                 "scriptlevel": 0},
   "properties": {},
   "childNodes": [
     {"kind": "mrow",
      "texClass": 0,
      "attributes": {},
      "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
      "properties": {},
      "childNodes": [
        {"kind": "TeXAtom",
         "texClass": 0,
         "attributes": {},
         "inherited": {"displaystyle": true,
                       "scriptlevel": 0},
         "properties": {},
         "childNodes": [
           {"kind": "mrow",
            "texClass": 0,
            "attributes": {},
            "inherited": {"displaystyle": true,
                          "scriptlevel": 0},
            "properties": {},
            "childNodes": [
              {"kind": "mi",
               "texClass": 0,
               "attributes": {"mathvariant": "normal"},
               "inherited": {"displaystyle": true,
                             "scriptlevel": 0,
                             "mathvariant": "italic"},
               "properties": {},
               "childNodes": [
                 {"kind": "text",
                  "text": "d"}]}],
            "isInferred": true}]},
        {"kind": "mrow",
         "texClass": 4,
         "attributes": {},
         "inherited": {"displaystyle": true,
                       "scriptlevel": 0},
         "properties": {"open": "(",
                        "close": ")",
                        "texClass": 7},
         "childNodes": [
           {"kind": "mo",
            "texClass": 4,
            "attributes": {},
            "inherited": {"displaystyle": true,
                          "scriptlevel": 0,
                          "form": "prefix",
                          "fence": true,
                          "stretchy": true,
                          "symmetric": true},
            "properties": {"texClass": 4},
            "childNodes": [
              {"kind": "text",
               "text": "("}],
            "isEmbellished": true},
           {"kind": "mfrac",
            "texClass": null,
            "attributes": {},
            "inherited": {"displaystyle": true,
                          "scriptlevel": 0},
            "properties": {},
            "childNodes": [
                {"kind": "mfrac",
                  "texClass": null,
                  "attributes": {},
                  "inherited": {"displaystyle": false,
                    "scriptlevel": 0},
                  "properties": {},
                  "childNodes": [
                    {"kind": "mi",
                      "texClass": 1,
                      "attributes": {},
                      "inherited": {"displaystyle": false,
                        "scriptlevel": 1},
                      "properties": {"texClass": 1},
                      "childNodes": [
                        {"kind": "text",
                          "text": "cos"}]},
                    {"kind": "mi",
                      "texClass": 0,
                      "attributes": {},
                      "inherited": {"displaystyle": false,
                        "scriptlevel": 1,
                        "mathvariant": "italic"},
                      "properties": {"texprimestyle": true},
                      "childNodes": [
                        {"kind": "text",
                          "text": "θ"}]}]},
                {"kind": "mi",
                  "texClass": 0,
                  "attributes": {},
                  "inherited": {"displaystyle": false,
                    "scriptlevel": 0,
                    "mathvariant": "italic"},
                  "properties": {"texprimestyle": true},
                  "childNodes": [
                    {"kind": "text",
                      "text": "θ"}]}]},
            {"kind": "mo",
              "texClass": 5,
              "attributes": {},
              "inherited": {"displaystyle": true,
                "scriptlevel": 0,
                "form": "postfix",
                "fence": true,
                "stretchy": true,
                "symmetric": true},
              "properties": {"texClass": 5},
              "childNodes": [
                {"kind": "text",
                  "text": ")"}],
              "isEmbellished": true}]}],
      "isInferred": true}]}
);


parserTest.runTest(
  'Derivatives_Differ_6', '\\dd[4](\\frac{\\frac{\\cos}{\\theta}}{\\theta})',
  {"kind": "math",
   "texClass": -1,
   "attributes": {"display": "block"},
   "inherited": {"displaystyle": true,
                 "scriptlevel": 0},
   "properties": {},
   "childNodes": [
     {"kind": "mrow",
      "texClass": -1,
      "attributes": {},
      "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
      "properties": {},
      "childNodes": [
        {"kind": "msup",
         "texClass": -1,
         "attributes": {},
         "inherited": {"displaystyle": true,
                       "scriptlevel": 0},
         "properties": {},
         "childNodes": [
           {"kind": "TeXAtom",
            "texClass": 0,
            "attributes": {},
            "inherited": {"displaystyle": true,
                          "scriptlevel": 0},
            "properties": {},
            "childNodes": [
              {"kind": "mrow",
               "texClass": 0,
               "attributes": {},
               "inherited": {"displaystyle": true,
                             "scriptlevel": 0},
               "properties": {},
               "childNodes": [
                 {"kind": "mi",
                  "texClass": 0,
                  "attributes": {"mathvariant": "normal"},
                  "inherited": {"displaystyle": true,
                                "scriptlevel": 0,
                                "mathvariant": "italic"},
                  "properties": {},
                  "childNodes": [
                    {"kind": "text",
                     "text": "d"}]}],
               "isInferred": true}]},
           {"kind": "TeXAtom",
            "texClass": 0,
            "attributes": {},
            "inherited": {"displaystyle": false,
                          "scriptlevel": 1},
            "properties": {},
            "childNodes": [
              {"kind": "mrow",
               "texClass": 0,
               "attributes": {},
               "inherited": {"displaystyle": false,
                             "scriptlevel": 1},
               "properties": {},
               "childNodes": [
                 {"kind": "mn",
                  "texClass": 0,
                  "attributes": {},
                  "inherited": {"displaystyle": false,
                                "scriptlevel": 1},
                  "properties": {},
                  "childNodes": [
                    {"kind": "text",
                     "text": "4"}]}],
               "isInferred": true}]}]},
        {"kind": "mrow",
         "texClass": 4,
         "attributes": {},
         "inherited": {"displaystyle": true,
                       "scriptlevel": 0},
         "properties": {"open": "(",
                        "close": ")",
                        "texClass": 7},
         "childNodes": [
           {"kind": "mo",
              "texClass": 4,
              "attributes": {},
              "inherited": {"displaystyle": true,
                "scriptlevel": 0,
                "form": "prefix",
                "fence": true,
                "stretchy": true,
                "symmetric": true},
              "properties": {"texClass": 4},
              "childNodes": [
                {"kind": "text",
                  "text": "("}],
              "isEmbellished": true},
            {"kind": "mfrac",
              "texClass": null,
              "attributes": {},
              "inherited": {"displaystyle": true,
                "scriptlevel": 0},
              "properties": {},
              "childNodes": [
                {"kind": "mfrac",
                  "texClass": null,
                  "attributes": {},
                  "inherited": {"displaystyle": false,
                    "scriptlevel": 0},
                  "properties": {},
                  "childNodes": [
                    {"kind": "mi",
                      "texClass": 1,
                      "attributes": {},
                      "inherited": {"displaystyle": false,
                        "scriptlevel": 1},
                      "properties": {"texClass": 1},
                      "childNodes": [
                        {"kind": "text",
                          "text": "cos"}]},
                    {"kind": "mi",
                      "texClass": 0,
                      "attributes": {},
                      "inherited": {"displaystyle": false,
                        "scriptlevel": 1,
                        "mathvariant": "italic"},
                      "properties": {"texprimestyle": true},
                      "childNodes": [
                        {"kind": "text",
                          "text": "θ"}]}]},
                {"kind": "mi",
                  "texClass": 0,
                  "attributes": {},
                  "inherited": {"displaystyle": false,
                    "scriptlevel": 0,
                    "mathvariant": "italic"},
                  "properties": {"texprimestyle": true},
                  "childNodes": [
                    {"kind": "text",
                      "text": "θ"}]}]},
            {"kind": "mo",
              "texClass": 5,
              "attributes": {},
              "inherited": {"displaystyle": true,
                "scriptlevel": 0,
                "form": "postfix",
                "fence": true,
                "stretchy": true,
                "symmetric": true},
              "properties": {"texClass": 5},
              "childNodes": [
                {"kind": "text",
                  "text": ")"}],
              "isEmbellished": true}]}],
      "isInferred": true}]}
);


parserTest.runTest(
  'Derivatives_Differ_7', '\\dd{x}(\\frac{\\frac{\\cos}{\\theta}}{\\theta})',
  {"kind": "math",
   "texClass": 1,
   "attributes": {"display": "block"},
   "inherited": {"displaystyle": true,
                 "scriptlevel": 0},
   "properties": {},
   "childNodes": [
     {"kind": "mrow",
      "texClass": 1,
      "attributes": {},
      "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
      "properties": {},
      "childNodes": [
        {"kind": "TeXAtom",
         "texClass": 1,
         "attributes": {},
         "inherited": {"displaystyle": true,
                       "scriptlevel": 0},
         "properties": {"texClass": 1},
         "childNodes": [
           {"kind": "mrow",
            "texClass": 0,
            "attributes": {},
            "inherited": {"displaystyle": true,
                          "scriptlevel": 0},
            "properties": {},
            "childNodes": [
              {"kind": "TeXAtom",
               "texClass": 0,
               "attributes": {},
               "inherited": {"displaystyle": true,
                             "scriptlevel": 0},
               "properties": {},
               "childNodes": [
                 {"kind": "mrow",
                  "texClass": 0,
                  "attributes": {},
                  "inherited": {"displaystyle": true,
                                "scriptlevel": 0},
                  "properties": {},
                  "childNodes": [
                    {"kind": "mi",
                     "texClass": 0,
                     "attributes": {"mathvariant": "normal"},
                     "inherited": {"displaystyle": true,
                                   "scriptlevel": 0,
                                   "mathvariant": "italic"},
                     "properties": {},
                     "childNodes": [
                       {"kind": "text",
                        "text": "d"}]}],
                  "isInferred": true}]},
              {"kind": "mi",
               "texClass": 0,
               "attributes": {},
               "inherited": {"displaystyle": true,
                             "scriptlevel": 0,
                             "mathvariant": "italic"},
               "properties": {},
               "childNodes": [
                 {"kind": "text",
                  "text": "x"}]}],
            "isInferred": true}]},
        {"kind": "mo",
         "texClass": 4,
         "attributes": {"stretchy": false},
         "inherited": {"displaystyle": true,
                       "scriptlevel": 0,
                       "form": "infix",
                       "fence": true,
            "stretchy": true,
            "symmetric": true},
          "properties": {},
          "childNodes": [
            {"kind": "text",
              "text": "("}],
          "isEmbellished": true},
        {"kind": "mfrac",
          "texClass": null,
          "attributes": {},
          "inherited": {"displaystyle": true,
            "scriptlevel": 0},
          "properties": {},
          "childNodes": [
            {"kind": "mfrac",
              "texClass": null,
              "attributes": {},
              "inherited": {"displaystyle": false,
                "scriptlevel": 0},
              "properties": {},
              "childNodes": [
                {"kind": "mi",
                  "texClass": 1,
                  "attributes": {},
                  "inherited": {"displaystyle": false,
                    "scriptlevel": 1},
                  "properties": {"texClass": 1},
                  "childNodes": [
                    {"kind": "text",
                      "text": "cos"}]},
                {"kind": "mi",
                  "texClass": 0,
                  "attributes": {},
                  "inherited": {"displaystyle": false,
                    "scriptlevel": 1,
                    "mathvariant": "italic"},
                  "properties": {"texprimestyle": true},
                  "childNodes": [
                    {"kind": "text",
                      "text": "θ"}]}]},
            {"kind": "mi",
              "texClass": 0,
              "attributes": {},
              "inherited": {"displaystyle": false,
                "scriptlevel": 0,
                "mathvariant": "italic"},
              "properties": {"texprimestyle": true},
              "childNodes": [
                {"kind": "text",
                  "text": "θ"}]}]},
        {"kind": "mo",
          "texClass": 5,
          "attributes": {"stretchy": false},
          "inherited": {"displaystyle": true,
            "scriptlevel": 0,
            "form": "postfix",
            "fence": true,
            "stretchy": true,
            "symmetric": true},
          "properties": {},
          "childNodes": [
            {"kind": "text",
              "text": ")"}],
          "isEmbellished": true}],
      "isInferred": true}]}
);


parserTest.runTest(
  'Derivatives_Differ_8', '\\dd[4]{x}(\\frac{\\frac{\\cos}{\\theta}}{\\theta})',
  {"kind": "math",
   "texClass": 1,
   "attributes": {"display": "block"},
   "inherited": {"displaystyle": true,
                 "scriptlevel": 0},
   "properties": {},
   "childNodes": [
     {"kind": "mrow",
      "texClass": 1,
      "attributes": {},
      "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
      "properties": {},
      "childNodes": [
        {"kind": "TeXAtom",
         "texClass": 1,
         "attributes": {},
         "inherited": {"displaystyle": true,
                       "scriptlevel": 0},
         "properties": {"texClass": 1},
         "childNodes": [
           {"kind": "mrow",
            "texClass": -1,
            "attributes": {},
            "inherited": {"displaystyle": true,
                          "scriptlevel": 0},
            "properties": {},
            "childNodes": [
              {"kind": "msup",
               "texClass": -1,
               "attributes": {},
               "inherited": {"displaystyle": true,
                             "scriptlevel": 0},
               "properties": {},
               "childNodes": [
                 {"kind": "TeXAtom",
                  "texClass": 0,
                  "attributes": {},
                  "inherited": {"displaystyle": true,
                                "scriptlevel": 0},
                  "properties": {},
                  "childNodes": [
                    {"kind": "mrow",
                     "texClass": 0,
                     "attributes": {},
                     "inherited": {"displaystyle": true,
                                   "scriptlevel": 0},
                     "properties": {},
                     "childNodes": [
                       {"kind": "mi",
                        "texClass": 0,
                        "attributes": {"mathvariant": "normal"},
                        "inherited": {"displaystyle": true,
                                      "scriptlevel": 0,
                                      "mathvariant": "italic"},
                        "properties": {},
                        "childNodes": [
                          {"kind": "text",
                           "text": "d"}]}],
                     "isInferred": true}]},
                 {"kind": "TeXAtom",
                  "texClass": 0,
                  "attributes": {},
                  "inherited": {"displaystyle": false,
                                "scriptlevel": 1},
                  "properties": {},
                  "childNodes": [
                    {"kind": "mrow",
                     "texClass": 0,
                     "attributes": {},
                     "inherited": {"displaystyle": false,
                                   "scriptlevel": 1},
                     "properties": {},
                     "childNodes": [
                       {"kind": "mn",
                        "texClass": 0,
                        "attributes": {},
                        "inherited": {"displaystyle": false,
                                "scriptlevel": 1},
                              "properties": {},
                              "childNodes": [
                                {"kind": "text",
                                  "text": "4"}]}],
                          "isInferred": true}]}]},
                {"kind": "mi",
                  "texClass": 0,
                  "attributes": {},
                  "inherited": {"displaystyle": true,
                    "scriptlevel": 0,
                    "mathvariant": "italic"},
                  "properties": {},
                  "childNodes": [
                    {"kind": "text",
                      "text": "x"}]}],
              "isInferred": true}]},
        {"kind": "mo",
          "texClass": 4,
          "attributes": {"stretchy": false},
          "inherited": {"displaystyle": true,
            "scriptlevel": 0,
            "form": "infix",
            "fence": true,
            "stretchy": true,
            "symmetric": true},
          "properties": {},
          "childNodes": [
            {"kind": "text",
              "text": "("}],
          "isEmbellished": true},
        {"kind": "mfrac",
          "texClass": null,
          "attributes": {},
          "inherited": {"displaystyle": true,
            "scriptlevel": 0},
          "properties": {},
          "childNodes": [
            {"kind": "mfrac",
              "texClass": null,
              "attributes": {},
              "inherited": {"displaystyle": false,
                "scriptlevel": 0},
              "properties": {},
              "childNodes": [
                {"kind": "mi",
                  "texClass": 1,
                  "attributes": {},
                  "inherited": {"displaystyle": false,
                    "scriptlevel": 1},
                  "properties": {"texClass": 1},
                  "childNodes": [
                    {"kind": "text",
                      "text": "cos"}]},
                {"kind": "mi",
                  "texClass": 0,
                  "attributes": {},
                  "inherited": {"displaystyle": false,
                    "scriptlevel": 1,
                    "mathvariant": "italic"},
                  "properties": {"texprimestyle": true},
                  "childNodes": [
                    {"kind": "text",
                      "text": "θ"}]}]},
            {"kind": "mi",
              "texClass": 0,
              "attributes": {},
              "inherited": {"displaystyle": false,
                "scriptlevel": 0,
                "mathvariant": "italic"},
              "properties": {"texprimestyle": true},
              "childNodes": [
                {"kind": "text",
                  "text": "θ"}]}]},
        {"kind": "mo",
          "texClass": 5,
          "attributes": {"stretchy": false},
          "inherited": {"displaystyle": true,
            "scriptlevel": 0,
            "form": "postfix",
            "fence": true,
            "stretchy": true,
            "symmetric": true},
          "properties": {},
          "childNodes": [
            {"kind": "text",
              "text": ")"}],
          "isEmbellished": true}],
      "isInferred": true}]}
);


parserTest.runTest(
  'Derivatives_Differ_9', '\\dd[5]',
  {"kind": "math",
   "texClass": -1,
   "attributes": {"display": "block"},
   "inherited": {"displaystyle": true,
                 "scriptlevel": 0},
   "properties": {},
   "childNodes": [
     {"kind": "mrow",
      "texClass": -1,
      "attributes": {},
      "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
      "properties": {},
      "childNodes": [
        {"kind": "msup",
         "texClass": -1,
         "attributes": {},
         "inherited": {"displaystyle": true,
                       "scriptlevel": 0},
         "properties": {},
         "childNodes": [
           {"kind": "TeXAtom",
            "texClass": 0,
            "attributes": {},
            "inherited": {"displaystyle": true,
                          "scriptlevel": 0},
            "properties": {},
            "childNodes": [
              {"kind": "mrow",
               "texClass": 0,
               "attributes": {},
               "inherited": {"displaystyle": true,
                             "scriptlevel": 0},
               "properties": {},
               "childNodes": [
                 {"kind": "mi",
                  "texClass": 0,
                  "attributes": {"mathvariant": "normal"},
                  "inherited": {"displaystyle": true,
                                "scriptlevel": 0,
                                "mathvariant": "italic"},
                      "properties": {},
                      "childNodes": [
                        {"kind": "text",
                          "text": "d"}]}],
                  "isInferred": true}]},
            {"kind": "TeXAtom",
              "texClass": 0,
              "attributes": {},
              "inherited": {"displaystyle": false,
                "scriptlevel": 1},
              "properties": {},
              "childNodes": [
                {"kind": "mrow",
                  "texClass": 0,
                  "attributes": {},
                  "inherited": {"displaystyle": false,
                    "scriptlevel": 1},
                  "properties": {},
                  "childNodes": [
                    {"kind": "mn",
                      "texClass": 0,
                      "attributes": {},
                      "inherited": {"displaystyle": false,
                        "scriptlevel": 1},
                      "properties": {},
                      "childNodes": [
                        {"kind": "text",
                          "text": "5"}]}],
                  "isInferred": true}]}]}],
      "isInferred": true}]}
);


parserTest.printTime();
