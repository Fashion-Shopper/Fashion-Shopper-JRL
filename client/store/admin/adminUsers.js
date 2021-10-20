import axios from "axios";

const SET_USERS = "SET_USERS";

const _setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};

///////////////////// THUNK CREATOR ///////////////////////
export const fetchAdminUsers = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    const { data } = await axios.get("/api/admin/users", {
      headers: { authorization: token },
    });
    dispatch(_setUsers(data));
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    default:
      return state;
  }
};
