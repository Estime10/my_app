import React from 'react'
import Image from 'next/image'

const MiniProfile = () => {
	return (
		<div className="flex items-center justify-between mt-14 ml-10 ">
			<Image
				className="rounded-full border p-[2px] w-16 h-16"
				src="https://randomuser.me/api/portraits/women/72.jpg"
				alt="profile pic"
				width={40}
				height={40}
			/>
			<div className="flex-1 mx-4">
				<h2 className="font-bold">Username</h2>
				<h3 className="text-xs text-gray-600">name</h3>
			</div>
			<button className="text-gray-400 text-sm font-semibold capitalize">
				settings
			</button>
		</div>
	)
}

export default MiniProfile
