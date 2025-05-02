import { getTimeOfDay, getCurrentTime } from "/src/helpers/time_manager"
import useAuth from "/src/hooks/useAuth"
import { IoRefreshCircle } from "react-icons/io5";

const ProjectHeader = () => {
    
    
    const { auth } = useAuth()
    const {firstName} = auth.user
    const timeOfTheDay = getTimeOfDay()
    const currentTime = getCurrentTime()

    return (
        <div className="max-xl:px-4 left-0 z-10 w-full min-h-20 box-border overflow-hidden shadow-lg py-5 px-14 bg-white">
            <div className="text-gray-600 text-2xl font-bold">
                My Projects
            </div>
        </div>
    )
    
}

export default ProjectHeader