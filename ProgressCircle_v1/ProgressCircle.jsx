import { useEffect, useRef } from "react";
import "../styles/ProgressCircle.css";

const ProgressCircle = ({ value, speed, name, temperature }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    const timer = titleRef.current;
    let currentValue = 0;
    const interval = setInterval(() => {
      if (currentValue < value) {
        currentValue++;
        timer.textContent = currentValue;
      } else {
        clearInterval(interval);
      }
    }, speed / value);

    return () => clearInterval(interval);
  }, [value, speed]);

  return (
    <div className="progress">
      <div className="progress-content">
        <span ref={titleRef} className="title timer">
          {0}
        </span>
        <span className="percent">%</span>
        <div className="name">{name}</div>
        {temperature && <div className="temperature">{temperature}°C</div>}
      </div>
      <div className="overlay"></div>
      <div className="left"></div>
      <div className="right"></div>
    </div>
  );
};

export default ProgressCircle;
