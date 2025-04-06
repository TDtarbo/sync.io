import { motion } from "framer-motion";
import { CiBoxList, CiShare2, CiHome, CiCircleChevLeft } from "react-icons/ci";
import { RiMenu4Line } from "react-icons/ri";
import NavItem from "./NavItem";

const DesktopSideBar = ({isCollapsed, handleBtnClick}) => {

    return (
        <motion.div
        initial={{ width: "0%" }}
        animate={{ width: isCollapsed ? "0%" : "15%", zIndex: 500 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={`left-0 2xl:mt-16 min-h-[100svh] fixed top-0 2xl:top-6 bg-white py-10 px-5 rounded-e-2xl 2xl:min-h-[88svh] shadow-lg border border-indigo-100`}>
            
            <motion.button

                onClick={handleBtnClick}
                animate={{
                    rotate: isCollapsed ? 180 : 0,
                    translateX: "30%",
                    translateY: "-30%",
                }}
                transition={{ duration: 0.1,}}
                className={`absolute bg-white rounded-full ${isCollapsed ? "top-6 -right-11" : "top-6 right-6"}  2xl:top-0 2xl:right-0 hover:bg-indigo-500 transition-all duration-300`}
            >

                {isCollapsed ?
                    <RiMenu4Line className="text-xl size-10 p-2 bg-indigo-500 rounded-full text-white transition-all duration-300" />
                :
                    <CiCircleChevLeft className="text-gray-400 text-3xl size-8 hover:text-white transition-all duration-300" />
                }

            </motion.button>

            <motion.nav
                initial={{ opacity: 1 }}
                animate={{ opacity: isCollapsed ? 0 : 1 }}
                transition={{ duration: .2 , delay: isCollapsed ? 0 : 0.3}}
                className={`flex flex-col ${isCollapsed ? "pointer-events-none" : ""}`}
                >
                {!isCollapsed && (
                    <>
                    <NavItem Icon={CiHome} title="Home" to="/home"/>
                    <NavItem Icon={CiBoxList} title="My Projects" to="/my_projects"/>
                    <NavItem Icon={CiShare2} title="Contributions" to="/contributions"/>
                    </>
                )}
            </motion.nav>

      </motion.div>
    )
}

export default DesktopSideBar