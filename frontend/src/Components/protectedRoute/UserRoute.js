import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoadingToRedirect from "../LoadingToRedirect";
import axios from "axios";

const UserRoute = ({ children, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const [ok, setOk] = useState(false);

  const checkToken = async (token) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    return await axios.post("/api/users/isvalid", {}, config);
  };

  useEffect(() => {
    if (userInfo && userInfo.token) {
      checkToken(userInfo.token)
        .then((res) => {
          setOk(true);
        })
        .catch((error) => {
          console.log(error);
          setOk(false);
        });
    }
  }, [userInfo, dispatch]);

  return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default UserRoute;
