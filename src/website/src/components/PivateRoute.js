import React from "react"
import { navigate } from "gatsby"
import {useAuth} from "../contexts/AuthContext";

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const auth = useAuth();
  if (!auth.currentUser && location.pathname !== `/app/login`) {
    navigate("/app/login", {
      state: {prevPath: location.pathname}
    })
    return null
  }
  return <Component {...rest} />
}
export default PrivateRoute
