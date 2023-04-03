import React from "react";

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Link } from "react-router-dom";
import './FeaturedMovie.css';

const FeaturedMovie = ({ item }) => {

  const {
    backdrop_path,
    title,
    id,
    overview,
    season,
    number,
    video_key,
    serie_title
  } = item;

  const getTruncatedDescription = (overview) => {
    if (overview.length > 300) {
      return `${overview.substring(0, 200)}...`;
    }
    return overview;
  }

  let backdrop = `https://i3.ytimg.com/vi/${video_key}/maxresdefault.jpg`
  if(backdrop_path !== '' && backdrop_path !== null) {
    backdrop = `https://acampos.com.br/zoc-api/image/${backdrop_path}`    
  } 

  const truncatedDescription = getTruncatedDescription(overview);
 
  const url_normalize = (name) => {
    return  name.toLowerCase().replaceAll(' ', '+').normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  }

  return (
    <section className="featured" style={{ backgroundImage: `url(${backdrop})` }}>
      <div className="featured--vertical">
        <div className="featured--horizontal">
        <div className="featured--info">            
            <div className="featured--seasons">{serie_title}</div>
          </div>
          <div className="featured--name">{title}</div>
          <div className="featured--info">            
            <div className="featured--year">Episódio {number}</div>
            <div className="featured--seasons">Temporada {season}</div>
          </div>
          <div className="featured--description">{truncatedDescription}</div>
          <div className="featured--buttons">
            <Link to={`/watch/${id}?episodio=${url_normalize(item.title)}&serie=${url_normalize(item.serie_title)}`} className="featured--watchbutton"><PlayArrowIcon style={{ fontSize: 40 }} /> Assistir</Link>            
            <Link to={`/title/${id}?episodio=${url_normalize(item.title)}&serie=${url_normalize(item.serie_title)}`} className="featured--titlebutton"><ErrorOutlineIcon style={{ fontSize: 40 }} /> Mais Informações</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedMovie;
