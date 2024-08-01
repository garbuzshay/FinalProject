import React, { useEffect, useState } from "react";
import { Pie, Bar, Doughnut, Line } from "react-chartjs-2";
import { useMuseumContext, usePlanContext } from "../../contexts/MuseumContext";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const MuseumOwnerDashboard = () => {
  const { museum, isLoading, error } = useMuseumContext();
  const planDetails = usePlanContext();
  const [chartData, setChartData] = useState({
    pieData: null,
    barData: null,
    doughnutData: null,
    lineData: null,
    closedExhibitionsCount: 0,
  });

  useEffect(() => {
    if (!isLoading && museum && planDetails) {
      const totalMaxExhibitions = planDetails.maxExhibitions || 0;
      const totalMaxArtworks = planDetails.maxArtWorks || 0;
      const openExhibitions = museum.exhibitions.filter(
        (exhibition) => exhibition.status === "open"
      );
      const closedExhibitions = museum.exhibitions.filter(
        (exhibition) => exhibition.status !== "open"
      );
      const closedExhibitionsCount = closedExhibitions.length;
      const currentExhibitions = openExhibitions.length;
      const currentArtworks = openExhibitions.reduce(
        (acc, exhibition) => acc + exhibition.artworks.length,
        0
      );
      const freeArtworksSpace = totalMaxArtworks - currentArtworks;

      const pieData = {
        labels: [
          `Current Exhibitions (${currentExhibitions})`,
          `Remaining Exhibitions (${totalMaxExhibitions - currentExhibitions})`,
        ],
        datasets: [
          {
            data: [
              currentExhibitions,
              totalMaxExhibitions - currentExhibitions,
            ],
            backgroundColor: ["#36A2EB", "#FF6384"],
            hoverBackgroundColor: ["#36A2EB", "#FF6384"],
          },
        ],
      };

      const barColors = museum.exhibitions.map(() => getRandomColor());

      const barData = {
        labels: museum.exhibitions.map(
          (exhibition) => `${exhibition.name} (${exhibition.artworks.length})`
        ),
        datasets: [
          {
            label: "Number of Artworks",
            data: museum.exhibitions.map(
              (exhibition) => exhibition.artworks.length
            ),
            backgroundColor: barColors,
            hoverBackgroundColor: barColors,
          },
        ],
      };

      const doughnutData = {
        labels: [
          `Current Artworks (${currentArtworks})`,
          `Free Artworks Space (${freeArtworksSpace})`,
        ],
        datasets: [
          {
            data: [currentArtworks, freeArtworksSpace],
            backgroundColor: ["#FFCE56", "#FF6384"],
            hoverBackgroundColor: ["#FFCE56", "#FF6384"],
          },
        ],
      };

      const creationTrend = museum.exhibitions.reduce((acc, exhibition) => {
        const date = new Date(exhibition.createdAt).toLocaleDateString();
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date]++;
        return acc;
      }, {});

      const lineData = {
        labels: Object.keys(creationTrend),
        datasets: [
          {
            label: "Exhibitions Created Over Time",
            data: Object.values(creationTrend),
            fill: false,
          },
        ],
      };

      setChartData({
        pieData,
        barData,
        doughnutData,
        lineData,
        closedExhibitionsCount,
      });
    }
  }, [isLoading, museum, planDetails]);

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || "";
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Museum Owner Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chartData.pieData && (
          <div className="bg-white p-2 rounded-lg shadow-md flex justify-center items-center">
            <div className="h-52 w-2/3">
              <h2 className="text-lg font-bold mb-2 text-center">
                Current vs Max Exhibitions
              </h2>
              <Pie data={chartData.pieData} options={chartOptions} />
            </div>
            <div className="ml-4 text-center">
              <span style={{ color: "#000000", fontWeight: "bold" }}>
                Closed Exhibitions ({chartData.closedExhibitionsCount})
              </span>
            </div>
          </div>
        )}
        {chartData.barData && (
          <div className="bg-white p-2 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2 text-center">
              Number of Artworks per Exhibition
            </h2>
            <div className="h-64">
              <Bar data={chartData.barData} options={chartOptions} />
            </div>
          </div>
        )}
        {chartData.doughnutData && (
          <div className="bg-white p-2 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2 text-center">
              Free vs Existing Artworks Space
            </h2>
            <div className="h-64">
              <Doughnut data={chartData.doughnutData} options={chartOptions} />
            </div>
          </div>
        )}
        {chartData.lineData && (
          <div className="bg-white p-2 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2 text-center">
              Exhibitions Creation Trend
            </h2>
            <div className="h-64">
              <Line data={chartData.lineData} options={chartOptions} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MuseumOwnerDashboard;



