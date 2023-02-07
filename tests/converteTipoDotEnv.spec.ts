import { converteTipoDotEnv } from "../src/index";

describe("converteTipoDotEnv", () => {
  test("Converte para boolean", () => {
    expect(converteTipoDotEnv("true")).toBe(true);
  });
  test("Converte para boolean", () => {
    expect(converteTipoDotEnv("false")).toBe(false);
  });
  test("Converte para null", () => {
    expect(converteTipoDotEnv("null")).toBe(null);
  });
  test('Converte para "" ', () => {
    expect(converteTipoDotEnv("")).toBe("");
  });
  test("Converte para numero ", () => {
    expect(converteTipoDotEnv("0234")).toBe(234);
  });
  test("Undefined", () => {
    const v = undefined;
    expect(converteTipoDotEnv(v)).toBe(undefined);
  });
});
