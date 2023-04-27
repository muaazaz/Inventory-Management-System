import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { subCategoryLabel } from "../../../Constant/dummyData";
import { Button, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  nestedTableCell,
  tableContainer,
  tableHead,
  tableHeaderCell,
} from "./styles";
import ActionButton from "../ActionButton/ActionButton";

function Row({ row, viewRoute}) {
  const navigate = useNavigate(),
    [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow>
        {Object.entries(row).map(([key, val], i) => (
          <>
            {key !== "subCategories" && (
              <TableCell align="center">{val}</TableCell>
            )}
          </>
        ))}
        <ActionButton id={row.id} />
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Table aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {subCategoryLabel.map((label, i) => (
                      <TableCell key={i} sx={nestedTableCell} align="center">
                        {label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.subCategories.map((obj) => (
                    <TableRow key={obj.id}>
                      <TableCell component="th" scope="row" align="center">
                        {obj.name}
                      </TableCell>
                      <TableCell align="center">{obj.vendorName}</TableCell>
                      <TableCell align="center">{obj.quantity}</TableCell>
                      <TableCell align="center">
                        {obj.quantityAssigned}
                      </TableCell>
                      <TableCell align="center">
                        {obj.quantityUnassigned}
                      </TableCell>
                      <TableCell align="center">{obj.quantityFaulty}</TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={() => {
                            navigate(viewRoute + obj.id);
                          }}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({ label, data, viewRoute, rowsPerPage, hidden }) {
  const [page, setPage] = React.useState(1)
  
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
//Handeling rows to show per page for every page change
const handlePageChange = (event, value) => {
  setPage(value);
};
  return (
    <TableContainer sx={tableContainer}>
      <Table aria-label="collapsible table">
        <TableHead sx={tableHead}>
          <TableRow>
            {label.map((item, i) => (
              <TableCell key={i} sx={tableHeaderCell} align="center">
                {item}
              </TableCell>
            ))}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <Row key={row.name} row={row} viewRoute={viewRoute}/>
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
  );
}
