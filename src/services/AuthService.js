import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const API_URL = "http://localhost:8085/api/auth/";

export const authenticateUser = (username, password) => {
  return (dispatch) => {
    return axios
      .post(API_URL + '/login', {
        username,
        password,
      })
      .then((response) => {
        if (response.data) {
          const accessToken = response.data.accessToken;
          const cookieOptions = {
            expires: 1, // 1 day
            secure: false, // Set to true for HTTPS only
            // sameSite: 'strict',
            // Additional cookie options if needed
          };

          // Set the token as a cookie
          Cookies.set('token', accessToken, cookieOptions);

          return { success: true, accessToken: accessToken }; // Return success status and access token
        } else {
          return { success: false }; // Return failure status
        }
      })
      .catch((error) => {
        dispatch(authenticationFailure(error.message));
        return { success: false }; // Return failure status
      });
  };
};

export const registerUser = (username, password, email, firstName, lastName) => {
  return axios
    .post(API_URL + "register", {
      username,
      password,
      email,
      firstName,
      lastName,
    })
    .then((response) => {
      if (response.data) {
        return response.data;
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
};


export const signOut = () => {
  const token = getToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  Cookies.remove("token"); // Remove the token cookie

  return axios
    .post(API_URL + "sign-out", null, config)
    .then((response) => {
      return { success: true };
    })
    .catch((error) => {
      console.error("Sign Out Error:", error);
      return { success: false };
    });
};

export const checkIsSignedIn = () => {
  return axios
    .get(API_URL + "check-signed-in")
    .then((response) => response.status === 200)
    .catch(() => false);
};

export const getToken = () => {
  return Cookies.get("token");
};

export const getDecodedToken = () => {
  const token = getToken();
  if (token) {
    try {
      const decodedToken = jwt_decode(token);
      return decodedToken;
    } catch (error) {
      console.log('Error decoding token:', error.message);
    }
  }
  return null;
};

export const authenticationSuccess = (userId, token, refreshToken) => {
  return {
    type: "AUTHENTICATION_SUCCESS",
    payload: { userId, token, refreshToken },
  };
};

export const getUserIdFromToken = (token) => {
  if (token) {
    try {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId; // Retrieve the userId from the decoded token
      return userId;
    } catch (error) {
      console.log('Error decoding token:', error.message);
    }
  }
  return null;
};


export const authenticationFailure = (error) => {
  return {
    type: "AUTHENTICATION_FAILURE",
    payload: error,
  };
};

export const logout = () => {
  localStorage.removeItem("role");
  localStorage.removeItem("token");
  return {
    type: "LOGOUT",
  };
};

export const getRole = async (token) => {
  try {
    const response = await axios.get(API_URL + "role?token=" + token);
    if (response.data) {
      const role = response.data;
      return role;
    }
  } catch (error) {
    console.log(error.message);
  }
};