import React, { useState, useEffect } from 'react';
import './ToastSepp.css';
const ToastSepp = () => {
  const [showDiv, setShowDiv] = useState(false);
//   const audioRef = useRef(null);

  useEffect(() => {
    const minTime = 50000; // 50 segundos em milissegundos
    const maxTime = 180000; // 180 segundos em milissegundos

    const interval = setInterval(() => {
      setShowDiv(true);
    //   audioRef.current.play(); // Reproduz o som
      // Ocultar a div após alguns segundos (por exemplo, 5 segundos)
      setTimeout(() => {
        setShowDiv(false);
      }, 4000);
    }, Math.random() * (maxTime - minTime) + minTime);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      {showDiv && <div id="sepp" className="sepp-div"><img src="/sepp.png" alt=""/></div>}      
      {/* <audio ref={audioRef} src="/miau.mp3" /> */}
    </div>
  );
};

export default ToastSepp;
