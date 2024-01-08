import { Form, useNavigation } from "react-router-dom";
import { useState } from "react";

import FormInput from "./FormInput";
import FormFileInput from "./FormFileInput";
import FormSelect from "./FormSelect";
import FormTextarea from "./FormTextarea";
import FormOgImages from "./FormOgImages";
import Spinner from "../Helpers/Spinner";

const status = ["coming soon", "new arrivals", "sale", "regular"];

const type = ["jacket", "shirt", "top", "hat", "accessory", "pants"];

const EditItemForm = ({ item }) => {
  const {
    photos,
    name,
    stock,
    fabric,
    price,
    description,
    status: itemStatus,
    type: itemType,
  } = item;

  const [sizing, setSizing] = useState(stock.length > 1);
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
        defaultValue={name}
        labelText="item name"
        name="name"
        placeHolder="item name"
      />
      <FormInput
        defaultValue={fabric}
        type="text"
        labelText="item fabric"
        name="fabric"
        placeHolder="item fabric"
      />
      <div className="form-page__price">
        <FormInput
          defaultValue={price}
          type="text"
          name="price"
          placeHolder="USD"
          labelText="item price"
        />
        <FormSelect
          defaultValue={itemType}
          labelText="Item Type"
          name="type"
          list={type}
        />
        <FormSelect
          defaultValue={itemStatus}
          labelText="Item Status"
          name="status"
          list={status}
        />
      </div>
      <div className="form-page__size">
        <h2 className="form__filed-title">Size / Qty</h2>
        <button
          className="btn btn-text"
          type="button"
          onClick={() => {
            setSizing(!sizing);
          }}
        >
          {sizing ? "One Size" : "different size"}
        </button>
        {sizing ? (
          <div className="form-page__size--sizing">
            <FormInput
              defaultValue={stock[0]?.quantity}
              type="number"
              labelText="SMALL / 28W"
              name="sizeS"
              placeHolder="QTY"
            />
            <FormInput
              defaultValue={stock[1]?.quantity}
              type="number"
              labelText="MEDIUM / 30W"
              name="sizeM"
              placeHolder="QTY"
            />
            <FormInput
              defaultValue={stock[2]?.quantity}
              type="number"
              labelText="LARGE / 32W"
              name="sizeL"
              placeHolder="QTY"
            />
            <FormInput
              defaultValue={stock[3]?.quantity}
              type="number"
              labelText="XLARGE / 34W"
              name="sizeXL"
              placeHolder="QTY"
            />
          </div>
        ) : (
          <FormInput
            defaultValue={stock[0]?.quantity}
            classValue="text-sm"
            type="number"
            labelText="ONE SIZE"
            name="oneSize"
            placeHolder="QTY"
          />
        )}
      </div>

      <div className="form-page__des">
        <FormTextarea
          name="description"
          defaultValue={description}
          labelText="description"
        />
      </div>

      <div className="form-page__imgs">
        <input
          className="hidden"
          id="ogPhotos"
          name="ogPhotos"
          readOnly
          value={ogPhotos}
        />
        <FormFileInput />

        <FormOgImages
          ogPhotos={ogPhotos}
          deleteOgPhoto={deleteOgPhoto}
          changeMainPic={changeMainPic}
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
export default EditItemForm;
