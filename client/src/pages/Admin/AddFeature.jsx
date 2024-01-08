import { redirect, useLoaderData } from "react-router-dom";
import customFetch from "../../utilities/customFetch";
import { AddFeatureForm } from "../../components";

export const loader = async () => {
  const res = await customFetch.get("feature");

  return res.data.data;
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  try {
    const res = await customFetch.post("feature", formData);

    return redirect(`/feature/${res.data.data}`);
  } catch (error) {
    throw {
      status: error.response.status,
      message: error.response.data.msg,
    };
  }
};

const AddFeature = () => {
  const totalFeatures = useLoaderData().length;
  return (
    <>
      <h1 className="heading-1 mb-sm">ADD NEW FEATURE</h1>
      <h3 className="heading-3 mb-sm">
        CURRENT FEATURE No. {totalFeatures + 1}
      </h3>
      <AddFeatureForm featureNo={totalFeatures + 1} />
    </>
  );
};
export default AddFeature;
