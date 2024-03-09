import { BiImageAdd } from "react-icons/bi";
import { FaRegChartBar, FaTh } from "react-icons/fa";
const menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "Add Product",
    icon: <BiImageAdd />,
    path: "/dashboard/add-product",
  },
  {
    title: "Account",
    icon: <FaRegChartBar />,
    children: [
      {
        title: "Profile",
        path: "/user/profile",
      },
      {
        title: "Edit Profile",
        path: "/user/profile/edit-profile",
      },
    ],
  },
];

export default menu;
