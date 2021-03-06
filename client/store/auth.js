import axios from "axios";
import history from "../history";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

export const updateAuthAvatar = (avatar) => {
  //update the user info
  return async (dispatch) => {
    // getState（）safest way to get the state
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const res = await axios.put(
        "/api/users",
        { avatar },
        {
          headers: {
            authorization: token,
          },
        }
      );
      return dispatch(setAuth(res.data));
    }
  };
};

export const updateAuthName = (username) => {
  //update the user info
  return async (dispatch) => {
    // getState（）safest way to get the state
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const res = await axios.put(
        "/api/users",
        { username },
        {
          headers: {
            authorization: token,
          },
        }
      );
      return dispatch(setAuth(res.data));
    }
  };
};

// how prof did this
// export const updateAuthName = (username) => {
//   return async (dispatch, getState) => { //safest way to get the state
//     const user = { ...getState().auth, username };
//     const token = window.localStorage.getItem(TOKEN)
//     const res = await axios.get('/api/users', user, {
//       headers: {
//         authorization: token
//       }
//     })
//     return dispatch(setAuth(res.data))
//   }
// }

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    // history.goBack();
    return dispatch(setAuth(res.data));
  }
};

export const authenticate =
  (username, password, method) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, { username, password });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  // console.log(history);
  history.push("/home");
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
