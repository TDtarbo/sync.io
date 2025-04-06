import { motion } from "framer-motion";
import { CiBoxList, CiShare2, CiHome, CiCircleChevLeft } from "react-icons/ci";
import NavItem from "./NavItem";

const MobileSideBar = ({isCollapsed, handleBtnClick}) => {


    return (

        <motion.div
        initial={{ width: "0%" }}
        animate={{ width: isCollapsed ? "0%" : "100%", zIndex: 500 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={`${isCollapsed ? "-left-11" : "left-0"} 2xl:mt-16  fixed top-0 2xl:top-6 bg-gradient-to-r from-gray-900 to-transparent bg-opacity-50`}
        >
            <div className="w-[80%] min-h-[100svh] py-10 px-5 bg-white">
            
                <img 
                    src="/logo/logo_indigo.svg" 
                    alt="logo" 
                    className="w-[50%] md:w-[30%] lg:w-[20%]"
                    
                />
        
                {/* Navigation */}
                <motion.nav
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isCollapsed ? 0 : 1 }}
                    transition={{ duration: .2 , delay: isCollapsed ? 0 : 0.3}}
                    className={`flex flex-col relative ${isCollapsed ? "pointer-events-none" : ""}`}
                >
                    
                {!isCollapsed && (
                    <>
                        <motion.button
                            onClick={handleBtnClick}
                            animate={{
                                rotate: isCollapsed ? 180 : 0,
                                translateX: "30%",
                                translateY: "-30%",
                            }}
                            transition={{ duration: 0.1,}}
                            className="absolute bg-white rounded-full -top-8 -right-8 2xl:top-0 2xl:right-0 hover:bg-indigo-500 transition-all duration-300"
                        >
                            <CiCircleChevLeft className="text-white bg-indigo-500 rounded-full text-3xl size-10 hover:text-white transition-all duration-300" />
                        </motion.button>

                        <div className="mt-14"
                            onClick={handleBtnClick}
                        >
                            <NavItem Icon={CiHome} title="Home" to="/home"/>
                            <NavItem Icon={CiBoxList} title="My Projects" to="/my_projects"/>
                            <NavItem Icon={CiShare2} title="Contributions" to="/contributions"/>
                        </div>
                    </>
                )}
                </motion.nav>
            </div>
      </motion.div>
    )
}

export default MobileSideBar