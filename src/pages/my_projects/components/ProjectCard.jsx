const getBgColor = (type) => {

    switch (type) {
        case "webapp":
            return "bg-red-50 hover:bg-red-500"
        case "mobileapp":
            return "bg-yellow-50 hover:bg-yellow-500"
        case "other":
            return "bg-green-50 hover:bg-green-500"
            
    }
}

const getBorderColor = (type) => {

    switch (type) {
        case "webapp":
            return "border-white group-hover:border-red-50"
        case "mobileapp":
            return "border-yellow-200 group-hover:border-yellow-50"
        case "other":
            return "border-green-200 group-hover:border-green-50"
            
    }
}

const ProjectCard = (props) => {

    const {id, title, dueDate, createdAt, state, type} = props.project



    return (
        <div className={`relative flex flex-col justify-center min-w-[250px] size-[250px] p-8 shadow-lg rounded-lg cursor-pointer text-gray-500 hover:shadow-xl hover:text-white duration-200 transition-all group ${getBgColor(type)}`}>
            <p className="text-xl font-bold line-clamp-2">{title}</p>
            <p className="text-xs mt-1 w-fit border border-gray-400 font-bold px-3 py-1 rounded-full absolute top-2 right-2 group-hover:border-white">{state}</p>
            <p className="text-sm mt-5"> {`Due @ ${dueDate}`}</p>
            <p className="text-sm mt-1">{`Created @ ${createdAt}`}</p>
        </div>
    )
}

export default ProjectCard