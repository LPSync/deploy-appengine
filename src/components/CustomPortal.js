import { memo, useEffect, useMemo } from "react";
import * as ReactDOM from "react-dom";

const CustomPortal = ({ children }) => {
  let portalRoot = useMemo(() => document.getElementById("portal-root-id"), []);
  let newElement = useMemo(() => document.createElement("div"), []);

  useEffect(() => {
    if (portalRoot && newElement) {
      portalRoot.appendChild(newElement);
    }
    return () => portalRoot?.removeChild(newElement);

  }, [portalRoot, newElement]);

  return ReactDOM.createPortal(
    children,
    newElement,
  );
};

export default memo(CustomPortal);