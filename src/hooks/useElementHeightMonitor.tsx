import { useEffect, useState } from "react";

const useElementHeightMonitor = (element: HTMLElement | null) => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (element == null) return;

    setHeight(element.clientHeight ?? 0);

    function handleWindowResize(evt: UIEvent) {
      if (element == null) return;

      setHeight(element.clientHeight ?? 0);
    }

    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [element]);

  return height;
};

export default useElementHeightMonitor;
