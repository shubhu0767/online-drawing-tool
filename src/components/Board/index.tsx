"use-client";

import { MENU_ITEMS } from "@/constant";
import { selectActionMenuItem } from "@/slices/menu.slice";
import { selectBrushSize } from "@/slices/settingSlice";
import { socket } from "@/socket";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";


const Board = () => {
  const canvasRef = useRef(null);
  const shouldDraw = useRef(false);
  const drawHistory = useRef([]);
  const historyPointer = useRef(0);
  const dispatch = useDispatch();
  const { activeMenu, actionMenu } = useSelector((state) => state.menu);
  const { color, size } = useSelector((state) => state.setting[activeMenu]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (actionMenu === MENU_ITEMS.DOWNLOAD) {
      const URL = canvas.toDataURL();
      const anchor = document.createElement("a");
      anchor.href = URL;
      anchor.download = "sketch.jpg";
      anchor.click();
    } else if (actionMenu === MENU_ITEMS.UNDO || actionMenu === MENU_ITEMS.REDO) {
      if (historyPointer.current > 0 && actionMenu === MENU_ITEMS.UNDO) historyPointer.current -= 1
      if (historyPointer.current < drawHistory.current.length - 1 && actionMenu === MENU_ITEMS.REDO) historyPointer.current += 1
      const imageData = drawHistory.current[historyPointer.current]
      context.putImageData(imageData, 0, 0);
    }
    dispatch(selectActionMenuItem(null));
  }, [actionMenu]);

  useEffect(() => {
    console.log('change config');
    
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const changeConfig = () => {
      context.strokeStyle = color;
      context.lineWidth = size;
    };

    changeConfig();
  }, [color, size]);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // when mounting
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const beginPath = (x: number, y: number) => {
      context.beginPath();
      context.moveTo(x, y);
    };

    const drawLine = (x: number, y: number) => {
      context.lineTo(x, y);
      context.stroke();
    };

    const handleMouseDown = (e: MouseEvent) => {
      shouldDraw.current = true;
      beginPath(e.clientX, e.clientY);
      socket.emit('beginPath', {x: e.clientX, y: e.clientY});
    };
    const handleMouseUp = (e: MouseEvent) => {
      shouldDraw.current = false;
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      drawHistory.current.push(imageData);
      historyPointer.current = drawHistory.current.length - 1;
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!shouldDraw.current) return;
      drawLine(e.clientX, e.clientY);
      socket.emit('drawLine', {x: e.clientX, y: e.clientY});
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);

    socket.on('beginPath', (data) => {
      beginPath(data.x, data.y);
      context.moveTo(data.x, data.y);
    });

    socket.on('drawLine', (data) => {
      drawLine(data.x, data.y);
      context.moveTo(data.x, data.y);
    });

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return <canvas ref={canvasRef}></canvas>;
};

export default Board;
