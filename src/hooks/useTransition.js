import { useState, useEffect, useRef } from 'react';

const useTransition = ({ active, maxWait = 3000 }) => {
  const [isVisible, updateVisible] = useState(active);
  const timerRef = useRef(null);
  useEffect(() => {
    if (!active) {
      timerRef.current = setTimeout(() => {
        updateVisible(false);
        timerRef.current = null;
      }, maxWait);
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      updateVisible(true);
    }
  }, [active, maxWait]);

  return { isVisible };
};

export default useTransition;
