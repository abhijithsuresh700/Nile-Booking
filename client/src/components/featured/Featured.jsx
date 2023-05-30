import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    `/hotel/countByCity?cities=Mumbai,Delhi,Munnar`
  );
  return (
    <div className="featured">
      {loading ? (
        "loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Mumbai_Aug_2018_%2843397784544%29.jpg/800px-Mumbai_Aug_2018_%2843397784544%29.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Mumbai</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://lh3.googleusercontent.com/p/AF1QipP4hjGv2zX7RP7EdVOXqYz9oqFT3D9jXdckrcur=w296-h202-n-k-rw-no-v1"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Delhi</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://lh3.googleusercontent.com/p/AF1QipM-TiL0SrZJksY66igMFLfnPLkH6gEsVhMpdQIN=w296-h202-n-k-rw-no-v1"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Munnar</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
