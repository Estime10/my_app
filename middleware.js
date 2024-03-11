import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
	// Routes that can be accessed while signed out
	publicRoutes: [
		'/', // The home page
		// ['api/webhooks/clerk'], // Clerk webhooks
	],
	// Routes that can always be accessed, and have
	// no information
	// ignoredRoutes: ['/no-auth-in-this-route'],
})

export const config = {
	// Protects all routes, including api/trpc.
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
