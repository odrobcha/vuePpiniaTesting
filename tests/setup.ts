import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/vue";
import {expect, afterEach } from "vitest";
// import matchers from "@testing-library/jest-dom/matchers";
//
// expect.extend(matchers);

afterEach(() => {
  cleanup();
});
