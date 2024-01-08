import { Form, useNavigation } from "react-router-dom";
import { useState } from "react";

import FormInput from "./FormInput";
import FormFileInput from "./FormFileInput";
import FormOgImages from "./FormOgImages";
import FormTextarea from "./FormTextarea";
import Spinner from "../Helpers/Spinner";

const EditFeatureForm = ({ feature }) => {
  const {
    featureNo,
    date,
    featureTitle1,
    featureTitle2,
    photos,
    mainContent,
    section1Content,
    section2Content,
    section3Content,
    section4Content,
  } = feature;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [ogPhotos, setOgPhotos] = useState(photos);

  const deleteOgPhoto = (photo) => {
    const updateOgPhotos = ogPhotos.filter((item) => item !== photo);

    setOgPhotos(updateOgPhotos);
  };

  const changeMainPic = (photo) => {
    const otherPhotos = ogPhotos.filter((ogPhoto) => ogPhoto !== photo);
    setOgPhotos([photo, ...otherPhotos]);
  };

  return (
    <Form method="post" encType="multipart/form-data" className="form-page">
      <FormInput
        type="text"
        labelText="feature title 1"
        name="featureTitle1"
        defaultValue={featureTitle1}
        placeHolder="If title too long please separate into two part"
      />
      <FormInput
        type="text"
        required={false}
        defaultValue={featureTitle2}
        labelText="feature title 2"
        name="featureTitle2"
        placeHolder="If title too long please separate into two part"
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
          defaultValue={date}
          labelText="Date"
        />
      </div>

      <div className="form-page__imgs">
        <div>
          <input
            className="hidden"
            id="ogPhotos"
            name="ogPhotos"
            readOnly
            value={ogPhotos}
          />
          <FormFileInput
            des={<p>Note ! First photo will be the main photo of feature</p>}
          />

          <FormOgImages
            ogPhotos={ogPhotos}
            deleteOgPhoto={deleteOgPhoto}
            changeMainPic={changeMainPic}
          />
        </div>
      </div>

      <div className="form-page__des">
        <FormTextarea
          required={false}
          name="mainContent"
          labelText="Main content"
          defaultValue={mainContent}
        />
      </div>
      <div className="form-page__des">
        <FormTextarea
          defaultValue={section1Content}
          required={false}
          name="section1Content"
          labelText="Content Section 1"
        />
      </div>
      <div className="form-page__des">
        <FormTextarea
          defaultValue={section2Content}
          required={false}
          name="section2Content"
          labelText="Content Section 2"
        />
      </div>
      <div className="form-page__des">
        <FormTextarea
          defaultValue={section3Content}
          required={false}
          name="section3Content"
          labelText="Content Section 3"
        />
      </div>
      <div className="form-page__des">
        <FormTextarea
          defaultValue={section4Content}
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
export default EditFeatureForm;
