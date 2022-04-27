const ErrorApi = require('../handlers/error-api')

class ProductService {
	async getAll() {
		try {
			const products = [
				{
					id: 100,
					title: 'Ipnone 200',
					price: 12000,
					rest: 10,
				},
				{
					id: 101,
					title: 'Samsung AAZ8',
					price: 22000,
					rest: 5,
				},
				{
					id: 103,
					title: 'Nokia 3310',
					price: 5000,
					rest: 2,
				},
				{
					id: 105,
					title: 'Huawei ZZ',
					price: 15000,
					rest: 8,
				},
			]
			return products
		} catch (error) {
			console.log(error)
		}
	}

	async getOrderHistory() {
		const orders = [
			{
				id: 100,
				title: 'Ipnone 200',
				price: 12000,
				date: '10.05.2020',
			},
			{
				id: 101,
				title: 'Samsung AAZ8',
				price: 22000,
				date: '14.02.2020',
			},
			{
				id: 103,
				title: 'Nokia 3310',
				price: 5000,
				date: '02.12.2021',
			},
			{
				id: 105,
				title: 'Huawei ZZ',
				price: 15000,
				date: '09.07.2019',
			},
		]
		return orders
	}

	async productRating(id) {
		try {
			const raitings = [
				{
					id: 100,
					count: 4,
					average: 2.75,
					your: 5,
					usersRating: {
						'62545b217f482ad56796eb42': 3,
						'624ec82d21f9b88e6f4ed1b0': 5,
					},
				},
				{
					id: 101,
					count: 4,
					average: 2.75,
					your: 5,
					usersRating: {
						'62545b217f482ad56796eb42': 3,
						'624ec82d21f9b88e6f4ed1b0': 5,
					},
				},
			]
			return raitings.filter((i) => i.id == id)[0]
		} catch (error) {
			console.log(error)
		}
	}
}

module.exports = new ProductService()
