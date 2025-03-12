import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { Store } from "../Store";
/*
  const {
    state: { userInfo },
    dispatch,
  } = useContext(Store);
  const signoutHandler = () => {
    dispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("accesstoken");
    window.location.href = "/signin";
  };
*/
const ProfilePage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Profilseite</h1>
      <p>Willkommen auf der Profilseite!</p>

      {//<Button onClick={SignoutHandler} variant="danger">Sign out</Button>
      }
    </div>
  );
};

export default ProfilePage;
