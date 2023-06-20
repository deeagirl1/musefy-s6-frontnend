import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const API_URL = "http://34.91.28.46/api/auth/";

const cookieOptions = {
  expires: 1, // 1 day
  secure: false, // Set to true for HTTPS only
  sameSite: 'strict',
};

export const authenticateUser = (username, password) => {
  return (dispatch) => {
    return axios
      .post(API_URL + "login", {
        username,
        password,
      })
      .then((response) => {
          dispatch(
            authenticationSuccess(
              response.data.userId,
              response.data.accessToken,
              response.data.refreshToken,
            )
          );
          Cookies.set("accessToken", response.data.accessToken, cookieOptions);
          Cookies.set(
            "refreshToken",
            response.data.refreshToken,
            cookieOptions
          );
          Cookies.set("userId", response.data.userId, cookieOptions);
          return response.data;
      })
      .catch((error) => {
        dispatch(authenticationFailure(error.message));
      });
  };
};

export const registerUser = (username, password, email, firstName, lastName) => {
  return (dispatch) => {
    return axios.post(API_URL + "register", {
      username,
      password,
      email,
      firstName,
      lastName
    })
      .then((response) => {
        if (response.data) {
          dispatch(authenticationSuccess(response.data.userId, response.data.accessToken, response.data.refreshToken));
          return response.data
        }
      })
      .catch((error) => {
        dispatch(authenticationFailure(error.message));
        return { success: false }; // Return failure status
      }
      );
  }
};

export const getToken = () => {
  return Cookies.get('accessToken');
};

export const getDecodedToken = () => {
  const token = getToken();
  if (token) {
    return jwt_decode(token);
  }
  return null;
};


// export const tokenRefresh = (refreshToken) => {
//   console.log("refreshhh");
//   return (dispatch) => {
//     return axios
//       .post(
//         API_URL + "token",
//         { refreshToken }
//       )
//       .then((response) => {
//         if (response.data) {
//           dispatch(
//             authenticationSuccess(
//               response.data.userId,
//               response.data.accessToken,
//               response.data.refreshToken
//             )
//           );
//         }
//       })
//       .catch((error) => {
//         console.log(error.message);
//         dispatch(authenticationFailure(error.message));
//       });
//   };
// };
// const startTokenRefresh = (refreshToken) => {
//   setInterval(() => {
//     store.dispatch(tokenRefresh(refreshToken));
//   }, 12000); // call every 4 minutes (240000 milliseconds)
// };

export const authenticationSuccess = (userId, accessToken, refreshToken) => {
  return {
    type: "AUTHENTICATION_SUCCESS",
    payload: { userId, accessToken, refreshToken },
  };
};

export const authenticationFailure = (error) => {
  return {
    type: "AUTHENTICATION_FAILURE",
    payload: error,
  };
};

export const logout = () => {
  Cookies.remove("accessToken");
  Cookies.remove("userId");
  Cookies.remove("refreshToken");
  return {
    type: "LOGOUT",
  };
}

export const getRole = async (token) => {
  return axios.get(API_URL + "role?token=" + token).then((response) => {
    if (response.data) {
      localStorage.setItem("role", response.data);
    }
  }).catch((error) => {
    console.log(error.message);
  });
}
