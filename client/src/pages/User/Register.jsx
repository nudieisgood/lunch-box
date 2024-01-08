import {
  redirect,
  Form,
  Link,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { FormInput, Spinner } from "../../components";
import customFetch from "../../utilities/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/register", data);
    return redirect("/login");
  } catch (error) {
    throw {
      status: error.response.status,
      message: error.response.data.msg,
    };
  }
};

const Register = () => {
  const isSubmitting = useNavigation().state === "submitting";
  const errorData = useActionData();
  const errorArr = errorData?.split(",");

  return (
    <div className="section-container login-register">
      <Form method="post" className="login-register__form">
        <h1 className="heading-1">Sign up</h1>
        <FormInput
          type="text"
          name="lastName"
          placeHolder="Last name"
          labelText="Last name"
        />
        <FormInput
          type="text"
          name="firstName"
          placeHolder="First name"
          labelText="First name"
        />
        <FormInput
          type="email"
          name="email"
          labelText="Email"
          placeHolder="youreamil@email.com"
          inputError={
            errorArr?.includes("invalid email format.") ||
            errorArr?.includes("email already exists.")
          }
        />
        {errorArr?.includes("invalid email format.") && (
          <h3 className="heading-3 login-register__error">
            invalid email format.
          </h3>
        )}
        {errorArr?.includes("email already exists.") && (
          <h3 className="heading-3 login-register__error">
            email already exists.
          </h3>
        )}
        <FormInput
          type="password"
          name="password"
          placeHolder="password should longer than 8 characters"
          labelText="password"
          inputError={errorArr?.includes(
            "password should longer than 8 characters."
          )}
        />
        {errorArr?.includes("password should longer than 8 characters.") && (
          <h3 className="heading-3 login-register__error">
            password should longer than 8 characters.
          </h3>
        )}
        <button disabled={isSubmitting} type="submit" className="btn-form">
          {isSubmitting ? <Spinner /> : "SUBMIT"}
        </button>
        <div className="heading-3">
          Already a member ?
          <Link to="/login" className="heading-3">
            LOGIN
          </Link>
        </div>
      </Form>
    </div>
  );
};
export default Register;
