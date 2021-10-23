import axios from "axios";

const TOKEN = "token";
const SET_USERS = "SET_USERS";
const CREATE_USER = "CREATE_USERS";
const DESTROY_USER = "DESTROY_USER";
const UPDATE_USER = "UPDATE_USER";

const _setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};

const _createUser = (user) => {
  return {
    type: CREATE_USER,
    user,
  };
};

const _destroyUser = (user) => {
  return {
    type: DESTROY_USER,
    user,
  };
};

const _updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
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

export const createUser = (user) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data } = await axios.post("/api/admin/users", user, {
        headers: { authorization: token },
      });
      dispatch(_createUser(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateUser = (userId, user) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data } = await axios.put(`/api/admin/users/${userId}`, user, {
        headers: { authorization: token },
      });
      dispatch(_updateUser(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const destroyUser = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      await axios.delete(`/api/admin/users/${id}`, {
        headers: { authorization: token },
      });
      dispatch(_destroyUser({ id: id * 1 }));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    case CREATE_USER:
      return [...state, action.user];
    case UPDATE_USER:
      return [
        ...state,
        state.map((user) => (user.id === action.user.id ? action.user : user)),
      ];
    case DESTROY_USER:
      return state.filter((user) => user.id !== action.user.id);
    default:
      return state;
  }
};
