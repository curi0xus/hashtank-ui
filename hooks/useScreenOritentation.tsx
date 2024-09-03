import { useEffect, useState } from 'react';

const useScreenOritentation = () => {
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    if (window.innerWidth > window.innerHeight) {
      setIsLandscape(true);
    }
  }, []);
  return {
    isLandscape,
  };
};

export default useScreenOritentation;
