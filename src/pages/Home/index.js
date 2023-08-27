import React, { useEffect, useState } from "react";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay  } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import Zoc from "../../Zoc";
import MovieRow from '../../components/MovieRow'
import FeaturedMovie from '../../components/FeaturedMovie'
import Helmet from "react-helmet";

import ReactGA from 'react-ga';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';

import './Home.css';



const Home = () => {
  const [movieList, setMovieList] = useState([]);
  // const [featuredData, setFeaturedData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [banner, setBanner] = useState(null);
  
  useEffect(() => {

    // Rastrear a visualização da página
    ReactGA.pageview(window.location.pathname + window.location.search);
    
    const loadAll = async () => {
      setIsLoading(true);

      try {
        const listzoc = await Zoc.getHomelist();
        setMovieList(listzoc);

        const originals = listzoc.find(i => i.slug === 'zoc_t2');
        // const chosen = originals.items.results[originals.items.results.length - 1];
        // const chosenInfo = await Zoc.getMovieInfo(chosen.id);       
        // setFeaturedData(chosenInfo);

        // Obtendo o último item do array
        const ultimoItem = originals.items.results[originals.items.results.length - 1];

        // Criando uma cópia do array original sem o último item
        const arraySemUltimoItem = originals.items.results.slice(0, -1);

        // Gerando três índices aleatórios diferentes
        const randomIndices = [];
        while (randomIndices.length < 4) {
          const randomIndex = Math.floor(Math.random() * arraySemUltimoItem.length);
          if (!randomIndices.includes(randomIndex)) {
            randomIndices.push(randomIndex);
          }
        }

        // Obtendo os três itens aleatórios
        const tresItensAleatorios = randomIndices.map(index => arraySemUltimoItem[index]);

        // Combinando o último item com os três itens aleatórios
        const resultadoFinal = [ultimoItem, ...tresItensAleatorios];

        setBanner(resultadoFinal);
      
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
        <meta name="description" content="Zap ou Calote: Programa de namoro apresentado por Cid Cidoso. Site feito por fã." />
      </Helmet>

    {banner && 
      <Swiper
     
      slidesPerView={1} 
      modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay]}
      spaceBetween={50}    
      direction= "horizontal"
      pagination= {{clickable: true}}
      loop={true}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      effect="fade"
      // autoplay={{
      //   delay: 4500,
      //   disableOnInteraction: false,
      // }}
      // navigation={true}
      style={{
        "--swiper-pagination-color": "#FFFFFF",
        "--swiper-pagination-bullet-inactive-color": "#999999",
        "--swiper-pagination-bullet-inactive-opacity": "0.5",
        "--swiper-pagination-bullet-size": "12px",
        "--swiper-pagination-bullet-horizontal-gap": "6px"
      }}
    >
      {banner.map((item) => (
        <SwiperSlide key={item.id}>
          <FeaturedMovie item={item} />         
        </SwiperSlide>
      ))}    
      
    
    </Swiper>
    }
      {/* {featuredData && <FeaturedMovie item={featuredData} />} */}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>


      

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
