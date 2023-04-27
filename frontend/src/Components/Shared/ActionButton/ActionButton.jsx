import { Button, TableCell } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useNavigate } from "react-router-dom";

const ActionButton = ({id}) => {
  const navigate = useNavigate();
  return (
    <TableCell align="center">
      <Button
        sx={{ color: "#00A572" }}
        startIcon={<AddIcon />}
        onClick={() => {
          navigate("add/"+id+"?type=new");
        }}
      >
        ADD
      </Button>
      <Button
        onClick={() => {
          navigate("edit/"+id);
        }}
      >
        {<EditOutlinedIcon sx={{ color: "black" }} />}
      </Button>
      <Button onClick={() => {}}>
        {<DeleteOutlinedIcon sx={{ color: "red" }} />}
      </Button>
    </TableCell>
  );
};

export default ActionButton;
