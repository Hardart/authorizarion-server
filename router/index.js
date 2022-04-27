const Router = require('express').Router
const router = new Router()
const authCheck = require('../middlware/auth-middleware')
const raitingCheck = require('../middlware/raiting-middleware')
const userController = require('../controllers/user-controller')
const productsController = require('../controllers/products-controller')
const { body } = require('express-validator')

router.post('/registration', 
	body('email').isEmail(), 
	body('password').isLength({ min: 3, max: 32 }), 
	userController.registration
)

router.post('/login',
	body('email').isEmail(), 
	body('password').isLength({ min: 3, max: 32 }),  
	userController.login
)
router.delete('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.get('/users', authCheck, userController.getUsers)
router.get('/check', authCheck, userController.check)
router.get('/products', productsController.getProducts)
router.get('/orders', authCheck, productsController.getOrders)
router.get('/rating', raitingCheck, productsController.getProductRating)

module.exports = router
