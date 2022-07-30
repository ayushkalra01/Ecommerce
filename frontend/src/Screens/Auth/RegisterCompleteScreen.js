import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { registerComplete } from "../../Actions/userActions";
import { MailOutlined } from "@ant-design/icons";
import Meta from "../../Components/Meta";

const RegisterCompleteScreen = ({ history }) => {
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

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password is required 👈");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long 👈");
      return;
    }

    dispatch(registerComplete(email, password));
    setEmail("");
    setPassword("");
  };

  const completeRegistrationForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            placeholder="Enter Password"
            disabled={loading}
            required
          />
        </div>

        <Button
          onClick={handleSubmit}
          type="primary"
          className="mt-3"
          block
          shape="round"
          icon={<MailOutlined />}
          size="large"
          disabled={!email || password.length < 6}
        >
          {loading ? (
            <span>Signing In...</span>
          ) : (
            <span>Sign up with Email</span>
          )}
        </Button>
      </form>
    );
  };

  return (
    <div className="container p-5">
      <Meta title="Electroo: Complete your Registration" />
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h3 style={{ marginTop: 20, color: "#001529" }}>Sign Up</h3>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterCompleteScreen;
