import React, { useEffect, useState } from "react";

import Zoc from "../../Zoc";
import MovieRow from '../../components/MovieRow'
import FeaturedMovie from '../../components/FeaturedMovie'
import Helmet from "react-helmet";
// import ReactPlayer from 'react-player';

import './Home.css';

const Home = () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      setIsLoading(true);

      try {
        const listzoc = await Zoc.getHomelist();
        setMovieList(listzoc);

        const originals = listzoc.find(i => i.slug === 'zoc_t2');
        const chosen = originals.items.results[originals.items.results.length - 1];
        const chosenInfo = await Zoc.getMovieInfo(chosen.id);

        setFeaturedData(chosenInfo);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadAll()
  }, [])

  return (
    <div className="page">
      <Helmet>
        <title>Zap ou Calote - Home</title>
        <meta name="description" content="Clone Netflix in React" />
      </Helmet>

      {featuredData && <FeaturedMovie item={featuredData} />}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      {/* <section className="music">
        <div className="music--container">
          <div>
          <ReactPlayer
          url="https://www.youtube.com/watch?v=Yt3fpcv4tb4&embeds_euri=https%3A%2F%2Fzapoucalote.com.br%2F&feature=emb_logo&ab_channel=ThierryLucas"
          className="playerYoutube"
          controls={true}
         
          width='100%'
          
        />
          </div>

          <div >
            <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/b840f303-1c0b-461b-9a7b-6557b56d03c8-profile_image-300x300.png" alt="" />
            <h1 class="text-white mt-0">Cid Cidoso</h1>
            <a href="https://twitch.tv/cidcidoso"  target="_blank">
            <i class="bi bi-twitch"></i>
            twitch.tv/cidcidoso</a>
            </div>
        </div>
      </section> */}

      <footer>
        Feito com <span role="img" aria-label="coração">❤</span> por <a href="https://acampos.com.br" className="link" target="_blank" rel="noreferrer">Adriano Campos</a>
      </footer>

      {isLoading && (
        <div className="loading">
          <img src="https://data.whicdn.com/images/350654273/original.gif" alt="loading" />
        </div>
      )}
    </div>
  );
}

export default Home;
