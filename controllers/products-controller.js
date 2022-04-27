const productsService = require('../service/products-service')
const ErrorApi = require('../handlers/error-api')

class ProductsController {
	async getProducts(req, res, next) {
		try {
			const products = await productsService.getAll()
			res.status(200).json(products)
		} catch (error) {
			next(error)
		}
	}

	async getOrders(req, res, next) {
		try {
			const orders = await productsService.getOrderHistory()
			res.status(200).json(orders)
		} catch (error) {
			next(error)
		}
	}

	async getProductRating(req, res, next) {
		try {
			const { id } = req.body // product Id
			const { count, average, usersRating } = await productsService.productRating(id)
			const your = req.user ? usersRating[req.user.id] : null
			return res.status(200).json({ count, average, your })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new ProductsController()
