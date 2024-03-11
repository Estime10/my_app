import { Schema, model, models } from 'mongoose'

const ImageSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	transofmationType: {
		type: String,
		required: true,
	},
	publicId: {
		type: String,
		required: true,
	},
	secureUrl: {
		type: String,
		required: true,
	},
	width: {
		type: Number,
	},
	height: {
		type: Number,
	},
	config: {
		type: Object,
	},
	transormationUrl: {
		type: URL,
	},
	aspectRatio: {
		type: String,
	},
	alt: {
		type: String,
		required: true,
	},
	prompt: {
		type: String,
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	description: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
})

const Image = models?.Image || model('Image', ImageSchema)

export default Image
