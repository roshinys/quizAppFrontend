import { alertActions } from "../alert/alert-slice";
import { roomActions } from "../room/room-slice";

const url = process.env.REACT_APP_BACKEND_URL;

export const fetchRooms = (token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/room/fetch-room`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data?.message);
      } else {
        const { availableRooms, joinedRoom } = data;
        dispatch(roomActions.setRooms({ availableRooms, joinedRoom }));
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

export const addUsertoRoom = (token, roomId, navigate) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/room/add-user/${roomId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data?.message);
      }
      // navigate(`/quiz/${roomId}`);
      window.location.href = `/quiz/${roomId}`;
    } catch (err) {
      dispatch(
        alertActions.setAlert({
          content: err && err.message ? err.message : "Something went wrong ",
        })
      );
    }
  };
};

export const createRoom = (token, name, navigate) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/room/create-room`, {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data?.message);
      }
      const room = data.room;
      dispatch(roomActions.setJoinedRoom({ joinedRoom: [room] }));
      // navigate(`/quiz/${room._id}`);
      window.location.href = `/quiz/${room._id}`;
    } catch (err) {
      dispatch(
        alertActions.setAlert({
          content: err && err.message ? err.message : "Something went wrong ",
        })
      );
    }
  };
};
