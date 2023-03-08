import { CpfCnpjHelper } from './cpf_cnpj'

/** Retorna somente os numeros de uma string. */
function somenteNumeros(stringNum: string) {
  if (typeof stringNum === 'string') return stringNum.replace(/[^\d]+/g, '')
  return stringNum
}
/** Retorna telefone somente números. Se tiver 55 no inicio, remove. */
function formataTelefone(telefone: string) {
  if (typeof telefone !== 'string') return telefone
  const telNumeros = somenteNumeros(telefone)
  return telNumeros.substring(0, 2) === '55'
    ? telNumeros.substring(2)
    : telNumeros
}
/** Formata data para DD/MM/YYYY
 * @data precisa ser string YYYY-MM-DD ou Date
 */
function formataDataPtBR(
  data: Date | string | null | undefined,
  separador: string = '/'
) {
  if (!data) return data

  if (typeof data === 'string') {
    data = new Date(data)
    if (isNaN(+data))
      throw new Error(
        'Data inválida. Precisa ser enviada no formato YYYY-MM-DD'
      )
  }
  if (data instanceof Date) {
    data = data.toISOString().split('T')[0]!
  }

  const arrData = data.split('-')
  return arrData[2] + separador + arrData[1] + separador + arrData[0]
}

function removeExtensaoArquivo(nomeArquivo: string) {
  if (typeof nomeArquivo !== 'string')
    throw new Error('O parametro precisa ser string')
  return nomeArquivo.replace(/\.[^\/.]+$/, '')
}

/** Converte entrada do .env para tipo nativo JS */
function converteTipoDotEnv(valor: string | undefined) {
  if (!valor) return valor
  if (valor?.toLowerCase() === 'true') return true
  if (valor?.toLowerCase() === 'false') return false
  if (valor?.toLowerCase() === 'null') return null
  if (valor?.toLowerCase() === '') return ''
  if (!isNaN(Number(valor))) return Number(valor)
  return valor
}
export {
  somenteNumeros,
  formataTelefone,
  formataDataPtBR,
  removeExtensaoArquivo,
  converteTipoDotEnv,
  CpfCnpjHelper,
}
