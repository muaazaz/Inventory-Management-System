import { Divider } from "@mui/material";
import "./input.css";

const Input = ({
  name,
  onChange,
  type,
  label,
  rows,
  columns,
  textarea,
  divider,
  placeHolder,
  require,
  value,
  disable,
  id
}) => {
  return (
    <>
      <div className="input-fields">
        {label && <label htmlFor={name}>{name}</label>}
        {textarea ? (
          <>
            <textarea
              required={require}
              autoComplete="on"
              name={name}
              id={name}
              cols={columns}
              rows={rows}
              defaultValue={value}
              placeholder={placeHolder}
              onChange={onChange}
              disabled={disable}
            ></textarea>
          </>
        ) : (
          <input
            type={type}
            autoComplete="on"
            id={id}
            defaultValue={value}
            required={require}
            placeholder={placeHolder}
            onChange={onChange}
            disabled={disable}
          />
        )}
      </div>
      <>{divider && <Divider sx={{m: "1% 0"}}/>}</>
    </>
  );
};

Input.defaultProps = {
  type: "text",
  rows: "30",
  columns: "30",
  textarea: false,
  label: true,
  divider: true,
  require: true,
  disable: false,
  id: ""
};

export default Input;
