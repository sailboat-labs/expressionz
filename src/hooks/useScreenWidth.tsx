import { useState, useEffect } from "react";

// Define a custom hook for getting the screen width
function useScreenWidth() {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    function updateScreenWidth() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener("resize", updateScreenWidth);

    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);

  return screenWidth;
}

export default useScreenWidth;
