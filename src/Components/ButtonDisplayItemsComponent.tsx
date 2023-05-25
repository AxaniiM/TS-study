import React from "react";

interface ButtonProps {
    name: string;
    onClick: () => void
}

const ButtonDisplayItemsComponent: React.FC<ButtonProps> = ({ name, onClick }) => {

    return (
        <button onClick={onClick} className="ml-40 border-2 border-gray-500 rounded-2xl hover:bg-gray-700 bg-gray-500 text-slate-50 px-2 py-1 mt-1 ">Display {name}</button>
    )
}


export default ButtonDisplayItemsComponent;