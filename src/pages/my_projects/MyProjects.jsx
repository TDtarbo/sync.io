import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { getDocTitle } from "../../helpers/title"

const MyProjects = () => {

    const location = useLocation()

    useEffect(() => {
        document.title = getDocTitle(location)
    }, [])

    return (
        <>
            <h1>My Projects</h1>
        </>
    )
}

export default MyProjects