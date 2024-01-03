"use-client";
import React, { useState, useEffect } from "react";
import { colors } from "@/helpers/colors";
import { MENU_ITEMS } from "@/constant";
import { useSelector } from "react-redux";

const SettingBox = () => {
  const [selectedColor, setSelectedColor] = useState(1);
  const [showColorOptions, setShowColorOptions] = useState(true);
  const selectedMenu = useSelector((state) => state.menu.activeMenu);

  useEffect(() => {    
    if (selectedMenu === MENU_ITEMS.ERASER) 
      setShowColorOptions(false);
    else setShowColorOptions(true);
  }, [selectedMenu]);

  return (
    <div className="max-w-[200px] absolute top-[20vh] mt-5 rounded-lg ml-2 border-2 p-4">
      <div>
        {showColorOptions && (
          <>
            <label htmlFor="">Stroke Color</label>
            <div className="flex justify-around gap-4 mt-1">
              {/* {colors.map((color) => (
                <div
                  key={color.id}
                  onClick={() => setSelectedColor(color.id)}
                  className={`${color?.bgColor} ${
                    selectedColor === color.id ? "border-black" : "border-white"
                  } hover:border-black border-2 p-2`}
                ></div>
                ))} */}
              <div
                onClick={() => setSelectedColor(1)}
                className={`bg-red-800 ${
                  selectedColor === 1 ? "border-black" : "border-white"
                } hover:border-black border-2 p-2`}
              ></div>
              <div
                onClick={() => setSelectedColor(2)}
                className={`bg-blue-800 ${
                  selectedColor === 2 ? "border-black" : "border-white"
                } hover:border-black border-2 p-2`}
              ></div>
              <div
                onClick={() => setSelectedColor(3)}
                className={`bg-yellow-300 ${
                  selectedColor === 3 ? "border-black" : "border-white"
                } hover:border-black border-2 p-2`}
              ></div>
              <div
                onClick={() => setSelectedColor(4)}
                className={`bg-purple-800 ${
                  selectedColor === 4 ? "border-black" : "border-white"
                } hover:border-black border-2 p-2`}
              ></div>
              <div
                onClick={() => setSelectedColor(5)}
                className={` bg-black ${
                  selectedColor === 5 ? "border-black" : "border-white"
                } hover:border-black border-2 p-2`}
              ></div>
            </div>
          </>
        )}
      </div>
      <div className="mt-2">
        <label htmlFor="">Brush Size</label>
        <input type="range" name="" id="" />
      </div>
    </div>
  );
};

export default SettingBox;
