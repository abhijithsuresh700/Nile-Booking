import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { loading, data, error } = useFetch(`/hotel?featured=true`);

  console.log(data, "dtaaaaaaaaaa");

  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img src={item.photos[0]} alt="" className="fpImg" />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">
                Starting from ₹{item.cheapestPrice}
              </span>
          
                <div className="fpRating">
                  <button>4.5</button>
                  <span>Excellent</span>
                </div>
          
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
