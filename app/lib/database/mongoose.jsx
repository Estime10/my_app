import mongoose, { Mongoose } from 'mongoose'

const MONGODB_URL = process.env.MONGODB_URL

let cached = global.mongoose

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null }
}

export const connectToDatabase = async () => {
	if (cached.conn) return cached.conn

	if (!MONGODB_URL)
		throw new Error(
			'Please define the MONGODB_URL environment variable inside .env.local'
		)

	cached.promise =
		cached.promise ||
		mongoose.connect(MONGODB_URL, { dbName: 'My_app', bufferCommands: false })

	cached.conn = await cached.promise
	return cached.conn
}
