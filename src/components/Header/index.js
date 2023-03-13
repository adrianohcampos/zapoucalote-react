import React from "react";
import { Link, useParams } from "react-router-dom";
import './Header.css';

const Header = ({ isBlack }) => { 
  const { id } = useParams();
  const showHeader = !id; //pathname !== '/watch/:id';

  return (
    <header className={isBlack ? 'black' : ''} style={{ display: showHeader ? 'flex' : 'none' }}>
      {/* <div className="header--logo">
        <Link to="/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="Logo" />
        </Link>
      </div> */}
      <nav class="header--social">
          <a href="https://twitch.tv/cidcidoso" target="_blank">
            <i class="bi bi-twitch"></i>
          </a>
          <a href="https://twitter.com/naosalvo" target="_blank">
            <i class="bi bi-twitter"></i>
          </a>
          <a href="https://instagram.com/naosalvo" target="_blank">
            <i class="bi bi-instagram"></i>
          </a>
          <a href="https://discord.gg/cidcidoso" target="_blank">
            <i class="bi bi-discord"></i>
          </a>
        </nav>
    </header>
  );
};

export default Header;
