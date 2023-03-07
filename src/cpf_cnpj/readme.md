# CpfCnpjHelper

## Exemplo uso:

```js
  documento = new CpfCnpjHelper(<number> ou <string>)

  documento.valido() // boolean

  documento.somenteNumero // 63172446263

  documento.formatado // 631.724.462-63

  documento.tipo_documento //'CPF' ou 'CNPJ' ou 'INVALIDO'

  // Comparando objetos - independente de pontuação
  documento.igual('631.724.462-63') // boolean
```

## Funções estáticas:

Retornam instancia do tipo `CpfCnpjHelper`

- Gera CPF válido: `CpfCnpjHelper.geraCpf()`

- Gera CNPJ válido: `CpfCnpjHelper.geraCnpj()`
