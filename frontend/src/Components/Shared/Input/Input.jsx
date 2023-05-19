import { Divider } from "@mui/material";
import "./input.css";

const Input = ({
  name,
  type,
  showLabel,
  rows,
  columns,
  textarea,
  divider,
  placeHolder,
  require,
  value,
  disable,
  id,
  label,
  setFormData,
  onChange
}) => {
  const handleDataChange = (e) => {
    setFormData({
      ...formData,
    [name]: e.target.value,
    });
  }
  return (
    <>
      <div className="input-fields">
        {showLabel && <label htmlFor={name}>{label}</label>}
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
              onChange={onChange ? onchange : handleDataChange}
              disabled={disable}
            ></textarea>
          </>
        ) : (
          <input
            type={type}
            name={name}
            autoComplete="on"
            id={id}
            defaultValue={value}
            required={require}
            placeholder={placeHolder}
            onChange={onChange ? onchange : handleDataChange}
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
  showLabel: true,
  divider: true,
  require: true,
  disable: false,
  id: ""
};

export default Input;
