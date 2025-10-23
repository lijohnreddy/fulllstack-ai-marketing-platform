import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in",
  "/sign-up",
  "/pricing",
  "/projects", // Add this to make projects public for testing
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    // Use await to get the session
    const session = await auth();

    if (!session.userId) {
      // Redirect to sign-in if not authenticated
      return Response.redirect(new URL("/sign-in", request.url));
    }

    // User is authenticated, allow access
    return;
  }

  // Public route, allow access
  return;
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next/static|_next/image|favicon.ico|_clerk).*)",
  ],
};
