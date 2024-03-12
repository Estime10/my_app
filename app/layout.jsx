import React from 'react'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import RecoilContextProvider from './lib/recoil/recoilContextProvider'

export const metadata = {
	title: 'My_App',
	description: 'Generated by My_App',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<title>{metadata.title}</title>
			<meta name="description" content={metadata.description} />
			<ClerkProvider>
				<body>
					<RecoilContextProvider>
						<main>{children}</main>
					</RecoilContextProvider>
				</body>
			</ClerkProvider>
		</html>
	)
}
