import { alertActions } from "../alert/alert-slice.js";
import { authActions } from "./auth-slice.js";

export const authUser = (user, url, navigate) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data?.message);
      } else {
        const { userDetails, token } = data;
        dispatch(authActions.setUserDetails({ userDetails, token }));
        navigate("/lobby");
      }
    } catch (err) {
      dispatch(
        alertActions.setAlert({
          content: err && err.message ? err.message : "Something went wrong ",
        })
      );
    }
  };
};
