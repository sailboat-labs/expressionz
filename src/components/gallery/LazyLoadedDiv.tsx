import { useEffect, useRef, useState } from 'react';

export const LazyLoadedDiv = ({ children }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const divRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // console.log(`Div is visible`)
          setIsVisible(true);
          observer.unobserve(divRef.current as any);
        }
      },
      { threshold: 0.1 } // Adjust threshold as needed
    );

    observer.observe(divRef.current as any);

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, []);

  return <div ref={divRef}>{isVisible && children}</div>;
};
