import React from 'react'
import Header from '@/components/_layouts/Header'
import Footer from '@/components/_layouts/Footer'

export default function divLayout({ children }) {
	return (
		<>
			<div>
				<Header />
				<main>{children}</main>
				<Footer />
			</div>
		</>
	)
}
