import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
	// Routes that can be accessed while signed out
	publicRoutes: [
		'/',
		'/sign-in',
		'/sign-up',
		'/forgot-password',
		'/reset-password',
		,
	],
	// Routes that can always be accessed, and have
	// no information
	// ignoredRoutes: ['/no-auth-in-this-route'],
})

export const config = {
	// Protects all routes, including api/trpc.
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
