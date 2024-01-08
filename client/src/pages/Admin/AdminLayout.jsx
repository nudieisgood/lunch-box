import AdminNav from "./AdminNav";
import { Outlet } from "react-router-dom";
import customFetch from "../../utilities/customFetch";

export const loader = async () => {
  try {
    await customFetch.get("/user/get-current-user");
    return null;
  } catch (error) {
    throw {
      status: error.response.status,
      message: error.response.data.msg,
    };
  }
};

const AdminLayout = () => {
  return (
    <div className="page-container admin">
      <AdminNav />
      <Outlet />
    </div>
  );
};
export default AdminLayout;
