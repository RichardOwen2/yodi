import { deleteCookie, getCookie, setCookie } from "cookies-next"

export const setToken = (token: any) => {
  setCookie("YODI_TOKEN", token);
}

export const getToken = () => {
  return getCookie("YODI_TOKEN"); 
}

export const deleteToken = () => {
  deleteCookie("YODI_TOKEN"); 
}
