const sideBarData = {
    Admin: [
      { name: "Admin Dashboard", path: "/admin/statistics" },
      { name: "Watch all ", path: "/admin/" },
      { name: "Museums", path: "/admin/museums" },
      { name: "Exhibitions", path: "/admin/exhibitions" },
      { name: "Customers", path: "/admin/users" },
      { name: "Requests Management", path: "/admin/requests" },
      { name: "Terms, Prices and Packages", path: "/admin/terms-prices-packages" },
    ],
    MuseumOwner: [
      { name: "Owner Dashboard", path: "/owner/" },
      { name: "Exhibitions Management", path: "/owner/exhibitions" },
      { name: "Open New Exhibitions", path: "/owner/open-exhibit"},
      { name: "Our Curators", path: "/owner/my-curators"},
      {name : "Museum Details", path: "/owner/edit-details"},
      { name: "Contact us", path: "/owner/contact-us"},



    ],
    Curator: [
      { name: "Curator Dashboard", path: "/curator/exhibitions" },
      { name: "Exhibitions Management", path: "/curator/exhibitions" },
      { name: "Contact us", path: "/curator/contact-us"},
    ],
  };
  
  export default sideBarData;