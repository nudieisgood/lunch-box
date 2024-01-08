import { Link, useRouteError } from "react-router-dom";

import { Logo } from "../../components";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="center-empty-page">
      <div className="center-empty-page__box heading-2">
        <Logo />
        <h1>Oops... Something went wrong.</h1>

        <h2>{error.status}</h2>
        <h2>{error.status === 404 ? "PAGE NOT FOUND." : error.message}</h2>

        <Link className="btn-text heading-4" to={"/"}>
          BACK TO HOME PAGE
        </Link>
      </div>
    </div>
  );
};
export default ErrorPage;
