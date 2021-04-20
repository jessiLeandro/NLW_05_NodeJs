import express from 'express'

/**
 * GET = buscas
 * POST = Criação
 * PUT = Alteração
 * DELETE = Deletar
 * PATCH = Alterar uma informação especifica
 */

const app = express()

app.get('/', (request, response) => {
  return response.json({
    message: 'OLÁ NLW 05!'
  })
})

app.post('/', (request, response) => {
  return response.json({
    message: 'Usuário salvo com sucesso!'
  })
})

app.listen(3333, () => console.log('server ir running on port 33333'))
