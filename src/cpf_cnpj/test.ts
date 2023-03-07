import { CpfCnpjHelper } from '.'

console.log(CpfCnpjHelper.geraCpf().formatado)

console.log(CpfCnpjHelper.geraCnpj().formatado)

const a = new CpfCnpjHelper('091.016.557-28')
