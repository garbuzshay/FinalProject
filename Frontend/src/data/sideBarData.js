const sideBarData = {
    Admin: [
      { name: "Admin Dashboard", path: "/admin/" },
      { name: "Dashboard", path: "/admin/" },
      { name: "Museums", path: "/admin/museums" },
      { name: "Exhibitions", path: "/admin/exhibitions" },
      { name: "Customers", path: "/admin/users" },
      { name: "Requests Management", path: "/admin/requests" },
      { name: "Terms, Prices and Packages", path: "/admin/terms-prices-packages" },
    ],
    MuseumOwner: [
      { name: "Owner Dashboard", path: "/owner/" },
      { name: "Exhibitions Management", path: "/owner/exhibiton-list" },
      { name: "Open New Exhibitons", path: "/owner/open-exhibit"},
      { name: "Our Curators", path: "/owner/my-curators"},
      { name: "Edit Plan", path: "/owner/editMuseumPlan"},
      { name: "Contact us", path: "/owner/contact-us"},


    ],
    Curator: [
      { name: "Curator Dashboard", path: "/curator/exhibitons" },
      { name: "Exhibitions Management", path: "/curator/exhibitons" },
      { name: "Contact us", path: "/curator/contact-us"},
    ],
  };
  
  export default sideBarData;