const addThisToArray = (oldAlerts, alert) => {
  if (oldAlerts) {
    return [...oldAlerts, alert];
  } else {
    return [alert];
  }
};

const handleNon200Errors = (error) => {
  let alert;

  if (error.response) {
    // The request was made, and the server responded with a status other than 2xx
    console.error("Server responded with error:", error.response);
    alert = {
      id: Date.now(),
      type: "error",
      title: `Error: ${error.response.status}`,
      description: "Something went wrong with the server.",
    };
  } else if (error.request) {
    // The request was made, but no response was received
    console.error("No response received:", error.request);
    alert = {
      id: Date.now(),
      type: "error",
      title: "Network Error",
      description: "Please check your internet connection.",
    };
  } else {
    // Something happened in setting up the request
    console.error("Error during request setup:", error.message);
    alert = {
      id: Date.now(),
      type: "error",
      title: "Unexpected Error",
      description: error.message,
    };
  }

  return alert;
};

const handle200Errors = (response) => {
  console.log(response);
  const alert = {
    id: Date.now(),
    type: "error",
    title: "Something went wrong. Please try again later",
    description: "Range:[200]",
  };

  return alert;
};


const disappear = (alertData, isError = false) => {
  
  if(!alertData.title) return null;

  const alert = {
    id: Date.now(),
    type: `${isError ? "error" : "success"}`,
    title: alertData.title,
    description: alertData.description || null,
  };

  return alert;
};


const optional = (alertData, isError = false) => {
  
  if(!alertData.title) return null;

  const alert = {
    id: Date.now(),
    type: `${isError ? "error" : "success"}`,
    title: alertData.title,
    description: alertData.description || null,
    btn: alertData.btn || null,
    optionalAction: alertData.btnAction || null,
    mandatoryAction: alertData.btnAction || null
  };

  return alert;
};




export { disappear, optional , handle200Errors, handleNon200Errors, addThisToArray }