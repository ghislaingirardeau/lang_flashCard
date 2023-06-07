import { describe, it, expect, expectTypeOf } from "vitest";
import { mount } from "@vue/test-utils";
import { createPage } from "@nuxt/test-utils";
import { testSum } from "../composables/findNodeElt";

describe("My test", () => {
  it("sum should be", () => {
    expectTypeOf(testSum).toBeFunction();
    expect(testSum(5, 3)).toBeTypeOf("number");
  });
});
