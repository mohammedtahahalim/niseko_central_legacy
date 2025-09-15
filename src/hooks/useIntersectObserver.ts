import { useEffect, useRef, useState } from "react";

interface IIntersectObserver {
  currRef: React.RefObject<HTMLDivElement | null>;
  max: number;
  min: number;
  increment: number;
  intersectionTimeout?: number;
}

interface IUseObserver {
  numToShow: number;
}

export default function useIntersectObserver({
  currRef,
  min,
  max,
  increment,
  intersectionTimeout = 100,
}: IIntersectObserver): IUseObserver {
  const [numToShow, setNumToShow] = useState<number>(min || 3);
  const cooldown = useRef<boolean>(false);

  useEffect(() => {
    setNumToShow(min || 3);
  }, [max, min]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (cooldown.current) return;
          cooldown.current = true;
          setNumToShow((numToShow) => Math.min(numToShow + increment, max));
          setTimeout(() => {
            cooldown.current = false;
          }, intersectionTimeout);
        }
      });
    });
    if (currRef.current) {
      observer.observe(currRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [currRef, min, max, increment, intersectionTimeout]);

  return { numToShow };
}
