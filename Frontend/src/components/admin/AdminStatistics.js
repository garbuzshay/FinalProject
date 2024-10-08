
// import React, { useEffect, useState } from "react";
// import { Bar, Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   BarElement,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { useAdminContext } from "../../contexts/AdminContext";
// import { useThemeMode } from "../../contexts/DarkModeContext"; // Import the dark mode context

// // Register chart components
// ChartJS.register(
//   BarElement,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const AdminStatistics = () => {
//   const { isDarkMode } = useThemeMode(); // Get dark mode state
//   const { museumsData, exhibitionsData, usersData, plansData } = useAdminContext();
//   const { museums = [] } = museumsData || {};
//   const { exhibitions = [] } = exhibitionsData || {};
//   const { users = [] } = usersData || {};
//   const { plans = [] } = plansData || {};

//   const [exhibitionsByMuseumStatus, setExhibitionsByMuseumStatus] = useState(null);
//   const [userGrowth, setUserGrowth] = useState(null);
//   const [exhibitionGrowth, setExhibitionGrowth] = useState(null);

//   useEffect(() => {
//     if (museums.length && exhibitions.length && users.length && plans.length) {
//       // Prepare data for charts
//       const exhibitionsByMuseum = museums.map((museum) => {
//         const openExhibitions = exhibitions.filter(
//           (exhibition) =>
//             exhibition.museum._id === museum._id && exhibition.status === "open"
//         ).length;

//         const closedExhibitions = exhibitions.filter(
//           (exhibition) =>
//             exhibition.museum._id === museum._id && exhibition.status === "closed"
//         ).length;

//         return {
//           museum: `${museum.name} (Max Exhibitions:${museum.plan.maxExhibitions})`,
//           openExhibitions,
//           closedExhibitions,
//         };
//       });

//       const labels = exhibitionsByMuseum.map((data) => data.museum);
//       const openData = exhibitionsByMuseum.map((data) => data.openExhibitions);
//       const closedData = exhibitionsByMuseum.map((data) => data.closedExhibitions);

//       setExhibitionsByMuseumStatus({
//         labels,
//         datasets: [
//           {
//             label: "Open Exhibitions",
//             data: openData,
//             backgroundColor: "#36A2EB",
//             hoverBackgroundColor: "#36A2EB",
//           },
//           {
//             label: "Closed Exhibitions",
//             data: closedData,
//             backgroundColor: "#FF6384",
//             hoverBackgroundColor: "#FF6384",
//           },
//         ],
//       });

//       // Prepare user growth data
//       const userRegistrations = users.reduce((acc, user) => {
//         const createdAt = new Date(user.createdAt).toLocaleDateString();
//         if (!acc[createdAt]) {
//           acc[createdAt] = [];
//         }
//         acc[createdAt].push(user);
//         return acc;
//       }, {});

//       const sortedUserRegistrationDates = Object.keys(userRegistrations).sort(
//         (a, b) => new Date(a) - new Date(b)
//       );

//       setUserGrowth({
//         labels: sortedUserRegistrationDates,
//         datasets: [
//           {
//             label: "User Registrations Over Time",
//             data: sortedUserRegistrationDates.map(
//               (date) => userRegistrations[date].length
//             ),
//             fill: false,
//             borderColor: "#4BC0C0",
//           },
//         ],
//         usersByDate: userRegistrations,
//       });

//       // Prepare exhibition growth data
//       const exhibitionOpenings = exhibitions.reduce((acc, exhibition) => {
//         const openedAt = exhibition.openedAt
//           ? new Date(exhibition.openedAt).toLocaleDateString()
//           : null;

//         if (openedAt) {
//           if (!acc[openedAt]) {
//             acc[openedAt] = [];
//           }
//           acc[openedAt].push(exhibition);
//         }
//         return acc;
//       }, {});

//       const sortedExhibitionOpeningDates = Object.keys(exhibitionOpenings).sort(
//         (a, b) => new Date(a) - new Date(b)
//       );

//       setExhibitionGrowth({
//         labels: sortedExhibitionOpeningDates,
//         datasets: [
//           {
//             label: "Exhibitions Over Time",
//             data: sortedExhibitionOpeningDates.map(
//               (date) => exhibitionOpenings[date].length
//             ),
//             fill: false,
//             borderColor: "#FF6384",
//           },
//         ],
//         exhibitionsByDate: exhibitionOpenings,
//       });
//     }
//   }, [museums, exhibitions, users, plans]);

//   if (!exhibitionsByMuseumStatus || !userGrowth || !exhibitionGrowth) {
//     return <div>Loading statistics...</div>;
//   }

//   const defaultTooltipOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//     },
//     scales: {
//       y: {
//         ticks: {
//           beginAtZero: true,
//           stepSize: 1,
//         },
//       },
//       x: {
//         ticks: {
//           maxRotation: 45,
//           minRotation: 0,
//           autoSkip: false,
//           font: {
//             size: 10,
//           },
//         },
//       },
//     },
//   };

//   const userGrowthTooltipOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       tooltip: {
//         callbacks: {
//           label: function (tooltipItem) {
//             const date = tooltipItem.label;
//             const usersOnDate = userGrowth.usersByDate[date];
//             return usersOnDate
//               .map((user) => `${user.name} (${user.role?.roleName || "No Role"})`)
//               .join("\n");
//           },
//         },
//       },
//     },
//     scales: {
//       y: {
//         ticks: {
//           beginAtZero: true,
//           stepSize: 1,
//         },
//       },
//     },
//   };

//   const exhibitionGrowthTooltipOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       tooltip: {
//         callbacks: {
//           label: function (tooltipItem) {
//             const date = tooltipItem.label;
//             const exhibitionsOnDate =
//               exhibitionGrowth.exhibitionsByDate[date];
//             return exhibitionsOnDate
//               .map(
//                 (exhibition) =>
//                   `${exhibition.name} (Museum: ${
//                     exhibition.museum?.name || "No Museum"
//                   })`
//               )
//               .join("\n");
//           },
//         },
//       },
//     },
//     scales: {
//       y: {
//         ticks: {
//           beginAtZero: true,
//           stepSize: 1,
//         },
//       },
//     },
//   };

//   return (
//     <div
//       className={`p-4 min-h-screen ${
//         isDarkMode ? "bg-gray-900 text-gray-300" : " text-gray-900"
//       } transition-colors duration-300`}
//     >
//       <h2 className="text-2xl font-semibold mb-6">Admin Statistics Dashboard</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* Exhibitions by Museum Status */}
//         <div
//           className={`${
//             isDarkMode ? "bg-gray-800 text-gray-300" : " text-gray-900"
//           } p-4 rounded-lg shadow-md col-span-1 md:col-span-2`}
//         >
//           <h3 className="text-lg font-bold mb-4">Exhibitions by Museum Status</h3>
//           <div className="h-64">
//             <Bar data={exhibitionsByMuseumStatus} options={defaultTooltipOptions} />
//           </div>
//         </div>

//         {/* User Registrations Over Time */}
//         <div
//           className={`${
//             isDarkMode ? "bg-gray-800 text-gray-300" : " text-gray-900"
//           } p-4 rounded-lg shadow-md col-span-1 md:col-span-2`}
//         >
//           <h3 className="text-lg font-bold mb-4">User Registrations Over Time</h3>
//           <div className="h-64">
//             <Line data={userGrowth} options={userGrowthTooltipOptions} />
//           </div>
//         </div>

//         {/* Exhibitions Over Time */}
//         <div
//           className={`${
//             isDarkMode ? "bg-gray-800 text-gray-300" : " text-gray-900"
//           } p-4 rounded-lg shadow-md col-span-1 md:col-span-2`}
//         >
//           <h3 className="text-lg font-bold mb-4">Exhibitions Over Time</h3>
//           <div className="h-64">
//             <Line data={exhibitionGrowth} options={exhibitionGrowthTooltipOptions} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminStatistics;


import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useAdminContext } from "../../contexts/AdminContext";
import { useThemeMode } from "../../contexts/DarkModeContext"; // Import the dark mode context
import { useLang } from "../../contexts/LangContext"; // Import the language context

// Register chart components
ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const AdminStatistics = () => {
  const { isDarkMode } = useThemeMode(); // Get dark mode state
  const { language } = useLang(); // Get language state
  const isHebrew = language === "he"; // Check if the language is Hebrew
  const { museumsData, exhibitionsData, usersData, plansData } = useAdminContext();
  const { museums = [] } = museumsData || {};
  const { exhibitions = [] } = exhibitionsData || {};
  const { users = [] } = usersData || {};
  const { plans = [] } = plansData || {};

  const [exhibitionsByMuseumStatus, setExhibitionsByMuseumStatus] = useState(null);
  const [userGrowth, setUserGrowth] = useState(null);
  const [exhibitionGrowth, setExhibitionGrowth] = useState(null);

  useEffect(() => {
    if (museums.length && exhibitions.length && users.length && plans.length) {
      // Prepare data for charts
      const exhibitionsByMuseum = museums.map((museum) => {
        const openExhibitions = exhibitions.filter(
          (exhibition) =>
            exhibition.museum._id === museum._id && exhibition.status === "open"
        ).length;

        const closedExhibitions = exhibitions.filter(
          (exhibition) =>
            exhibition.museum._id === museum._id && exhibition.status === "closed"
        ).length;

        return {
          museum: `${museum.name} (${isHebrew ? "מקסימום תערוכות" : "Max Exhibitions"}: ${museum.plan.maxExhibitions})`,
          openExhibitions,
          closedExhibitions,
        };
      });

      const labels = exhibitionsByMuseum.map((data) => data.museum);
      const openData = exhibitionsByMuseum.map((data) => data.openExhibitions);
      const closedData = exhibitionsByMuseum.map((data) => data.closedExhibitions);

      setExhibitionsByMuseumStatus({
        labels,
        datasets: [
          {
            label: isHebrew ? "תערוכות פתוחות" : "Open Exhibitions",
            data: openData,
            backgroundColor: "#36A2EB",
            hoverBackgroundColor: "#36A2EB",
          },
          {
            label: isHebrew ? "תערוכות סגורות" : "Closed Exhibitions",
            data: closedData,
            backgroundColor: "#FF6384",
            hoverBackgroundColor: "#FF6384",
          },
        ],
      });

      // Prepare user growth data
      const userRegistrations = users.reduce((acc, user) => {
        const createdAt = new Date(user.createdAt).toLocaleDateString();
        if (!acc[createdAt]) {
          acc[createdAt] = [];
        }
        acc[createdAt].push(user);
        return acc;
      }, {});

      const sortedUserRegistrationDates = Object.keys(userRegistrations).sort(
        (a, b) => new Date(a) - new Date(b)
      );

      setUserGrowth({
        labels: sortedUserRegistrationDates,
        datasets: [
          {
            label: isHebrew ? "ההרשמות משתמש לאורך זמן" : "User Registrations Over Time",
            data: sortedUserRegistrationDates.map(
              (date) => userRegistrations[date].length
            ),
            fill: false,
            borderColor: "#4BC0C0",
          },
        ],
        usersByDate: userRegistrations,
      });

      // Prepare exhibition growth data
      const exhibitionOpenings = exhibitions.reduce((acc, exhibition) => {
        const openedAt = exhibition.openedAt
          ? new Date(exhibition.openedAt).toLocaleDateString()
          : null;

        if (openedAt) {
          if (!acc[openedAt]) {
            acc[openedAt] = [];
          }
          acc[openedAt].push(exhibition);
        }
        return acc;
      }, {});

      const sortedExhibitionOpeningDates = Object.keys(exhibitionOpenings).sort(
        (a, b) => new Date(a) - new Date(b)
      );

      setExhibitionGrowth({
        labels: sortedExhibitionOpeningDates,
        datasets: [
          {
            label: isHebrew ? "תערוכות לאורך זמן" : "Exhibitions Over Time",
            data: sortedExhibitionOpeningDates.map(
              (date) => exhibitionOpenings[date].length
            ),
            fill: false,
            borderColor: "#FF6384",
          },
        ],
        exhibitionsByDate: exhibitionOpenings,
      });
    }
  }, [museums, exhibitions, users, plans, isHebrew]);

  if (!exhibitionsByMuseumStatus || !userGrowth || !exhibitionGrowth) {
    return <div>{isHebrew ? "טוען סטטיסטיקות..." : "Loading statistics..."}</div>;
  }

  const defaultTooltipOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
          stepSize: 1,
        },
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 0,
          autoSkip: false,
          font: {
            size: 10,
          },
        },
      },
    },
  };

  const userGrowthTooltipOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const date = tooltipItem.label;
            const usersOnDate = userGrowth.usersByDate[date];
            return usersOnDate
              .map((user) => `${user.name} (${user.role?.roleName || (isHebrew ? "ללא תפקיד" : "No Role")})`)
              .join("\n");
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
          stepSize: 1,
        },
      },
    },
  };

  const exhibitionGrowthTooltipOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const date = tooltipItem.label;
            const exhibitionsOnDate = exhibitionGrowth.exhibitionsByDate[date];
            return exhibitionsOnDate
              .map(
                (exhibition) =>
                  `${exhibition.name} ( ${isHebrew ? "מוזיאון" : "Museum"}: ${
                    exhibition.museum?.name || (isHebrew ? "אין מוזיאון" : "No Museum")
                  })`
              )
              .join("\n");
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div
      className={`p-4 min-h-screen ${
        isDarkMode ? "bg-gray-900 text-gray-300" : " text-gray-900"
      } transition-colors duration-300`}
    >
      <h2 className="text-2xl font-semibold mb-6">
        {isHebrew ? "לוח ניהול סטטיסטיקות" : "Admin Statistics Dashboard"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Exhibitions by Museum Status */}
        <div
          className={`${
            isDarkMode ? "bg-gray-800 text-gray-300" : " text-gray-900"
          } p-4 rounded-lg shadow-md col-span-1 md:col-span-2`}
        >
          <h3 className="text-lg font-bold mb-4">
            {isHebrew ? "תערוכות לפי סטטוס מוזיאון" : "Exhibitions by Museum Status"}
          </h3>
          <div className="h-64">
            <Bar data={exhibitionsByMuseumStatus} options={defaultTooltipOptions} />
          </div>
        </div>

        {/* User Registrations Over Time */}
        <div
          className={`${
            isDarkMode ? "bg-gray-800 text-gray-300" : " text-gray-900"
          } p-4 rounded-lg shadow-md col-span-1 md:col-span-2`}
        >
          <h3 className="text-lg font-bold mb-4">
            {isHebrew ? "הרשמות משתמשים לאורך זמן" : "User Registrations Over Time"}
          </h3>
          <div className="h-64">
            <Line data={userGrowth} options={userGrowthTooltipOptions} />
          </div>
        </div>

        {/* Exhibitions Over Time */}
        <div
          className={`${
            isDarkMode ? "bg-gray-800 text-gray-300" : " text-gray-900"
          } p-4 rounded-lg shadow-md col-span-1 md:col-span-2`}
        >
          <h3 className="text-lg font-bold mb-4">
            {isHebrew ? "תערוכות לאורך זמן" : "Exhibitions Over Time"}
          </h3>
          <div className="h-64">
            <Line data={exhibitionGrowth} options={exhibitionGrowthTooltipOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;
