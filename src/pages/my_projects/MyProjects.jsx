import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { getDocTitle } from "../../helpers/title"
import ProjectHeader from "./components/ProjectsHeader"
import { AiOutlineFolderAdd } from "react-icons/ai";
import ProjectCard from "./components/ProjectCard";
import { useAlert } from "@tdtarbo/react-alert"
import { AnimatePresence } from "framer-motion";;
import CreateNew from "./components/CreateNew";
import usePortal from "../../hooks/usePortal";



const MyProjects = () => {

    const {alert, sendAlert} = useAlert()

    const location = useLocation()
    const [projects, setProjects] = useState([])
    const [isCreateNewOpen, setIsCreateNewOpen] = useState(false)

    useEffect(() => {
        document.title = getDocTitle(location)
    }, [])

    useEffect(() => {

        try {

            const projects = [
                {
                    id: "123456", 
                    title: "Mobile App", 
                    dueDate: "14 May 2025", 
                    createdAt: "30 March 2025", 
                    state: "on going",
                    type: "webapp"
                },
                {
                    id: "1234567", 
                    title: "React Web App", 
                    dueDate: "01 May 2025", 
                    createdAt: "25 June 2025", 
                    state: "completed",
                    type: "mobileapp"
                },
                {
                    id: "1234568", 
                    title: "React App", 
                    dueDate: "05 December 2024", 
                    createdAt: "30 March 2025", 
                    state: "on going",
                    type: "other"
                },
            ]

            setProjects(projects)

            
        } catch (error) {

            console.error("Error occurred when fetching projects", error);

            sendAlert({
                type: alert.error,
                title: "Error",
                description: "Couldn't get projects.",
                btn: { title: "cancel"}
            })
        }

    }, [])

    useEffect(() => {
        
        /* sendAlert({
            type: alert.success,
            title: isCreateNewOpen.toString()
        }) */
        
    } ,[isCreateNewOpen])

    const Portal = usePortal()

    const ToggleCreateNewOverlay = () => {
        setIsCreateNewOpen(pre => !pre)
    }

    return (
        <>
            <div className="relative">
                <ProjectHeader />
                <div className="p-1 lg:p-5">
                    <div className="flex flex-col lg:gap-24 p-5 lg:flex-row">
                        <div className="py-5">
                            <div 
                            onClick={ToggleCreateNewOverlay}
                            className="flex lg:flex-col gap-x-5 justify-center p-5 items-center min-w-[250px] shadow-lg rounded-lg bg-indigo-50 cursor-pointer text-gray-500 hover:shadow-2xl hover:bg-indigo-500 hover:text-white duration-200 transition-all lg:size-[250px]">
                                <AiOutlineFolderAdd className="size-[40px]"/>
                                <p className="font-bold">Create New</p>
                            </div>
                        </div>

                        <div className="overflow-auto flex gap-5 py-5">
                            {projects.map(project => {
                                return <ProjectCard key={project.id} project={project} />
                            })}
                        </div>
                    </div>
                </div>
                <AnimatePresence>
                    { isCreateNewOpen && 
                        <Portal>
                            <CreateNew closeOverlay={ToggleCreateNewOverlay}/>
                        </Portal>
                    }
                </AnimatePresence>
            </div>
        </>
    )
}

export default MyProjects