import { useEffect, useState } from "react";

export default function useMessage(threshold: number) {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    let timer = setTimeout(() => {
      setMessage("");
    }, threshold);
    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  return { message, setMessage };
}
