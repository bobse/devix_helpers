import { removeExtensaoArquivo } from "../src/index";

describe("removeExtensaoArquivo", () => {
  test("Remove extensao .txt", () => {
    expect(removeExtensaoArquivo("test.txt")).toBe("test");
  });
  test("Remove extensao 4 letras .yaml", () => {
    expect(removeExtensaoArquivo("test.yaml")).toBe("test");
  });
  test("Arquivo sem extensao", () => {
    expect(removeExtensaoArquivo("test")).toBe("test");
  });
  test("Arquivo com ponto + extensao", () => {
    expect(removeExtensaoArquivo("test.novo.txt")).toBe("test.novo");
  });
});
