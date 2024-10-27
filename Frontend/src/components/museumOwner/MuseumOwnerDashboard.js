// import React, { useEffect, useState } from "react";
// import { Pie, Bar, Doughnut, Line } from "react-chartjs-2";
// import { useMuseumContext, usePlanContext } from "../../contexts/MuseumContext";
// import { useThemeMode } from "../../contexts/DarkModeContext";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   Title,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement,
// } from "chart.js";

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   Title,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement
// );

// // Predefined color palettes for light and dark modes
// const lightModeColors = {
//   pie: ["#36A2EB", "#FF6384"],
//   doughnut: ["#FFCE56", "#FF6384"],
//   bar: ["#4BC0C0", "#9966FF", "#FF9F40", "#FF6384", "#36A2EB", "#FFCD56"],
// };

// const darkModeColors = {
//   pie: ["#4A90E2", "#E74C3C"],
//   doughnut: ["#F1C40F", "#E74C3C"],
//   bar: ["#1ABC9C", "#9B59B6", "#F39C12", "#E74C3C", "#3498DB", "#F39C12"],
// };

// // Function to generate random colors for bar charts if needed
// const getRandomColor = (isDarkMode) => {
//   const letters = "0123456789ABCDEF";
//   let color = "#";
//   for (let i = 0; i < 6; i++) {
//     if (isDarkMode) {
//       // Generate darker shades by limiting to lower half of hex digits
//       color += letters[Math.floor(Math.random() * 8)];
//     } else {
//       // Generate lighter shades
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//   }
//   return color;
// };

// const MuseumOwnerDashboard = () => {
//   const { museum, exhibitions, isLoading, error } = useMuseumContext();
//   const planDetails = usePlanContext();
//   const { isDarkMode } = useThemeMode();

//   const [chartData, setChartData] = useState({
//     pieData: null,
//     barData: null,
//     doughnutData: null,
//     lineData: null,
//     closedExhibitionsCount: 0,
//   });

//   const [creationTrend, setCreationTrend] = useState({}); // Use state for creationTrend

//   useEffect(() => {
//     if (!isLoading && museum && planDetails) {
//       const totalMaxExhibitions = planDetails.maxExhibitions || 0;
//       const totalMaxArtworks = planDetails.maxArtWorks || 0;
//       const openExhibitions = exhibitions.filter(
//         (exhibition) => exhibition.status === "open"
//       );
//       const closedExhibitions = exhibitions.filter(
//         (exhibition) => exhibition.status !== "open"
//       );
//       const closedExhibitionsCount = closedExhibitions.length;
//       const currentExhibitions = openExhibitions.length;
//       const currentArtworks = openExhibitions.reduce(
//         (acc, exhibition) => acc + exhibition.artworks.length,
//         0
//       );
//       const freeArtworksSpace = totalMaxArtworks - currentArtworks;

//       // Determine colors based on the current theme
//       const colors = isDarkMode ? darkModeColors : lightModeColors;

//       const pieData = {
//         labels: [
//           `Current Open Exhibitions (${currentExhibitions})`,
//           `Remaining Exhibitions (${totalMaxExhibitions - currentExhibitions})`,
//         ],
//         datasets: [
//           {
//             data: [
//               currentExhibitions,
//               totalMaxExhibitions - currentExhibitions,
//             ],
//             backgroundColor: colors.pie,
//             hoverBackgroundColor: colors.pie,
//           },
//         ],
//       };

//       // Generate bar colors based on theme
//       const barColors = exhibitions.map(() =>
//         getRandomColor(isDarkMode)
//       );

//       const barData = {
//         labels: exhibitions.map(
//           (exhibition) => `${exhibition.name} (${exhibition.artworks.length} artworks)`
//         ),
//         datasets: [
//           {
//             label: "Number of Artworks",
//             data: exhibitions.map(
//               (exhibition) => exhibition.artworks.length
//             ),
//             backgroundColor: barColors,
//             hoverBackgroundColor: barColors,
//           },
//         ],
//       };

//       const doughnutData = {
//         labels: [
//           `Current Artworks (${currentArtworks})`,
//           `Free Artworks Space (${freeArtworksSpace})`,
//         ],
//         datasets: [
//           {
//             data: [currentArtworks, freeArtworksSpace],
//             backgroundColor: colors.doughnut,
//             hoverBackgroundColor: colors.doughnut,
//           },
//         ],
//       };

//       // Fill creationTrend and lineData
//       const newCreationTrend = exhibitions.reduce((acc, exhibition) => {
//         const date = new Date(exhibition.createdAt).toLocaleDateString();
//         if (!acc[date]) {
//           acc[date] = [];
//         }
//         acc[date].push(exhibition); // Store each exhibition created on the date
//         return acc;
//       }, {});

//       setCreationTrend(newCreationTrend); // Update the creationTrend state

//       const lineData = {
//         labels: Object.keys(newCreationTrend).sort(
//           (a, b) => new Date(a) - new Date(b)
//         ),
//         datasets: [
//           {
//             label: "Exhibitions Created Over Time",
//             data: Object.keys(newCreationTrend)
//               .sort((a, b) => new Date(a) - new Date(b))
//               .map(
//                 (date) => newCreationTrend[date].length
//               ), // Count of exhibitions on each date
//             fill: false,
//             borderColor: isDarkMode ? "#F1C40F" : "#36A2EB",
//             backgroundColor: isDarkMode ? "#F1C40F" : "#36A2EB",
//             tension: 0.1,
//           },
//         ],
//       };

//       setChartData({
//         pieData,
//         barData,
//         doughnutData,
//         lineData,
//         closedExhibitionsCount,
//       });
//     }
//   }, [isLoading, museum, planDetails, exhibitions, isDarkMode]); // Add isDarkMode as a dependency

//   // Custom tooltip options for the pie chart
//   const pieChartOptions = {
//     maintainAspectRatio: false,
//     plugins: {
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             // Show label and value
//             const label = context.label || "";
//             const value = context.raw || 0;
//             return `${label}: ${value}`;
//           },
//         },
//       },
//       legend: {
//         labels: {
//           color: isDarkMode ? '#ecf0f1' : '#2c3e50', // Adjust legend text color
//         },
//       },
//     },
//   };

//   const barChartOptions = {
//     maintainAspectRatio: false,
//     plugins: {
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             const exhibition = exhibitions[context.dataIndex];
//             const artworks = exhibition.artworks.length;
//             const maxArtworks = exhibition.maxArtworks || "N/A"; // Assuming maxArtworks exists
//             return `${artworks} artworks / ${maxArtworks}`;
//           },
//         },
//       },
//       legend: {
//         display: false, // Hide legend for bar chart
//       },
//     },
//     scales: {
//       y: {
//         ticks: {
//           color: isDarkMode ? '#ecf0f1' : '#2c3e50', // Adjust y-axis labels
//         },
//         grid: {
//           color: isDarkMode ? '#7f8c8d' : '#bdc3c7', // Adjust grid lines
//         },
//       },
//       x: {
//         ticks: {
//           color: isDarkMode ? '#ecf0f1' : '#2c3e50', // Adjust x-axis labels
//         },
//         grid: {
//           color: isDarkMode ? '#7f8c8d' : '#bdc3c7', // Adjust grid lines
//         },
//       },
//     },
//   };

//   const doughnutChartOptions = {
//     maintainAspectRatio: false,
//     plugins: {
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             const label = context.label || "";
//             const value = context.raw || 0;
//             return `${label}: ${value}`;
//           },
//         },
//       },
//       legend: {
//         labels: {
//           color: isDarkMode ? '#ecf0f1' : '#2c3e50', // Adjust legend text color
//         },
//       },
//     },
//   };

//   // Tooltip for the line chart to include exhibition names and artwork count
//   const lineChartOptions = {
//     maintainAspectRatio: false,
//     plugins: {
//       tooltip: {
//         callbacks: {
//           title: function (context) {
//             return `Date: ${context[0].label}`;
//           },
//           label: function (context) {
//             const date = context.label;
//             const exhibitionsOnDate = creationTrend[date] || [];
//             return exhibitionsOnDate
//               .map((exhibition) => {
//                 const artworks = exhibition.artworks.length;
//                 return `${exhibition.name}: ${artworks} artworks`;
//               })
//               .join("\n");
//           },
//         },
//         // To allow multi-line tooltips
//         intersect: false,
//         mode: 'index',
//       },
//       legend: {
//         labels: {
//           color: isDarkMode ? '#ecf0f1' : '#2c3e50', // Adjust legend text color
//         },
//       },
//     },
//     scales: {
//       y: {
//         ticks: {
//           color: isDarkMode ? '#ecf0f1' : '#2c3e50', // Adjust y-axis labels
//         },
//         grid: {
//           color: isDarkMode ? '#7f8c8d' : '#bdc3c7', // Adjust grid lines
//         },
//       },
//       x: {
//         ticks: {
//           color: isDarkMode ? '#ecf0f1' : '#2c3e50', // Adjust x-axis labels
//         },
//         grid: {
//           color: isDarkMode ? '#7f8c8d' : '#bdc3c7', // Adjust grid lines
//         },
//       },
//     },
//   };

//   if (isLoading) {
//     return (
//       <div
//         className={`flex justify-center items-center h-screen ${
//           isDarkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900"
//         }`}
//       >
//         <h1 className="text-2xl font-semibold">Loading...</h1>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div
//         className={`flex justify-center items-center h-screen ${
//           isDarkMode ? "bg-gray-900 text-red-500" : "bg-gray-200 text-red-500"
//         }`}
//       >
//         <h1 className="text-2xl font-semibold">Error: {error.message}</h1>
//       </div>
//     );
//   }

//   return (
//     <div
//      >
//       <h1
//         className={`text-3xl font-bold mb-6 text-center ${
//           isDarkMode ? "text-gray-200" : "text-gray-900"
//         }`}
//       >
//         Museum Owner Dashboard
//       </h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {chartData.pieData && (
//           <div
//             className={`p-4 rounded-lg shadow-md ${
//               isDarkMode ? "bg-gray-800" : "bg-gray-200"
//             }`}
//           >
//             <h2
//               className={`text-lg md:text-xl font-bold mb-2 text-center ${
//                 isDarkMode ? "text-gray-200" : "text-gray-900"
//               }`}
//             >
//               Current vs Max Exhibitions
//             </h2>
//             <div className="relative h-64 w-full flex justify-center items-center">
//               <div className="relative h-full w-full md:w-3/4 lg:w-2/3">
//                 <Pie data={chartData.pieData} options={pieChartOptions} />
//               </div>
//             </div>
//             <div
//               className={`text-center mt-2 ${
//                 isDarkMode ? "text-gray-200" : "text-gray-900"
//               }`}
//             >
//               <span className="font-bold">
//                 Closed Exhibitions ({chartData.closedExhibitionsCount})
//               </span>
//             </div>
//           </div>
//         )}
//         {chartData.barData && (
//           <div
//             className={`p-4 rounded-lg shadow-md ${
//               isDarkMode ? "bg-gray-800" : "bg-gray-200"
//             }`}
//           >
//             <h2
//               className={`text-lg font-bold mb-2 text-center ${
//                 isDarkMode ? "text-gray-200" : "text-gray-900 "
//               }`}
//             >
//               Number of Artworks per Exhibition
//             </h2>
//             <div className="h-64">
//               <Bar data={chartData.barData} options={barChartOptions} />
//             </div>
//           </div>
//         )}
//         {chartData.doughnutData && (
//           <div
//             className={`p-4 rounded-lg shadow-md ${
//               isDarkMode ? "bg-gray-800" : "bg-gray-200"
//             }`}
//           >
//             <h2
//               className={`text-lg font-bold mb-2 text-center ${
//                 isDarkMode ? "text-gray-200" : "text-gray-900"
//               }`}
//             >
//               Free vs Existing Artworks Space
//             </h2>
//             <div className="h-64">
//               <Doughnut
//                 data={chartData.doughnutData}
//                 options={doughnutChartOptions}
//               />
//             </div>
//           </div>
//         )}
//         {chartData.lineData && (
//           <div
//             className={`p-4 rounded-lg shadow-md ${
//               isDarkMode ? "bg-gray-800" : "bg-gray-200"
//             }`}
//           >
//             <h2
//               className={`text-lg font-bold mb-2 text-center ${
//                 isDarkMode ? "text-gray-200" : "text-gray-900"
//               }`}
//             >
//               Exhibitions Creation Trend
//             </h2>
//             <div className="h-64">
//               <Line
//                 data={chartData.lineData}
//                 options={lineChartOptions}
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MuseumOwnerDashboard;

// src/components/museumOwner/MuseumOwnerDashboard.js
// src/components/museumOwner/MuseumOwnerDashboard.js

import React, { useEffect, useState } from "react";
import { Pie, Bar, Doughnut, Line } from "react-chartjs-2";
import { useMuseumContext, usePlanContext } from "../../contexts/MuseumContext";
import { useThemeMode } from "../../contexts/DarkModeContext";
import { useLang } from "../../contexts/LangContext"; // Import Language Context
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

// Predefined color palettes for light and dark modes
const lightModeColors = {
  pie: ["#36A2EB", "#FF6384"],
  doughnut: ["#FFCE56", "#FF6384"],
  bar: ["#4BC0C0", "#9966FF", "#FF9F40", "#FF6384", "#36A2EB", "#FFCD56"],
};

const darkModeColors = {
  pie: ["#4A90E2", "#E74C3C"],
  doughnut: ["#F1C40F", "#E74C3C"],
  bar: ["#1ABC9C", "#9B59B6", "#F39C12", "#E74C3C", "#3498DB", "#F39C12"],
};

// Function to generate random colors for bar charts if needed
const getRandomColor = (isDarkMode) => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    if (isDarkMode) {
      // Generate darker shades by limiting to lower half of hex digits
      color += letters[Math.floor(Math.random() * 8)];
    } else {
      // Generate lighter shades
      color += letters[Math.floor(Math.random() * 16)];
    }
  }
  return color;
};

// Translation mappings
const translations = {
  en: {
    dashboardTitle: "Museum Owner Dashboard",
    currentVsMaxExhibitions: "Current vs Max Exhibitions",
    numberOfArtworks: "Number of Artworks per Exhibition",
    freeVsExistingArtworksSpace: "Free vs Existing Artworks Space",
    exhibitionsCreationTrend: "Exhibitions Creation Trend",
    loading: "Loading statistics...",
    noData: "No data available.",
    closedExhibitions: "Closed Exhibitions",
    openExhibitions: "Open Exhibitions",
    currentExhibitions: "Current Open Exhibitions",
    remainingExhibitions: "Remaining Exhibitions",
    currentArtworks: "Current Artworks",
    freeArtworksSpace: "Free Artworks Space",
    exhibitionsCreatedOverTime: "Exhibitions Created Over Time",
    exhibitionsByStatus: "Exhibitions by Museum Status",
  },
  he: {
    dashboardTitle: "לוח ניהול בעל המוזיאון",
    currentVsMaxExhibitions: "תערוכות נוכחיות לעומת מקסימום",
    numberOfArtworks: "מספר יצירות לכל תערוכה",
    freeVsExistingArtworksSpace: "מרחב יצירות חופשי לעומת קיים",
    exhibitionsCreationTrend: "מגמת יצירת תערוכות",
    loading: "טוען סטטיסטיקות...",
    noData: "אין נתונים זמינים.",
    closedExhibitions: "תערוכות סגורות",
    openExhibitions: "תערוכות פתוחות",
    currentExhibitions: "תערוכות פתוחות נוכחיות",
    remainingExhibitions: "תערוכות שנותרו",
    currentArtworks: "יצירות נוכחיות",
    freeArtworksSpace: "מרחב יצירות חופשי",
    exhibitionsCreatedOverTime: "תערוכות שנוצרו לאורך זמן",
    exhibitionsByStatus: "תערוכות לפי סטטוס מוזיאון",
  },
};

const MuseumOwnerDashboard = () => {
  const { museum, exhibitions, isLoading, error } = useMuseumContext();
  const planDetails = usePlanContext();
  const { isDarkMode } = useThemeMode();
  const { language } = useLang(); // Get current language
  const isHebrew = language === "he"; // Check if Hebrew is selected

  const [chartData, setChartData] = useState({
    pieData: null,
    barData: null,
    doughnutData: null,
    lineData: null,
    closedExhibitionsCount: 0,
  });

  const [creationTrend, setCreationTrend] = useState({}); // Use state for creationTrend

  useEffect(() => {
    if (!isLoading && museum && planDetails && exhibitions.length > 0) {
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

      // Determine colors based on the current theme
      const colors = isDarkMode ? darkModeColors : lightModeColors;

      const pieData = {
        labels: [
          `${translations[language].currentExhibitions} (${currentExhibitions})`,
          `${translations[language].remainingExhibitions} (${
            totalMaxExhibitions - currentExhibitions
          })`,
        ],
        datasets: [
          {
            data: [
              currentExhibitions,
              totalMaxExhibitions - currentExhibitions,
            ],
            backgroundColor: colors.pie,
            hoverBackgroundColor: colors.pie,
          },
        ],
      };

      // Generate bar colors based on theme
      const barColors = exhibitions.map(() => getRandomColor(isDarkMode));

      const barData = {
        labels: exhibitions.map(
          (exhibition) => `${exhibition.name}(${exhibition.artworks.length})`
        ),
        datasets: [
          {
            label: translations[language].numberOfArtworks,
            data: exhibitions.map((exhibition) => exhibition.artworks.length),
            backgroundColor: barColors,
            hoverBackgroundColor: barColors,
          },
        ],
      };

      const doughnutData = {
        labels: [
          `${translations[language].currentArtworks} (${currentArtworks})`,
          `${translations[language].freeArtworksSpace} (${freeArtworksSpace})`,
        ],
        datasets: [
          {
            data: [currentArtworks, freeArtworksSpace],
            backgroundColor: colors.doughnut,
            hoverBackgroundColor: colors.doughnut,
          },
        ],
      };

      // Fill creationTrend and lineData
      const newCreationTrend = exhibitions.reduce((acc, exhibition) => {
        const date = new Date(exhibition.createdAt).toLocaleDateString(
          language === "he" ? "he-IL" : "en-US"
        );
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(exhibition); // Store each exhibition created on the date
        return acc;
      }, {});

      setCreationTrend(newCreationTrend); // Update the creationTrend state

      const sortedDates = Object.keys(newCreationTrend).sort(
        (a, b) => new Date(a) - new Date(b)
      );

      const lineData = {
        labels: sortedDates,
        datasets: [
          {
            label: translations[language].exhibitionsCreationTrend,
            data: sortedDates.map((date) => newCreationTrend[date].length), // Count of exhibitions on each date
            fill: false,
            borderColor: isDarkMode ? "#F1C40F" : "#36A2EB",
            backgroundColor: isDarkMode ? "#F1C40F" : "#36A2EB",
            tension: 0.1,
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
  }, [
    isLoading,
    museum,
    planDetails,
    exhibitions,
    isDarkMode,
    language,
    isHebrew,
  ]);

  // Custom tooltip options for the pie chart
  const pieChartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? "#ecf0f1" : "#2c3e50", // Adjust legend text color
        },
      },
      title: {
        display: false,
      },
    },
    // For RTL support
    layout: {
      padding: {
        left: isHebrew ? 20 : 0,
        right: isHebrew ? 0 : 20,
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
            const maxArtworks = planDetails.maxArtWorks || "N/A"; // Assuming maxArtworks exists
            return `${translations[language].numberOfArtworks}: ${artworks} / ${maxArtworks}`;
          },
        },
      },
      legend: {
        display: false, // Hide legend for bar chart
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          color: isDarkMode ? "#ecf0f1" : "#2c3e50", // Adjust y-axis labels
        },
        grid: {
          color: isDarkMode ? "#7f8c8d" : "#bdc3c7", // Adjust grid lines
        },
      },
      x: {
        ticks: {
          color: isDarkMode ? "#ecf0f1" : "#2c3e50", // Adjust x-axis labels
        },
        grid: {
          color: isDarkMode ? "#7f8c8d" : "#bdc3c7", // Adjust grid lines
        },
      },
    },
    // For RTL support
    indexAxis: isHebrew ? "y" : "x",
  };

  const doughnutChartOptions = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
      legend: {
        labels: {
          color: isDarkMode ? "#ecf0f1" : "#2c3e50", // Adjust legend text color
        },
      },
      title: {
        display: false,
      },
    },
    // For RTL support
    layout: {
      padding: {
        left: isHebrew ? 20 : 0,
        right: isHebrew ? 0 : 20,
      },
    },
  };

  // Tooltip for the line chart to include exhibition names and artwork count
  const lineChartOptions = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          title: function (context) {
            return `${translations[language].exhibitionsCreatedOverTime}: ${context[0].label}`;
          },
          label: function (context) {
            const date = context.label;
            const exhibitionsOnDate = creationTrend[date] || [];
            return exhibitionsOnDate
              .map((exhibition) => {
                const artworks = exhibition.artworks.length;
                return `${exhibition.name}: ${artworks} ${translations[
                  language
                ].numberOfArtworks.toLowerCase()}`;
              })
              .join("\n");
          },
        },
        // To allow multi-line tooltips
        intersect: false,
        mode: "index",
      },
      legend: {
        labels: {
          color: isDarkMode ? "#ecf0f1" : "#2c3e50", // Adjust legend text color
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          color: isDarkMode ? "#ecf0f1" : "#2c3e50", // Adjust y-axis labels
        },
        grid: {
          color: isDarkMode ? "#7f8c8d" : "#bdc3c7", // Adjust grid lines
        },
      },
      x: {
        ticks: {
          color: isDarkMode ? "#ecf0f1" : "#2c3e50", // Adjust x-axis labels
        },
        grid: {
          color: isDarkMode ? "#7f8c8d" : "#bdc3c7", // Adjust grid lines
        },
      },
    },
    // For RTL support
    indexAxis: isHebrew ? "y" : "x",
  };

  if (isLoading) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900"
        }`}
      >
        <h1 className="text-2xl font-semibold">
          {translations[language].loading}
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          isDarkMode ? "bg-gray-900 text-red-500" : "bg-gray-200 text-red-500"
        }`}
      >
       <h1
        className={`text-4xl font-poppins font-bold tracking-wide mb-6 text-center ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        </h1>
      </div>
    );
  }

  return (
    <div
      className={`px-4 my-8 min-h-screen ${
        isDarkMode ? "bg-gray-900 text-gray-300" : "bg-grey-100 text-gray-900"
      } transition-colors duration-300`}
    >
      <h1
        className={`text-4xl font-poppins font-bold tracking-wide mb-6 text-center ${
          isDarkMode ? "text-gray-100" : "text-gray-800"
        }`}
      >
        {translations[language].dashboardTitle}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chartData.pieData && (
          <div
            className={`p-4 rounded-2xl border-2 shadow-2xl transform transition-transform duration-300 hover:scale-105 ${
              isDarkMode
                ? "bg-gradient-to-r from-gray-700 to-gray-800"
                : "bg-gradient-to-r from-gray-100 to-gray-100"
            }`}
          >
            <h2
              className={`text-lg md:text-xl font-bold mb-2 text-center ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              {translations[language].currentVsMaxExhibitions}
            </h2>
            <div className="relative h-64 w-full flex justify-center items-center">
              <div className="relative h-full w-full md:w-3/4 lg:w-2/3">
                <Pie data={chartData.pieData} options={pieChartOptions} />
              </div>
            </div>
            <div
              className={`text-center mt-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <span className="font-bold">
                {translations[language].closedExhibitions} (
                {chartData.closedExhibitionsCount})
              </span>
            </div>
          </div>
        )}
        {chartData.barData && (
          <div
            className={`p-4 rounded-2xl shadow-2xl border-2 transform transition-transform duration-300 hover:scale-105 ${
              isDarkMode
                ? "bg-gradient-to-r from-gray-700 to-gray-800"
                : "bg-gradient-to-r from-gray-100 to-gray-100"
            }`}
          >
            <h2
              className={`text-lg font-bold mb-2 text-center ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              {translations[language].numberOfArtworks}
            </h2>
            <div className="h-64">
              <Bar data={chartData.barData} options={barChartOptions} />
            </div>
          </div>
        )}
        {chartData.doughnutData && (
          <div
            className={`p-4 rounded-2xl shadow-2xl border-2 transform transition-transform duration-300 hover:scale-105 ${
              isDarkMode
                ? "bg-gradient-to-r from-gray-700 to-gray-800"
                : "bg-gradient-to-r from-gray-100 to-gray-100"
            }`}
          >
            <h2
              className={`text-lg font-bold mb-2 text-center ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              {translations[language].freeVsExistingArtworksSpace}
            </h2>
            <div className="h-64">
              <Doughnut
                data={chartData.doughnutData}
                options={doughnutChartOptions}
              />
            </div>
          </div>
        )}
        {chartData.lineData && (
          <div
            className={`p-4 rounded-2xl shadow-2xl border-2 transform transition-transform duration-300 hover:scale-105 ${
              isDarkMode
                ? "bg-gradient-to-r from-gray-700 to-gray-800"
                : "bg-gradient-to-r from-gray-100 to-gray-100"
            }`}
          >
            <h2
              className={`text-lg font-bold mb-2 text-center ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              {translations[language].exhibitionsCreationTrend}
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
