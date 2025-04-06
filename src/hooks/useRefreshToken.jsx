import useAuth from "./useAuth"
import api from "../helpers/axios"

const useRefreshToken = () => {

    const { setAuth } = useAuth()

    const refresh = async () => {

        const response = await api.get("/api/auth/refresh-token",
            {withCredentials: true}
        )

        setAuth(p => {
            return {
                accessToken: response.data.newAccessToken, 
                user: {
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    profilePicture: response.data.profilePicture
                }
            }
        })
    
        return response.data.newAccessToken
    
    }

    return refresh
}

export default useRefreshToken