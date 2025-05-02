import { useEffect, useState } from "react"

const CustomSelect = () => {

    const [isFocused, setIsFocused] = useState(false)

    useEffect (() => {console.log(isFocused)},[isFocused])

    const handleClick = () => {
        setIsFocused ((pre) => !pre)
    }

    return (
        <div className="relative">
            <div
                tabIndex={0}
                onClick={handleClick}
                onBlur={() => setIsFocused(false)}
                className={`input-felid h-10 custom-select font-semibold cursor-pointer ${isFocused && "rotate"}`}>
                    <p className="pointer-events-none select-none">hello world</p>
            </div>
            { isFocused && 
            

            <div className="absolute mt-1 py-2 font-semibold text-sm text-gray-800 w-full bg-white rounded-lg shadow-lg z-50 flex flex-col gap-1">
                <div className="cursor-pointer p-1 bg-white hover:bg-indigo-500 hover:text-white">Option One</div>
                <div className="cursor-pointer p-1 bg-white hover:bg-indigo-500 hover:text-white">Option One</div>
                <div className="cursor-pointer p-1 bg-white hover:bg-indigo-500 hover:text-white">Option One</div>
                <div className="cursor-pointer p-1 bg-white hover:bg-indigo-500 hover:text-white">Option One</div>
            </div>
            }
        </div>
    )
}

export default CustomSelect