import { useAlert } from "@tdtarbo/react-alert";
import api from "../helpers/axios";
import useAuth from "./useAuth";

const useLogout = () => {

    const { setAuth } = useAuth()
    const { alert, sendAlert } = useAlert()

    const logout = async () => {

        setAuth({})

        try {
            
            await api.get("/api/auth/logout", {
                withCredentials: true
            })
            sendAlert({
                type: alert.success,
                title: "Logout Successfully!"
            })

        } catch (error) {

            console.error(error);
            sendAlert({
                type: alert.error,
                title: "Logout Failed!"
            })
        }
    }
    return logout
}

export default useLogout