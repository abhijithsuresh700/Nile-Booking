function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
}

export const userColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
            alt="avatar"
          />
          {params.row.userName}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },

  {
    field: "title",
    headerName: "Title",
    width: 200,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },

  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];

export const bookingColumns = [
  { field: "_id", headerName: "BookingID", width: 250 },
  {
    field: "hotel",
    headerName: "Hotel Name",
    width: 150,
    valueGetter: (params) => params.row.hotel ? params.row.hotel.name : "" // Extract the hotel name from the response object
  },
  {
    field: "user",
    headerName: "Customer Name",
    width: 150,
    valueGetter: (params) => params.row.user ? params.row.user.name : "" // Extract the hotel name from the response object
  },
  {
    field: "checkIn",
    headerName: "Check-In",
    width: 150,
    valueGetter: (params) => formatDate(params.row.startDate),
  },
  {
    field: "checkOut",
    headerName: "Check-Out",
    width: 150,
    valueGetter: (params) => formatDate(params.row.endDate),
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
  }
];
