import React from 'react'

const Loading = () => {
	return (
		<div className="bg-gray-200 my-7 border rounded-xl animate-pulse">
			<div className="flex items-center p-5">
				<div className="rounded-full bg-gray-300 mr-3 w-12 h-12"></div>
				<div className="flex-1 bg-gray-300 h-4"></div>
				<div className="h-5 w-5 bg-gray-300"></div>
			</div>
			<div className="object-cover w-full h-96 bg-gray-300"></div>
			<div className="flex justify-between items-center px-4 pt-4">
				<div className="flex items-center">
					<div className="bg-gray-300 h-5 w-5 mr-3"></div>
					<div className="px-3 py-2">
						<div className="bg-gray-300 h-4 w-10"></div>
					</div>
				</div>
				<div className="flex space-x-4">
					<div className="bg-gray-300 h-5 w-5"></div>
					<div className="bg-gray-300 h-5 w-5"></div>
				</div>
			</div>
			<div className="px-3 py-2 flex-nowrap">
				<div className="font-bold mr-1 bg-gray-300 h-4 w-16"></div>
				<div className="bg-gray-300 h-8 w-full overflow-hidden"></div>
			</div>
			<div className="ml-3 h-20">
				<div className="flex items-center space-x-2 py-1">
					<div className="h-5 w-5 rounded-full bg-gray-300"></div>
					<div className="text-sm flex-1">
						<div className="font-bold capitalize mr-2 bg-gray-300 h-4 w-16"></div>
					</div>
					<div className="pr-5 text-xs bg-gray-300 h-4 w-16"></div>
				</div>
			</div>
			<div className="border-t-gray-200 border-t flex items-center py-2 ">
				<div className="border-none flex-1 bg-gray-300 h-6 mr-1 "></div>
				<div className="font-semibold text-gray-400 px-4 bg-gray-300 h-6"></div>
			</div>
		</div>
	)
}

export default Loading
