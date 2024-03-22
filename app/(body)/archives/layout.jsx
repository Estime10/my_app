import React from 'react'
import RecoilContextProvider from '@/app/lib/recoil/recoilContextProvider'
import { Toaster } from 'sonner'
import HeaderArchives from '@/components/_layouts/HeaderArchives'
import FooterArchives from '@/components/_layouts/FooterArchives'

export default function divLayout({ children }) {
	return (
		<RecoilContextProvider>
			<HeaderArchives />
			<main>{children}</main>
			<Toaster richColors />
			<FooterArchives />
		</RecoilContextProvider>
	)
}
