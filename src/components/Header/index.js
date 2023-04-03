import React from "react";
import { Link, NavLink, useLocation  } from "react-router-dom";
import './Header.css';
import logo from '../../logo-top.png'
const Header = ({ black }) => { 
  
  const location = useLocation();
  let pathname = location.pathname
  const showHeader = pathname.indexOf("watch") < 0;

 
  return (
    <header className={black ? 'black' : ''} style={{ display: showHeader ? 'flex' : 'none' }}>
      
      <div className="header--logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div>
        <NavLink to="/" className="link">Home</NavLink>        
      </div>
      <nav className="header--social">
          <a href="https://www.youtube.com/@CidCidoso" target="_blank" rel="noreferrer">
            <i className="bi bi-youtube"></i>
          </a>
          <a href="https://twitch.tv/cidcidoso" target="_blank" rel="noreferrer">
            <i className="bi bi-twitch"></i>
          </a>
          <a href="https://twitter.com/naosalvo" target="_blank" rel="noreferrer">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="https://instagram.com/naosalvo" target="_blank" rel="noreferrer">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="https://discord.gg/cidcidoso" target="_blank" rel="noreferrer">
            <i className="bi bi-discord"></i>
          </a>
          
        </nav>
    </header>
  );
};

export default Header;
