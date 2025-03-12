import { defaultAxiosInstance } from "./Api";

export const addUser = async (receiver: string): Promise<string> => {
  try {
    // If want to remove
    const response = await defaultAxiosInstance.post(
      `api/user/add/${receiver}`
    );
    const message = response.data.message;
    return message;
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.error
      : "An unexpected error occurred";

    console.log(errorMessage);

    return errorMessage;
  }
};

export const getFriendRequests = async () => {
  try {
    const response = await defaultAxiosInstance.get("api/user/friendrequests");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const manageFriendRequest = async (id: string, manager: boolean) => {
  try {
    const response = await defaultAxiosInstance.post(
      `api/user/managerequest/${id}`,
      { manager: manager }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFriends = async () => {
  try {
    const response = await defaultAxiosInstance.get('api/user');
    console.log(response.data);
    
  } catch (error) {
    throw error;
  }
};
