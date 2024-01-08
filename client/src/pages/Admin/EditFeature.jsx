import { useLoaderData, redirect } from "react-router-dom";
import { EditFeatureForm } from "../../components";
import customFetch from "../../utilities/customFetch";

export const loader = async ({ params }) => {
  const { id } = params;
  console.log(id);
  const res = await customFetch.get(`feature/${id}`);

  return res.data.data[0];
};

export const action = async ({ request, params }) => {
  const { id } = params;
  const formData = await request.formData();

  try {
    await customFetch.patch(`feature/${id}`, formData);
    return redirect(`/feature/${id}`);
  } catch (error) {
    throw {
      status: error.response.status,
      message: error.response.data.msg,
    };
  }
};

const EditFeature = () => {
  const feature = useLoaderData();
  console.log(feature, "1");
  return (
    <>
      <h1 className="heading-1 mb-sm">EDIT YOUR FEATURE</h1>
      <EditFeatureForm feature={feature} />
    </>
  );
};
export default EditFeature;
