import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

export const setCookiesData = ({name, role, token}) => {
    Cookies.set('jwt', token, {expires: 1})
    Cookies.set('name', name, {expires: 1})
    Cookies.set('role', role, {expires: 1})
}

export const getCookiesData = () => {
    const token = Cookies.get('jwt'),
        name = Cookies.get('name'),
        role = Cookies.get('role')

    if (token) {
        const decodedToken = jwtDecode(token),
            id = decodedToken.id
        return { id, name, token, role}
    }

    return {}
}
export const removeCookiesData = () => {
    Cookies.remove('jwt')
    Cookies.remove('name')
    Cookies.remove('role')
    return {}
}