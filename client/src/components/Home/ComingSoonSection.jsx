import { Link } from "react-router-dom";

const ComingSoon = ({ items }) => {
  return (
    <div className="section-container home__comingSoon">
      <h1 className="section-title">Coming Soon</h1>
      <div className="home__comingSoon-items">
        {items.map((item) => (
          <Link
            to={`/item/${item._id}`}
            className="home__comingSoon-item"
            key={item._id}
          >
            <img src={item.photos[0]} alt="home page coming soon items photo" />
            <p className="heading-3 home__comingSoon-text--1">Coming soon</p>
            <p className="heading-4 home__comingSoon-text--2 p-xs">
              {item.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default ComingSoon;
