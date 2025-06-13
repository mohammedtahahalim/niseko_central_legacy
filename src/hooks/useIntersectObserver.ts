import { useEffect, useState } from "react";

interface IIntersectObserver {
  currRef: React.RefObject<HTMLDivElement | null>;
  max: number;
  min: number;
  increment: number;
}
export default function useIntersectObserver({
  currRef,
  min,
  max,
  increment,
}: IIntersectObserver) {
  const [numToShow, setNumToShow] = useState<number>(min || 1);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setNumToShow((numToShow) => Math.min(numToShow + increment, max));
        }
      });
    });
    if (currRef.current) {
      observer.observe(currRef.current);
    }
    return () => {
      if (currRef.current) {
        observer.unobserve(currRef.current);
      }
    };
  }, [currRef, increment, max]);

  return { numToShow };
}
