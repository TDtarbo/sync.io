import { useEffect, useState } from "react"
import useRefreshToken from "../../hooks/useRefreshToken"
import useAuth from "../../hooks/useAuth"
import PageLoading from "../../pages/loading/PageLoading"
import { Outlet } from "react-router-dom"
import { useAlert } from "@tdtarbo/react-alert"

const PersistLogin = () => {

    const { alert, sendAlert } = useAlert()
    const [isLoading, setIsLoading] = useState(true)
    
    const { auth } = useAuth()
    const refresh = useRefreshToken()


    useEffect(() => {

        const verifyRefreshToken = async () => {

            try {
                
                await refresh()

            } catch (error) {
                
                console.error(error.code);

                if(error.code == "ERR_BAD_REQUEST"){

                    sendAlert({
                        type: alert.error,
                        title: "Your session is expired!, Please login to continue"
                    })
                    return
                }

                sendAlert({
                    type: alert.error,
                    title: "Unexpected error occurred!, Please login to continue"
                })

            } finally {
                setIsLoading(false)
            }
        }

        !auth.accessToken ? verifyRefreshToken() : setIsLoading(false)

    }, [])

    return (
        <>
            {isLoading ? <PageLoading /> : <Outlet/>}
        </>
    )
}

export default PersistLogin