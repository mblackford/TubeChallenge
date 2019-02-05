"use strict";

const { funFactFinder } = require("./fun-fact-finder");

test("some stations with facts", () => {
  expect(funFactFinder("highstreetkensington")).toHaveLength(150);
  expect(funFactFinder("stpauls")).toHaveLength(178);
  expect(funFactFinder("chiswickpark")).toHaveLength(132);
});

test("some stations without facts", () => {
  expect(funFactFinder("shadwell")).toEqual('');
  expect(funFactFinder("deptfordbridge")).toEqual('');
});
