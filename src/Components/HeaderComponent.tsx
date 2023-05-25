import React, { useState, useRef, useEffect } from 'react';

interface NavigationItem {
  id: number;
  name: string;
  link: string;
  subMenu?: NavigationItem[];
}

interface HeaderProps {
  navData: NavigationItem[];
}

const HeaderComponent: React.FC<HeaderProps> = ({ navData }) => {
  const [activeSubMenu, setActiveSubMenu] = useState<number | null>(null);
  const submenuTimeoutRef = useRef<number | null>(null);

  const handleMouseEnter = (itemId: number) => {
    setActiveSubMenu(itemId);
    clearTimeout(submenuTimeoutRef.current!);
  };

  const handleMouseLeave = () => {
    submenuTimeoutRef.current = window.setTimeout(() => {
      setActiveSubMenu(null);
    }, 100);
  };

  const renderSubMenu = (subMenu: NavigationItem[] | undefined) => {
    if (!subMenu) return null;

    return (
      <ul className="absolute  left-0 mt-2 py-2 bg-yellow-500 shadow-md rounded w-[200px]">
        {subMenu.map((item) => (
          <li key={item.id} className=" px-4 py-2 w-50 hover:bg-red-500 hover:border-2 hover:border-red-700
           hover:text-white rounded">
            <a href={item.link}>{item.name}</a>
          </li>
        ))}
      </ul>
    );
  };

  useEffect(() => {
    return () => {
      clearTimeout(submenuTimeoutRef.current! );
    };
  }, []);

  return (
    <nav className="ml-[300px] mt-20 border-2 rounded-3xl w-[800px]">
      <ul className="flex justify-around">
        {navData.map((item) => (
          <li
            key={item.id}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={handleMouseLeave}
            className="relative py-2"
          >
            <a className= "hover:bg-red-500 hover:text-white hover:border-red-600 hover:border-2 border-transparent border-2 text-xl text-blue-800 rounded py-1 transition-colors delay-75 duration-100"
            href={item.link}>{item.name}</a>
            {activeSubMenu === item.id && renderSubMenu(item.subMenu)}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export { HeaderComponent };
