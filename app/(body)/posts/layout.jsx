import React from 'react'
import RecoilContextProvider from '@/app/lib/recoil/recoilContextProvider'
import HeaderSettings from '@/components/_layouts/HedearSettings'
import FooterArchives from '@/components/_layouts/FooterArchives'

export default function divLayout({ children }) {
	return (
		<RecoilContextProvider>
			<HeaderSettings />
			<div>{children}</div>
			<FooterArchives />
		</RecoilContextProvider>
	)
}
