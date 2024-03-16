import { SignUp } from '@clerk/nextjs'

export default function Page() {
	return (
		<div className="flex items-center justify-center flex-col gap-10 py-5 lg:py-12">
			<SignUp mode="modal" afterSignUpUrl="/gdpr" />
		</div>
	)
}
