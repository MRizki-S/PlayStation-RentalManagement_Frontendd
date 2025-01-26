"use client";
import React, { useEffect } from "react";
import Cards from "./card";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";
import axios from "axios";
import ChartDiagram from "./chart";
import { Toaster, toast } from "sonner";

export default function MainHome() {
  const genderData = [
    { name: "Laki", data: 30 },
    { name: "Perempuan", data: 20 },
  ];

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      // alert("ada");
      toast.success("Login Successful", { duration: 5000 });
      localStorage.removeItem("isLoggedIn");
    }
  }, []);

  return (
    <div className="h-full bg-yellow-500a">
      <Toaster richColors position="top-right" />
      <div className="flex flex-col">
        <div className="mt-3 flex bg-limea-200 flex-wrap gap-9 w-full justify-evenlya">
          <Cards />
        </div>
        <div className="mt-5 w-full">
          <ChartDiagram />
        </div>
      </div>
    </div>
  );
}
