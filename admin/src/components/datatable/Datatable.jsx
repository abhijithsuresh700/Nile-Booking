import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch.js";
import axios from "axios";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const { loading, data, error } = useFetch(`/${path}`);

  useEffect(() => {
    setList(data);
  }, [data]);

  console.log(list, "list check");
  console.log(columns, "column");
  console.log(path, "pathh");

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8880/api/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (error) {}
  };

  const handleCancel = async (id) => {
    try {
      await axios.put(`http://localhost:8880/api/${path}/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {columns[0].headerName === "BookingID" ? (
              <div
                className="viewButton"
                onClick={() => handleCancel(params.row._id)}
              >
                Cancel Booking
              </div>
            ) : (
              <>
                <Link to="/users/test" style={{ textDecoration: "none" }}>
                  <div className="viewButton">View</div>
                </Link>
                <div
                  className="deleteButton"
                  onClick={() => handleDelete(params.row._id)}
                >
                  Delete
                </div>
              </>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
