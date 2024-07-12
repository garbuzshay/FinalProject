const sideBarData = {
    Admin: [
      { name: "Admin Dashboard", path: "/admin/dashboard" },
      { name: "Dashboard", path: "/admin/dashboard" },
      { name: "Museums", path: "/admin/museums" },
      { name: "Exhibitions", path: "/admin/exhibitions" },
      { name: "Customers", path: "/admin/users" },
      { name: "Requests Management", path: "/admin/requests" },
      { name: "Terms, Prices and Packages", path: "/admin/terms-prices-packages" },
    ],
    MuseumOwner: [
      { name: "Owner Dashboard", path: "/owner" },
      { name: "Exhibitions Management", path: "/owner/exhibitions" },
      { name: "Open New Exhibitons", path: "/owner/openNew"},
      { name: "Edit Plan", path: "/owner/editMuseumPlan"},
      { name: "Contact us", path: "/owner/Contact us"},

    ],
    Curator: [
      { name: "Curator Dashboard", path: "/curator/dashboard" },
      { name: "Exhibitions Management", path: "/curator/exhibitions" },
      { name: "Contact us", path: "/Curator/Contact us"},
    ],
  };
  
  export default sideBarData;