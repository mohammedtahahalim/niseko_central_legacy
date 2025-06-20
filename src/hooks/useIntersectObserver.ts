import { useEffect, useRef, useState } from "react";

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
  const [numToShow, setNumToShow] = useState<number>(min || 3);
  const cooldown = useRef<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (cooldown.current) return;
          cooldown.current = true;
          setNumToShow((numToShow) => Math.min(numToShow + increment, max));
          setTimeout(() => {
            cooldown.current = false;
          }, 100);
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
  }, []);

  return { numToShow };
}
