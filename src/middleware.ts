
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const publicRoutes = createRouteMatcher(['/site', '/api/uploadthing']);
const privateRoutes = createRouteMatcher(['/agency', '/:domain/', '/:domain/:path']);

export default clerkMiddleware((auth, req) => {
  // if (!publicRoutes(req)) {
  //   const url = new URL(req.url, `http://${req.headers.get("host")}`);
  //   const redirectUrl = url.searchParams.get('redirect_url');

  //   if (!redirectUrl || !redirectUrl.includes('/agency/sign-in')) {
  //     auth().protect();
  //   }
  // }

    const url = req.nextUrl
    const searchParams = url.searchParams.toString()
    let hostname = req.headers

    const pathWithSearchParams = `${url.pathname}${
      searchParams.length > 0 ? `?${searchParams}` : ''
    }`

  //   //if subdomain exists
    const customSubDomain = hostname
      .get('host')
      ?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
      .filter(Boolean)[0]

  //   if (customSubDomain) {
  //     return NextResponse.rewrite(
  //       new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url)
  //     )
  //   }

  // if (privateRoutes(req)) {
  //   auth().protect();
  // }

    if (url.pathname === '/sign-in' || url.pathname === '/sign-up') {
      return NextResponse.redirect(new URL(`/agency/sign-in`, req.url))
    }

    if (
      url.pathname === '/' ||
      (url.pathname === '/site' && url.host === process.env.NEXT_PUBLIC_DOMAIN)
    ) {
      console.log("touched ")
      return NextResponse.rewrite(new URL('/site', req.url))
    }

    if (
      url.pathname.startsWith('/agency') ||
      url.pathname.startsWith('/subaccount')
    ) {
      return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, req.url))
  }

  
  

});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};


// // import { authMiddleware } from "@clerk/nextjs";
// import { clerkMiddleware } from "@clerk/nextjs/server";
// import { createRouteMatcher } from '@clerk/nextjs/server';

// // Define public routes that don't require authentication
// const privateRoutes = createRouteMatcher([
//   '/','/agency','/domain'
// ]);

// const publicPoutes = createRouteMatcher([
//   '/site', '/api/uploadthing'
// ])
// //public routes /site /api/uploadthing

// export default clerkMiddleware((auth, req) => {
//   if (privateRoutes(req)) {
//     auth().protect();
//   }
// });

// export default authMiddleware({
//   publicRoutes: ['/site', '/api/uploadthing','/agency/sign-in'],
// })


// export const config = {
//   matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
// };

// export const config = {
//   matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
// }