import {
  Button,
  CircularProgress,
  Container,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { fetchDetails } from "../store/actions/fetchDetails";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paper: {
    marginTop: theme.spacing(8),
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const loadInfo = useSelector((state) => state.fetchRed.loading);
  const login = useSelector((state) => state.fetchRed.login);
  const signin = useSelector((state) => state.fetchRed.signin);
  const user = useSelector((state) => state.fetchRed.username);
  const key = useSelector((state) => state.fetchRed.password);

  const path = history.location.pathname.split("/");
  const activeClient = path[path.length - 1];

  useEffect(() => {
    dispatch(fetchDetails(activeClient));
  }, [activeClient]);

  const submit = (event) => {
    setLoading(true);
    event.preventDefault();
    axios
      .get(`https://expensify-2506a.firebaseio.com/${activeClient}.json `)
      .then((res) => {
        if (res.data.id === username && res.data.key === password) {
          localStorage.setItem("token", activeClient);
          setLoading(false);
          setErr(false);
          history.replace("/app/home");
        } else {
          setLoading(false);
          setErr("The credentials provided are incorrect");
        }
      })
      .catch((e) => {
        setLoading(false);
        setErr(e.message);
      });
  };

  return loadInfo ? (
    <CircularProgress />
  ) : (
    <Container component="main" maxWidth="xs" className={classes.paper}>
      <Typography component="h1" variant="h5">
        {login}
      </Typography>
      {err && <Alert severity="error">{err}</Alert>}
      <form
        className={classes.form}
        onSubmit={(event) => submit(event)}
        action="#"
      >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label={user}
          name="username"
          autoFocus
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label={key}
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {loading ? <CircularProgress color="inherit" /> : signin}
        </Button>
      </form>
    </Container>
  );
};

export default Login;
