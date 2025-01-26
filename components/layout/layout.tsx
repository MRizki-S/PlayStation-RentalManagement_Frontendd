import React from "react";
import { Navbar } from "./navbar";
import Link from "next/link";

import { TiHomeOutline } from "react-icons/ti";
import { FaPlaystation } from "react-icons/fa";
import { MdEditNote } from "react-icons/md";
import { GrHistory } from "react-icons/gr";
import { PiNotePencilBold } from "react-icons/pi";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="bg-graya-100 min-h-dvh">
      <Navbar />

      <div className="flex items-start gap-4 justify-start min-h-screen">
        <aside className="bg-white w-60 px-4 pt-20 rounded shadow-md min-h-dvh sticky top-0 left-0 bottom-0 sidebar z-[998]">
          <Link
            href={"/"}
            className="flex gap-3 items-center hover:bg-blue-200 hover:text-blue-800 rounded-lg p-2.5"
          >
            <TiHomeOutline className="text-xl" />
            <span>Home</span>
          </Link>
          <p className="text-sm border-b-a2 w-full pb-1 text-gray-700 mx-2 mt-5 mb-2">
            Main Menu
          </p>
          <Link
            href={"/playstation"}
            className="flex gap-3 items-center hover:bg-blue-200 hover:text-blue-800 rounded-lg p-2.5"
          >
            <FaPlaystation className="text-xl" />
            <span>PlayStations</span>
          </Link>
          <Link
            href={"/play-playstation"}
            className="flex gap-3 items-center hover:bg-blue-200 hover:text-blue-800 rounded-lg p-2.5"
          >
            <PiNotePencilBold className="text-xl" />
            <span>Play PlayStation</span>
          </Link>
          <Link
            href={"/game-logs"}
            className="flex gap-3 items-center hover:bg-blue-200 hover:text-blue-800 rounded-lg p-2.5"
          >
            <GrHistory className="text-xl" />
            <span>Game Logs</span>
          </Link>
        </aside>
        <main className="flex-1 bg-greena-600 mr-3 ml-3 min-h-screean pt-20">
          {children}
        </main>
      </div>
    </div>
  );
}
