import { LOG_OUT, SET_ERROR, SET_OTP, SET_USER } from "../../Constant/reducerConstants";
import { getCookiesData, removeCookiesData, setCookiesData } from "../../utils/handleCookies";

const {token, name, role} = getCookiesData()
const initialState = {
    error: "",
    token: token,
    name: name,
    role: role 
}

const userValidation = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      setCookiesData(action.payload)
      return {
        ...state,
        role: action.payload.role,
        token: action.payload.token,
        name: action.payload.name,
        error: "",
      };

    case SET_ERROR:
      return {
        ...state,
        role: "",
        token: "",
        name: "",
        error: action.payload.error,
      };
    case LOG_OUT:
      removeCookiesData()
      return{
        ...state,
        role: "",
        token: "",
        name: "",
        error: "",
      }
    case SET_OTP:
      return{
        ...state,
        otp: action.payload
      }

    default:
      return state;
  }
};

export default userValidation;
