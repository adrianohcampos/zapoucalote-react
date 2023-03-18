import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import Episodes from '../../components/Episodes';
import Extras from '../../components/Extras';
import Details from '../../components/Details';

function NavigationTabs({episodes}) {
  const [value, setValue] = useState(0);
    
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
    <Tabs value={value} onChange={handleChange} centered>
      <Tab label="Episódios" />
      {/* <Tab label="Extras" />
      <Tab label="Detalhes" /> */}
    </Tabs>
    {value === 0 && <Episodes itens={episodes} />}
    {value === 1 && <Extras />}
    {value === 2 && <Details />}
    </div>
  );
}

export default NavigationTabs;
