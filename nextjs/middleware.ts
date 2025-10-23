import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in",
  "/sign-up",
  "/pricing",
  "/projects", // Add this line to make /projects public temporarily
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    // Use await instead of .then()
    const session = await auth();
    if (!session.userId) {
      return Response.redirect(new URL("/sign-in", request.url));
    }
  }
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next/static|_next/image|favicon.ico|_clerk).*)",
  ],
};
