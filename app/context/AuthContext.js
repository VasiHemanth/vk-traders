'use client'

import React, {createContext, useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';

import { useToast } from "@/app/components/ui/use-toast";
import {jwtDecode} from 'jwt-decode'
import Cookies from 'universal-cookie';
import EnvAPI from '../../lib/EnvAPI';

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children}) => {
    const [authAccess, setAuthAccess] = useState(
        ()=> typeof window !== 'undefined' && localStorage.getItem('access')? localStorage.getItem('access') : null
    )
    const [authRefresh, setAuthRefresh] = useState(
        ()=> typeof window !== 'undefined' && localStorage.getItem('refresh')? localStorage.getItem('refresh') : null
    )
    const [user, setUser] = useState(
        ()=> typeof window !== 'undefined' && localStorage.getItem('user_details') ? localStorage.getItem('user_details') : null
    );
    const [loading, setLoading] = useState(true)

    const [authLoading, setAuthLoading] = useState(false)
    
    const router = useRouter()
    const { toast } = useToast()
    const url = EnvAPI()
    const cookies = new Cookies(null, { path: '/' });

    const loginUser = async(username, password) => {
        try {
            const response = await fetch(`${url}/api/token/`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({'username': username, 'password': password})
            })
    
            const data = await response.json()
            // console.log('data', data)

            if(response.status === 200) {
                toast({
                    description: "Logged in successfully!",
                });
                cookies.set('django-auth-refresh', data.refresh)
                cookies.set('django-auth-access', data.access)
                cookies.set('auth-loading',false)
                // console.log("access data", data, typeof data)
                localStorage.setItem('access', data.access)
                localStorage.setItem('refresh', data.refresh)
                localStorage.setItem('user_details', JSON.stringify(jwtDecode(data.access)))
                setAuthAccess(data.access)
                setAuthRefresh(data.refresh)
                setUser(jwtDecode(data.access))
                router.push('/vehicles')
                return true
            } else {
                toast({
                    variant: "destructive",
                    title: "Sign In failed",
                    description: 'Invalid username or password',
                    // action: <ToastAction altText="Try again">Try again</ToastAction>,
                });
                return false
            }
        } 
        catch(e){  
            toast({
                description: 'Something went wrong!',
            })  
        }
    }

    const logOutUser = async() => {
        router.push('/auth/signin')
        try {
            await fetch(`${url}/api/logout?refresh-token=${authRefresh}`)
        } catch(e) {
            toast({
                description: 'Something went wrong!',
            })  
        }
        cookies.remove('django-auth-refresh', {path: '/'})
        cookies.remove('django-auth-access', {path: '/'})
        cookies.remove('auth-loading', {path: '/'})
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        setAuthAccess(null)
        setAuthRefresh(null)       
        setUser(null)
    }

    const updateToken = async() => {
        try {
            setAuthLoading(true)
            cookies.set('auth-loading', true)
            const response = await fetch(`${url}/api/token/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({'refresh': authRefresh})
            })
            const data = await response.json()
            console.log("Update token Response", response.status)
            if(response.status === 200) {
                console.log('Reloading page checking this function is working or not')
                cookies.set('django-auth-refresh', data.refresh)
                cookies.set('django-auth-access', data.access)
                cookies.set('auth-loading', false)
                console.log('new access token updated')
                localStorage.setItem('access', data.access)
                localStorage.setItem('refresh', data.refresh)
                localStorage.setItem('user_details', JSON.stringify(jwtDecode(data.access)))
                setAuthAccess(data.access)
                setAuthRefresh(data.refresh)
                setUser(jwtDecode(data.access))
                setAuthLoading(false)
            } else {
                logOutUser()
                setAuthLoading(false)
            }
    
            if(loading) {
                setLoading(false)
            }
        } catch(e) {
           console.log('Something went wrong')
        }
    }

    const contextData = {
        loginUser: loginUser,
        logOutUser: logOutUser,
        user: user,
        AuthTokens: {
            access : authAccess,
            refresh: authRefresh
        },
        loading: authLoading,
    }

    useEffect(()=> {
        if(loading){
            updateToken()
        }

        // 1s = 1000ms | 1m = 60s | 1h = 60m  
        // let fourHoursFiftyEightMinutes = 4 * 60 * 60 * 1000 + 1000 * 60 * 58 
        let fourHoursFiftyEightMinutes = 3 * 60 * 1000 


        let interval =  setInterval(()=> {
            if(authAccess && authRefresh){
                updateToken()
            } else {
                console.log("No Auth tokens")
                console.log("Auth tokens in else", )
            }
        }, fourHoursFiftyEightMinutes)
        return ()=> clearInterval(interval)
    }, [authAccess, authRefresh, loading])

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
} 