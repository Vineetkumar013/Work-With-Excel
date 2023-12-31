import axios from "axios";

const API_URL = "http://localhost:3000/api/test/";


const getUserBoard = () => {
  return axios.get(API_URL + "user");
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod");
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin");
};

const UserService = {
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
}

export default UserService;
