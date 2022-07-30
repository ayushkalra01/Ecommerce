import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { login, googleLogin } from "../../Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Meta from "../../Components/Meta";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const redirect = userInfo
    ? userInfo.role === "Ecommerce_Admin"
      ? "/admin/dashboard"
      : "/user/history"
    : "/";

  useEffect(() => {
    if (error) {
      toast.error(error);
    } else if (userInfo) {
      history.push(redirect);
    }
  }, [error, history, userInfo, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, history));
  };

  const loginWithGoogle = () => {
    dispatch(googleLogin(history));
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            autoFocus
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            disabled={loading}
            required
          />
        </div>
        <br />
        <Button
          onClick={handleSubmit}
          type="primary"
          className="mb-3"
          block
          shape="round"
          icon={!loading && <MailOutlined />}
          size="large"
          disabled={!email || password.length < 6}
        >
          {loading ? <span>Logging In...</span> : <span>Login with Email</span>}
        </Button>
      </form>
    );
  };

  return (
    <div className="container p-5">
      <Meta title="Electroo: Login" />
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h3 style={{ marginTop: 20, color: "#001529" }}>Login</h3>
          {loginForm()}
          <Button
            onClick={loginWithGoogle}
            // type="danger"
            className="mb-3"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
            style={{ backgroundColor: "#001529", color: "white" }}
          >
            Login with Google
          </Button>
          <Link
            to="/forgot/password"
            className="float-right"
            style={{ color: "#001529" }}
          >
            Forgot Password ?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
