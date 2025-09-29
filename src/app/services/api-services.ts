import axios from "axios";

axios.defaults.baseURL = "https://api.example.com";
axios.defaults.headers.common["Authorization"] = "";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

export const getMethod = async () => {
  try {
    const results = await axios.get("/");
    return results;
  } catch (error) {
    console.error(error);
  } finally {
    console.log("This always runs");
  }
};

export const postMethod = async () => {
  try {
    const results = await axios.post("/");
    return results;
  } catch (error) {
    console.error(error);
  } finally {
    console.log("This always runs");
  }
};

export const putMethod = async () => {
  try {
    const results = await axios.put("/");
    return results;
  } catch (error) {
    console.error(error);
  } finally {
    console.log("This always runs");
  }
};

export const deleteMethod = async () => {
  try {
    const results = await axios.delete("/");
    return results;
  } catch (error) {
    console.error(error);
  } finally {
    console.log("This always runs");
  }
};
