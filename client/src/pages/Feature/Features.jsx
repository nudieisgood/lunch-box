import { Suspense } from "react";
import { Await, defer, Link, useLoaderData } from "react-router-dom";
import { FadeIn, GoToTop, ScreenLoader } from "../../components";
import { useAppContext } from "../../context/AppContext";
import customFetch from "../../utilities/customFetch";

export const loader = async () => {
  try {
    const res = customFetch.get("feature");

    return defer({ features: res });
  } catch (error) {
    throw {
      status: error.response.status,
      message: error.response.data.msg,
    };
  }
};

const Features = () => {
  const loaderPromise = useLoaderData();

  const { user } = useAppContext();

  return (
    <>
      <div className="page-container features-page">
        <h1 className="section-title">FEATURES</h1>
        <Suspense fallback={<ScreenLoader />}>
          <Await resolve={loaderPromise.features}>
            {(loaderData) => {
              return (
                <div className="features-page__item-box heading-4">
                  {loaderData.data.data.map((feat) => (
                    <div className="features-page__item" key={feat.featureNo}>
                      {user?.role === "admin" && (
                        <Link
                          to={`/admin/editFeature/${feat.featureNo}`}
                          className="features-page__item-edit"
                        >
                          EDIT FEATURE
                        </Link>
                      )}
                      <Link
                        to={`/feature/${feat.featureNo}`}
                        key={feat.featureNo}
                      >
                        <div className="features-page__item-img">
                          <FadeIn delay={0.3}>
                            <img src={feat.photos[0]} alt="features-photo" />
                            <h4 className="heading-3">
                              FEATURE {feat.featureNo}
                            </h4>
                          </FadeIn>
                        </div>
                        <FadeIn delay={0.4} direction="left">
                          <div className="features-page__item-text">
                            <p>{feat.featureTitle1}</p>
                            <p>{feat.featureTitle2}</p>
                            <h4 className="heading-4">{feat.date}</h4>
                          </div>
                        </FadeIn>
                      </Link>
                    </div>
                  ))}
                </div>
              );
            }}
          </Await>
        </Suspense>
      </div>
      <GoToTop />
    </>
  );
};
export default Features;
