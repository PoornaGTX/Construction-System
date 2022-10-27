import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { IoWalletOutline } from "react-icons/io5";

const links = [
  {
    id: 1,
    text: "all products",
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
    id: 50,
    text: "Orders",
    path: "orders",
    icon: <IoWalletOutline/>,
  },
];

export default links;
