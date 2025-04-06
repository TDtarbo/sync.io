import { useEffect, useState, useRef } from "react"
import { useAlert } from "@tdtarbo/react-alert";
import { IoIosAlbums, IoIosArrowUp } from "react-icons/io";
import { FaDiagramProject } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import { MdLaptopMac } from "react-icons/md";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.jsx"

const Overview = (props) => {
    
    const { alert, sendAlert } = useAlert()
    const apiPrivate = useAxiosPrivate()

    const [overview, setOverview] = useState({})
    const [isOverviewLoading, setIsOverviewsLoading] = useState((true))
    const [error, setError ] = useState(false)

    const [isOverviewOpen, setIsOverviewOpen] = useState(() => {
        return JSON.parse(localStorage.getItem("overview-expand")) ?? true;
    })

    useEffect(() => {

        localStorage.setItem("overview-expand", JSON.stringify(isOverviewOpen));

    }, [isOverviewOpen])


    useEffect(() => {
        setIsOverviewsLoading(true)
        getOverview()
    }, [props.refreshTrigger])


    const changeVisibility = () => {
        setIsOverviewOpen(pre => !pre)
    }

    const getOverview = async () => {

        try {

            const response = await apiPrivate.get("/api/project/overview")
            setOverview(response.data.projects)

        } catch (error) {

            console.error("Error occurred when fetching overview");

            sendAlert({
                type: alert.error,
                title: "Error",
                description: "Couldn't get overview.",
                btn: { title: "cancel"}
            })

            setError(true)

        }

        setTimeout(() => {
            setIsOverviewsLoading(false)
        }, 2000)
    }


    return (
        
             <div 
                className={`rounded-lg shadow-lg p-5 max-xl:px-3 mb-10 flex flex-col overflow-hidden w-full 
                    ${isOverviewOpen ? "max-h-[1000px]" : "max-h-[110px]"} transition-all duration-300 ease-in-out`}
            >
                <button
                    onClick={changeVisibility}
                    className="text-lg font-bold text-gray-700 border-b-2 border-gray-300 p-5">
                    <div className="flex justify-between items-center w-full">Upcoming Dues<IoIosArrowUp className={`transition-all duration-300 ${isOverviewOpen && "rotate-180"}`}/></div>
                    
                </button>
                {error ? (
                    <div className="bg-red-200 text-red-600 font-semibold text-center m-5 p-5">Error fetching overview</div>
                ): (

                <div className="flex flex-wrap gap-10 full mt-10">
                    <div className={`relative bg-indigo-500 flex-1 min-w-[350px] flex justify-between py-5 px-14 max-xl:px-8 rounded-xl shadow-xl ${isOverviewLoading && "loading-overlay"}`}>
                        <div className="flex flex-col justify-center items-start">
                            <h3 className="text-xl font-bold text-white">My Projects</h3>
                            <h4 className="text-4xl font-extrabold text-white mt-5">{`${overview.myProjects}`}</h4>
                            <p className="text-white text-lg font-light mt-2">{`${overview.remainingMyProjects} remaining`} </p>
                        </div>
                        <div className="flex items-center justify-center">
                            <IoIosAlbums className="text-4xl text-white"/>
                        </div>
                    </div>
                    <div className={`relative bg-indigo-500 flex-1 min-w-[350px] flex justify-between py-5 px-14 max-xl:px-8 rounded-xl shadow-xl ${isOverviewLoading && "loading-overlay"}`}>
                        <div className="flex flex-col justify-center items-start">
                            <h3 className="text-xl font-bold text-white">My Projects' Tasks</h3>
                            <h4 className="text-4xl font-extrabold text-white mt-5">{`${overview.myProjectsTasks}`}</h4>
                            <p className="text-white text-lg font-light mt-2">{`${overview.remainingMyProjectsTasks} remaining`} </p>
                        </div>
                        <div className="flex items-center justify-center">
                            <FaTasks className="text-4xl text-white"/>
                        </div>
                    </div>
                    <div className={`relative bg-indigo-500 flex-1 min-w-[350px] flex justify-between py-5 px-14 max-xl:px-8 rounded-xl shadow-xl ${isOverviewLoading && "loading-overlay"}`}>
                        <div className="flex flex-col justify-center items-start">
                            <h3 className="text-xl font-bold text-white">Remaining Tasks</h3>
                            <h4 className="text-4xl font-extrabold text-white mt-5">{`${overview.remainingTasks}`}</h4>
                            <p className="text-white text-lg font-light mt-2">{`in ${overview.remainingTaskProjects} projects`}</p>
                        </div>
                        <div className="flex items-center justify-center">
                            <MdLaptopMac className="text-4xl text-white"/>
                        </div>
                    </div>
                    <div className={`relative bg-indigo-500 flex-1 min-w-[350px] flex justify-between py-5 px-14 max-xl:px-8 rounded-xl shadow-xl ${isOverviewLoading && "loading-overlay"}`}>
                        <div className="flex flex-col justify-center items-start">
                            <h3 className="text-xl font-bold text-white">Contributions</h3>
                            <h4 className="text-4xl font-extrabold text-white mt-5">{`${overview.contributions}`}</h4>
                            <p className="text-white text-lg font-light mt-2">in {`${overview.contributionProjects}`} projects</p>
                        </div>
                        <div className="flex items-center justify-center">
                            <FaDiagramProject className="text-4xl text-white"/>
                        </div>
                    </div>
                    
                </div>
            )}
            
        </div>
    )
}

export default Overview