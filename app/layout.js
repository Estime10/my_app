import Header from '@/components/_layouts/Header'
import './globals.css'
import Footer from '@/components/_layouts/Footer'

export const metadata = {
	title: 'My_App',
	description: 'Generated by My_App',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<div className="bg-gray-50 h-screen overflow-y-scroll">
					<Header />
					{children}
					{/* <Footer /> */}
				</div>
			</body>
		</html>
	)
}
