import React, { useState, useEffect } from "react";
import UserNav from "../../Components/nav/UserNav";
import { getWishlist, removeFromWishlist } from "../../axios/user";
import { useSelector } from "react-redux";
import Meta from "../../Components/Meta";
import WishlistCard from "../../Components/cards/WishlistCard";
import LoadingCard from "../../Components/cards/LoadingCard";
import { message } from "antd";

const WishlistScreen = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    loadWishlist();
    // eslint-disable-next-line
  }, []);

  const loadWishlist = () => {
    setLoading(true);
    getWishlist(userInfo.token)
      .then((res) => {
        setLoading(false);
        setWishlist(res.data.wishlist);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };

  const handleRemove = (id) =>
    removeFromWishlist(id, userInfo.token).then((res) => {
      loadWishlist();
      message.success("Deleted");
    });

  return (
    <div className="container-fluid">
      <Meta title="Electroo: Wishlist" />
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col-md-8 offset-1">
          <h3 style={{ textAlign: "center", marginTop: 55, color: "#001529" }}>
            Wishlist
          </h3>
          <div className="underline"></div>
          {loading ? (
            <LoadingCard count={3} />
          ) : (
            <div className="row">
              {wishlist.map((p) => (
                <div key={p._id} className="col-md-4 mb-2">
                  <WishlistCard product={p} handleRemove={handleRemove} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistScreen;
