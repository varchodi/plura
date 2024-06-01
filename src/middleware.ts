import { clerkMiddleware } from "@clerk/nextjs/server";
import { createRouteMatcher } from '@clerk/nextjs/server';

// Define public routes that don't require authentication
const privateRoutes = createRouteMatcher([
  '/', 
]);

//public routes /site /api/uploadthing

export default clerkMiddleware((auth, req) => {
  if(privateRoutes(req)) auth().protect()
});


export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};