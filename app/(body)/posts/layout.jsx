import React from 'react'
import RecoilContextProvider from '@/app/lib/recoil/recoilContextProvider'
import HeaderSettings from '@/components/_layouts/_navbar/HedearSettings'
import FooterArchives from '@/components/_layouts/_navbar/FooterArchives'

export default function divLayout({ children }) {
	return (
		<RecoilContextProvider>
			<HeaderSettings />
			<div>{children}</div>
			<FooterArchives />
		</RecoilContextProvider>
	)
}
