import { formataDataPtBR } from "../src/index";

describe("formataDataPtBR", () => {
  test("Formata data a partir de string", () => {
    const data = formataDataPtBR("2022-02-01");
    expect(data).toBe("01/02/2022");
  });

  test("Formata data a partir de date", () => {
    const data = formataDataPtBR(new Date("2022-12-24"));
    expect(data).toBe("24/12/2022");
  });

  test("Separador - na data", () => {
    const data = formataDataPtBR(new Date("2022-12-24"), "-");
    expect(data).toBe("24-12-2022");
  });

  test("Data inválida", () => {
    expect(() => formataDataPtBR(new Date("2022-22-24"))).toThrowError();
  });

  test("Data null", () => {
    const data = formataDataPtBR(null);
    expect(data).toBe(null);
  });

  test("Data undefined", () => {
    const data = formataDataPtBR(undefined);
    expect(data).toBe(undefined);
  });
});
