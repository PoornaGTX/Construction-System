import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { BsBuilding } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import { IoWalletOutline } from "react-icons/io5";
import { MdOutlineManageAccounts } from "react-icons/md";
import { BiAddToQueue } from "react-icons/bi";
import { GoRequestChanges } from "react-icons/go";

const links = [
  {
    id: 1,
    text: "Home",
    path: "/",
    icon: <MdQueryStats />,
  },
  {
    id: 2,
    text: "add product",
    path: "add-product",
    icon: <FaWpforms />,
  },
  {
    id: 3,
    text: "profile",
    path: "profile",
    icon: <ImProfile />,
  },
  {
    id: 4,
    text: "My Cart",
    path: "add-to-cart",
    icon: <ImProfile />,
  },
  {
    id: 5,
    text: "Orders",
    path: "orders",
    icon: <IoWalletOutline />,
  },
  {
    id: 6,
    text: "All Projects",
    path: "all-projects",
    icon: <BsBuilding />,
  },
  {
    id: 7,
    text: "All Site Managers",
    path: "all-site-managers",
    icon: <MdOutlineManageAccounts />,
  },
  {
    id: 8,
    text: "Add New Project",
    path: "add-new-project",
    icon: <BiAddToQueue />,
  },
  {
    id: 9,
    text: "Order Requests",
    path: "order-requests",
    icon: <GoRequestChanges />,
  },
];

export default links;
