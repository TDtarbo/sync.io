import DashboardRouter from "../../routes/DashboardRouter";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MobileSideBar from "./components/MobileSideBar";
import DesktopSideBar from "./components/DesktopSideBar";

const DashboardPage = () => {

  const [is2XL, setIs2XL] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return JSON.parse(localStorage.getItem("nav-collapsed")) ?? true;
  });

  useEffect(() => {

    const handleResize = () => {
      const width = window.innerWidth;
  
      if (width > 1536 && !is2XL) {
        setIs2XL(true);
        console.log("true");
      } else if (width <= 1536 && is2XL) {
        setIs2XL(false);
        console.log("false");
      }
    };
  
    handleResize();
  
    window.addEventListener("resize", handleResize);
  
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [is2XL]);
  
  useEffect(() => {
    localStorage.setItem("nav-collapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed])

  const setMainContentWidth = () => {
    if (!is2XL) return "100%"

    if (isCollapsed) {
      return "97%"

    }else {
      return"84%"
         
    } 
  }

  const handleBtnClick = () => {
    setIsCollapsed((p) => !p);
  };


  return (
    <main className="min-h-[100svh] bg-white">

      <Header btnClick={handleBtnClick} />

      <div className="flex justify-end pt-5">
        
        {/* Sidebar */}
        {is2XL ? 
          <DesktopSideBar isCollapsed={isCollapsed} handleBtnClick={handleBtnClick}/>
         : 
          <MobileSideBar isCollapsed={isCollapsed} handleBtnClick={handleBtnClick}/>
        }

        {/* Main Content */}
        <motion.div
          initial={{ width: "84%" }}
          animate={{ width: setMainContentWidth() }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="mt-16 2xl:rounded-s-xl bg-white shadow-lg border border-indigo-100 overflow-x"
        >
          <DashboardRouter />
        </motion.div>
        
      </div>
    </main>
  );
};

export default DashboardPage;
