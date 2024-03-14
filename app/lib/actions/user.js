import User from '@/app/lib/models/User'
import { connectToDatabase } from '../mongodb/mongoose'

export const createOrUpdateUser = async (
	id,
	first_name,
	last_name,
	image_url,
	email_addresses,
	username
) => {
	try {
		await connectToDatabase()
		const user = await User.findOneAndUpdate(
			{ clerkId: id },
			{
				$set: {
					firstname: first_name,
					lastName: last_name,
					profilePhoto: image_url,
					email: email_addresses[0].email_adress,
					userName: username,
				},
			},
			{ upset: true, new: true } // if user does not exist, create a new one
		)
		await user.save()
	} catch (error) {
		console.error(error)
	}
}

export const deleteUser = async (id) => {
	try {
		await connectToDatabase()
		await User.findOneAndDelete({ clerkId: id })
	} catch (error) {
		console.error(error)
	}
}
