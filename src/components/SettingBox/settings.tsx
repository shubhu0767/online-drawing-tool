"use-client";
import React, { useState, useEffect } from "react";
import { colors } from "@/helpers/colors";
import { COLORS, MENU_ITEMS } from "@/constant";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveColor, selectBrushSize } from "@/slices/settingSlice";
import { socket } from "@/socket";


const SettingBox = () => {
  const [showColorOptions, setShowColorOptions] = useState(true);
  const selectedMenu = useSelector((state) => state.menu.activeMenu);
  const { color, size } = useSelector((state) => state.setting[selectedMenu]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedMenu === MENU_ITEMS.ERASER) setShowColorOptions(false);
    else setShowColorOptions(true);

    socket.on("changeConfig", handleChangeConfig);

    return () => {
      socket.off("changeConfig", handleChangeConfig);
    };    
  }, [selectedMenu]);

  const handleChangeConfig = (config) => {
    dispatch(selectBrushSize({menu: config.menu, size:config.size}));
    dispatch(selectActiveColor({ menu: config.menu, color: config.color }));
  };

  function handleBrushSizeChange(num: string) {
    dispatch(selectBrushSize({ menu: selectedMenu, size: num }));
    socket.emit("changeConfig", {
      color: color,
      size: num,
      menu: selectedMenu,
    });
  }

  function handleColorChanged(color: string) {
    dispatch(selectActiveColor({ menu: selectedMenu, color: color }));
    socket.emit("changeConfig", {
      color: color,
      size: size,
      menu: selectedMenu,
    });
  }

  return (
    <div className="max-w-[200px] absolute top-[20vh] mt-5 rounded-lg ml-2 border-2 p-4">
      <div>
        {showColorOptions && (
          <>
            <label htmlFor="">Stroke Color</label>
            <div className="flex justify-around gap-4 mt-1">
              <div
                onClick={() => handleColorChanged(COLORS.RED)}
                className={`bg-red-800 ${
                  color === COLORS.RED ? "border-black" : "border-white"
                } hover:border-black border-2 p-2`}
              ></div>
              <div
                onClick={() => handleColorChanged(COLORS.BLUE)}
                className={`bg-blue-800 ${
                  color === COLORS.BLUE ? "border-black" : "border-white"
                } hover:border-black border-2 p-2`}
              ></div>
              <div
                onClick={() => handleColorChanged(COLORS.YELLOW)}
                className={`bg-yellow-300 ${
                  color === COLORS.YELLOW ? "border-black" : "border-white"
                } hover:border-black border-2 p-2`}
              ></div>
              <div
                onClick={() => handleColorChanged(COLORS.PURPLE)}
                className={`bg-purple-800 ${
                  color === COLORS.PURPLE ? "border-black" : "border-white"
                } hover:border-black border-2 p-2`}
              ></div>
              <div
                onClick={() => handleColorChanged(COLORS.BLACK)}
                className={` bg-black ${
                  color === COLORS.BLACK ? "border-black" : "border-white"
                } hover:border-black border-2 p-2`}
              ></div>
            </div>
          </>
        )}
      </div>
      <div className="mt-2">
        <label htmlFor="">Brush Size</label>
        <input
          type="range"
          value={size}
          onChange={(e) => handleBrushSizeChange(e.target.value)}
          min={1}
          max={10}
          step={1}
          name=""
          id=""
        />
      </div>
    </div>
  );
};

export default SettingBox;
