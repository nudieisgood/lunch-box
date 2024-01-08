import { motion } from "framer-motion";

import { useState } from "react";
import { Link } from "react-router-dom";

import Carousel from "../Carousel/Carousel";

const Hero = ({ randomFeatures }) => {
  const [feature, setFeature] = useState(0);

  return (
    <div id="hero" className="home__hero">
      <Carousel setFeature={setFeature} autoSlide={true}>
        {randomFeatures.map((feat) => (
          <img
            className="home__hero-img"
            key={feat.featureNo}
            src={feat.photos[0]}
          />
        ))}
      </Carousel>
      <div>
        {randomFeatures.map((feat, i) => (
          <div key={i}>
            {feature === i && (
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.8,
                }}
              >
                <div className="home__hero-text">
                  <p className="heading-2">FEATURE {feat.featureNo}</p>
                  <div className="heading-1">
                    <p>{feat.featureTitle1}</p>
                    <p>{feat.featureTitle2}</p>
                  </div>
                  <div>
                    <Link to={`/feature/${feat.featureNo}`} className="btn">
                      MORE
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Hero;
