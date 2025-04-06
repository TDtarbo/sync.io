const getTimeOfDay = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
        return "Morning";
    } else if (hour >= 12 && hour < 17) {
        return "Afternoon";
    } else {
        return "Evening";
    }
}

const getCurrentTime = () => {
    const date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let postfix = "am"

    if (hour >= 12) {
        postfix = "pm";
    }

    hour = hour % 12 || 12;

    if(hour < 10) {
        hour = `0${hour}`
    }

    if(minutes < 10) {
        minutes = `0${minutes}`
    }

    return `${hour}:${minutes} ${postfix}`
}


const getDueDate = (dueDateString) => {
    const dueDate = new Date(dueDateString);

    const day = dueDate.getDate();
    const month = dueDate.toLocaleString('default', { month: 'long' });
    const year = dueDate.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
}

export { getTimeOfDay, getCurrentTime, getDueDate };
