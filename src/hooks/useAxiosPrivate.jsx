import { useEffect } from "react";
import { apiPrivate } from "../helpers/axios";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {

    const refresh = useRefreshToken()
    const { auth } = useAuth()

    useEffect(() => {

        

        const requestIntercept = apiPrivate.interceptors.request.use(
            config => {

                if(!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${auth.accessToken}`
                }

                return config
            },
            (err) => {
                Promise.reject(err)
            }
        )

        const responseIntercept = apiPrivate.interceptors.response.use(

            response => response,

            async (err) => {

                console.log(err.status);

                const prevConfig = err?.config

                if (err?.status === 403 && !prevConfig?.sent) {

                    prevConfig.sent = true
                    const newAccessToken = await refresh()
                    prevConfig.headers["Authorization"] = `Bearer ${newAccessToken}`

                    return apiPrivate(prevConfig)
                }

                return Promise.reject(err)
            }
        )

        return () => {
            apiPrivate.interceptors.request.eject(requestIntercept)
            apiPrivate.interceptors.response.eject(responseIntercept)
        }

    }, [auth, refresh])

    return apiPrivate

}

export default useAxiosPrivate