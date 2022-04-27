const { Schema, model } = require('mongoose')

const UserSchema = Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	name: String,
	role: { type: Array, default: ['user'], required: true },
})

module.exports = model('User', UserSchema)
