import useAuth from "/src/hooks/useAuth"
import { RiMenu4Line } from "react-icons/ri"

const Header = (props) => {

    const { auth } = useAuth()
    const { firstName, lastName, profilePicture } = auth.user

    return (
        <div className="fixed w-screen flex items-center justify-between p-5 bg-white h-16 z-50">
            <div className="flex items-center gap-3">
                <button onClick={props.btnClick}>
                    <RiMenu4Line className="2xl:hidden text-xl size-9 p-2 bg-indigo-500 rounded-full text-white transition-all duration-300" />
                </button>
                <img className="2xl:block hidden size-6" src="/logo/logo_main.svg" alt="logo" />
                <h1 className="hidden md:block text-gray-600 text-md xl:text-lg font-bold">Project Management</h1>
            </div>
            <div className="group flex gap-3 items-center p-1 cursor-pointer rounded-e-3xl rounded-s-lg
                            hover:bg-indigo-500 transition-all duration-300"
            >
                <h1 className="font-bold pl-4 text-gray-500 group-hover:text-white ">{`${firstName} ${lastName}`}</h1>
                <img 
                    className="size-7 rounded-3xl object-cover border-2 border-white"
                    src={profilePicture}
                    alt="Profile" 
                />
            </div>
        </div>
    )
}

export default Header