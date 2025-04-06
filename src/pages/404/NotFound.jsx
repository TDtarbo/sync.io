import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { useEffect } from "react"

const NotFound = () => {

    useEffect(() => {
        document.title = "Page Not Found"
    }, [])

    return (
        
        <div className="flex flex-col justify-center items-center h-[100svh] w-screen bg-indigo-50">
            <DotLottieReact 
                src="/src/lottie/404.lottie"
                autoplay
                className="2xl:w-[40%] lg:w-[60%] w-full"
            />
        </div>
    )
}

export default NotFound