import firebase from "firebase";
import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGOUT,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../Constants/userConstant.js";
import { auth, googleAuthProvider } from "../firebase";

const registerUser = async (idTokenResult) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: idTokenResult.token,
    },
  };
  return await axios.post("/api/users/register", {}, config);
};

// const roleRedirect = (info, history) => {
//   if (info.role === "Ecommerce_Admin") {
//     history.push("/admin");
//   } else {
//     history.push("/user/history");
//   }
// };

export const login = (email, password, history) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const intended = history.location.state;
    const result = await auth.signInWithEmailAndPassword(email, password);
    const { user } = result;
    if (user) {
      const idTokenResult = await user.getIdTokenResult();
      registerUser(idTokenResult)
        .then((res) => {
          dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: res.data,
          });
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          if (intended) {
            history.push(intended.from);
          }
        })
        .catch((error) => {
          console.log(error);
          dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.message,
          });
        });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.message,
    });
  }
};

export const googleLogin = (history) => async (dispatch) => {
  auth
    .signInWithPopup(googleAuthProvider)
    .then(async (result) => {
      const { user } = result;
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        const intended = history.location.state;
        registerUser(idTokenResult)
          .then((res) => {
            dispatch({
              type: USER_LOGIN_SUCCESS,
              payload: res.data,
            });
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            if (intended) {
              history.push(intended.from);
            }
          })
          .catch((error) => {
            console.log(error);
            dispatch({
              type: USER_LOGIN_FAIL,
              payload: error.message,
            });
          });
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: error.message,
      });
    });
};

export const registerComplete = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const result = await auth.signInWithEmailLink(email, window.location.href);
    if (result.user.emailVerified) {
      // remove user email from localStorage
      window.localStorage.removeItem("emailForRegistration");

      // get user id token
      let user = auth.currentUser;
      await user.updatePassword(password);
      const idTokenResult = await user.getIdTokenResult();

      registerUser(idTokenResult)
        .then((res) => {
          dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: res.data,
          });

          dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: res.data,
          });

          localStorage.setItem("userInfo", JSON.stringify(res.data));
        })
        .catch((error) => {
          console.log(error);
          dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.message,
          });
        });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    firebase.auth().signOut();
    localStorage.removeItem("userInfo");
    dispatch({
      type: USER_LOGOUT,
    });
  } catch (error) {
    console.log(error);
  }
};
