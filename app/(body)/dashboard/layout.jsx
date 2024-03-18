import React from 'react'
import Header from '@/components/_layouts/Header'
import Footer from '@/components/_layouts/Footer'
import RecoilContextProvider from '@/app/lib/recoil/recoilContextProvider'

export default function divLayout({ children }) {
	return (
		<RecoilContextProvider>
			<Header />
			<main>{children}</main>
			<Footer />
		</RecoilContextProvider>
	)
}
