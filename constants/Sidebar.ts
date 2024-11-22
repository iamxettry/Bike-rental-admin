export const adminSidebarList = [
  {
    _id: 1,
    title: "Dashboard",
    path: "/",
  },

  {
    _id: 2,
    title: "Bike Management",
    path: "/admin/bike-management/all-bikes",
    // subList: [
    //   {
    //     _id: 1,
    //     title: "Manage Bike",
    //     path: "/admin/bike-management/all-bikes",
    //   },
    //   // {
    //   //   _id: 2,
    //   //   title: "Add New Bike",
    //   //   path: "/admin/bike-management/add-bike",
    //   // },
    //   // {
    //   //   _id: 3,
    //   //   title: "Bike Categories",
    //   //   path: "/admin/bike-management/categories",
    //   // },
    //   // {
    //   //   _id: 4,
    //   //   title: "Bike Availability",
    //   //   path: "/admin/bike-management/availability",
    //   // },
    // ],
  },
  {
    _id: 3,
    title: "User Management",
    subList: [
      {
        _id: 1,
        title: "All Users",
        path: "/admin/user-management/all-users",
      },
      {
        _id: 2,
        title: "Add New User",
        path: "/admin/user-management/add-user",
      },
      {
        _id: 3,
        title: "User Roles & Permissions",
        path: "/admin/user-management/roles-permissions",
      },
    ],
  },
  {
    _id: 4,
    title: "Rental Management",
    subList: [
      {
        _id: 1,
        title: "All Rentals",
        path: "/admin/rental-management/all-rentals",
      },
      {
        _id: 2,
        title: "Active Rentals",
        path: "/admin/rental-management/active-rentals",
      },
      {
        _id: 3,
        title: "Rental History",
        path: "/admin/rental-management/rental-history",
      },
      {
        _id: 4,
        title: "Upcoming Reservations",
        path: "/admin/rental-management/upcoming-reservations",
      },
    ],
  },
  {
    _id: 5,
    title: "Billing & Payments",
    subList: [
      {
        _id: 1,
        title: "All Payments",
        path: "/admin/billing-payments/all-payments",
      },
      {
        _id: 2,
        title: "Payment History",
        path: "/admin/billing-payments/payment-history",
      },
      {
        _id: 3,
        title: "Invoices",
        path: "/admin/billing-payments/invoices",
      },
      {
        _id: 4,
        title: "Refunds & Adjustments",
        path: "/admin/billing-payments/refunds-adjustments",
      },
    ],
  },
  {
    _id: 6,
    title: "Reports & Analytics",
    subList: [
      {
        _id: 1,
        title: "Rental Reports",
        path: "/admin/reports/rental-reports",
      },
      {
        _id: 2,
        title: "Revenue & Payments Reports",
        path: "/admin/reports/revenue-payments",
      },
      {
        _id: 3,
        title: "Bike Utilization Reports",
        path: "/admin/reports/bike-utilization",
      },
    ],
  },
  {
    _id: 7,
    title: "Support & Help",
    subList: [
      {
        _id: 1,
        title: "FAQs",
        path: "/admin/support-help/faqs",
      },
      {
        _id: 2,
        title: "Customer Support",
        path: "/admin/support-help/customer-support",
      },
      {
        _id: 3,
        title: "Report an Issue",
        path: "/admin/support-help/report-issue",
      },
      {
        _id: 4,
        title: "System Alerts",
        path: "/admin/support-help/system-alerts",
      },
    ],
  },
  {
    _id: 8,
    title: "Settings",
    subList: [
      {
        _id: 1,
        title: "General Settings",
        path: "/admin/settings/general-settings",
      },
      {
        _id: 2,
        title: "Manage Subscription Plans",
        path: "/admin/settings/subscription-plans",
      },
      {
        _id: 3,
        title: "Payment Settings",
        path: "/admin/settings/payment-settings",
      },
      {
        _id: 4,
        title: "Notifications Settings",
        path: "/admin/settings/notifications-settings",
      },
    ],
  },
];
