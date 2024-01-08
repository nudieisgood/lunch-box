import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FormInput, Spinner } from "../../components";
import { useAppContext } from "../../context/AppContext";
import customFetch from "../../utilities/customFetch";

const Login = () => {
  const { changeUser } = useAppContext();
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    try {
      const {
        data: { user },
      } = await customFetch.post("/auth/login", data);
      changeUser(user);
      navigate("/");
    } catch (error) {
      setError(error.response.data.msg);
    }
    setLoading(false);
  };

  return (
    <div className="section-container login-register">
      <form onSubmit={handleSubmit} className="login-register__form">
        <h1 className="heading-1">LOG IN</h1>

        {error && (
          <h3 className="heading-3 login-register__error">
            Email or password incorrect.
          </h3>
        )}

        <FormInput
          inputError={error}
          type="email"
          name="email"
          labelText="Email"
          placeHolder="youreamil@email.com"
        />
        <FormInput
          inputError={error}
          type="password"
          name="password"
          labelText="password"
          placeHolder="password"
        />

        <button type="submit" className="btn-form" disabled={loading}>
          {loading ? <Spinner /> : "LOG IN"}
        </button>

        <div className="heading-3">
          Not a member ?
          <Link to="/register" className="heading-3">
            SIGN UP
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Login;
