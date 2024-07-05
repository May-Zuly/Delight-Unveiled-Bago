import axios from "axios";

export async function loginApi(apiUrl, reqData) {
  try {
    const response = await axios.post(apiUrl, reqData);
    return response.data;
  } catch (error) {
    return error;
  }
  const res = {
    code: 200,
    data: reqData,
  };
  return res;
}
