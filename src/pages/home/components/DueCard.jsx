import { getDueDate } from "/src/helpers/time_manager"

const DueCard = (props) => {


    const getPriorityColor = (priority) => {
        switch (priority?.trim().toLowerCase()) {
            case "high": return "after:bg-red-500";
            case "medium": return "after:bg-yellow-400";
            case "low": return "after:bg-green-500";
            default: return "after:bg-white";
        }
    }
    
    return (
        <tr className="cursor-pointer hover:shadow-lg hover:bg-gray-100 transition">
            <td className="p-2 border-b rounded-l-lg">
                <p className="text-sm font-semibold text-gray-600 min-w-[250px] max-w-[300px]">
                    {props.task.projectTitle}
                </p>
            </td>
            <td className="p-2 border-b">
                <p className={`text-sm text-indigo-500 relative inline
                after:size-[15px] after:absolute after:top-[2px] after:-right-[25px]  after:shadow-2xl ${getPriorityColor(props.task.taskPriority)} after:rounded-full`}>
                {props.task.taskTitle}
                </p>
            </td>
            
            <td className="p-2 border-b rounded-r-lg">
                <p className="text-sm text-indigo-600">
                    {`Due @ ${getDueDate(props.task.taskDueDate)}`}
                </p>
            </td>
            <td className="p-2 border-b flex items-center gap-2">
                <img 
                    className="size-6 rounded-3xl object-cover border border-indigo-500"
                    src={props.task.projectOwnerPic}
                    alt="profile" 
                />
                <p className="text-sm text-indigo-600">
                    {props.task.projectOwner}
                </p>
            </td>
        </tr>

    );
};

export default DueCard;
