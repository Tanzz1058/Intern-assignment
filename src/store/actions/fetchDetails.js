import axios from "axios";

export const fetchStart = () => {
  return {
    type: "FETCH_START",
  };
};

export const fetchSuccess = (data) => {
  return {
    type: "FETCH_SUCCESS",
    data: data,
  };
};

export const fetchFail = (e) => {
  //   localStorage.removeItem();
  return {
    type: "FETCH_FAIL",
    error: e,
  };
};

export const fetchDetails = (client) => {
  return (dispatch) => {
    dispatch(fetchStart());
    axios
      .get(`https://expensify-2506a.firebaseio.com/${client}.json `)
      .then((res) => {
        dispatch(fetchSuccess(res.data));
      })
      .catch((e) => {
        dispatch(fetchFail(e.message));
        // console.log(e.message);
      });
  };
};
