import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

interface typePs {
  name: string;
  count: number;
}
interface totalOrdersPerMonth {
  bulan: string;
  count: number;
}
interface totalIncomePerMonth {
  tahun: number;
  bulan: string;
  total_pendapatan: number;
}

export default function ChartDiagram() {
  const [typePsData, setTypePsData] = useState<typePs[]>([]);
  const [totalOrdersPerMonth, setTotalOrdersPerMonth] = useState<
    totalOrdersPerMonth[]
  >([]);
  const [totalIncomePerMonth, setTotalIncomePerMonth] = useState<
    totalIncomePerMonth[]
  >([]);

  useEffect(() => {
    const fetchAllPlayStation = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/home");
        console.log(response.data);
        setTypePsData(response.data.berdasarkanType);
        setTotalOrdersPerMonth(response.data.totalOrdersPlayStationPerMonth);
        setTotalIncomePerMonth(response.data.totalIncomePerMonth);
      } catch (error) {
        console.log("error fetching  data", error);
      }
    };

    fetchAllPlayStation();
  }, []);
  const genderData = [
    { name: "Laki", data: 30 },
    { name: "Perempuan", data: 20 },
  ];
  return (
    <div>
      <div className="flex gap-5 mb-5 flex-wr">
        {/* chart 1 */}
        <Card className="bg-default-50 rounded shadow-md w-1/3">
          <CardHeader>
            <span className="text-sm">Jumlah PlayStation Berdasarkan Type</span>
          </CardHeader>
          <Divider />
          <CardBody>
            <Chart
              options={{
                chart: {
                  type: "pie",
                },
                labels: typePsData.map((item) => item.name), // Mengambil label dari data manual
                legend: {
                  position: "bottom",
                },
              }}
              series={typePsData.map((item) => item.count)} // Mengambil data dari data manual
              type="pie"
              height={300}
            />
          </CardBody>
        </Card>

        {/* chart 2 */}
        <Card className="bg-default-50 rounded shadow-md w-2/3">
          <CardHeader>
            <span className="text-sm">
              Jumlah PlayStation Yang dimainkan Setiap Bulan
            </span>
          </CardHeader>
          <Divider />
          <CardBody>
            <Chart
              // options={{
              //   chart: {
              //     type: "donut",
              //   },
              //   labels: typePsData.map((item) => item.name), // Mengambil label dari data manual
              //   legend: {
              //     position: "bottom",
              //   },
              // }}
              // series={typePsData.map((item) => item.count)} // Mengambil data dari data manual
              // type="donut"
              // height={300}
              // options={{
              //   chart: {
              //     type: "bar",
              //     stacked: true,
              //   },
              //   xaxis: {
              //     categories: totalOrdersPerMonth.map((item) => item.bulan),
              //     labels: {
              //       style: {
              //         colors: "hsl(var(--nextui-default-800))",
              //       },
              //     },
              //     axisBorder: {
              //       color: "hsl(var(--nextui-nextui-default-200))",
              //     },
              //     axisTicks: {
              //       color: "hsl(var(--nextui-nextui-default-200))",
              //     },
              //   },
              //   yaxis: {
              //     labels: {
              //       style: {
              //         colors: "hsl(var(--nextui-default-800))",
              //       },
              //     },
              //   },
              //   tooltip: {
              //     enabled: false,
              //   },
              //   grid: {
              //     show: true,
              //     borderColor: "hsl(var(--nextui-default-200))",
              //     strokeDashArray: 0,
              //     position: "back",
              //   },
              // }}
              // series={[{ data: totalOrdersPerMonth.map((item) => item.count) }]}
              // // series={[{ data: birthYearData.map((item) => item.total) }]}
              // type="bar"
              // height={300}

              series={[{ data: totalOrdersPerMonth.map((item) => item.count) }]}
              type="bar"
              height={300}
              options={{
                chart: {
                  type: "bar",
                  height: 350,
                },
                plotOptions: {
                  bar: {
                    borderRadius: 4,
                    horizontal: true,
                  },
                },
                dataLabels: {
                  enabled: false,
                },
                xaxis: {
                  categories: totalOrdersPerMonth.map((item) => item.bulan),
                },
              }}
            />
          </CardBody>
        </Card>
      </div>
      <div className="w-full mb-5">
        {/* chart income */}
        <Card className="bg-default-50 rounded shadow-md w-full">
          <CardHeader>
            <span className="text-sm">
              Jumlah PlayStation Yang dimainkan Setiap Bulan
            </span>
          </CardHeader>
          <Divider />
          <CardBody>
            <Chart
              // options={{
              //   chart: {
              //     type: "donut",
              //   },
              //   labels: typePsData.map((item) => item.name), // Mengambil label dari data manual
              //   legend: {
              //     position: "bottom",
              //   },
              // }}
              // series={typePsData.map((item) => item.count)} // Mengambil data dari data manual
              // type="donut"
              // height={300}

              // options={{
              //   chart: {
              //     type: "bar",
              //     stacked: true,
              //   },
              //   xaxis: {
              //     categories: totalIncomePerMonth.map((item) => item.bulan),
              //     labels: {
              //       style: {
              //         colors: "hsl(var(--nextui-default-800))",
              //       },
              //     },
              //     axisBorder: {
              //       color: "hsl(var(--nextui-nextui-default-200))",
              //     },
              //     axisTicks: {
              //       color: "hsl(var(--nextui-nextui-default-200))",
              //     },
              //   },
              //   yaxis: {
              //     labels: {
              //       style: {
              //         colors: "hsl(var(--nextui-default-800))",
              //       },
              //     },
              //   },
              //   tooltip: {
              //     enabled: false,
              //   },
              //   grid: {
              //     show: true,
              //     borderColor: "hsl(var(--nextui-default-200))",
              //     strokeDashArray: 0,
              //     position: "back",
              //   },
              // }}
              // series={[
              //   {
              //     data: totalIncomePerMonth.map(
              //       (item) => item.total_pendapatan
              //     ),
              //   },
              // ]}
              // type="bar"
              // height={300}

              // series={[{ data: totalIncomePerMonth.map((item) => item.total_pendapatan) }]}
              // type="bar"
              // height={300}
              // options={{
              //   chart: {
              //     type: "bar",
              //     height: 350,
              //   },
              //   plotOptions: {
              //     bar: {
              //       borderRadius: 4,
              //       horizontal: true,
              //     },
              //   },
              //   dataLabels: {
              //     enabled: false,
              //   },
              //   xaxis: {
              //     categories: totalIncomePerMonth.map((item) => item.bulan),
              //   },
              // }}

              // series={[
              //   {
              //     data: totalIncomePerMonth.map(
              //       (item) => item.total_pendapatan
              //     ),
              //   },
              // ]}
              // type="area"
              // height={300}
              // options={{
              //   chart: {
              //     type: "area",
              //     stacked: false,
              //     height: 350,
              //     zoom: {
              //       type: "x",
              //       enabled: false,
              //       autoScaleYaxis: true,
              //     },
              //     toolbar: {
              //       autoSelected: "zoom",
              //     },
              //   },
              //   dataLabels: {
              //     enabled: true,
              //   },
              //   markers: {
              //     size: 5,
              //   },
              //   fill: {
              //     type: "gradient",
              //     gradient: {
              //       shadeIntensity: 1,
              //       inverseColors: false,
              //       opacityFrom: 0.5,
              //       opacityTo: 0,
              //       stops: [0, 90, 100],
              //     },
              //   },
              //   yaxis: {
              //     // labels: {
              //     //   formatter: function (val) {
              //     //     return (val / 1000000).toFixed(0);
              //     //   },
              //     // },
              //     title: {
              //       text: "Income",
              //     },
              //   },
              //   xaxis: {
              //     categories: totalIncomePerMonth.map((item) => item.bulan),
              //   },
              // }}

              series={[
                {
                  data: totalIncomePerMonth.map(
                    (item) => item.total_pendapatan
                  ),
                },
              ]}
              type="line"
              height={300}
              options={{
                chart: {
                  height: 350,
                  type: "line",
                  zoom: {
                    enabled: false,
                  },
                },
                dataLabels: {
                  enabled: false,
                },
                stroke: {
                  curve: "straight",
                },
                title: {
                  text: "Product Trends by Month",
                  align: "left",
                },
                grid: {
                  row: {
                    colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                    opacity: 0.5,
                  },
                },
                markers: {
                  size: 5,
                },
                xaxis: {
                  categories: totalIncomePerMonth.map((item) => item.bulan),
                },
              }}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
