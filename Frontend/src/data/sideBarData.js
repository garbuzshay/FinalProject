// 

const sideBarData = {
  Admin: {
    en: [
      { name: "Admin Dashboard", path: "/admin/statistics" },
      { name: "Watch all", path: "/admin/" },
      { name: "Museums", path: "/admin/museums" },
      { name: "Exhibitions", path: "/admin/exhibitions" },
      { name: "Customers", path: "/admin/users" },
      { name: "Requests Management", path: "/admin/requests" },
      { name: "Terms, Prices and Packages", path: "/admin/terms-prices-packages" },
    ],
    he: [
      { name: "לוח מחוונים ניהולי", path: "/admin/statistics" },
      { name: "צפה בהכל", path: "/admin/" },
      { name: "מוזיאונים", path: "/admin/museums" },
      { name: "תערוכות", path: "/admin/exhibitions" },
      { name: "לקוחות", path: "/admin/users" },
      { name: "ניהול בקשות", path: "/admin/requests" },
      { name: "תנאים, מחירים וחבילות", path: "/admin/terms-prices-packages" },
    ],
  },
  MuseumOwner: {
    en: [
      { name: "Owner Dashboard", path: "/owner/" },
      { name: "Exhibitions Management", path: "/owner/exhibitions" },
      { name: "Open New Exhibitions", path: "/owner/open-exhibit" },
      { name: "Our Curators", path: "/owner/my-curators" },
      { name: "Museum Details", path: "/owner/edit-details" },
      { name: "Contact us", path: "/owner/contact-us" },
    ],
    he: [
      { name: "לוח מחוונים ", path: "/owner/" },
      { name: "ניהול תערוכות", path: "/owner/exhibitions" },
      { name: "פתח תערוכה חדשה", path: "/owner/open-exhibit" },
      { name: "האוצרים שלנו", path: "/owner/my-curators" },
      { name: "פרטי המוזיאון", path: "/owner/edit-details" },
      { name: "צור קשר", path: "/owner/contact-us" },
    ],
  },
  Curator: {
    en: [
      { name: "Exhibitions Management", path: "/curator/exhibitions" },
      { name: "Contact us", path: "/curator/contact-us" },
    ],
    he: [
      { name: "ניהול תערוכות", path: "/curator/exhibitions" },
      { name: "צור קשר", path: "/curator/contact-us" },
    ],
  },
};

export default sideBarData;
