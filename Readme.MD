### Adonis v6

#### HttpContext

##### Request

###### All request methods

| Operation                      | Description                    | Example                               |
| ------------------------------ | ------------------------------ | ------------------------------------- |
| `request.input('field')`       | Get a single input field       | `request.input('title')`              |
| `request.all()`                | Get all input data (body only) | `const data = request.all()`          |
| `request.only(['a', 'b'])`     | Pick only specific fields      | `request.only(['username', 'email'])` |
| `request.except(['password'])` | Get all except specified       | `request.except(['token'])`           |
| `request.body()`               | Raw body                       | Useful if body has raw JSON           |
| `request.qs()`                 | Get query string as object     | `?search=js` → `request.qs()`         |
| `request.method()`             | Get HTTP method                | `GET`, `POST`, etc.                   |
| `request.headers()`            | Get headers object             | `request.header('authorization')`     |
| `request.hasBody()`            | Check if body exists           | Returns `true`/`false`                |
| `request.validate()`           | Run validator                  | `request.validate(Validator)`         |

###### All response methods

| Operation                    | Description            | Example                                   |
| ---------------------------- | ---------------------- | ----------------------------------------- |
| `response.ok(data)`          | 200 OK                 | `response.ok({ user })`                   |
| `response.created(data)`     | 201 Created            | For new records                           |
| `response.status(204)`       | No content             | For delete/empty                          |
| `response.notFound()`        | 404 response           | `response.notFound({ msg: "Not found" })` |
| `response.unauthorized()`    | 401 Unauthorized       |                                           |
| `response.redirect('/path')` | Redirect to route      |                                           |
| `response.send(data)`        | Custom response        | Raw send                                  |
| `response.json(data)`        | Explicitly send JSON   | Rarely needed if `.ok()` used             |
| `response.abort()`           | Manually abort request | With custom code/message                  |

#### Routing

<params returns an object of the parameter:value pair>

##### Multiple route params

router.get('/posts/:id/comments/:commentId', ({ params }) => {
console.log(params.id)
console.log(params.commentId)
})

##### Optional params

router.get('/posts/:id?/:topic', ({ params }) => {
console.log(params.topic)
console.log(typeof params.id)
})

<id if does not have anything will return an empty string ''>

##### WildCard params

router.get('/posts/\_', ({ params }) => {
console.log(params['*']) =====> [ '34', 'topic', 'Routing' ]
})

<params["*"] will return array of strings>

##### Matchers

.where('<param>',{match:<regex or inbuilt matcher>,
cast: (<param>) => <Datatype>(<param>)})

`It returns the object as same as params`

<where() can be used only one>

##### Inbuilt Matchers

| Matcher        | Description                                                    |
| -------------- | -------------------------------------------------------------- |
| `alpha`        | Matches only alphabets (`a-z`, `A-Z`)                          |
| `alphanumeric` | Matches alphabets and numbers (`a-z`, `A-Z`, `0-9`)            |
| `slug`         | Matches URL slugs (`a-z`, `0-9`, hyphens) like `my-post-title` |
| `uuid`         | Matches UUID version 4 strings                                 |
| `number`       | Matches digits only (`0-9`)                                    |

##### Global Matchers

<matchers can be overriden>

router.where('id', router.matchers.uuid())

```sh
router
.get('/posts/:id', () => {})
// Overridden at route level
.where('id', router.matchers.number())
```

##### Http methods

router.route('/', ['TRACE'], () => {}) ====> custom HTTP methods
router.any('/reports',() => {}) ====> to respond any type of routes

##### Route handler using controller

import ReviewsController from '#controllers/reviews_controller'
import router from '@adonisjs/core/services/router'

router.any('/reviews', [ReviewsController, 'index'])

##### Route middleware

```sh
router
  .get('posts', () => {
    console.log('Inside route handler')

    return 'Viewing all posts'
  })
  .middleware((_, next) => {
    console.log('Inside middleware')
    return next()
  })
```

[using_groups]

```sh
router
  .group(() => {
    router
      .get('posts', () => {
        console.log('From route handler')
      })
      .use((_, next) => {
        console.log('logging from route middleware')
        return next()
      })
  })
  .use((_, next) => {
    console.log('logging from group middleware')
    return next()
  })
```

##### Current request route

```sh
router.get('reviews', ({ route }) => {
  console.log(route)
})
```

<returns>
{
  meta: { params: [] },
  pattern: '/reviews',
  handler: [Function (anonymous)],
  middleware: Middleware {},
  name: undefined,
  execute: [Function: execute]
}

##### Query parameter

```sh
router.get('/posts', ({ request }) => {
  return request.qs().postId
})
```

#### Controllers

.only and .except <refer>

#### Model

##### How to declare a variable datatype inside function declaration

```sh
async findById(id: number) {
    return await Item.find(id)
}
```

##### Listing all methods

###### search

| Operation               | Purpose                                | Example                                                   |
| ----------------------- | -------------------------------------- | --------------------------------------------------------- |
| `Model.all()`           | Get all records                        | `await Review.all()`                                      |
| `Model.find(id)`        | Find by primary key                    | `await Review.find(1)`                                    |
| `Model.findOrFail(id)`  | Like `find()`, but throws if not found | `await Review.findOrFail(1)`                              |
| `Model.query()`         | Start a custom query                   | `await Review.query().where('rating', 5)`                 |
| `Model.query().first()` | Get only one result                    | `await Review.query().where('username', 'viswa').first()` |
| `Model.pick(n)`         | Get `n` records                        | `await Review.query().pick(5)`                            |
| `Model.pickInverse(n)`  | Get last `n` records                   | `await Review.query().pickInverse(3)`                     |

###### create

| Method                  | Return Type      | Notes                              |
| ----------------------- | ---------------- | ---------------------------------- |
| `Model.create(payload)` | `Promise<Model>` | Creates and persists a new model   |
| `new Model()`           | `Model`          | Creates a new instance (not saved) |
| `instance.save()`       | `Promise<void>`  | Persists changes to DB             |

###### update

| Method                                    | Return Type        | Notes                                    |
| ----------------------------------------- | ------------------ | ---------------------------------------- |
| `instance.merge(payload)`                 | `Model`            | Merges payload into instance (not saved) |
| `instance.save()`                         | `Promise<void>`    | Saves merged or changed fields           |
| `Model.updateOrCreate(where, payload)`    | `Promise<Model>`   | Updates existing or creates new          |
| `Model.updateOrCreateMany(key, values[])` | `Promise<Model[]>` | Bulk update or create                    |

###### delete

| Method                              | Return Type       | Notes                                        |
| ----------------------------------- | ----------------- | -------------------------------------------- |
| `instance.delete()`                 | `Promise<void>`   | Deletes one instance                         |
| `Model.query().where(...).delete()` | `Promise<number>` | Deletes many — returns count of deleted rows |

#### Migrations

##### Order of Migrations

```sh
Its important for creating migrations in a specific order since
the creation and deletion tagged
with <[timestamps]> might cause errors if you're altering the migration(table defintion)

For example,
if you're building a relationship,arrange in the way that primary table gets created first
and the foreign table

```

##### How to bind tables in Migrations(relationships)

table.<datatype>(<Foreign_key>)[.<any_other_constraints>].references(<Primary_key>.inTable(<Primary_table>))

##### Column Types

| Type                   | Method         | Example                                        |
| ---------------------- | -------------- | ---------------------------------------------- |
| Auto-increment integer | `increments()` | `table.increments('id')`                       |
| Integer                | `integer()`    | `table.integer('age')`                         |
| Big Integer            | `bigInteger()` | `table.bigInteger('views')`                    |
| String / Varchar       | `string()`     | `table.string('name', 255)`                    |
| Text                   | `text()`       | `table.text('bio')`                            |
| Boolean                | `boolean()`    | `table.boolean('is_active')`                   |
| Float                  | `float()`      | `table.float('price')`                         |
| Decimal                | `decimal()`    | `table.decimal('amount', 8, 2)`                |
| Date                   | `date()`       | `table.date('dob')`                            |
| DateTime               | `dateTime()`   | `table.dateTime('published_at')`               |
| Timestamp              | `timestamp()`  | `table.timestamp('created_at')`                |
| Enum                   | `enum()`       | `table.enum('status', ['draft', 'published'])` |
| JSON                   | `json()`       | `table.json('cart')`                           |

##### Relationships/Constraints Methods

| Operation              | Method        | Example                                                                 |
| ---------------------- | ------------- | ----------------------------------------------------------------------- |
| Foreign Key            | `foreign()`   | `table.integer('user_id').unsigned().references('id').inTable('users')` |
| Nullable               | `nullable()`  | `table.string('bio').nullable()`                                        |
| Not Nullable (default) | -             | `table.string('email')`                                                 |
| Unique                 | `unique()`    | `table.string('email').unique()`                                        |
| Default Value          | `defaultTo()` | `table.boolean('is_active').defaultTo(true)`                            |
| Primary Key            | `primary()`   | `table.primary(['user_id', 'role_id'])`                                 |

#### Validators

##### All rules

###### String

| Rule              | Description            | Example                          |
| ----------------- | ---------------------- | -------------------------------- |
| `minLength(n)`    | Minimum length         | `vine.string().minLength(3)`     |
| `maxLength(n)`    | Maximum length         | `vine.string().maxLength(255)`   |
| `alpha()`         | Only letters (a–zA–Z)  | `vine.string().alpha()`          |
| `alphaNumeric()`  | Only letters & numbers | `vine.string().alphaNumeric()`   |
| `regex(regex)`    | Matches custom pattern | `vine.string().regex(/^[A-Z]/)`  |
| `email()`         | Valid email format     | `vine.string().email()`          |
| `url()`           | Valid URL              | `vine.string().url()`            |
| `uuid()`          | Valid UUID             | `vine.string().uuid()`           |
| `startsWith(str)` | Must start with string | `vine.string().startsWith('A')`  |
| `endsWith(str)`   | Must end with string   | `vine.string().endsWith('.com')` |
| `trim()`          | Trim whitespace        | `vine.string().trim()`           |
| `escape()`        | Escape HTML characters | `vine.string().escape()`         |
| `toLowerCase()`   | Convert to lowercase   | `vine.string().toLowerCase()`    |
| `toUpperCase()`   | Convert to uppercase   | `vine.string().toUpperCase()`    |

###### Number

| Rule              | Description           | Example                      |
| ----------------- | --------------------- | ---------------------------- |
| `min(n)`          | Minimum value         | `vine.number().min(0)`       |
| `max(n)`          | Maximum value         | `vine.number().max(100)`     |
| `range(min, max)` | Must be within range  | `vine.number().range(1, 10)` |
| `positive()`      | Must be > 0           | `vine.number().positive()`   |
| `negative()`      | Must be < 0           | `vine.number().negative()`   |
| `unsigned()`      | Must be ≥ 0           | `vine.number().unsigned()`   |
| `integer()`       | Must be an integer    | `vine.number().integer()`    |
| `decimal()`       | Allow decimal numbers | `vine.number().decimal()`    |

###### Date

| Rule                | Description               | Example                             |
| ------------------- | ------------------------- | ----------------------------------- |
| `before(date)`      | Must be before date       | `vine.date().before('2025-01-01')`  |
| `after(date)`       | Must be after date        | `vine.date().after('2023-01-01')`   |
| `range(start, end)` | Must be within date range | `vine.date().range('2022', '2024')` |

###### Boolean

| Rule        | Description               | Example          |
| ----------- | ------------------------- | ---------------- |
| `boolean()` | Accepts true/false or 1/0 | `vine.boolean()` |

###### Array

| Rule            | Description                 | Example                                  |
| --------------- | --------------------------- | ---------------------------------------- |
| `minLength(n)`  | Minimum number of items     | `vine.array().minLength(2)`              |
| `maxLength(n)`  | Maximum number of items     | `vine.array().maxLength(10)`             |
| `distinct()`    | All items must be unique    | `vine.array().distinct()`                |
| `members(rule)` | Nested rule for array items | `vine.array(vine.string().minLength(3))` |

###### Object

| Rule             | Description                 | Example                          |
| ---------------- | --------------------------- | -------------------------------- |
| `members({...})` | Define shape & nested rules | `vine.object().members({ ... })` |

###### Enum

| Rule          | Description                   | Example                                                   |
| ------------- | ----------------------------- | --------------------------------------------------------- |
| `enum([...])` | Value must be one from a list | `vine.enum(['pending', 'approved', 'rejected'] as const)` |

###### General/Misc Rules

| Rule          | Description                      | Example                     |
| ------------- | -------------------------------- | --------------------------- |
| `optional()`  | Field may be omitted (undefined) | `vine.string().optional()`  |
| `nullable()`  | Field may be `null`              | `vine.string().nullable()`  |
| `asNumber()`  | Transform string to number       | `vine.string().asNumber()`  |
| `asBoolean()` | Transform string to boolean      | `vine.string().asBoolean()` |
| `asDate()`    | Transform to JavaScript Date     | `vine.string().asDate()`    |
