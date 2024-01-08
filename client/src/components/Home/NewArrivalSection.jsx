import { Link } from "react-router-dom";

const NewArrivals = ({ items }) => {
  return (
    <div id="newArrivals" className="section-container home__newArrival">
      <h1 className="section-title">New Arrivals</h1>
      <div className="home__newArrival-items">
        {items.map((item) => (
          <Link
            to={`/item/${item._id}`}
            key={item._id}
            className="home__newArrival-item"
          >
            <img src={item.photos[0]} alt="" className="home__newArrival-img" />
            <p className="heading-3 p-sm">{item.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default NewArrivals;
