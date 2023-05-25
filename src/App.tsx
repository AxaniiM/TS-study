import React from 'react';
import { HeaderComponent } from './HeaderComponent';
import navData from './data-object.json'
import FetchData from './FetchData';
import FetchAxios from './FetchDataAXIOS';

import './App.css';

interface NavigationItem {
  id: number;
  name: string;
  technicalName: string;
  link: string;
  subMenu: NavigationItem[]
}

const App: React.FC = () => {
  const parsedNavData: NavigationItem[] = navData.navDataJSON.map((item: any) => {
    if (item.subMenu) {
      return {
        id: item.id,
        name: item.name,
        link: item.link,
        subMenu: item.subMenu.map((subItem: any) => ({
          id: subItem.id,
          name: subItem.name,
          link: subItem.link,
        })),
      };
    }
    return item;
  });

  return (
    <>
      <HeaderComponent navData={parsedNavData}/>
      <FetchData />
      <FetchAxios />

    </>
  );
}

export default App;
