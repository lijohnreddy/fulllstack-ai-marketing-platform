import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in",
  "/sign-up",
  "/pricing",
]);

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about Clerk's Next.js middleware
export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    return auth().then((userAuth) => {
      if (!userAuth.isAuthenticated) {
        return Response.redirect("/sign-in");
      }
    });
  }
});

export const config = {
  matcher: [
    // Exclude files with a contents-hash, `_next` routes, and Clerk's internal routes
    "/((?!.+.[w]+$|_next/static|_next/image|favicon.ico|_clerk).*)",
  ],
};
