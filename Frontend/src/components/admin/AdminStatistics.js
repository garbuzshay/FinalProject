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
//   const { museumsData, exhibitionsData, usersData, plansData } = useAdminContext();
//   const { museums = [] } = museumsData || {}; // Fallback to empty array
//   const { exhibitions = [] } = exhibitionsData || {}; // Fallback to empty array
//   const { users = [] } = usersData || {}; // Fallback to empty array
//   const { plans = [] } = plansData || {}; // Fallback to empty array

//   const [exhibitionsByMuseumStatus, setExhibitionsByMuseumStatus] = useState(null);
//   const [userGrowth, setUserGrowth] = useState(null);
//   const [exhibitionGrowth, setExhibitionGrowth] = useState(null); // New state for exhibitions over time

//   useEffect(() => {
//     if (museums.length && exhibitions.length && users.length && plans.length) {
//       // Prepare Exhibitions by Museum Status
//       const exhibitionsByMuseum = museums.map((museum) => {
//         const openExhibitions = exhibitions.filter(
//           (exhibition) => exhibition.museum._id === museum._id && exhibition.status === "open"
//         ).length;

//         const closedExhibitions = exhibitions.filter(
//           (exhibition) => exhibition.museum._id === museum._id && exhibition.status === "closed"
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

//       // Prepare User Growth Data
//       const userRegistrations = users.reduce((acc, user) => {
//         const createdAt = new Date(user.createdAt).toLocaleDateString();
//         if (!acc[createdAt]) {
//           acc[createdAt] = [];
//         }
//         acc[createdAt].push(user); // Store user details on the date
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
//             data: sortedUserRegistrationDates.map(date => userRegistrations[date].length),
//             fill: false,
//             borderColor: "#4BC0C0",
//           },
//         ],
//         // Store user information for tooltips
//         usersByDate: userRegistrations,
//       });

//       // Prepare Exhibitions Growth Data
//       const exhibitionOpenings = exhibitions.reduce((acc, exhibition) => {
//         const openedAt = exhibition.openedAt
//           ? new Date(exhibition.openedAt).toLocaleDateString()
//           : null;

//         if (openedAt) {
//           if (!acc[openedAt]) {
//             acc[openedAt] = [];
//           }
//           acc[openedAt].push(exhibition); // Store exhibition details on the openedAt date
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
//               date => exhibitionOpenings[date].length
//             ),
//             fill: false,
//             borderColor: "#FF6384",
//           },
//         ],
//         // Store exhibition information for tooltips
//         exhibitionsByDate: exhibitionOpenings,
//       });
//     }
//   }, [museums, exhibitions, users, plans]);

//   if (!exhibitionsByMuseumStatus || !userGrowth || !exhibitionGrowth) {
//     return <div>Loading statistics...</div>; // Show loading state
//   }

//   // Tooltip Options for Exhibitions by Museum Status (default tooltips)
//   const defaultTooltipOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//     },
//   };

//   // Custom Tooltip Options for User Registrations (to show name and role)
//   const userGrowthTooltipOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       tooltip: {
//         callbacks: {
//           // Customize the tooltip for User Registrations
//           label: function (tooltipItem) {
//             const date = tooltipItem.label; // Date being hovered
//             const usersOnDate = userGrowth.usersByDate[date]; // Get users on the hovered date

//             // Show each user’s name and role in the tooltip
//             return usersOnDate
//               .map(user => `${user.name} (${user.role?.roleName || "No Role"})`)
//               .join("\n");
//           },
//         },
//       },
//     },
//   };

//   // Custom Tooltip Options for Exhibitions Over Time (to show exhibition and museum)
//   const exhibitionGrowthTooltipOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       tooltip: {
//         callbacks: {
//           // Customize the tooltip for Exhibitions Over Time
//           label: function (tooltipItem) {
//             const date = tooltipItem.label; // Date being hovered
//             const exhibitionsOnDate = exhibitionGrowth.exhibitionsByDate[date]; // Get exhibitions on the hovered date

//             // Show each exhibition’s name and associated museum in the tooltip
//             return exhibitionsOnDate
//               .map(
//                 exhibition =>
//                   `${exhibition.name} (Museum: ${exhibition.museum?.name || "No Museum"})`
//               )
//               .join("\n");
//           },
//         },
//       },
//     },
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-semibold mb-6">Admin Statistics Dashboard</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* Exhibitions by Museum Status */}
//         <div className="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2">
//           <h3 className="text-lg font-bold mb-4">Exhibitions by Museum Status</h3>
//           <div className="h-64">
//             <Bar data={exhibitionsByMuseumStatus} options={defaultTooltipOptions} />
//           </div>
//         </div>

//         {/* User Registrations Over Time */}
//         <div className="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2">
//           <h3 className="text-lg font-bold mb-4">User Registrations Over Time</h3>
//           <div className="h-64">
//             <Line data={userGrowth} options={userGrowthTooltipOptions} />
//           </div>
//         </div>

//         {/* Exhibitions Over Time */}
//         <div className="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2">
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
  const { museumsData, exhibitionsData, usersData, plansData } = useAdminContext();
  const { museums = [] } = museumsData || {}; // Fallback to empty array
  const { exhibitions = [] } = exhibitionsData || {}; // Fallback to empty array
  const { users = [] } = usersData || {}; // Fallback to empty array
  const { plans = [] } = plansData || {}; // Fallback to empty array

  const [exhibitionsByMuseumStatus, setExhibitionsByMuseumStatus] = useState(null);
  const [userGrowth, setUserGrowth] = useState(null);
  const [exhibitionGrowth, setExhibitionGrowth] = useState(null); // New state for exhibitions over time

  useEffect(() => {
    if (museums.length && exhibitions.length && users.length && plans.length) {
      // Prepare Exhibitions by Museum Status
      const exhibitionsByMuseum = museums.map((museum) => {
        const openExhibitions = exhibitions.filter(
          (exhibition) => exhibition.museum._id === museum._id && exhibition.status === "open"
        ).length;

        const closedExhibitions = exhibitions.filter(
          (exhibition) => exhibition.museum._id === museum._id && exhibition.status === "closed"
        ).length;

        return {
          museum: `${museum.name} (Max Exhibitions:${museum.plan.maxExhibitions})`,
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
            label: "Open Exhibitions",
            data: openData,
            backgroundColor: "#36A2EB",
            hoverBackgroundColor: "#36A2EB",
          },
          {
            label: "Closed Exhibitions",
            data: closedData,
            backgroundColor: "#FF6384",
            hoverBackgroundColor: "#FF6384",
          },
        ],
      });

      // Prepare User Growth Data
      const userRegistrations = users.reduce((acc, user) => {
        const createdAt = new Date(user.createdAt).toLocaleDateString();
        if (!acc[createdAt]) {
          acc[createdAt] = [];
        }
        acc[createdAt].push(user); // Store user details on the date
        return acc;
      }, {});

      const sortedUserRegistrationDates = Object.keys(userRegistrations).sort(
        (a, b) => new Date(a) - new Date(b)
      );

      setUserGrowth({
        labels: sortedUserRegistrationDates,
        datasets: [
          {
            label: "User Registrations Over Time",
            data: sortedUserRegistrationDates.map(date => userRegistrations[date].length),
            fill: false,
            borderColor: "#4BC0C0",
          },
        ],
        usersByDate: userRegistrations, // Store user information for tooltips
      });

      // Prepare Exhibitions Growth Data
      const exhibitionOpenings = exhibitions.reduce((acc, exhibition) => {
        const openedAt = exhibition.openedAt
          ? new Date(exhibition.openedAt).toLocaleDateString()
          : null;

        if (openedAt) {
          if (!acc[openedAt]) {
            acc[openedAt] = [];
          }
          acc[openedAt].push(exhibition); // Store exhibition details on the openedAt date
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
            label: "Exhibitions Over Time",
            data: sortedExhibitionOpeningDates.map(
              date => exhibitionOpenings[date].length
            ),
            fill: false,
            borderColor: "#FF6384",
          },
        ],
        exhibitionsByDate: exhibitionOpenings, // Store exhibition information for tooltips
      });
    }
  }, [museums, exhibitions, users, plans]);

  if (!exhibitionsByMuseumStatus || !userGrowth || !exhibitionGrowth) {
    return <div>Loading statistics...</div>; // Show loading state
  }

  // Tooltip Options for Exhibitions by Museum Status (default tooltips)
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
          stepSize: 1, // Y-axis will increment by whole numbers
        },
      },
      x: {
        ticks: {
          maxRotation: 45, // Rotation to handle long labels
          minRotation: 0,  // Min rotation for larger screens
          autoSkip: false, // Prevents skipping labels
          font: {
            size: 10, // Adjust label font size for responsiveness
          },
        },
      },
    },
  };

  // Custom Tooltip Options for User Registrations (to show name and role)
  const userGrowthTooltipOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          // Customize the tooltip for User Registrations
          label: function (tooltipItem) {
            const date = tooltipItem.label; // Date being hovered
            const usersOnDate = userGrowth.usersByDate[date]; // Get users on the hovered date

            // Show each user’s name and role in the tooltip
            return usersOnDate
              .map(user => `${user.name} (${user.role?.roleName || "No Role"})`)
              .join("\n");
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
          stepSize: 1, // Y-axis will increment by whole numbers
        },
      },
    },
  };

  // Custom Tooltip Options for Exhibitions Over Time (to show exhibition and museum)
  const exhibitionGrowthTooltipOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          // Customize the tooltip for Exhibitions Over Time
          label: function (tooltipItem) {
            const date = tooltipItem.label; // Date being hovered
            const exhibitionsOnDate = exhibitionGrowth.exhibitionsByDate[date]; // Get exhibitions on the hovered date

            // Show each exhibition’s name and associated museum in the tooltip
            return exhibitionsOnDate
              .map(
                exhibition =>
                  `${exhibition.name} (Museum: ${exhibition.museum?.name || "No Museum"})`
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
          stepSize: 1, // Y-axis will increment by whole numbers
        },
      },
    },
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">Admin Statistics Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Exhibitions by Museum Status */}
        <div className="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2">
          <h3 className="text-lg font-bold mb-4">Exhibitions by Museum Status</h3>
          <div className="h-64">
            <Bar data={exhibitionsByMuseumStatus} options={defaultTooltipOptions} />
          </div>
        </div>

        {/* User Registrations Over Time */}
        <div className="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2">
          <h3 className="text-lg font-bold mb-4">User Registrations Over Time</h3>
          <div className="h-64">
            <Line data={userGrowth} options={userGrowthTooltipOptions} />
          </div>
        </div>

        {/* Exhibitions Over Time */}
        <div className="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2">
          <h3 className="text-lg font-bold mb-4">Exhibitions Over Time</h3>
          <div className="h-64">
            <Line data={exhibitionGrowth} options={exhibitionGrowthTooltipOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;
