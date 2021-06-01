
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import {Assignment,ViewCarousel,Settings,Store,LocalOffer} from "@material-ui/icons";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import Notifications from "@material-ui/icons/Notifications";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";


//my pages
import Dashboardv from './pages/dashboard/dashboard';
import Booking from './pages/booking/booking';
import Vendors from './pages/vendors/vendors';
import Customers from './pages/customers/customers';
import Banners from './pages/banners/banners';
import Reports from './pages/reports/reports';
import Settingsp from './pages/settings/settings';

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: Dashboardv,
    layout: "/admin"
  },
  {
    path: "/booking",
    name: "Bookings",
    icon: Assignment,
    component: Booking,
    layout: "/admin"
  },
  {
    path: "/vendors",
    name: "Vendors",
    icon: Store,
    component: Vendors,
    layout: "/admin"
  },
  {
    path: "/customers",
    name: "Customers",
    icon: Person,
    component: Customers,
    layout: "/admin"
  },
  {
    path: "/banners",
    name: "Banners",
  
    icon: ViewCarousel,
    component: Banners,
    layout: "/admin"
  },
  {
     path: "/reports",
    name: "Reports",
   
    // icon: LocationOn,
    icon: LibraryBooks,
    component: Reports,
    layout: "/admin"
  },
  {
     path: "/Offers",
    name: "Offers",

    icon: LocalOffer,
    component: Settingsp,
    layout: "/admin"
  },
 
];

export default dashboardRoutes;
