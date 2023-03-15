import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Helmet from "react-helmet";

import Header from './components/Header'

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
        <meta name="description" content="Clone Netflix in React" />
      </Helmet>
      <Header black={isHeaderBlack} />
      <Outlet />
    </div>
  );
};

export default App;