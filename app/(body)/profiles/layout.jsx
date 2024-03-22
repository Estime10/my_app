import React from 'react'
import HeaderProfile from '@/components/_layouts/HeaderProfile'
import RecoilContextProvider from '@/app/lib/recoil/recoilContextProvider'
import FooterProfiles from '@/components/_layouts/FooterProfile'

export default function divLayout({ children }) {
	return (
		<RecoilContextProvider>
			<HeaderProfile />
			<main>{children}</main>
			<FooterProfiles />
		</RecoilContextProvider>
	)
}
