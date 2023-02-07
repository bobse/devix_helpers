import { formataTelefone } from "../src/index";

describe("formataTelefone", () => {
  test("formata telefone sem cod. de area", () => {
    expect(formataTelefone("97643-0486")).toBe("976430486");
  });
  test("formata telefone com cod. de área(27)", () => {
    expect(formataTelefone("(27)97643-0486")).toBe("27976430486");
  });
  test("formata telefone com cod. de área separado por -", () => {
    expect(formataTelefone("27-97643-0486")).toBe("27976430486");
  });
  test("formata telefone com cod. de área separado + pais", () => {
    expect(formataTelefone("55(27)97643-0486")).toBe("27976430486");
  });
  test("formata telefone com cod. de área separado + pais com +55", () => {
    expect(formataTelefone("+55(27)97643-0486")).toBe("27976430486");
  });
});
