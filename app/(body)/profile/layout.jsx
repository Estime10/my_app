import React from 'react'
import HeaderProfile from '@/components/_layouts/HeaderProfile'
import Footer from '@/components/_layouts/Footer'
import RecoilContextProvider from '@/app/lib/recoil/recoilContextProvider'

export default function divLayout({ children }) {
	return (
		<RecoilContextProvider>
			<HeaderProfile />
			<main>{children}</main>
			<Footer />
		</RecoilContextProvider>
	)
}
