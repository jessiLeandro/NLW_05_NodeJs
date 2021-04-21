import express from 'express'

import './database'
import { routes } from './router' 

/**
 * GET = buscas
 * POST = Criação
 * PUT = Alteração
 * DELETE = Deletar
 * PATCH = Alterar uma informação especifica
 */

const app = express()

// app.get('/', (request, response) => {
//   return response.json({
//     message: 'OLÁ NLW 05!'
//   })
// })

// app.post('/', (request, response) => {
//   return response.json({
//     message: 'Usuário salvo com sucesso!'
//   })
// })

app.use(express.json())

app.use(routes)

app.listen(3333, () => console.log('server ir running on port 33333'))
