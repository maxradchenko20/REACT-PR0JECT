import {useContext} from "react";
import {userContext} from "../context/Context";
import {useQuery} from "react-query";
import {getUsers} from "../api";


// GET DATA
export const GetData = () => {
  const {setUsers} = useContext(userContext);

  return useQuery('get-users', getUsers, {
    onSuccess: (data) => {
      setUsers(data.data)
    }
  })
}


