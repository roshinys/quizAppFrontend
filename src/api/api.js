const url = process.env.REACT_APP_BACKEND_URL;

export const addToGameResult = async (result, token, navigate) => {
  try {
    const response = await fetch(`${url}/result/add-result`, {
      method: "POST",
      body: JSON.stringify(result),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data?.message);
    } else {
      const gameInfo = data.gameInfo;
      navigate("/result/" + gameInfo._id.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

export const getGameResult = async (gameId, token) => {
  try {
    const response = await fetch(`${url}/result/get-result/${gameId}`, {
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
      const score = data.score;
      return score;
    }
  } catch (err) {
    console.log(err);
  }
};
