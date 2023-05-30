import React from "react";
import { Link } from "react-router-dom";
import "./bookedItem.css";
import { format } from "date-fns";
import axios from "axios";

function BookedItem({ bookingData }) {
  console.log(bookingData, "at bookingtwo");
  console.log(bookingData.length, "length check");

  const handleCancel = async (id) => {
    try {
      await axios.put(`http://localhost:8880/api/booking/${id}`);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bookedItembi">
      {bookingData?.map((data, i) => {
        return (
          <>
            <div className="main" key={i}>
              <img
                src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
                alt=""
                className="biImg"
              />
              <div className="biDesc">
                <h1 className="biTitle"> {data.hotel.name}</h1>
                <span className="biDistance">
                  500m from center this is to check
                </span>
                <span className="biCancelOp">
                  <span>Booking Number :- {data._id}</span>
                  <span>Rooms: {data?.length}</span>
                </span>
                <span className="biCancelOpSubtitle">INR $1000</span>
                {data.status === "active" ? (
                  <button
                    className="cancelButton"
                    onClick={() => handleCancel(data._id)}
                  >
                    Cancel Booking
                  </button>
                ) : (
                  <span style={{ color: "red" }}>Canceled</span>
                )}
              </div>
              <div className="biDetails">
                <div className="biDetailItems">
                  <div className="biDetailTexts">CHECK-IN</div>
                  <div className="biDetailDate">
                    {new Date(data?.startDate).getDate()}
                  </div>
                  <div className="biDetailMonth">
                    {new Date(data?.startDate).toLocaleString("en-US", {
                      month: "long",
                    })}
                  </div>
                  <div className="biDetailDay">
                    {new Date(data?.startDate).toLocaleString("en-US", {
                      weekday: "long",
                    })}
                  </div>
                </div>
                <hr />
                <div className="biDetailItems">
                  <div className="biDetailTexts">CHECK-OUT</div>
                  <div className="biDetailDate">
                    {new Date(data?.endDate).getDate()}
                  </div>
                  <div className="biDetailMonth">
                    {new Date(data?.endDate).toLocaleString("en-US", {
                      month: "long",
                    })}
                  </div>
                  <div className="biDetailDay">
                    {new Date(data?.endDate).toLocaleString("en-US", {
                      weekday: "long",
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default BookedItem;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./bookedItem.css";
// import { format } from "date-fns";
// import axios from "axios";

// function BookedItem({ bookingData }) {
//   console.log(bookingData, "at bookingtwo");
//   console.log(bookingData.length, "length check");

//   const [cancelledBookings, setCancelledBookings] = useState([]);

//   const handleCancel = async (id) => {
//     try {
//       await axios.put(`http://localhost:8880/api/booking/${id}`);
//       setCancelledBookings((prevCancelledBookings) => [
//         ...prevCancelledBookings,
//         id,
//       ]);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="bookedItembi">
//       {bookingData?.map((data, i) => {
//         const isCancelled = data.status === 'cancelled';
//         return (
//           <div className="main" key={i}>
//             <img
//               src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
//               alt=""
//               className="biImg"
//             />
//             <div className="biDesc">
//               <h1 className="biTitle"> {data.hotel.name}</h1>
//               <span className="biDistance">
//                 500m from center this is to check
//               </span>
//               <span className="biCancelOp">
//                 <span>Booking Number :- {data._id}</span>
//                 <span>Rooms: {data?.length}</span>
//               </span>
//               <span className="biCancelOpSubtitle">INR $1000</span>
//               {isCancelled ? (
//                 <span style={{ color: "red" }}>Canceled</span>
//               ) : (
//                 <button
//                   className="cancelButton"
//                   onClick={() => handleCancel(data._id)}
//                 >
//                   Cancel Booking
//                 </button>
//               )}
//             </div>
//             <div className="biDetails">
//               <div className="biDetailItems">
//                 <div className="biDetailTexts">CHECK-IN</div>
//                 <div className="biDetailDate">
//                   {new Date(data?.startDate).getDate()}
//                 </div>
//                 <div className="biDetailMonth">
//                   {new Date(data?.startDate).toLocaleString("en-US", {
//                     month: "long",
//                   })}
//                 </div>
//                 <div className="biDetailDay">
//                   {new Date(data?.startDate).toLocaleString("en-US", {
//                     weekday: "long",
//                   })}
//                 </div>
//               </div>
//               <hr />
//               <div className="biDetailItems">
//                 <div className="biDetailTexts">CHECK-OUT</div>
//                 <div className="biDetailDate">
//                   {new Date(data?.endDate).getDate()}
//                 </div>
//                 <div className="biDetailMonth">
//                   {new Date(data?.endDate).toLocaleString("en-US", {
//                     month: "long",
//                   })}
//                 </div>
//                 <div className="biDetailDay">
//                   {new Date(data?.endDate).toLocaleString("en-US", {
//                     weekday: "long",
//                   })}
//                 </div>
//               </div>
//           </div>
//              </div>
//         );
//        })}
//      </div>
//    );
//  }

// export default BookedItem;
