import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player';
import Zoc from "../../Zoc";
import Helmet from "react-helmet";

import ReactGA from 'react-ga';

import './Watch.css';

const Watch = () => {

  const { id } = useParams();
  const [watchData, setWatchData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=Yt3fpcv4tb4');

  useEffect(() => {

    // Rastrear a visualização da página
    ReactGA.pageview(window.location.pathname + window.location.search);

    const loadAll = async () => {
      const chosenInfo = await Zoc.getMovieInfo(id);

      if(chosenInfo.video_site === 'Twitch' ){
        handleVideoChange(`https://www.twitch.tv/videos/${chosenInfo.video_key}`);
      } else {
        handleVideoChange(`https://www.youtube.com/watch?v=${chosenInfo.video_key}`);
      }     

      
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
          <title>{`Zap ou Calote - ${watchData.title}`}</title>
          <meta name="description" content={watchData.overview} />
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
          config={{
            youtube: {
              playerVars: { rel: 1, iv_load_policy: 3, modestbranding:1}
            }
          }}
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
