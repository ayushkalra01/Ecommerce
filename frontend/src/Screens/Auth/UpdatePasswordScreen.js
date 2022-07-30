import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import UserNav from "../../Components/nav/UserNav";
import { useSelector } from "react-redux";
import AdminNav from "../../Components/nav/AdminNav";
import Meta from "../../Components/Meta";

const UpdatePasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("");
        toast.success("Password updated");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        toast.error(error.message);
      });
  };

  const passwordUpdateForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
            disabled={loading}
            required
          />
          <button
            type="submit"
            className="btn btn-info btn-raised my-3"
            disabled={password.length < 6 || loading}
          >
            {loading ? <span>Updating...</span> : <span>Update</span>}
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="container-fluid">
      <Meta title="Electroo: Update Password" />
      <div className="row">
        <div className="col-md-2">
          {userInfo && userInfo.role === "Ecommerce_Admin" ? (
            <AdminNav />
          ) : (
            <UserNav />
          )}
        </div>
        <div className="col-md-8 offset-1 p-5">
          <h3 style={{ marginTop: 55, color: "#001529" }}>Update Password</h3>
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordScreen;
