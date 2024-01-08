import { Form, useNavigation } from "react-router-dom";

import FormInput from "./FormInput";
import FormFileInput from "./FormFileInput";
import FormSelect from "./FormSelect";
import FormTextarea from "./FormTextarea";
import Spinner from "../Helpers/Spinner";

import { useState } from "react";
const status = ["coming soon", "new arrivals", "sale", "regular"];

const type = ["jacket", "shirt", "top", "hat", "accessory", "pants"];

const AddItemForm = ({ errorArr }) => {
  const [sizing, setSizing] = useState(true);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Form method="post" encType="multipart/form-data" className="form-page">
      <FormInput
        type="text"
        labelText="item name"
        name="name"
        placeHolder="item name"
      />
      <FormInput
        type="text"
        labelText="item fabric"
        name="fabric"
        placeHolder="item fabric"
      />
      <div className="form-page__price">
        <FormInput
          type="text"
          name="price"
          placeHolder="USD"
          labelText="item price"
        />
        <FormSelect labelText="Item Type" name="type" list={type} />
        <FormSelect labelText="Item Status" name="status" list={status} />
      </div>
      <div className="form-page__size">
        <h1 className="form__filed-title">Size / Qty</h1>
        <button
          className="btn btn-text"
          type="button"
          onClick={() => {
            setSizing(!sizing);
          }}
        >
          {sizing ? "Different size" : "One Size"}
        </button>
        {sizing ? (
          <div className="form-page__size--sizing">
            <FormInput
              type="number"
              labelText="SMALL/28W"
              name="sizeS"
              placeHolder="QTY"
            />
            <FormInput
              type="number"
              labelText="MEDIUM/30W"
              name="sizeM"
              placeHolder="QTY"
            />
            <FormInput
              type="number"
              labelText="LARGE/32W"
              name="sizeL"
              placeHolder="QTY"
            />
            <FormInput
              type="number"
              labelText="XLARGE/34W"
              name="sizeXL"
              placeHolder="QTY"
            />
          </div>
        ) : (
          <FormInput
            type="number"
            labelText="ONE SIZE"
            name="oneSize"
            placeHolder="QTY"
          />
        )}
      </div>

      <div className="form-page__des">
        <FormTextarea name="description" labelText="description" />{" "}
      </div>

      <div className="form-page__imgs">
        <FormFileInput />
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
export default AddItemForm;
