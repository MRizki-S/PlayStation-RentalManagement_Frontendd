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
import { RiDeleteBin3Line } from "react-icons/ri";
import { CloseIcon } from "../icons/close-icon";

interface playStation {
  id?: number;
  ps_code?: string;
  name?: string;
  price_perjam?: number;
  status?: string;
}

export default function TableInPlayStation() {
  // mendifinsikan data playStation
  const [playStation, setPlayStation] = useState<playStation[]>([]);
  // set edit data
  const [editDataPlayStation, setEditDataPlayStation] =
    useState<playStation | null>(null);
  //  set delete data
  const [deleteDataPlayStation, setDeleteDataPlayStation] =
    useState<playStation | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  // set Search
  const [searchKey, setSearchKey] = useState("");

  const [formData, setFromData] = useState({
    ps_code: "",
    name: "",
    price_perjam: "",
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
        "http://127.0.0.1:8000/api/playstation",
        formData
      );

      if (response && response.data) {
        console.log(response.data);
        onAddClose();
        setAlertMessage(response.data.message);
        setAlertVisible(true);
        const fecthUlang = await axios.get(
          "http://127.0.0.1:8000/api/playstation"
        );
        setPlayStation(fecthUlang.data);
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
  const handleEditUser = (dataPs: any) => {
    console.log(dataPs);
    setEditDataPlayStation(dataPs);
    onEditOpen();
  };
  // handle perubahan di edit data
  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditDataPlayStation({
      ...editDataPlayStation,
      [name]: value,
    });
  };
  // handle update aksi
  const handleUpdataData = async () => {
    try {
      const updateData = await axios.put(
        `http://127.0.0.1:8000/api/playstation/${editDataPlayStation?.id}`,
        editDataPlayStation
      );
      if (updateData && updateData.data) {
        console.log(updateData.data);
        onEditClose();
        setAlertMessage(updateData.data.message);
        setAlertVisible(true);
        const fecthUlang = await axios.get(
          "http://127.0.0.1:8000/api/playstation"
        );
        setPlayStation(fecthUlang.data);
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
  const handleDeleteUser = (DataDelete: any) => {
    console.log(DataDelete);
    const DataForDeleting = playStation.find(
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
        `http://127.0.0.1:8000/api/playstation/${deleteDataPlayStation?.id}`
      );
      if (deleteData && deleteData.data) {
        console.log(deleteData.data);
        onDeleteClose();
        setAlertMessage(deleteData.data.message);
        setAlertVisible(true);
        const fecthUlang = await axios.get(
          "http://127.0.0.1:8000/api/playstation"
        );
        setPlayStation(fecthUlang.data);
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

  // pencarian
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value);
  };
  // filter data sesuai dengan search pencarian
  const filteredData = playStation.filter((item) => {
    const seacrhToLower = searchKey.toLowerCase();
    return (
      item.name?.toLowerCase().includes(seacrhToLower) ||
      item.ps_code?.toLowerCase().includes(seacrhToLower) ||
      item.price_perjam?.toString().includes(seacrhToLower) ||
      item.status?.toLowerCase().includes(seacrhToLower)
    );
  });
  // fetch data playStation
  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/playstation"
        );
        console.log(response.data);
        setPlayStation(response.data);
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
          {/* <input
            type="text"
            placeholder="Search"
            className="w-72 mb-6 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 cursor-not-allowed dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
          /> */}
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
            className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
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
          <TableColumn>Ps Code</TableColumn>
          <TableColumn>Type Ps</TableColumn>
          <TableColumn>Price/Jam</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn className="text-center">Action</TableColumn>
        </TableHeader>
        <TableBody>
          {filteredData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.ps_code}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.price_perjam}</TableCell>
              <TableCell>
                <Chip
                  variant="flat"
                  color={item.status == "active" ? "success" : "danger"}
                >
                  {item.status}
                </Chip>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-4 ">
                  <div>
                    {/* Tombol untuk mengedit pengguna */}
                    <Tooltip content="Edit Data" color="warning">
                      <button onClick={() => handleEditUser(item)}>
                        <CiEdit size={26} fill="#979797"></CiEdit>
                      </button>
                    </Tooltip>
                  </div>
                  <div>
                    {/* Tombol untuk menghapus pengguna */}
                    <Tooltip content="Delete Data " color="danger">
                      <button onClick={() => handleDeleteUser(item)}>
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
                Add PLayStation
              </ModalHeader>
              <ModalBody>
                <Input
                  name="ps_code"
                  label="Ps Code"
                  type="text"
                  variant="bordered"
                  onChange={handleChange}
                />
                <select
                  name="name"
                  id="name"
                  onChange={handleChange}
                  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Select Type PlayStation</option>
                  <option value="PS 3">PS 3</option>
                  <option value="PS 4">PS 4</option>
                  <option value="PS 5">PS 5</option>
                </select>
                <Input
                  name="price_perjam"
                  label="Price/Jam"
                  type="number"
                  variant="bordered"
                  placeholder="Rp. "
                  onChange={handleChange}
                />
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
                  value={editDataPlayStation?.ps_code}
                  onChange={handleEditChange}
                />
                <select
                  name="name"
                  id="name"
                  onChange={handleEditChange}
                  value={editDataPlayStation?.name}
                  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Select Type PlayStation</option>
                  <option value="PS 3">PS 3</option>
                  <option value="PS 4">PS 4</option>
                  <option value="PS 5">PS 5</option>
                </select>
                <Input
                  name="price_perjam"
                  label="Price/Jam"
                  type="number"
                  variant="bordered"
                  placeholder="Rp. "
                  value={
                    editDataPlayStation?.price_perjam !== undefined
                      ? editDataPlayStation.price_perjam.toString()
                      : ""
                  }
                  onChange={handleEditChange}
                />
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
                <p>
                  Apakah Anda Yakin ingin menghapus data dengan PS Code:
                  <span className="text-blue-500">
                    {deleteDataPlayStation?.ps_code}
                  </span>
                </p>
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
