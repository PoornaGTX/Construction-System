import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import links from "../utils/links";

const NavLinks = ({ toggleSidebar }) => {
  const { user } = useAppContext();
  let newLinks = links;

  if (user.type === "Site Manager" || user.type === "ProcurementManager") {
    newLinks = newLinks.filter((link) => {
      if (
        link.path !== "add-product" &&
        link.path !== "orders" &&
        link.path !== "add-to-cart"
      ) {
        return link;
      }
    });
  }

  if (user.type === "Supplier") {
    newLinks = newLinks.filter((link) => {
      if (
        link.path !== "add-to-cart" ||
        link.path !== "all-projects" ||
        link.path !== "all-site-managers" ||
        link.path !== "add-new-project" ||
        link.path !== "order-requests"
      ) {
        return link;
      }
    });
  }

  return (
    <div className="nav-links">
      {newLinks.map((link) => {
        const { text, path, id, icon } = link;
        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSidebar}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
