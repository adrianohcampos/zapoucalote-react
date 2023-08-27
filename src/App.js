import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Helmet from "react-helmet";

import ToastSepp from './components/ToastSepp';

import Header from './components/Header';
import './App.css';

const App = () => {
  const [isHeaderBlack, setIsHeaderBlack] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsHeaderBlack(true);
      } else {
        setIsHeaderBlack(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, []);

  return (
    <div className="App">
      <Helmet>
        <title>Zap ou Calote</title>
        <meta name="description" content="Zap ou Calote: Programa de namoro apresentado por Cid Cidoso. Site feito por fã." />
      </Helmet>
      <Header black={isHeaderBlack} />
      <Outlet />
      <ToastSepp />
    </div>
  );
};

export default App;