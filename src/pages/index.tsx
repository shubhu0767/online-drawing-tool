import Image from "next/image";
import { Inter } from "next/font/google";
import MenuBar from "@/components/Menu/menu";
import SettingBox from "@/components/SettingBox/settings";
import Board from "@/components/Board";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <MenuBar />
      <SettingBox />
      <Board />
    </>
  );
}
