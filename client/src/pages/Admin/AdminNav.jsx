import { NavLink } from "react-router-dom";

const AdminNav = () => {
  return (
    <nav className="admin__navbar">
      <NavLink end className="btn btn-text" to=".">
        Add item
      </NavLink>
      <NavLink className="btn btn-text" to="orders">
        orders
      </NavLink>
      <NavLink className="btn btn-text" to="manage-feature">
        Add features
      </NavLink>
    </nav>
  );
};
export default AdminNav;
