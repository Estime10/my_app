import { SignIn } from '@clerk/nextjs'

export default function Page() {
	return (
		<div className="flex items-center justify-center flex-col gap-10 lg:pt-44 py-28">
			<SignIn afterSignInUrl="/gdpr" />
		</div>
	)
}
