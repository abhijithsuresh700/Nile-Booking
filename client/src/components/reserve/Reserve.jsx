import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import useFetch from "../../hooks/useFetch.js";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";
import { format } from "date-fns";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`/hotel/room/${hotelId}`);
  const { dates } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const startDate = dates[0]?.startDate;
  const endDate = dates[0]?.endDate;


  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };
  const alldates = getDatesInRange(dates[0]?.startDate, dates[0]?.endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  console.log(data,selectedRooms,"maxpeople")

  const booking = {
    user: user.details._id,
    hotel: hotelId,
    room: selectedRooms,
    startDate: startDate,
    endDate: endDate
    
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    if (selectedRooms.length === 0) {
      toast.error("No rooms selected. Please select a room", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    try {
      await Promise.all(
        selectedRooms.map(async (roomId) => {
          const res = await axios.put(
            `http://localhost:8880/api/room/availability/${roomId}`,
            { dates: alldates }
          );
          const book = await axios.post(
            `http://localhost:8880/api/booking`,
            booking
          );
console.log(res.status,"status checkkk")
          if (res.status === 200) {
            toast.success("Your room has been booked", {
              position: toast.POSITION.TOP_RIGHT,
            });
            setOpen(false);
            navigate("/");
          }
        })
      );
    } catch (err) {
      toast.error("Booking failed", { position: toast.POSITION.TOP_RIGHT });
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Reserve;
