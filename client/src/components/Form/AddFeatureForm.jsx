import { format } from "date-fns";

import { Form, useNavigation } from "react-router-dom";

import FormInput from "./FormInput";
import FormFileInput from "./FormFileInput";
import FormTextarea from "./FormTextarea";
import Spinner from "../Helpers/Spinner";

const AddFeatureForm = ({ errorArr, featureNo }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post" encType="multipart/form-data" className="form-page">
      <FormInput
        type="text"
        labelText="feature title 1"
        name="featureTitle1"
        placeHolder="If title too long,"
      />
      <FormInput
        type="text"
        required={false}
        labelText="feature title 2"
        name="featureTitle2"
        placeHolder="please separate into two part"
      />
      <div className="form-page__price">
        <FormInput
          type="text"
          name="featureNo"
          readOnly={true}
          value={featureNo}
          labelText="Feature No."
        />
        <FormInput
          type="text"
          name="date"
          defaultValue={format(new Date(new Date()), "yyyy-MM-dd")}
          labelText="Date"
        />
      </div>

      <div className="form-page__imgs">
        <FormFileInput
          title="Feature"
          des={<p>Note ! First photo will be the main photo of feature</p>}
        />
      </div>
      <div className="form-page__des">
        <FormTextarea
          required={false}
          name="mainContent"
          labelText="Main content"
        />
      </div>
      <div className="form-page__des">
        <FormTextarea
          required={false}
          name="section1Content"
          labelText="Content Section 1"
        />
      </div>
      <div className="form-page__des">
        <FormTextarea
          required={false}
          name="section2Content"
          labelText="Content Section 2"
        />
      </div>
      <div className="form-page__des">
        <FormTextarea
          required={false}
          name="section3Content"
          labelText="Content Section 3"
        />
      </div>
      <div className="form-page__des">
        <FormTextarea
          required={false}
          name="section4Content"
          labelText="Content Section 4"
        />
      </div>

      <button
        disabled={isSubmitting ? true : false}
        type="submit"
        className="btn-form"
      >
        {isSubmitting ? <Spinner /> : "SUBMIT"}
      </button>
    </Form>
  );
};
export default AddFeatureForm;
