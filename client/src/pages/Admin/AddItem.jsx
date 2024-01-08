import { AddItemForm } from "../../components";
import customFetch from "../../utilities/customFetch";
import { redirect } from "react-router-dom";

export const loader = async () => {
  return null;
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  try {
    const res = await customFetch.post("/items", formData);
    return redirect(`/item/${res.data.data}`);
  } catch (error) {
    throw {
      status: error.response.status,
      message: error.response.data.msg,
    };
  }
};

const ManageItems = () => {
  return (
    <>
      <h1 className="heading-1 mb-sm">ADD NEW ITEM</h1>
      <AddItemForm />
    </>
  );
};
export default ManageItems;
