"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Checkbox,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { PiNotePencilBold } from "react-icons/pi";
import { RiDeleteBin3Line } from "react-icons/ri";
import { CloseIcon } from "../icons/close-icon";

interface gameLogs {
  id?: number;
  start_time?: string;
  time_ends?: string;
  total_price?: number;
  status_permainan?: string;
  play_station?: {
    ps_code?: string;
    name?: string;
  };
}

interface playStationProduct {
  id?: number;
  ps_code?: string;
  name?: string;
  price_perjam?: number;
  status?: string;
}

export default function TableInGameLogs() {
  // mendifinsikan data Gamelogs yang ditambahkan di playStation
  const [gameLogs, setgameLogs] = useState<gameLogs[]>([]);
  //  mendefinisikan data barang dari playstation
  const [playStation_product, setplayStation_product] = useState<
    playStationProduct[]
  >([]);
  // set Search
  const [searchKey, setSearchKey] = useState("");

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  // pencarian
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value);
  };
  // filter data sesuai dengan search pencarian
  const filteredData = gameLogs.filter((item) => {
    const seacrhToLower = searchKey.toLowerCase();
    return (
      item.play_station?.ps_code?.toLowerCase().includes(seacrhToLower) ||
      item.start_time?.toLowerCase().includes(seacrhToLower) ||
      item.time_ends?.toLowerCase().includes(seacrhToLower)
    );
  });
  // fetch data playStation
  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/gameLogs");
        console.log(response.data);
        setgameLogs(response.data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fecthData();
  }, []);

  return (
    <div className="w-full bg-reds-300 flex flex-col gap-4">
      {/* for search dan add data */}
      <div className="flex justify-between">
        <div>
          <Input
            type="text"
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            color={"default"}
            className="w-72 outline-none"
            variant="bordered"
            placeholder="Search..."
            value={searchKey}
            onChange={handleSearchChange}
          ></Input>
        </div>
      </div>

      <Table
        color="success"
        // selectionMode="multiple"
        // defaultSelectedKeys={"2"}
        aria-label="PlayStation static collection table"
      >
        <TableHeader>
          <TableColumn className="text-center">PS Code</TableColumn>
          <TableColumn className="text-center">Start Time</TableColumn>
          <TableColumn className="text-center">Time Ends</TableColumn>
          <TableColumn className="text-center">Total Price</TableColumn>
          <TableColumn className="text-center">Status Game</TableColumn>
        </TableHeader>
        <TableBody>
          {filteredData.map((item) => (
            // {/* {gameLogs.map((item) => ( */}
            <TableRow key={item.id}>
              <TableCell className="text-center cursor-pointer">
                <Tooltip content={item.play_station?.name} color="primary">
                  <div>{item.play_station?.ps_code}</div>
                </Tooltip>
              </TableCell>
              <TableCell className="text-center">{item.start_time}</TableCell>
              <TableCell className="text-center">
                {item.time_ends == null ? "-" : item.time_ends}
              </TableCell>
              <TableCell className="text-center">
                {item.total_price == null ? "-" : item.total_price}
              </TableCell>
              <TableCell className="text-center">
                <Chip
                  variant="flat"
                  color={
                    item.status_permainan == "bermain" ? "success" : "primary"
                  }
                >
                  {item.status_permainan}
                </Chip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* modal untuk edit data */}
      <Modal
        // isOpen={isEditOpen}
        // onOpenChange={onEditClose}
        placement="top-center"
      >
        <ModalContent>
          {(onEditClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Edit Data PLayStation
              </ModalHeader>
              <ModalBody>
                <Input
                  name="ps_code"
                  label="Ps Code"
                  type="text"
                  variant="bordered"
                  readOnly
                  disabled
                  // value={
                  //   editDataGameLogs?.play_station?.ps_code +
                  //   "-" +
                  //   editDataGameLogs?.play_station?.name
                  // }
                  // onChange={handleEditChange}
                />
                <div>
                  <label htmlFor="start_time">Select Start Time</label>
                  <Input
                    name="start_time"
                    id="start_time"
                    type="datetime-local"
                    variant="bordered"
                    // value={editDataGameLogs?.start_time}
                    // onChange={handleEditChange}
                  />
                </div>
                <div>
                  <label htmlFor="time_ends">Select Time End</label>
                  <Input
                    name="time_ends"
                    id="time_ends"
                    type="datetime-local"
                    variant="bordered"
                    // value={
                    //   editDataGameLogs?.time_ends == null
                    //     ? ""
                    //     : editDataGameLogs?.time_ends
                    // }
                    // onChange={handleEditChange}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onEditClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={onEditClose}
                  // onClick={handleUpdataData}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
