const initialState = {
  email: "",
  id: "",
  image: "",
  key: "",
  login: "",
  name: "",
  password: "",
  signin: "",
  username: "",
  loading: false,
  error: null,
};

const fetchDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        loading: true,
        error: null,
      };
    case "FETCH_FAIL":
      return {
        loading: false,
        error: action.error,
      };
    case "FETCH_SUCCESS":
      return {
        loading: false,
        error: null,
        email: action.data.email,
        id: action.data.id,
        image: action.data.image,
        key: action.data.key,
        login: action.data.login,
        name: action.data.name,
        password: action.data.password,
        signin: action.data.signin,
        username: action.data.username,
        image: action.data.image,
      };
    default:
      return state;
  }
};

export default fetchDetailsReducer;
