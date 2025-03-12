import { User } from "../User";
import { defaultAxiosInstance } from "./Api";

export const authenticate = async (identifier: string, password: string) => {
  try {
    const isEmail = identifier.includes("@");
    const payload = isEmail
      ? { email: identifier, password }
      : { userName: identifier, password };

    const response = await defaultAxiosInstance.post("api/auth/login", payload);

    const accessToken = response.headers["accesstoken"];
    console.log(accessToken);

    localStorage.setItem("accesstoken", accessToken);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (identifier: string, password: string) => {
  try {
    const data = await authenticate(identifier, password);

    const accessToken = localStorage.getItem("accesstoken");
    if (!accessToken) {
      throw new Error("No token.");
    }
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    return data;
  } catch (error) {
    throw error;
  }
};
export const signup = async (user: User) => {
  try {
    const response = await defaultAxiosInstance.post("api/auth/signup", user);
    const accessToken = response.headers["accesstoken"];
    localStorage.setItem("accesstoken", accessToken);
    return response.data;
  } catch (error) {
    throw error;
  }
};
