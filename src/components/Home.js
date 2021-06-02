import {
  Button,
  CircularProgress,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { fetchDetails } from "../store/actions/fetchDetails";
import { Header } from "./header";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    maxWidth: "550px",
    margin: "auto",
    padding: "1rem",
  },
  heading: {
    marginBottom: "1rem",
  },
  body: {
    padding: ".5rem",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    maxWidth: "550px",
  },
}));

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const loading = useSelector((state) => state.fetchRed.loading);
  const err = useSelector((state) => state.fetchRed.error);

  const name = useSelector((state) => state.fetchRed.name);
  const email = useSelector((state) => state.fetchRed.email);
  const id = useSelector((state) => state.fetchRed.id);

  useEffect(() => {
    dispatch(fetchDetails(localStorage.getItem("token")));
  }, []);

  const logout = () => {
    localStorage.clear();
    history.replace("/app/login/client1");
  };

  let box = (
    <div>
      <Typography component="h2" variant="h5" className={classes.heading}>
        Welcome back,{name}
      </Typography>
      <Typography component="h2" variant="h5">
        As per our records your details are:-
      </Typography>
      <hr />
      <Typography component="h2" variant="h6" className={classes.body}>
        Name: {name}
      </Typography>
      <Typography component="h2" variant="h6" className={classes.body}>
        Email: {email}
      </Typography>
      <Typography component="h2" variant="h6" className={classes.body}>
        Username: {id}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={() => logout()}
      >
        Sign Out
      </Button>
    </div>
  );

  if (loading) {
    box = <CircularProgress />;
  } else if (err) {
    box = <h2>{err}</h2>;
  }

  return localStorage.getItem("token") ? (
    <Paper elevation={3} className={classes.paper}>
      {box}
    </Paper>
  ) : (
    history.goBack()
  );
};

export default Home;
