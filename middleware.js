import { withAuth } from "next-auth/middleware";
import { NextResponse } from 'next/server'
import { isUserAuthenticated } from "./app/services/AuthServer";
 

export default withAuth(
  async function middleware(req) {
    // return NextResponse
    let cookie = req.cookies.get('access_token')
    console.log('cookie from middleware', cookie)

    if (cookie === null) {
      const signinUrl = `${new URL('/auth/signin', req.url)}?error=NoCookiesFound`
      return NextResponse.redirect(signinUrl)
    } else {
      let userIsAuthenticated = await isUserAuthenticated(cookie.value)

      console.log('userIsAuthenticated', userIsAuthenticated)
      if (userIsAuthenticated) {
        return NextResponse.next()
      }
    } 

    const signinUrl = `${new URL('/auth/signin', req.url)}?error=UserIsNotAuthenticated`;
    return NextResponse.redirect(signinUrl)    
  },
  {
    callbacks: {
        authorized: ({req, token}) => {
            if (
                req.nextUrl.pathname.startsWith('/protected') &&
                token === null
            ) {
                return false
            }
            
            return true
        }
    },
  }, 
  {
    pages: {
      signIn: '/auth/signin',
      error: '/error',
    }
  }
);
 
export const config = {
    matcher: [
        '/new-trip',
        '/vehicles/:path*',
        '/application/:path*'
    ],
}