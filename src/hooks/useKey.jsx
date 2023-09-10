import { useEffect } from "react";

const useKey = (key, action) => {
  useEffect(() => {
    const exit = (e) => {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    };

    document.addEventListener("keydown", exit);

    return () => document.removeEventListener("keydown", exit);
  }, [key, action]);
};
export default useKey;
