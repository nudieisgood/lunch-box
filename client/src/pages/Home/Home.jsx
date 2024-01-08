import { Suspense } from "react";

import {
  ComingSoon,
  Hero,
  News,
  FeatureSection,
  NewArrivals,
  GoToTop,
  FadeIn,
  VisualSection,
  LoadingLogo,
} from "../../components";
import customFetch from "../../utilities/customFetch";
import { useLoaderData, Await, defer } from "react-router-dom";

export const loader = async () => {
  try {
    const res = customFetch.get("items", {
      params: { status: ["new arrivals", "coming soon"] },
    });

    const resForLastFiveFeat = customFetch.get("feature/last-five-features");
    const resForRandomFeat = customFetch.get("feature/random-features");

    return defer({
      items: res,
      fiveFeatures: resForLastFiveFeat,
      randomFeatures: resForRandomFeat,
    });
  } catch (error) {
    return error;
  }
};

const Home = () => {
  const loaderPromise = useLoaderData();

  return (
    <Suspense fallback={<LoadingLogo />}>
      <Await
        resolve={Promise.all([
          loaderPromise.items,
          loaderPromise.fiveFeatures,
          loaderPromise.randomFeatures,
        ])}
      >
        {(loaderData) => {
          const [itemsData, fiveFeaturesData, randomFeaturesData] = loaderData;
          const items = itemsData.data.data;
          const fiveFeatures = fiveFeaturesData.data.data;
          const randomFeatures = randomFeaturesData.data.data;

          const comingSoon = items.filter(
            (item) => item.status === "coming soon"
          );
          const newArrivals = items.filter(
            (item) => item.status === "new arrivals"
          );
          return (
            <div className="home">
              <FadeIn>
                <Hero randomFeatures={randomFeatures} />
              </FadeIn>
              <News />
              <NewArrivals items={newArrivals} />
              <ComingSoon items={comingSoon} />
              <FadeIn>
                <VisualSection />
              </FadeIn>
              <FeatureSection fiveFeatures={fiveFeatures} />
              <GoToTop />
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
};
export default Home;
