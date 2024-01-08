import visual1 from "../../assets/visual/visual1.jpeg";
import visual2 from "../../assets/visual/visual2.jpeg";
import { Link } from "react-router-dom";

const data = {
  visualTitle: "2023 Autumn / Winter",
  visualImage1: visual1,
  visualImage2: visual2,
};

const VisualSection = () => {
  return (
    <div className="home__visual">
      <div className="home__visual-img-box">
        <img className="home__visual-img" src={data.visualImage1} alt="" />
      </div>
      <div className="home__visual-img-box">
        <img
          className="home__visual-img home__visual-img--2"
          src={data.visualImage2}
          alt=""
        />
      </div>
      <div className="home__visual-text">
        <div>
          <h2>{data.visualTitle}</h2>
          <h1 className="section-title section-title--white">VISUAL</h1>
          <Link to={"/visual"} className="btn btn--white">
            More
          </Link>
        </div>
      </div>
    </div>
  );
};
export default VisualSection;
