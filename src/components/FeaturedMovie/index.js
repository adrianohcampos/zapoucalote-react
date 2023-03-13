import React from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import './FeaturedMovie.css';

const FeaturedMovie = ({ item }) => {

  console.log('item----',item)
  
  const {
    backdrop_path,
    title,
    vote_average,
    first_air_date,
    number_of_seasons,
    id,
    overview
  } = item;

  const getTruncatedDescription = (overview) => {
    if (overview.length > 120) {
      return `${overview.substring(0, 120)}..`;
    }
    return overview;
  }

  const truncatedDescription = getTruncatedDescription(overview);
  const releaseYear = new Date(first_air_date).getFullYear();
  const pluralSeasons = number_of_seasons !== 1 ? 's' : '';
  let points = Math.round(vote_average * 10) / 10;
  return (
    <section className="featured" style={{ backgroundImage: `url(https://acampos.com.br/zoc-api/image/${backdrop_path})` }}>
      <div className="featured--vertical">
        <div className="featured--horizontal">
          <div className="featured--name">{title}</div>
          <div className="featured--info">
            {/* <div className="featured--point">{points} pontos</div> */}
            <div className="featured--year">Episódio 1</div>
            <div className="featured--seasons">Temporada 2</div>
          </div>
          <div className="featured--description">{truncatedDescription}</div>
          <div className="featured--buttons">
            <a href={`/watch/${id}`} className="featured--watchbutton"><PlayArrowIcon style={{ fontSize: 40 }} /> Assistir</a>
            <a href={`/title/${id}`} className="featured--titlebutton"><ErrorOutlineIcon style={{ fontSize: 40 }} /> Mais Informações</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedMovie;
