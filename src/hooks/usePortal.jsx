import { createPortal } from "react-dom";
import { useEffect, useState, useMemo } from "react";

const usePortal = () => {
  const [container, setContainer] = useState(null);

  useEffect(() => {
    const div = document.createElement("div");
    div.className = "portal-container";
    document.body.appendChild(div);
    setContainer(div);

    return () => {
      document.body.removeChild(div);
    };
  }, []);

  const Portal = useMemo(() => {
    return ({ children }) => {
      if (!container) return null;
      return createPortal(children, container);
    };
  }, [container]);

  return Portal;
};

export default usePortal;
