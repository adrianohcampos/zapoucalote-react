import React from 'react';
import MovieRow from '../../components/MovieRow'

function Episodes({itens}) { 
  return (
    <div>     
        {itens && itens.map((item, key) => (
          <MovieRow title={item.title} items={item.items} />
        ))}     
    </div>
  );
}

export default Episodes;
