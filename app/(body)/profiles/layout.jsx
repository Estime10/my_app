import React from 'react'
import HeaderProfile from '@/components/_layouts/_navbar/HeaderProfile'
import RecoilContextProvider from '@/app/lib/recoil/recoilContextProvider'
import FooterProfiles from '@/components/_layouts/_navbar/FooterProfile'
import { Toaster } from 'sonner'

export default function divLayout({ children }) {
	return (
		<RecoilContextProvider>
			<HeaderProfile />
			<main>{children}</main>
			<Toaster />
			<FooterProfiles />
		</RecoilContextProvider>
	)
}
