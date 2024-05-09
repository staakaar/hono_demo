import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

/** return json */
app.get('/user/:id', (c) => {
  return c.json({
    status: 200,
    message: 'Hello Hono!',
  })
})

/** query parameter */
app.get('/posts/:id', (c) => {
  const page = c.req.query('page')
  const id = c.req.param('id')
  c.header('X-Message', 'Hi!')
  return c.text(`You want see ${page} of ${id}`)
})

export default app
