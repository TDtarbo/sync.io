import { motion } from "framer-motion"
import RequiredFelid from "../../../common/components/RequiredFelid";
import DatePicker from "../../../common/components/Datepicker";
import CustomSelect from "../../../common/components/CustomSelect";

const CreateNew = ({closeOverlay}) => {
    return (
        <motion.div
        
            initial={{opacity: 0}}
            exit={{opacity: 0}}
            animate={{opacity: 1}}
            className="absolute flex flex-col justify-center items-center overflow-auto top-0 bottom-0 right-0 left-0 bg-black/60 z-[500]"
        >
            <div className="bg-white p-4 lg:p-8 xl:p-10 w-[95%] h-[95svh] lg:w-[85%] xl:w-[70%] rounded-xl">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-indigo-600 font-bold text-xl ">Create New Project</h1>
                    <button className="underline" onClick={closeOverlay}>Close</button>
                </div>
                <form>
                    <div className="w-[100%] mb-5">
                        <label
                            htmlFor="title"
                            className="text-md mr-2 font-medium text-gray-500"
                        >
                            Project title
                        </label>
                        <RequiredFelid message={"required"}/>
                        <div className="mt-2">
                            <input
                            id="title"
                            name="title"
                            type="text"
                            required
                            className="input-felid font-semibold"
                            />
                        </div>
                    </div>
                    <div className="w-[100%] mb-5">
                        <label
                            htmlFor="description"
                            className="text-md mr-2 font-medium text-gray-600"
                        >
                            Description
                        </label>
                        <RequiredFelid message={"required"}/>
                        <div className="mt-2">
                            <textarea
                            id="description"
                            name="description"
                            type="text"
                            required
                            className="input-felid font-semibold h-40 resize-none"
                            />
                        </div>
                    </div>
                    <div className="w-[100%] mb-5">
                        <label
                            htmlFor="description"
                            className="text-md mr-2 font-medium text-gray-600"
                        >
                            Type
                        </label>
                        <RequiredFelid message={"required"}/>
                        <div className="mt-2">
                            <CustomSelect
                            
                                options = {
                                    ""
                                }
                                onOptionChange = {""}
                            />
                            
                        </div>
                    </div>
                    <div className="w-[100%] mb-5">
                        <label
                                htmlFor="dueDate"
                                className="text-md mr-2 font-medium text-gray-600"
                            >
                                Due date
                        </label>
                        <DatePicker/>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default CreateNew;