import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player';
import Tmdb from "../../Tmdb";
import Helmet from "react-helmet";

import './Watch.css';

const Watch = () => {

  const { id } = useParams();
  const [watchData, setWatchData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=6yzRr3SGuv0');

  useEffect(() => {
    const loadAll = async () => {
      const chosenInfo = await Tmdb.getMovieInfo(id, 'tv');
      const { videos } = chosenInfo;
      const trailer = videos.results.find(i => i.type === 'Trailer') || videos.results[0];
      
      if(trailer !== undefined) {
        handleVideoChange(trailer.site === 'YouTube' ? `https://www.youtube.com/watch?v=${trailer.key}` : `https://vimeo.com/${trailer.key}`)
      } else {
        handleVideoChange(videoUrl)
      };
      
      setWatchData(chosenInfo);
    }
    loadAll();
  }, [id,videoUrl])

  const handleVideoChange = (newVideoUrl) => {
    setVideoUrl(newVideoUrl);
    setIsPlaying(true);
  };

  return (
    <div className="page">

      {watchData && (
        <Helmet>
          <title>Netflix - {watchData.name}</title>
          <meta name="description" content="Clone Netflix in React" />
        </Helmet>
      )}

      {isPlaying ? (
        <ReactPlayer
          url={videoUrl}
          className="playerYoutube"
          controls={true}
          playing={true}
          width='100vw'
          height='100vh'
        />
      ) : (
        <div className="loading">
          <img src="https://i.gifer.com/origin/36/36527397c208b977fa3ef21f68c0f7b2_w200.gif" alt="loading" />
        </div>
      )}

    </div>
  );
}

export default Watch;
