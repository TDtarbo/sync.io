import { useEffect, useRef, useState } from "react"
import useAxiosPrivate from "/src/hooks/useAxiosPrivate"
import { useAlert } from "@tdtarbo/react-alert"
import DueCard from "./DueCard"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { IoIosArrowUp } from "react-icons/io";
import { motion } from "framer-motion"

const UpComingDues = (props) => {

    
    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [error, setError] = useState(false)
    
    const { alert, sendAlert } = useAlert()
    const apiPrivate = useAxiosPrivate()

    const [ dotLottie, setDotLottie ] = useState(null)

    const dotLottieRefCallback = (dotLottie) => {
        setDotLottie(dotLottie)
    }

    const [isUpcomingDueOpen, setIsUpcomingDueOpen] = useState(() => {
        return JSON.parse(localStorage.getItem("upcomingDue-expand")) ?? true;
    })

    const changeVisibility = () => {
        setIsUpcomingDueOpen(pre => !pre)
    }


    useEffect(() => {

        localStorage.setItem("upcomingDue-expand", JSON.stringify(isUpcomingDueOpen));

        if (isUpcomingDueOpen && dotLottie) {

            dotLottie.stop();
            dotLottie.play();
        }

    }, [isUpcomingDueOpen])


    const getTasks= async () => {
    
        try {
            
            const response = await apiPrivate.get("/api/task/upcoming")
            setTasks(response.data.upcomingTasks)

        } catch (error) {

            console.error("Error occurred when fetching tasks");

            sendAlert({
                type: alert.error,
                title: "Error",
                description: "Couldn't get upcoming tasks.",
                btn: { title: "cancel"}
            })

            setError(true)
        }

        setTimeout(() => {

            setIsLoading(false)
        }, 2000)
    }

    useEffect(() => {
            setIsLoading(true)
            getTasks()
    }, [props.refreshTrigger])

    return (
        <div 
            className={`rounded-lg shadow-lg p-5 mb-10 flex flex-col overflow-hidden w-full 
                ${isUpcomingDueOpen ? "max-h-[1000px]" : "max-h-[110px]"} transition-all duration-300 ease-in-out`}
>
        <button
            onClick={changeVisibility}
            className="text-lg font-bold text-gray-700 border-b-2 border-gray-300 p-5">
            <div className="flex justify-between items-center w-full">Upcoming Dues<IoIosArrowUp className={`transition-all duration-300 ${isUpcomingDueOpen && "rotate-180"}`}/></div>
            
        </button>

        {error ? (
            <div className="bg-red-200 text-red-600 font-semibold text-center m-5 p-5">Error fetching upcoming dues</div>
        ) : (

            <div className="flex p-5 flex-col w-full">

                {isLoading ? 
                    
                    <>
                        <div className="relative mb-1 flex justify-between">
                            <div className="relative w-[24%]">
                                <div className="w-[100%] h-[40px] loading-overlay"></div>
                            </div>
                            <div className="relative w-[24%]">
                                <div className="w-[100%] h-[40px] loading-overlay"></div>
                            </div>
                            <div className="relative w-[24%]">
                                <div className="w-[100%] h-[40px] loading-overlay"></div>
                            </div>
                            <div className="relative w-[24%]">
                                <div className="w-[100%] h-[40px] loading-overlay"></div>
                            </div>
                        </div>
                        <div className="relative mb-1">
                            <div className="w-[100%] h-[40px] loading-overlay" ></div>
                        </div>
                        <div className="relative mb-1">
                            <div className="w-[100%]  h-[40px] loading-overlay" ></div>
                        </div>
                        <div className="relative mb-1">
                            <div className="w-[100%] h-[40px] loading-overlay" ></div>
                        </div>
                    </>

                :
                    <>
                        { tasks.length > 0 ? (
                            <div className="w-full overflow-x-auto">
                                <table className="min-w-[800px] table-fixed border-spacing-0 pb-10">
                                    <thead>
                                        <tr className="text-left">
                                            <th className="p-5 text-gray-500 whitespace-nowrap">Project</th>
                                            <th className="p-5 text-gray-500 whitespace-nowrap">Task</th>
                                            <th className="p-5 text-gray-500 whitespace-nowrap">Due Date</th>
                                            <th className="p-5 text-gray-500 whitespace-nowrap">Owner</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tasks.map((task, index) => {
                                            return <DueCard key={index} task={task} />;
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ): 
                            <div className="flex flex-col items-center justify-center mt-10">
                                <div className="size-[200px] mb-5">
                                <DotLottieReact 
                                        dotLottieRefCallback={dotLottieRefCallback} 
                                        src="/src/lottie/high_five.lottie"
                                        autoplay
                                        />
                                </div>
                                <h1>You're all done!</h1>
                                <h1>Nothing in Dues</h1>
                            </div>
                        }

                    </>
                }
                
                
                </div>
                
            )}
    </div>
)
}

export default UpComingDues