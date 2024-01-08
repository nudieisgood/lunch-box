import { AiOutlineCloudUpload } from "react-icons/ai";

import { useState } from "react";

import customFetch from "../../utilities/customFetch";
import { backendBaseURL } from "../../utilities/customFetch";

const FormFileInput = ({ name, title, des }) => {
  const [photos, setPhotos] = useState([]);

  const uploadPhoto = async (e) => {
    const files = e.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(name || "photos", files[i]);
    }
    const url = name ? `/upload/${name}` : "/upload";

    try {
      const res = await customFetch.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { data } = res.data;

      setPhotos(data);
    } catch (error) {
      throw {
        status: error.response.status,
        message: error.response.data.msg,
      };
    }
  };

  return (
    <>
      <h2 className="form__filed-title">{title || "Item"} Images</h2>
      <p className="heading-4">{des}</p>
      <div className="form__images">
        {!name &&
          photos.length > 0 &&
          photos.map((photo) => (
            <img
              key={photo}
              className="form__image"
              src={`${backendBaseURL}/${photo}`}
              alt="place photos"
            />
          ))}

        <label htmlFor="dropzone-file" className="form__file-upload">
          <div className="form__file-upload--icon">
            <AiOutlineCloudUpload className="heading-1" />
          </div>
          <input
            multiple
            name={name || "photos"}
            id="dropzone-file"
            type="file"
            onChange={uploadPhoto}
          />
        </label>
      </div>
    </>
  );
};

export default FormFileInput;
