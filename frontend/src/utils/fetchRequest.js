import { getCookiesData } from "./handleCookies";

export const fetchRequest = async (url, method, body) => {
    try {
        const {token} = getCookiesData()
        const params = {
            method: method, headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token }
        }
        if (body) {
            params.body = JSON.stringify(body);
        }
        const res = await fetch(process.env.REACT_APP_API_URL + url, params)
        return res.json()

    } catch (error) {
        console.log(error)
    }
}