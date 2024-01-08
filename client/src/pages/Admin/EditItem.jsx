import { useLoaderData, redirect } from "react-router-dom";
import { EditItemForm } from "../../components";
import customFetch from "../../utilities/customFetch";

export const loader = async ({ params }) => {
  const { id } = params;

  const res = await customFetch.get(`items/${id}`);

  return res.data.data;
};

export const action = async ({ request, params }) => {
  const { id } = params;
  const formData = await request.formData();

  try {
    const res = await customFetch.patch(`items/${id}`, formData);

    return redirect(`/item/${id}`);
  } catch (error) {
    throw {
      status: error.response.status,
      message: error.response.data.msg,
    };
  }
};

const EditItem = () => {
  const item = useLoaderData();

  return (
    <>
      <h1 className="heading-1 mb-sm">EDIT YOUR ITEM</h1>
      <EditItemForm item={item} />
    </>
  );
};
export default EditItem;
