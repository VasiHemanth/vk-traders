import EnvAPI from "@/lib/EnvAPI";
import {cookies} from "next/headers";

const url = EnvAPI()

export async function isUserAuthenticated(accessToken){
   
    const data = await fetch(`${url}/api/token/verify/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }, body: JSON.stringify({
                token: accessToken,
              })
        })

    return data.ok === true;
}