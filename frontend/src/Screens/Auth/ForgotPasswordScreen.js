import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Meta from "../../Components/Meta";

const ForgotPasswordScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const redirect = userInfo
    ? userInfo.role === "Ecommerce_Admin"
      ? "/admin/dashboard"
      : "/user/history"
    : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: "https://electroo.herokuapp.com/login",
      handleCodeInApp: true,
    };
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success("Check your email for password reset link");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        toast.error(error.message);
      });
  };
  return (
    <div className="container col-md-6 offset-md-3 p-5">
      <Meta title="Electroo: Forgot Password" />
      <h3 style={{ marginTop: 60, color: "#001529" }}>Forgot Password</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            value={email}
            placeholder="Enter your email address"
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            disabled={loading}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-danger btn-raised"
          disabled={!email}
        >
          {loading ? <span>Resetting...</span> : <span>Reset</span>}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordScreen;
