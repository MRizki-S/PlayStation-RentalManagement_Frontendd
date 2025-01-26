import React from "react";
import { TiHomeOutline } from "react-icons/ti";
import { PiNotePencilBold } from "react-icons/pi";
import Link from "next/link";
import { MdEditNote } from "react-icons/md";
import TableInPlay_PlayStation from "../table-Play-PlayStation/table";

export default function Play_PLayStation() {
  return (
    <div className="lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ul className="flex gap-1">
        <li className="flex gap-2 items-center">
          <TiHomeOutline className="text-lg" />
          <Link href={"/"}>
            <span>Home</span>
          </Link>
          <span> / </span>{" "}
        </li>

        <li className="flex gap-2 items-center">
          <PiNotePencilBold className="text-lg" />
          <span>Play PlayStation</span>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2 items-center">
          <span>List</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">PlayStations</h3>
      <div className="bg-graay-600 w-full py-5">
        <TableInPlay_PlayStation />
      </div>
    </div>
  );
}
