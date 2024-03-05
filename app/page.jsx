import Link from 'next/link'
import React from 'react'
export default function Home() {
	return (
		<main className="flex gap-10 justify-center pt-10">
			<Link href="/">home</Link>
			<Link href="/sign-up">SignUp</Link>
			<Link href="/sign-in">SignIn</Link>
		</main>
	)
}
