import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Zoc from "../../Zoc";
import Helmet from "react-helmet";
import FeaturedMovie from '../../components/FeaturedMovie'
import MovieRow from '../../components/MovieRow'
const Title = () => {

  const { id } = useParams();
  const [watchData, setWatchData] = useState(null);
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAll = async () => {

      setIsLoading(true);

      try {
        const chosenInfo = await Zoc.getMovieInfo(id);
        setWatchData(chosenInfo);

        const listzoc = await Zoc.getEps(chosenInfo.season_id);
        setMovieList(listzoc);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    loadAll();
  }, [id]);

  return (
    <div className="page">

      {watchData && (
        <Helmet>
          <title>{`Zap ou Calote - ${watchData.title}`}</title>
          <meta name="description" content={watchData.overview} />
        </Helmet>
      )}

      {watchData && <FeaturedMovie item={watchData} />}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Feito com <span role="img" aria-label="coração">❤</span> by <a href="https://acampos.com.br" className="link" target="_blank" rel="noreferrer">Adriano Campos</a>
      </footer>


      {isLoading && (
        <div className="loading">
          <img src="https://data.whicdn.com/images/350654273/original.gif" alt="loading" />
        </div>
      )}
    </div>
  );
}

export default Title;
