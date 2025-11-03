import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in",
  "/sign-up",
  "/pricing",
  "/api/upload",
]);

const isSecureRoutes = createRouteMatcher([
  "/api/asset-processing-job",
  "/api/asset",
]);

const SERVER_API_KEY = process.env.SERVER_API_KEY;

if (!SERVER_API_KEY) {
  throw new Error("SERVER_API_KEY is not set in the environment variables");
}

export default clerkMiddleware((auth, request) => {
  if (isSecureRoutes(request)) {
    return checkServiceWorkerAuth(request);
  }
  if (!isPublicRoute(request)) {
    auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next/static|_next/image|favicon.ico|_clerk).*)",
  ],
};

function checkServiceWorkerAuth(request: Request) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new NextResponse(
      JSON.stringify({ error: "Missing or invalid Authorization header" }),
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];
  if (token !== SERVER_API_KEY) {
    return new NextResponse(JSON.stringify({ error: "Invalid API key" }), {
      status: 403,
    });
  }

  return NextResponse.next();
}
