import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
	clerckId: {
		type: String,
		required: true,
		unique: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	userName: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	profilePhoto: {
		type: String,
		required: true,
	},
	posts: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
		default: [],
	},
	captions: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Caption' }],
		default: [],
	},
	savedPosts: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
		default: [],
	},
	likedPosts: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
		default: [],
	},
	comments: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
		default: [],
	},
	likedComments: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
		default: [],
	},
	stories: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }],
		default: [],
	},

	followers: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		default: [],
	},
	following: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

		default: [],
	},

	notifications: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }],
		default: [],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)

export default User
