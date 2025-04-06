import SectionHeader from "./components/SectionHeader.jsx"
import { useEffect, useState } from "react";
import { getDocTitle } from "../../helpers/title.js"
import { useLocation } from "react-router-dom";
import Overview from "./components/Overview.jsx";
import UpComingDues from "./components/UpComingDues.jsx";


const Home = () => {

    const location = useLocation()

    const [refreshTrigger, setRefreshTrigger] = useState(0)

    useEffect(() => {
        document.title = getDocTitle(location)
    }, [])

    return (
        <div className="relative overflow-hidden box-border">
            <SectionHeader refresh={setRefreshTrigger}/>
            <div className="px-10 max-xl:px-2 h-[88svh] overflow-scroll pt-36">
                <Overview refreshTrigger={refreshTrigger}/>
                <UpComingDues refreshTrigger={refreshTrigger}/>
            </div>
        </div>
    )
}

export default Home