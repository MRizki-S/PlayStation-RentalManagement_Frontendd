import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FaPlaystation } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaCartArrowDown } from "react-icons/fa6";
import axios from "axios";

export default function Cards() {
  const [allPlayStation, setAllPlayStation] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalOrdersThisMonth, setTotalOrdersThisMonth] = useState(0);

  useEffect(() => {
    const fetchAllPlayStation = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/home");
        // console.log(response.data);
        setAllPlayStation(response.data.totalPlayStation);
        setTotalIncome(response.data.totalIncome);
        setTotalOrdersThisMonth(response.data.totalOrdersThisMonth);
      } catch (error) {
        console.log("error fetching  data", error);
      }
    };

    fetchAllPlayStation();
  }, []);
  return (
    <>
      <Card className="bg-[#44dcbb] rounded shadow-lg w-72 h-28">
        <CardBody className="py-5">
          <div className="flex gap-2 px-1 justify-between items-center">
            <div className="flex flex-col  justify-center items-center">
              <p className="text-2xl text-white font-bold">{allPlayStation}</p>
              <span className="text-white">All PlayStations</span>
            </div>
            <div className="bg-white rounded-sm p-2.5 shadow-md">
              <FaPlaystation size={45} color="#44dcbb"></FaPlaystation>
            </div>
          </div>
        </CardBody>
      </Card>
      <Card className="bg-yellow-300 rounded shadow-lg w-72 h-28">
        <CardBody className="py-5">
          <div className="flex gap-2 px-1 justify-between items-center">
            <div className="flex flex-col  justify-center items-center">
              <p className="text-2xl text-white font-bold">Rp. {totalIncome}</p>
              <span className="text-white text-gray-600a">Total Income</span>
            </div>
            <div className="bg-white rounded-sm p-2.5 shadow-md">
              <FaMoneyBillTrendUp size={45} color="gold"></FaMoneyBillTrendUp>
            </div>
          </div>
        </CardBody>
      </Card>
      <Card className="bg-red-400 rounded shadow-lg w-72 h-28">
        <CardBody className="py-5">
          <div className="flex gap-2 px-1 justify-between items-center">
            <div className="flex flex-col text-center justify-center items-center">
              <p className="text-2xl text-white font-bold">
                {totalOrdersThisMonth}
              </p>
              <span className="text-white text-sm">Total Orders This Month</span>
            </div>
            <div className="bg-white rounded-sm p-2.5 shadow-md">
              <FaCartArrowDown size={45} color="red"></FaCartArrowDown>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
