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
import { middleware } from './kernel.js'

router
  .group(() => {
    router.get('/', [Market, 'showAll'])
    router.post('/', [Market, 'store']).use(middleware.admin())
    router.put('/', [Market, 'fullUpdate']).use(middleware.admin())
    router.patch('/', [Market, 'partialUpdate']).use(middleware.admin())
    router.delete('/', [Market, 'destroy']).use(middleware.admin())
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
    router.post('/', [User, 'store']).use(middleware.admin())
    router.get('/', [User, 'showAll'])
    router.put('/', [User, 'fullUpdate']).use(middleware.admin())
    router.patch('/', [User, 'partialUpdate']).use(middleware.admin())
    router.delete('/', [User, 'destroy']).use(middleware.admin())
  })
  .prefix('Users')

router
  .group(() => {
    router.post('/', [buyer, 'store']).use(middleware.admin())
    router.get('/', [buyer, 'showAll'])
    router.put('/', [buyer, 'fullUpdate']).use(middleware.admin())
    router.patch('/', [buyer, 'partialUpdate']).use(middleware.admin())
    router.delete('/', [buyer, 'destroy']).use(middleware.admin())
  })
  .prefix('Buyer')
