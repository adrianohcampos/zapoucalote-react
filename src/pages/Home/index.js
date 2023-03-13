import React, { useEffect, useState } from "react";
import Tmdb from "../../Tmdb";
import Zoc from "../../Zoc";
import MovieRow from '../../components/MovieRow'
import FeaturedMovie from '../../components/FeaturedMovie'
import Helmet from "react-helmet";

import './Home.css';

const Home = () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      setIsLoading(true);
      const listzoc = await Zoc.getHomelist();
      console.log(listzoc)
      try {
        const list = await Tmdb.getHomelist();
        setMovieList(listzoc);

        const originals = listzoc.find(i => i.slug === 'zoc_t2');
        const randomChosen = Math.floor(Math.random() * (originals.items.results.length - 1));
        const chosen = originals.items.results[originals.items.results.length - 1];
        const chosenInfo = await Zoc.getMovieInfo(chosen.id, 'tv');
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
        <title>Netflix - Home</title>
        <meta name="description" content="Clone Netflix in React" />
      </Helmet>

      {featuredData && <FeaturedMovie item={featuredData} />}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Feito com <span role="img" aria-label="coração">❤</span> by Adriano Campos
      </footer>

      {isLoading && (
        <div className="loading">
          <img src="https://i.gifer.com/origin/36/36527397c208b977fa3ef21f68c0f7b2_w200.gif" alt="loading" />
        </div>
      )}
    </div>
  );
}

export default Home;
