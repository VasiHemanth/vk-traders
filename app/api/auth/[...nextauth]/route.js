
import { cookies } from 'next/headers'

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

import { jwtDecode } from "jwt-decode";
import EnvAPI from '@/lib/EnvAPI';

// const getCurrentEpochTime = () => {
//   return Math.floor(new Date().getTime() / 1000);
// };

const url = EnvAPI()

export const authOptions = NextAuth({
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
        //   credentials: {
        //     username: { label: "Username", type: "text", placeholder: "jsmith" },
        //     password: { label: "Password", type: "password" }
        //   },
          async authorize(credentials, req) {
            // Add logic here to look up the user from the credentials supplied

            console.log("credentials", credentials)


            const CheckLogin = await fetch(`${url}/api/token/`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    username: credentials && credentials.username,
                    password: credentials && credentials.password
                })
            })

            const user = await CheckLogin.json()

            console.log("user after api call", user)
      
            if (user) {
              // Any object returned will be saved in `user` property of the JWT
              let userDetials = jwtDecode(user.access)
              cookies().set('username', userDetials.username)
              cookies().set('access_token', user.access)
              cookies().set('refresh_token', user.refresh)
              // console.log('user details', userDetials)
              userDetials['access'] = user.access
              userDetials['refresh'] = user.refresh
              return userDetials
            } else {
              // If you return null then an error will be displayed advising the user to check their details.
              
              throw new Error("Invalid Credentials")
  
              // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
          }
        })
    ],

    pages: {
      "signIn": "/auth/signin",
    },
    callbacks: {
      async jwt({token, user}){
        if(user != undefined) {
          token['name'] = user.username
          token['email'] = user.email
          token['superuser'] = user.is_superuser
          token['exp'] = user.exp
          token['iat'] = user.iat
          token['jti'] = user.jti
          token['access'] = user.access
          token['refresh'] = user.refresh
        } else if (user === undefined) {
          const getUserDetails = jwtDecode(token['access'])
          token['exp'] = getUserDetails.exp
          token['iat'] = getUserDetails.iat
          token['jti'] = getUserDetails.jti
        }

        if( token['exp'] * 1000 - Date.now() <= 2 * 60 * 1000) {
          console.log('fetching new access token')
          const getRefreshToken = await fetch(`${url}/api/token/refresh/`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
              refresh: token['refresh'],
            })
          })
         
          const updatedTokens = await getRefreshToken.json()
          const tokenDetails = jwtDecode(updatedTokens.access)

          cookies().set('access_token', updatedTokens.access)
          cookies().set('refresh_token', updatedTokens.refresh)

          token['exp'] = tokenDetails.exp
          token['iat'] = tokenDetails.iat
          token['jti'] = tokenDetails.jti
          token['access'] = updatedTokens.access
          token['refresh'] = updatedTokens.refresh
      
          
          if(getRefreshToken.ok) { 
            console.log('Got new access token!')
          } else { 
            throw new Error('Failed fetching new access token')
          }
        }

        return token
      },
      async session({session, token, user}) {
    
        session.user['access_token'] = token.access
        session.user['is_superuser'] = token.superuser
        let expire_date = new Date(token.exp * 1000)
        session.expires = expire_date.toLocaleString();
        return session;
      },
    } 
})

export { authOptions as GET, authOptions as POST } 