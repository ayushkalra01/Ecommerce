import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoadingToRedirect from "../LoadingToRedirect";
import axios from "axios";
import { logout } from "../../Actions/userActions";

const AdminRoute = ({ children, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [ok, setOk] = useState(false);

  const dispatch = useDispatch();
  const checkAdmin = async (token) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    return await axios.post("/api/users/isadmin", {}, config);
  };

  useEffect(() => {
    if (userInfo && userInfo.token) {
      checkAdmin(userInfo.token)
        .then((res) => {
          setOk(true);
        })
        .catch((error) => {
          console.log(error);
          dispatch(logout());
          setOk(false);
        });
    }
  }, [userInfo, dispatch]);

  return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;
