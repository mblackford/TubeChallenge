"use strict";

const { funFactFinder } = require("./fun-fact-finder");

test("some stations with facts", () => {
  expect(funFactFinder("highstreetkensington")).toHaveLength(148);
  expect(funFactFinder("stpauls")).toHaveLength(176);
  expect(funFactFinder("chiswickpark")).toHaveLength(130);
});

test("some stations without facts", () => {
  expect(funFactFinder("shadwell")).toEqual('');
  expect(funFactFinder("deptfordbridge")).toEqual('');
});
