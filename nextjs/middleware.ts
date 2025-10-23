import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in",
  "/sign-up",
  "/pricing",
  "/projects", // Keep this public for now to test
]);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    // Let Clerk handle authentication and redirection automatically
    auth().protect();
  }
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next/static|_next/image|favicon.ico|_clerk).*)",
  ],
};
