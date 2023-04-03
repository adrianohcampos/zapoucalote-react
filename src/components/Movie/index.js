import React from "react";

import { useNavigate } from "react-router-dom";

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import ShareIcon from '@mui/icons-material/Share';
import { Link } from "react-router-dom";
import './Movie.css';

const Movie = ({ item }) => {

  const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	}
  
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


  let backdrop = `https://i3.ytimg.com/vi/${video_key}/maxresdefault.jpg`
  if(backdrop_path !== '' && backdrop_path !== null) {
    backdrop = `https://acampos.com.br/zoc-api/image/${backdrop_path}`    
  }   
 
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
          <div className="featured--description">{overview}</div>
          <div className="featured--buttons">            
            <Link to={`/watch/${id}?episodio=${url_normalize(item.title)}&serie=${url_normalize(item.serie_title)}`} className="featured--watchbutton"><PlayArrowIcon style={{ fontSize: 40 }} /> Assistir</Link>           
            <Link to={`/`} className="featured--titlebutton" onClick={goBack}><ArrowBackIcon style={{ fontSize: 40 }} /> Voltar</Link>
            {/* <a href={`/`} className="featured--titlebutton" onClick={goBack}><ShareIcon style={{ fontSize: 40 }} /></a> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Movie;
