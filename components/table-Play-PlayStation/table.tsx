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

export default function TableInPlay_PlayStation() {
  // mendifinsikan data Gamelogs yang ditambahkan di playStation
  const [play_PlayStation, setPlay_PlayStation] = useState<gameLogs[]>([]);
  //  mendefinisikan data barang dari playstation
  const [playStation_product, setplayStation_product] = useState<
    playStationProduct[]
  >([]);
  // set edit data
  const [editDataGameLogs, setEditDataGameLogs] = useState<gameLogs | null>(
    null
  );
  //  set delete data
  const [deleteDatagameLogs, setDeleteDataPlayStation] =
    useState<gameLogs | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  // set Search
  const [searchKey, setSearchKey] = useState("");

  const [formData, setFromData] = useState({
    ps_id: "",
    start_time: "",
    time_ends: "",
  });

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  // handle setiap perubahan inputan
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFromData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //  handle ketika click close alert message
  const handleAlertClose = () => {
    setAlertVisible(false);
    setAlertMessage(""); // Reset alert message
  };

  // handle event add data/submit add data
  const handleSubmitAddData = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/play-playStation",
        formData
      );

      if (response && response.data) {
        console.log(response.data);
        onAddClose();
        setAlertMessage(response.data.message);
        setAlertVisible(true);
        const fecthUlang = await axios.get(
          "http://127.0.0.1:8000/api/play-playStation"
        );
        setPlay_PlayStation(fecthUlang.data.DataGameLogs);
        setplayStation_product(fecthUlang.data.DataPlayStation);
        setTimeout(() => {
          setAlertVisible(false);
          setAlertMessage("");
        }, 5000);
      }
    } catch (error) {
      console.error("Error adding user:", error);
      setAlertMessage("Data Gagal ditambahkan!");
      setAlertVisible(true);
      onAddClose();
    }
  };

  // edit data
  // handle edit data
  const handleEditData = (dataPs: any) => {
    console.log(dataPs);
    setEditDataGameLogs(dataPs);
    onEditOpen();
  };
  // handle perubahan di edit data
  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditDataGameLogs({
      ...editDataGameLogs,
      [name]: value,
    });
  };
  // handle update aksi
  const handleUpdataData = async () => {
    try {
      const updateData = await axios.put(
        `http://127.0.0.1:8000/api/play-playStation/edit/${editDataGameLogs?.id}`,
        editDataGameLogs
      );
      if (updateData && updateData.data) {
        console.log(updateData.data);
        onEditClose();
        setAlertMessage(updateData.data.message);
        setAlertVisible(true);
        const fecthUlang = await axios.get(
          "http://127.0.0.1:8000/api/play-playStation"
        );
        setPlay_PlayStation(fecthUlang.data.DataGameLogs);
        setplayStation_product(fecthUlang.data.DataPlayStation);
        setTimeout(() => {
          setAlertVisible(false);
          setAlertMessage("");
        }, 5000);
      }
    } catch (error) {
      console.log("Error Updata Data", error);
      setAlertMessage("Data Gagal DiUbah!");
      setAlertVisible(true);
      onEditClose();
    }
  };

  // Delete Data
  // handle delete data pop up modal
  const handleDeleteData = (DataDelete: any) => {
    console.log(DataDelete);
    const DataForDeleting = play_PlayStation.find(
      (data) => data.id === DataDelete.id
    );
    if (DataForDeleting) {
      setDeleteDataPlayStation(DataDelete);
      onDeleteOpen();
    }
  };
  // handle aksi delete data
  const handleAksiDelete = async () => {
    try {
      const deleteData = await axios.delete(
        `http://127.0.0.1:8000/api/play-playStation/delete/${deleteDatagameLogs?.id}`
      );
      if (deleteData && deleteData.data) {
        console.log(deleteData.data);
        onDeleteClose();
        setAlertMessage(deleteData.data.message);
        setAlertVisible(true);
        const fecthUlang = await axios.get(
          "http://127.0.0.1:8000/api/play-playStation"
        );
        setPlay_PlayStation(fecthUlang.data.DataGameLogs);
        setplayStation_product(fecthUlang.data.DataPlayStation);
        setTimeout(() => {
          setAlertVisible(false);
          setAlertMessage("");
        }, 5000);
      }
    } catch (error) {
      console.log("Error Deleting Data: ", error);
      setAlertVisible(true);
      setAlertMessage("Data gagal DiHapus!");
    }
  };

  // State untuk mengontrol status checkbox
  const [isChecked, setIsChecked] = useState(false);
  // handle checkbox ketika sudah selesai bermain
  const handleSelesaiBermain = async (id?: number) => {
    try {
      const SelesaiBermain = await axios.post(
        `http://127.0.0.1:8000/api/play-playStation/endGame/${id}`
      );

      if (SelesaiBermain.status === 200) {
        console.log(
          `data dengan id: ${id}, berhasil diubah status permainan menjadi berakhir`
        );
        setAlertMessage(SelesaiBermain.data.message);
        setAlertVisible(true);
        const fecthUlang = await axios.get(
          "http://127.0.0.1:8000/api/play-playStation"
        );
        setPlay_PlayStation(fecthUlang.data.DataGameLogs);
        setplayStation_product(fecthUlang.data.DataPlayStation);
        setTimeout(() => {
          setAlertVisible(false);
          setAlertMessage("");
        }, 5000);
      }
    } catch (error) {
      if (error.response.status == 422) {
        console.log(error.response.data.message);
        setAlertMessage(error.response.data.message);
        setAlertVisible(true);
        setIsChecked(false);
      }
    }
  };

  // pencarian
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value);
  };
  // filter data sesuai dengan search pencarian
  const filteredData = play_PlayStation.filter((item) => {
    const seacrhToLower = searchKey.toLowerCase();
    return (
      item.start_time?.toLowerCase().includes(seacrhToLower) ||
      item.time_ends?.toLowerCase().includes(seacrhToLower)
    );
  });
  // fetch data playStation
  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/play-playStation"
        );
        console.log(response.data);
        setPlay_PlayStation(response.data.DataGameLogs);
        setplayStation_product(response.data.DataPlayStation);
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
            placeholder="Search date..."
            value={searchKey}
            onChange={handleSearchChange}
          ></Input>
        </div>
        <div>
          <Button color="primary" onPress={onAddOpen}>
            Add Data
          </Button>
        </div>
      </div>

      {/* alert */}
      {alertVisible && alertMessage && (
        <div
          id="alert-3"
          className={
            alertMessage == "Data Gagal ditambahkan!"
              ? "flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400"
              : alertMessage == "Data Gagal DiUbah!"
              ? "flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400"
              : alertMessage == "Data Gagal DiHapus!"
              ? "flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400"
              : alertMessage ==
                "Data tidak lengkap untuk mengubah status permainan!"
              ? "flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400"
              : "flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          }
          role="alert"
        >
          <svg
            className="flex-shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
            fontSize={"30"}
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div className="ms-3 text-sm font-medium">{alertMessage}</div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5"
            data-dismiss-target="#alert-3"
            aria-label="Close"
            onClick={handleAlertClose}
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}

      <Table
        color="success"
        // selectionMode="multiple"
        // defaultSelectedKeys={"2"}
        aria-label="PlayStation  static collection table"
      >
        <TableHeader>
          <TableColumn className="text-center">-</TableColumn>
          <TableColumn>PS Code</TableColumn>
          <TableColumn>Start Time</TableColumn>
          <TableColumn>Time Ends</TableColumn>
          <TableColumn>Total Price</TableColumn>
          <TableColumn>Status Game</TableColumn>
          <TableColumn className="text-center">Action</TableColumn>
        </TableHeader>
        <TableBody>
          {filteredData.map((item) => (
            // {play_PlayStation.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="text-center">
                <Checkbox
                  // checked={selectedData.some(
                  //   (selected) => selected.id === item.id
                  // )}
                  onChange={() => handleSelesaiBermain(item.id)}
                  color="success"
                />
              </TableCell>
              <TableCell>{item.play_station?.ps_code}</TableCell>
              <TableCell>{item.start_time}</TableCell>
              <TableCell>
                {item.time_ends == null ? "-" : item.time_ends}
              </TableCell>
              <TableCell>
                {item.total_price == null ? "-" : item.total_price}
              </TableCell>
              <TableCell>
                <Chip
                  variant="flat"
                  color={
                    item.status_permainan == "bermain" ? "success" : "secondary"
                  }
                >
                  {item.status_permainan}
                </Chip>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-4 ">
                  <div>
                    {/* Tombol untuk mengedit pengguna */}
                    <Tooltip content="Edit Data" color="warning">
                      <button onClick={() => handleEditData(item)}>
                        <CiEdit size={26} fill="#979797"></CiEdit>
                      </button>
                    </Tooltip>
                  </div>
                  <div>
                    {/* Tombol untuk menghapus pengguna */}
                    <Tooltip content="Delete Data " color="danger">
                      <button onClick={() => handleDeleteData(item)}>
                        <RiDeleteBin3Line size={22} fill="#ff0080" />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* modal untuk add data */}
      <Modal
        isOpen={isAddOpen}
        onOpenChange={onAddClose}
        placement="top-center"
      >
        <ModalContent>
          {(onAddClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Add Data
              </ModalHeader>
              <ModalBody>
                <select
                  name="ps_id"
                  id="ps_id"
                  onChange={handleChange}
                  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Select Type PlayStation</option>
                  {playStation_product.map((data) => (
                    <option key={data.id} value={data.id}>
                      {data.ps_code} - {data.name}
                    </option>
                  ))}
                </select>
                <div>
                  <label htmlFor="start_time">Select Start Time</label>
                  <Input
                    name="start_time"
                    id="start_time"
                    type="datetime-local"
                    variant="bordered"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="time_ends">Select Time End</label>
                  <Input
                    name="time_ends"
                    id="time_ends"
                    type="datetime-local"
                    variant="bordered"
                    onChange={handleChange}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onAddClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  // onPress={onAddClose}
                  onClick={handleSubmitAddData}
                >
                  Add Data
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* modal untuk edit data */}
      <Modal
        isOpen={isEditOpen}
        onOpenChange={onEditClose}
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
                  value={
                    editDataGameLogs?.play_station?.ps_code +
                    "-" +
                    editDataGameLogs?.play_station?.name
                  }
                  onChange={handleEditChange}
                />
                <div>
                  <label htmlFor="start_time">Select Start Time</label>
                  <Input
                    name="start_time"
                    id="start_time"
                    type="datetime-local"
                    variant="bordered"
                    value={editDataGameLogs?.start_time}
                    onChange={handleEditChange}
                  />
                </div>
                <div>
                  <label htmlFor="time_ends">Select Time End</label>
                  <Input
                    name="time_ends"
                    id="time_ends"
                    type="datetime-local"
                    variant="bordered"
                    value={
                      editDataGameLogs?.time_ends == null
                        ? ""
                        : editDataGameLogs?.time_ends
                    }
                    onChange={handleEditChange}
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
                  onClick={handleUpdataData}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* modal untuk delete data */}
      <Modal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteClose}
        placement="top-center"
      >
        <ModalContent>
          {(onDeleteClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Delete Data PLayStation
              </ModalHeader>
              <ModalBody>
                <p>Apakah Anda Yakin ingin menghapus data tersebut?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onDeleteClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={onDeleteClose}
                  onClick={handleAksiDelete}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
