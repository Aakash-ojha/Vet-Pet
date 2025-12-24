import React, { useState, useEffect } from "react";
import UserInfo from "./UserInfo";
import OrderHistoryItemContainer from "./OrderHistoryItemContainer";
import api from "../../api";
import Spinner from "../ui/Spinner";

const UserProfilePage = () => {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(function () {
    setLoading(true);
    api
      .get("user_info")
      .then((res) => {
        console.log(res.data);
        setUserInfo(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  if (loading) return <Spinner loading={loading} />;

  return (
    <div className="container my-5">
      <UserInfo userInfo={userInfo} />

      <OrderHistoryItemContainer />
    </div>
  );
};

export default UserProfilePage;
