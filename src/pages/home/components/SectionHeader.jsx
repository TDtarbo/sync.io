import { getTimeOfDay, getCurrentTime } from "../../../helpers/time_manager"
import useAuth from "../../../hooks/useAuth"
import { IoRefreshCircle } from "react-icons/io5";

const SectionHeader = (props) => {

    const { auth } = useAuth()
    const {firstName} = auth.user
    const timeOfTheDay = getTimeOfDay()
    const currentTime = getCurrentTime()

    return (
        <div className="absolute top-0 max-xl:px-4 left-0 z-10 w-full min-h-20 box-border overflow-hidden shadow-lg py-5 px-14 bg-white">
            <h2 className="text-gray-600 mb-3">{`Good ${timeOfTheDay} ${firstName},`}</h2>
            <div className="text-gray-600 text-2xl font-bold">
                Summery 
                <span className="text-sm float-right flex items-center gap-5">
                    <p>{`updated @ ${currentTime}`}</p>
                    <button onClick={props.refresh} className="group"><IoRefreshCircle className="size-7 text-indigo-500 transition-all duration-300 ease-in-out group-hover:text-indigo-700 group-hover:rotate-90"/></button>
                </span>
            </div>
        </div>
    )
}


export default SectionHeader