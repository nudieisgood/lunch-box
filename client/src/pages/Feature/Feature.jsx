import { useLoaderData, Await, defer } from "react-router-dom";
import { Suspense } from "react";
import { FadeIn, GoToTop, LoadingLogo } from "../../components";
import customFetch from "../../utilities/customFetch";

export const loader = async ({ params }) => {
  const { id } = params;

  try {
    const res = customFetch.get(`feature/${id}`);

    return defer({ feature: res });
  } catch (error) {
    throw {
      status: error.response.status,
      message: error.response.data.msg,
    };
  }
};

const Feature = () => {
  const loaderPromise = useLoaderData();

  return (
    <Suspense fallback={<LoadingLogo />}>
      <Await resolve={loaderPromise.feature}>
        {(loaderData) => {
          const feat = loaderData.data.data[0];

          return (
            <div className="feature-page">
              <div className="feature-page__header">
                <FadeIn delay={0.2}>
                  <img
                    className="feature-page__header-img"
                    src={feat.photos[0]}
                    alt="feature main photo"
                  />
                </FadeIn>
                <FadeIn delay={0.1} direction="left">
                  <div className="feature-page__header-title">
                    <h4 className="heading-2">FEATURE {feat.featureNo}</h4>
                    {feat?.featureTitle1 && (
                      <h1 className="heading-1">
                        <span>{feat?.featureTitle1}</span>
                      </h1>
                    )}
                    {feat?.featureTitle2 && (
                      <h1 className="heading-1">
                        <span>{feat?.featureTitle2}</span>
                      </h1>
                    )}
                  </div>
                </FadeIn>
              </div>
              <div className="section-container feature-page__main">
                <div className="feature-page__main-title">
                  <h2 className="heading-2">FEATURE {feat.featureNo}</h2>
                  {feat?.featureTitle1 && (
                    <h1 className="heading-1">{feat?.featureTitle1}</h1>
                  )}
                  {feat?.featureTitle2 && (
                    <h1 className="heading-1">{feat?.featureTitle2}</h1>
                  )}
                </div>

                <div className="paragraph">{feat?.mainContent}</div>
                <div className="feature-page__main-img feature-page__main-img--1">
                  {feat.photos.length > 1 && (
                    <img src={feat?.photos[1]} alt="" />
                  )}
                </div>
                <p className="paragraph">{feat.section1Content}</p>
                <div className="feature-page__main-img feature-page__main-img--2">
                  {feat?.photos?.length > 2 && (
                    <img src={feat?.photos[2]} alt="" />
                  )}
                </div>
                <p className="paragraph">{feat.section2Content}</p>
                <div className="feature-page__main-img feature-page__main-img--3">
                  {feat.photos.length > 3 && (
                    <img src={feat.photos[3]} alt="" />
                  )}
                </div>
                <p className="paragraph">{feat?.section3Content}</p>
                <div className="feature-page__main-img feature-page__main-img--4">
                  {feat.photos.length > 4 && (
                    <img src={feat.photos[4]} alt="" />
                  )}
                </div>
                <p className="paragraph">{feat?.section4Content}</p>
                <GoToTop />
              </div>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
};
export default Feature;
