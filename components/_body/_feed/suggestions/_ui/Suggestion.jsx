import Image from 'next/image'

const Suggestion = ({ image, username, fullName }) => {
	return (
		<div className="flex items-center mt-3">
			<Image
				className="rounded-full border p-[2px] w-10 h-10"
				src={image}
				alt="profile pic"
				width={40}
				height={40}
			/>
			<div className="flex-1 mx-4">
				<h2 className="font-semibold">{username}</h2>
				<h3 className="text-xs text-gray-600">{fullName}</h3>
			</div>
			<div className="mt-4 lg:mt-0">
				<button className="text-gray-400 font-semibold text-sm uppercase border border-gray-400 p-[2.5px] rounded-md ">
					follow
				</button>
			</div>
		</div>
	)
}

export default Suggestion
