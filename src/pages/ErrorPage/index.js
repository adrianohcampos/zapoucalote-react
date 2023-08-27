import React, { useEffect } from 'react';

import ReactGA from 'react-ga';

const Header = () => {

  useEffect(() => {
    // Rastrear a visualização da página
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (

    <div>
      <h1>error 404!</h1>
    </div>

  );
}

export default Header;