import { CpfCnpjHelper } from '../src/cpf_cnpj'

describe('CPF', () => {
  test('números invalidos', () => {
    expect(new CpfCnpjHelper('00000000000').valido()).toBeFalsy()
    expect(new CpfCnpjHelper('11111111111').valido()).toBeFalsy()
    expect(new CpfCnpjHelper('22222222222').valido()).toBeFalsy()
    expect(new CpfCnpjHelper('33333333333').valido()).toBeFalsy()
    expect(new CpfCnpjHelper('44444444444').valido()).toBeFalsy()
    expect(new CpfCnpjHelper('55555555555').valido()).toBeFalsy()
    expect(new CpfCnpjHelper('66666666666').valido()).toBeFalsy()
    expect(new CpfCnpjHelper('77777777777').valido()).toBeFalsy()
    expect(new CpfCnpjHelper('88888888888').valido()).toBeFalsy()
    expect(new CpfCnpjHelper('99999999999').valido()).toBeFalsy()
    expect(new CpfCnpjHelper('12345678909').valido()).toBeFalsy()
  })

  test('rejeita valores vazios', () => {
    const doc = new CpfCnpjHelper('')
    expect(doc.valido()).toBeFalsy()
    expect(doc.tipo_documento).toBe('INVALIDO')
  })

  test('valida strings formatadas', () => {
    const doc = new CpfCnpjHelper('295.379.955-93')
    expect(doc.valido()).toBeTruthy()
    expect(doc.tipo_documento).toBe('CPF')
  })

  test('valida tipo CNPJ', () => {
    const doc = new CpfCnpjHelper('77.361.576/4266-02')
    expect(doc.valido()).toBeTruthy()
    expect(doc.tipo_documento).toBe('CNPJ')
  })

  test('valida strings não formatadas', () => {
    expect(new CpfCnpjHelper('29537995593').valido()).toBeTruthy()
  })

  test('valida strings de caracteres confusas', () => {
    expect(new CpfCnpjHelper('295$379\n955...93').valido()).toBeTruthy()
  })

  test('retorna o número não formatado', () => {
    expect(new CpfCnpjHelper('295.379.955-93').somenteNumero).toEqual(
      '29537995593'
    )
  })

  test('retorna o número formatador', () => {
    expect(new CpfCnpjHelper('29537995593').formatado).toEqual('295.379.955-93')
  })

  test('CNPJ gera número formatado', () => {
    const cnpj = CpfCnpjHelper.geraCnpj()

    expect(cnpj.formatado!).toMatch(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)
    expect(new CpfCnpjHelper(cnpj.formatado!).valido).toBeTruthy()
    expect(new CpfCnpjHelper(cnpj.formatado!).tipo_documento).toBe('CNPJ')
  })

  test('CPF gera número formatado', () => {
    const cpf = CpfCnpjHelper.geraCpf()

    expect(cpf.formatado!).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    expect(new CpfCnpjHelper(cpf.formatado!).valido).toBeTruthy()
    expect(new CpfCnpjHelper(cpf.formatado!).tipo_documento).toBe('CPF')
  })

  test('igualdade de objetos', () => {
    const cpf = new CpfCnpjHelper('29537995593')

    expect(cpf.igual('295.379.955-93')).toBeTruthy()
    expect(cpf.igual('295.379.955-13')).toBeFalsy()
  })
})
