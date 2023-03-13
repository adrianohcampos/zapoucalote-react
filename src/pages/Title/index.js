import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tmdb from "../../Tmdb";
import FeaturedMovie from '../../components/FeaturedMovie'

const Title = () => {

  const { id } = useParams();
  const [watchData, setWatchData] = useState(null);

  useEffect(() => {
    const fetchWatchData = async () => {
      const chosenInfo = await Tmdb.getMovieInfo(id, 'tv');
      setWatchData(chosenInfo);
    };

    fetchWatchData();
  }, [id]);

  return (
    <div className="page">
      {watchData && <FeaturedMovie item={watchData} />}
      <footer>
        Feito com <span role="img" aria-label="coração">❤</span> by Adriano Campos
      </footer>
    </div>
  );
}

export default Title;
