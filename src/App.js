import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import { Header } from "./components/header";

function App() {
  return (
    <div className="App">
      <Header>
        <Switch>
          <Route exact path="/app/home" component={Home} />
          <Route exact path="/app/login/client1" component={Login} />
          <Route exact path="/app/login/client2" component={Login} />
          <Route exact path="/app/login/client3" component={Login} />
          <Redirect to="/app/login/client1" />
        </Switch>
      </Header>
    </div>
  );
}

export default App;
