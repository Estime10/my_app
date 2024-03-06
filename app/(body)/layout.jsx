import React from 'react'
import Header from '@/components/_layouts/Header'
import Footer from '@/components/_layouts/Footer'
import RecoilContextProvider from '../lib/recoilContextProvider'

export default function bodyLayout({ children }) {
	return (
		<RecoilContextProvider>
			<Header />
			{children}
			<Footer />
		</RecoilContextProvider>
	)
}
