import { Link } from "react-router-dom";

const FeatureSection = ({ fiveFeatures }) => {
  return (
    <div id="feature" className="home__feature">
      <h1 className="section-title">Feature</h1>
      <div className="home__feature-bar">
        {fiveFeatures?.map((feat, i) => (
          <Link
            to={`/feature/${feat.featureNo}`}
            key={i}
            className="home__feature-item"
          >
            <img
              src={feat.photos[0]}
              className="home__feature-img"
              alt="home page feature section photo"
            />
            <div className="home__feature-item-box">
              <p className="heading-4">Feature {feat.featureNo}</p>
              <h2 className="heading-3">{feat.featureTitle1}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default FeatureSection;
