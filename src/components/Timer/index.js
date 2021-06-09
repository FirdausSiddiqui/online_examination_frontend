import { useEffect, useState, useRef } from 'react';

const Timer = ({ destination, onSuccess, children }) => {
  const diffInSec = Math.round(
    (destination.getTime() - new Date().getTime()) / 1000
  );

  const [diff, setDiff] = useState(diffInSec >= 0 ? diffInSec : 0);

  const savedCallback = useRef();
  const timerId = useRef();

  const handleTimerChange = () => {
    if (diff > 0) {
      setDiff(diff - 1);
    } else if (timerId?.current) {
      clearInterval(timerId.current);

      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    }
  };

  useEffect(() => {
    savedCallback.current = handleTimerChange;
  });

  // this effect needs to run only once
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (timerId?.current) {
      clearInterval(timerId.current);
    } else {
      timerId.current = setInterval(tick, 1000);
    }

    return () => clearInterval(timerId.current);
  }, []);

  const findRemaining = (seconds) => {
    const days = parseInt(seconds / (60 * 60 * 24));
    let remainingSeconds = seconds % (60 * 60 * 24);

    const hours = parseInt(remainingSeconds / (60 * 60));
    remainingSeconds %= 60 * 60;

    const minutes = parseInt(remainingSeconds / 60);
    remainingSeconds %= 60;

    return { days, hours, minutes, seconds: remainingSeconds };
  };

  const appendZeroOnSingleDigit = (digit) => (digit < 10 ? `0${digit}` : digit);

  const { days, hours, minutes, seconds } = findRemaining(diff);

  return children({
    days: appendZeroOnSingleDigit(days),
    hours: appendZeroOnSingleDigit(hours),
    minutes: appendZeroOnSingleDigit(minutes),
    seconds: appendZeroOnSingleDigit(seconds)
  });
};

export default Timer;
