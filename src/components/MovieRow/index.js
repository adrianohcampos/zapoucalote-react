import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import './MovieRow.css';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const MovieRow = ({ title, items }) => {
  const [scrollX, setScrollX] = useState(0);
  const windowWidth = window.innerWidth;

  const handleLeftArrow = () => {
    const x = scrollX + Math.round(windowWidth / 2);
    setScrollX(x > 0 ? 0 : x);
  }

  const handleRightArrow = () => {
    const x = scrollX - Math.round(windowWidth / 2);
    const listW = items.results.length * 200;
    setScrollX(windowWidth - listW > x ? (windowWidth - listW) - 30 : x);
  }

  const movieItems = useMemo(() => {
    return items.results.map((item) => (
      <div key={item.id} className="movieRow--item">
        <Link to={`/watch/${item.id}`}>
          <img
            src={`https://acampos.com.br/zoc-api/image/${item.poster_path}`} //${item.poster_path}
            alt={item.title}
          />
        </Link>
      </div>
    ));
  }, [items.results]);

  const listWidth = useMemo(() => {
    return (items.results.length + 1) * 200;
  }, [items.results]);

  return (
    <div className="movieRow">
      <h2>{title}</h2>

      <div className="movieRow--left" onClick={handleLeftArrow}>
        <NavigateBeforeIcon style={{ fontSize: 50 }} />
      </div>

      <div className="movieRow--right" onClick={handleRightArrow}>
        <NavigateNextIcon style={{ fontSize: 50 }} />
      </div>

      <div className="movieRow--listarea">
        <div className="movieRow--list" style={{ marginLeft: scrollX, width: listWidth }}>
          {movieItems}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;
