"use-client";
import { MENU_ITEMS } from "@/constant";
import { menu } from "@/helpers/menu";
import {
  selectActionMenuItem,
  selectActiveMenuItem,
} from "@/slices/menu.slice";
import React, { Fragment, useState } from "react";
import { FaPencilAlt, FaEraser, FaFileDownload } from "react-icons/fa";
import { RiArrowGoForwardFill, RiArrowGoBackFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

const MenuBar = () => {
  const selectedMenu = useSelector((state) => state.menu.activeMenu);
  const dispatch = useDispatch();


  const handleSelectOption = (menuName: string) => {
    if (MENU_ITEMS.ERASER === menuName || MENU_ITEMS.PENCIL === menuName) {
      dispatch(selectActiveMenuItem(menuName));
    } else {
      dispatch(selectActionMenuItem(menuName));
    }
  };

  return (
    <div className="flex absolute left-[40vw] max-w-xs mt-6 gap-2 justify-center ">
      {/* {menu.map((item) => {
        return (
        <Fragment key={item.id}>
          <button
            onClick={() => handleSelectOption(item.id)}
            className={`p-4 border-2 cursor-pointer ${
              selectedMenu === item.id && "bg-slate-200"
            } hover:bg-slate-300`}
          >
            <{item.name} />
          </button>
        </Fragment>
      )})} */}
      <button
        onClick={() => handleSelectOption(MENU_ITEMS.PENCIL)}
        className={`p-4 border-2 cursor-pointer ${
          selectedMenu === MENU_ITEMS.PENCIL && "bg-slate-200"
        } hover:bg-slate-300`}
      >
        <FaPencilAlt />
      </button>
      <button
        onClick={() => handleSelectOption(MENU_ITEMS.ERASER)}
        className={`p-4 border-2 cursor-pointer ${
          selectedMenu === MENU_ITEMS.ERASER && "bg-slate-200"
        } hover:bg-slate-300`}
      >
        <FaEraser />
      </button>
      <button
        onClick={() => handleSelectOption(MENU_ITEMS.UNDO)}
        className={`p-4 border-2 cursor-pointer ${
          selectedMenu === MENU_ITEMS.UNDO && "bg-slate-200"
        } hover:bg-slate-300`}
      >
        <RiArrowGoBackFill />
      </button>
      <button
        onClick={() => handleSelectOption(MENU_ITEMS.REDO)}
        className={`p-4 border-2 cursor-pointer ${
          selectedMenu === MENU_ITEMS.REDO && "bg-slate-200"
        } hover:bg-slate-300`}
      >
        <RiArrowGoForwardFill />
      </button>
      <button
        onClick={() => handleSelectOption(MENU_ITEMS.DOWNLOAD)}
        className={`p-4 border-2 cursor-pointer ${
          selectedMenu === MENU_ITEMS.DOWNLOAD && "bg-slate-200"
        } hover:bg-slate-300`}
      >
        <FaFileDownload />
      </button>
    </div>
  );
};

export default MenuBar;
