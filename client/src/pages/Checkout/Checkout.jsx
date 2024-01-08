import {
  useLoaderData,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import customFetch from "../../utilities/customFetch";
import { FormInput, Spinner } from "../../components";

export const loader = async ({ request }) => {
  const queryEntriesArr = [...new URL(request.url).searchParams.entries()];
  const { c } = Object.fromEntries(queryEntriesArr);
  try {
    const res = await customFetch.get(`checkout/${c}`);

    return res.data.data.checkoutInfo;
  } catch (error) {
    if (error.response.data.msg === "invalid token") return redirect("/cart");
  }
};

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const response = await customFetch.post("order", data);

    return redirect("/completed");
  } catch (error) {
    if (error.response.data.msg === "some items are out of stock")
      return redirect("/cart");

    if (error.response.data.msg === "some items are unavailable")
      return redirect("/cart");

    if (error.response.data.msg === "invalid token")
      throw {
        status: error.response.status,
        message: "Checkout over time, please try again.",
      };

    return error.response.data.msg;
  }
};

const Checkout = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const errors = useActionData()?.split(",");
  const data = useLoaderData();

  const priceArr = [];

  return (
    <Form method="post" className="page-container checkout">
      <div className="checkout__form">
        <div>
          <h1 className="heading-1">CONTACT</h1>
          <FormInput
            inputError={errors?.includes("invalid email format.")}
            name="email"
            type="email"
            placeHolder="youreamil@email.com"
          />
        </div>
        <div className="checkout__form-group">
          <h1 className="heading-1">DELIVERY</h1>
          <div className="checkout__input-group">
            <FormInput
              name="postalCode"
              type="number"
              placeHolder="Postal code"
            />
            <FormInput name="city" type="text" placeHolder="City" />
          </div>
          <FormInput
            name="address"
            type="text"
            placeHolder="Please provide completed address."
          />
        </div>
        <div className="checkout__form-group">
          <h1 className="heading-1">INFORMATION</h1>
          <div className="checkout__input-group">
            <FormInput name="lastName" type="text" placeHolder="Last name" />
            <FormInput name="firstName" type="text" placeHolder="First name" />
          </div>
          <FormInput
            inputError={errors?.includes("invalid phone")}
            name="phone"
            type="text"
            max={10}
            placeHolder="Phone"
          />
        </div>
        <div className="checkout__form-group">
          <h1 className="heading-1">PAYMENT</h1>
          <FormInput
            inputError={errors?.includes("invalid card number")}
            name="creditCardNum"
            type="text"
            placeHolder="Credit card number"
            max={14}
          />
          <div className="checkout__input-group">
            <FormInput
              inputError={errors?.includes("invalid exp date")}
              name="creditCardExp"
              type="text"
              placeHolder="Expiration date (MMYYYY)"
              max={6}
            />
            <FormInput
              inputError={errors?.includes("invalid security code")}
              name="creditCardSecurityCode"
              type="text"
              placeHolder="Security code"
              max={3}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn-form ${isSubmitting && "opacity-md"}`}
        >
          {isSubmitting ? <Spinner /> : "PAY NOW"}
        </button>
      </div>
      <div className="checkout__detail">
        {data.map((c, i) => {
          const { name, photos, price } = c.itemInfo;
          priceArr.push(price);
          return (
            <div key={i} className="checkout__detail-item">
              <img src={photos[0]} alt="checkout item photo" />

              <div>
                <h4 className="heading-4">{name}</h4>
                <h3 className="heading-3">SIZE: {c.sizing}</h3>
              </div>

              <h4 className="heading-4">X 1</h4>
              <h4 className="heading-4">$ {price * 1} USD</h4>
            </div>
          );
        })}
        <div className="checkout__price">
          <p className="heading-3">
            SUBTOTAL : $ {priceArr.reduce((acc, curr) => acc + curr, 0)}
            USD
          </p>
          <p className="heading-3">SHIPPING : $ 10 USD</p>
          <p className="heading-2">
            TOTAL : $ {priceArr.reduce((acc, curr) => acc + curr, 0) + 10} USD
            <input
              type="number"
              name="totalPrice"
              hidden
              readOnly
              value={priceArr.reduce((acc, curr) => acc + curr, 0) + 10}
            />
          </p>

          <p className="heading-4">Tax included</p>
        </div>
      </div>
    </Form>
  );
};
export default Checkout;
