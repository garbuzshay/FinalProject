

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
  const { museum, exhibitions, isLoading, error } = useMuseumContext();
  const planDetails = usePlanContext();
  const [chartData, setChartData] = useState({
    pieData: null,
    barData: null,
    doughnutData: null,
    lineData: null,
    closedExhibitionsCount: 0,
  });

  const [creationTrend, setCreationTrend] = useState({}); // Use state for creationTrend

  useEffect(() => {
    if (!isLoading && museum && planDetails) {
      const totalMaxExhibitions = planDetails.maxExhibitions || 0;
      const totalMaxArtworks = planDetails.maxArtWorks || 0;
      const openExhibitions = exhibitions.filter(
        (exhibition) => exhibition.status === "open"
      );
      const closedExhibitions = exhibitions.filter(
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
          `Current open Exhibitions (${currentExhibitions})`,
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

      const barColors = exhibitions.map(() => getRandomColor());

      const barData = {
        labels: exhibitions.map(
          (exhibition) => `${exhibition.name} (${exhibition.artworks.length} artworks)`
        ),
        datasets: [
          {
            label: "Number of Artworks",
            data: exhibitions.map(
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

      // Fill creationTrend and lineData
      const newCreationTrend = exhibitions.reduce((acc, exhibition) => {
        const date = new Date(exhibition.createdAt).toLocaleDateString();
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(exhibition); // Store each exhibition created on the date
        return acc;
      }, {});

      setCreationTrend(newCreationTrend); // Update the creationTrend state

      const lineData = {
        labels: Object.keys(newCreationTrend),
        datasets: [
          {
            label: "Exhibitions Created Over Time",
            data: Object.values(newCreationTrend).map(
              (exhibitionsOnDate) => exhibitionsOnDate.length
            ), // Count of exhibitions on each date
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
  }, [isLoading, museum, planDetails, exhibitions]); // Add exhibitions as a dependency

  // Custom tooltip options for the pie chart
  const pieChartOptions = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            // Show only the value in the tooltip
            return `${context.raw}`;
          },
        },
      },
    },
  };

  const barChartOptions = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const exhibition = exhibitions[context.dataIndex];
            const artworks = exhibition.artworks.length;
            const maxArtworks = exhibition.maxArtworks || "N/A"; // Assuming maxArtworks exists
            return `${artworks} artworks / ${maxArtworks}`;
          },
        },
      },
    },
  };

  const doughnutChartOptions = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.raw}`;
          },
        },
      },
    },
  };

  // Tooltip for the line chart to include exhibition names and artwork count
  const lineChartOptions = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const date = context.label;
            const exhibitionsOnDate = creationTrend[date] || [];
            const exhibitionDetails = exhibitionsOnDate
              .map((exhibition) => {
                const artworks = exhibition.artworks.length;
                return `${exhibition.name}: ${artworks} artworks`;
              })
              .join("\n");
            return `${exhibitionDetails}`;
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
          <div className="bg-white p-2 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-lg md:text-xl font-bold mb-2 text-center">
              Current vs Max Exhibitions
            </h2>
            <div className="relative h-full w-full flex justify-center items-center">
              <div className="relative h-52 w-full md:w-3/4 lg:w-2/3">
                <Pie data={chartData.pieData} options={pieChartOptions} />
              </div>
            </div>
            <div className="text-center mt-2">
              <span className="text-black font-bold">
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
              <Bar data={chartData.barData} options={barChartOptions} />
            </div>
          </div>
        )}
        {chartData.doughnutData && (
          <div className="bg-white p-2 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2 text-center">
              Free vs Existing Artworks Space
            </h2>
            <div className="h-64">
              <Doughnut data={chartData.doughnutData} options={doughnutChartOptions} />
            </div>
          </div>
        )}
        {chartData.lineData && (
          <div className="bg-white p-2 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2 text-center">
              Exhibitions Creation Trend
            </h2>
            <div className="h-64">
              <Line data={chartData.lineData} options={lineChartOptions} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MuseumOwnerDashboard;
