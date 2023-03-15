import React from "react";

import { useLocation, useNavigate   } from "react-router-dom";

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import './FeaturedMovie.css';

const FeaturedMovie = ({ item }) => {

  const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	}

    
  const location = useLocation();
  const pathname = location.pathname
  

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
    // if (overview.length > 300) {
    //   return `${overview.substring(0, 300)}...`;
    // }
    return overview;
  }

  let backdrop = `https://i3.ytimg.com/vi/${video_key}/maxresdefault.jpg`
  if(backdrop_path !== '' && backdrop_path !== null) {
    backdrop = `https://acampos.com.br/zoc-api/image/${backdrop_path}`    
  } 

  console.log('backdrop',backdrop)

  const truncatedDescription = getTruncatedDescription(overview);
 
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
            <a href={`/watch/${id}?title=${item.title}`} className="featured--watchbutton"><PlayArrowIcon style={{ fontSize: 40 }} /> Assistir</a>
            {pathname.indexOf("title") < 0 && (
              <a href={`/title/${id}`} className="featured--titlebutton"><ErrorOutlineIcon style={{ fontSize: 40 }} /> Mais Informações</a>
            )} 

            {pathname.indexOf("title") > 0 && (
              <a href={`/`} className="featured--titlebutton" onClick={goBack}><ArrowBackIcon style={{ fontSize: 40 }} /> Voltar</a>
            )}           
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedMovie;
