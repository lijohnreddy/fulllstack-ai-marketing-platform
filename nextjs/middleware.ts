import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in",
  "/sign-up",
  "/pricing",
  "/projects",
  "/templates",
  "/settings",
  "/api/upload",
  "/(.*)", // This makes ALL routes public as a catch-all
]);

export default clerkMiddleware((auth, request) => {
  // All routes are public, so no authentication checks needed
  // Just allow all requests to proceed
  return;
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next/static|_next/image|favicon.ico|_clerk).*)",
  ],
};
