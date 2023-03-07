class CpfCnpjHelper {
  private _doc_ident: string
  private _doc_type: 'CPF' | 'CNPJ' | 'INVALIDO'
  private _is_valid: boolean = false

  constructor(numDoc: string | number) {
    const doc = String(numDoc).replace(/[^\d]+/g, '')
    this._doc_ident = doc
    if (doc.length === 11 && this.validaCpf()) {
      this._doc_type = 'CPF'
      this._is_valid = true
    } else if (doc.length === 14 && this.validaCnpj()) {
      this._doc_type = 'CNPJ'
      this._is_valid = true
    } else {
      this._doc_type = 'INVALIDO'
    }
  }

  get formatado() {
    if (!this.valido) return

    if (this._doc_type === 'CPF') {
      return this._doc_ident.replace(
        /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
        '$1.$2.$3-$4'
      )
    } else if (this._doc_type === 'CNPJ') {
      return this._doc_ident.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        '$1.$2.$3/$4-$5'
      )
    }
  }

  get somenteNumero() {
    return this._doc_ident
  }

  get tipo_documento() {
    return this._doc_type
  }

  valido() {
    return this._is_valid
  }

  igual(outro_doc: CpfCnpjHelper | string): boolean {
    if (outro_doc instanceof CpfCnpjHelper) {
      return this._doc_ident === outro_doc.somenteNumero
    } else {
      return this._doc_ident === new CpfCnpjHelper(outro_doc).somenteNumero
    }
  }

  /* 
  CNPJ
  **/
  static geraCnpj() {
    let doc_id: string = ''

    for (let i = 0; i < 12; i += 1) {
      doc_id += Math.floor(Math.random() * 9)
    }

    doc_id += this.geraDigitosVerificadoresCnpj(doc_id)
    doc_id += this.geraDigitosVerificadoresCnpj(doc_id)
    return new CpfCnpjHelper(doc_id)
  }

  private validaCnpj() {
    const blocklist: string[] = [
      '00000000000000',
      '11111111111111',
      '22222222222222',
      '33333333333333',
      '44444444444444',
      '55555555555555',
      '66666666666666',
      '77777777777777',
      '88888888888888',
      '99999999999999',
    ]
    if (blocklist.includes(this._doc_ident)) return false

    return true
  }

  private static geraDigitosVerificadoresCnpj(doc_ident: string) {
    let index: number = 2
    const reverse: Array<number> = doc_ident
      .split('')
      .reduce((buffer: number[], number: string) => {
        return [parseInt(number, 10)].concat(buffer)
      }, [])

    const sum: number = reverse.reduce((buffer, number) => {
      buffer += number * index
      index = index === 9 ? 2 : index + 1
      return buffer
    }, 0)

    const mod: number = sum % 11
    return mod < 2 ? 0 : 11 - mod
  }

  /* 
  CPF
  **/

  static geraCpf() {
    let doc_id: string = ''

    for (let i = 0; i < 9; i += 1) {
      doc_id += Math.floor(Math.random() * 9)
    }

    doc_id += this.geraDigitosVerificadoresCpf(doc_id)
    doc_id += this.geraDigitosVerificadoresCpf(doc_id)
    return new CpfCnpjHelper(doc_id)
  }

  private validaCpf() {
    const blocklist: string[] = [
      '00000000000',
      '11111111111',
      '22222222222',
      '33333333333',
      '44444444444',
      '55555555555',
      '66666666666',
      '77777777777',
      '88888888888',
      '99999999999',
      '12345678909',
    ]
    if (blocklist.includes(this._doc_ident)) return false

    let numbers: string = this._doc_ident.slice(0, 9)
    numbers += CpfCnpjHelper.geraDigitosVerificadoresCpf(numbers)
    numbers += CpfCnpjHelper.geraDigitosVerificadoresCpf(numbers)

    return numbers.slice(-2) === this._doc_ident.slice(-2)
  }
  private static geraDigitosVerificadoresCpf(doc_ident: string) {
    const numbers: Array<number> = doc_ident.split('').map((number) => {
      return parseInt(number, 10)
    })

    const modulus: number = numbers.length + 1
    const multiplied: Array<number> = numbers.map(
      (number, index) => number * (modulus - index)
    )
    const mod: number =
      multiplied.reduce((buffer, number) => buffer + number) % 11

    return mod < 2 ? 0 : 11 - mod
  }
}

export { CpfCnpjHelper }
