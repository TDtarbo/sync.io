const getDocTitle = (location) => {
  const path = location.pathname;

  if (path === "/") return "SYNC.IO";

  const pathArr = path.split("/").filter(Boolean);
  let lastSegment = pathArr.pop();

  if (!lastSegment) return "SYNC.IO";
  
  if (lastSegment.includes("_")) {
    return (
      lastSegment
        .split("_")
        .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
        .join(" ") + " - SYNC.IO"
    );
  }

  return `${lastSegment.charAt(0).toUpperCase()}${lastSegment.slice(1)} - SYNC.IO`;
};

export { getDocTitle };
