import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import globe from "../../assets/globe.png";
import "./booking.css";
import BookedItem from "../../components/bookedItem/BookedItem";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";


function Bookings() {
  const { user } = useContext(AuthContext);
  const userId = user.details._id;
  const [bookingData, setBookingData] = useState([]);
  const { loading, data, error } = useFetch(`/booking/${userId}`);

  console.log(data.length, "final");
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {data?.length === 0 ? (
        <div className="bookingsContainer">
          <div className="bookingsWrapper">
            <div className="bookingBox">
              <img className="bookingImage" src={globe} />
              <h2 className="bookingHeading">Your trips live here</h2>
              <span className="bookingDesc">
                This page shows all your bookings. If you made a booking but
                don't see it here, you can import it
              </span>
              <span className="bookingDesctwo">
                using your booking confirmation number and PIN.
              </span>
              <span className="bookingLink">Import booking</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <BookedItem bookingData={data} key={data._id} />
        </>
      )}
    </div>
  );
}

export default Bookings;
