import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'

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

/** param or query parameter */
app.get('/posts/:id', (c) => {
  const page = c.req.query('page')
  const id = c.req.param('id')
  c.header('X-Message', 'Hi!')
  return c.text(`You want see ${page} of ${id}`)
})

/** queries */
app.get('/search/users', (c) => {
  const tags = c.req.queries('tags')
  return c.text('queries')
})

/** requestBody single or multiple */
app.post('/entry', async (c) => {
  const body = await c.req.parseBody()
  /** single */
  body['hoge']
  /** multiple */
  body['hoge[]']
})

/** arrayBuffer */
app.post('/entry', async (c) => {
  const body = await c.req.arrayBuffer()
  return c.text('arrayBuffers')
})

app.post('/posts', (c) => {
  const { title, body } = c.req.valid('form')
  const pathname = c.req.path
  const url = c.req.url
  const method = c.req.method
  const metadata = c.req.raw.cf?.hostMetadata?
  return c.text('posts')
})

/** Exception */
app.post('/auth', async (c, next) => {
  const authorized = false
  if (authorized === false) {
    throw new HTTPException(401, { message: 'Custom error message' })
  }
  await next()
})

const errorResponse = new Response('Unauthorized', {
  status: 401,
  headers: {
    Authenticate: 'error="invalud_token"',
  },
})
throw new HTTPException(401, { res: errorResponse })

/** return html content */
const TopPage = () => {
  return (
    <html>
      <body>
        <h1>Hello Hono</h1>
      </body>
    </html>
  )
}

app.get('/page', (c) => {
  return c.html(<TopPage />)
})

/** exception handler */
app.notFound((c) => {
  return c.text('Custom 404 Message', 404)
})

app.onError((err, c) => {
  return c.text('Custom Error Message', 500)
})

export default {
  port: 3000,
  fetch: app.fetch,
}
