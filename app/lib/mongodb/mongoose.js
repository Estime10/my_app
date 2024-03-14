import mongoose from 'mongoose'

let isConnected = false

export const connectToDatabase = async () => {
	mongoose.set('strictQuery', true)
	if (isConnected) {
		console.log('using existing database connection')
		return
	}

	try {
		await mongoose.connect(process.env.MONGODB_URL, {
			dbName: process.env.MONGODB_DB,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})

		isConnected = true

		console.log('new database connection')
	} catch (error) {
		console.error('error connecting to database')
		console.error(error)
	}
}
