import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Avatar, Box, Button, Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./tables.css";
import { noRecord, statusIcon, statusText } from "./styles";
import CircleIcon from "@mui/icons-material/Circle";

export default function Tables({
  label,
  rowsPerPage,
  hidden,
  viewRoute,
  data,
  view,
  routeQueryString
}) {
  const [page, setPage] = useState(1),
    [image, setImage] = useState(false),
    navigate = useNavigate(),
    [genTable, setGenTable] = useState(false);
  let round = 0,
    count = 0;
  //Calculating no of pages
  if (data.length / rowsPerPage < 1) {
    count = 1;
  } else {
    if (data.length % rowsPerPage > 0 && data.length / rowsPerPage !== 1) {
      round = 1;
    } else {
      round = 0;
    }
    count = parseInt(data.length / rowsPerPage) + round;
  }
  useEffect(() => {
    if (label.includes("Image")) {
      setImage(true);
    } else {
      setImage(false);
    }
    if (data.length > 0) {
      setGenTable(true);
    } else {
      setGenTable(false);
    }
  }, [data]);
  //Handeling rows to show per page for every page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      {genTable ? (
        <div className="table-content">
          <TableContainer className="table-container">
            <Table>
              <TableHead className="table-head">
                <TableRow>
                  {label.map((item) => (
                    <TableCell key={item} id="table-cell" align="center">
                      {item}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {genTable &&
                  data
                    ?.slice(
                      (page - 1) * rowsPerPage,
                      (page - 1) * rowsPerPage + rowsPerPage
                    )
                    .map((row, i) => (
                      <TableRow key={i}>
                        {Object.entries(row).map(([key, val], index) => (
                          <TableCell key={index} align="center">
                            {index === 1 && image ? (
                              <Avatar
                                src={val ? val.toString() : ""}
                                sx={{ ml: "33%" }}
                              />
                            ) : key === "status" ? (
                              <Typography sx={statusText}>
                                <CircleIcon
                                  color={
                                    val === "Pending"
                                      ? "primary"
                                      : val === "Approved" || val === "Resolved"
                                      ? "success"
                                      : "error"
                                  }
                                  sx={statusIcon}
                                />
                                {val}
                              </Typography>
                            ) : val.length > 50 ? (
                              val.slice(0, 50) + " ......"
                            ) : (
                              val
                            )}
                          </TableCell>
                        ))}
                        {view && (
                          <TableCell align="center">
                            <Button
                              onClick={() => {
                                navigate(viewRoute + data[i].id + routeQueryString);
                              }}
                            >
                              View
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
            <Pagination
              className="pagination"
              variant="outlined"
              color="primary"
              shape="rounded"
              size="large"
              hidden={hidden}
              count={count}
              page={page}
              onChange={handlePageChange}
            />
          </TableContainer>
        </div>
      ) : (
        <Box>
          <Typography sx={noRecord}>No Records Found</Typography>
        </Box>
      )}
    </div>
  );
}
Tables.defaultProps = {
  hidden: false,
  view: true,
  routeQueryString: ''
};
