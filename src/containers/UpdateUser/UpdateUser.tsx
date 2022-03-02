import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import { useHistory, useLocation } from "react-router";
import { userContext } from "../../context/Context";

const UpdateUser = () => {
  const history = useHistory();
  const location = useLocation();

  
  const backToUsersList = () => {
    history.push("/users");
  };

  const { users } = useContext(userContext);
  // console.log(users);


  return (
    <>
      <Typography variant="h3"> Update User</Typography>
      <button onClick={backToUsersList}>Go to userlist</button>
    </>
  );
};

export default UpdateUser;
