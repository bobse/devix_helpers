import { somenteNumeros } from "../src/index";

describe("somenteNumeros", () => {
  test("somenteNumeros 9.90-0", () => {
    expect(somenteNumeros("9.90-0")).toBe("9900");
  });
  test("somenteNumeros vazio", () => {
    expect(somenteNumeros("")).toBe("");
  });
  test("somente letras", () => {
    expect(somenteNumeros("CPF Inválido")).toBe("");
  });
});
