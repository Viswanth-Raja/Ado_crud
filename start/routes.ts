/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import Market from '../app/controllers/product_controller.js'
import User from '../app/controllers/users_controller.js'
import buyer from '../app/controllers/customers_controller.js'
// import { middleware } from './kernel.js'

router
  .group(() => {
    router.get('/', [Market, 'showAll'])
    router.post('/', [Market, 'store'])
    router.put('/', [Market, 'fullUpdate'])
    router.patch('/', [Market, 'partialUpdate'])
    router.delete('/', [Market, 'destroy'])
  })
  .prefix('/products')

router
  .group(() => {
    router.post('/Users', [buyer, 'sell'])
    router.delete('/Users', [User, 'buy_product'])
  })
  .prefix('products')

router
  .group(() => {
    router.post('/', [User, 'store'])
    router.get('/', [User, 'showAll'])
    router.put('/', [User, 'fullUpdate'])
    router.patch('/', [User, 'partialUpdate'])
    router.delete('/', [User, 'destroy'])
  })
  .prefix('Users')

router
  .group(() => {
    router.post('/', [buyer, 'store'])
    router.get('/', [buyer, 'showAll'])
    router.put('/', [buyer, 'fullUpdate'])
    router.patch('/', [buyer, 'partialUpdate'])
    router.delete('/', [buyer, 'destroy'])
  })
  .prefix('Buyer')
