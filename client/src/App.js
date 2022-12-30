//approuter.js

import React, { useEffect, useContext, createContext, useReducer } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/screens/Home";
import Login from "./components/screens/Login";
import Profile from "./components/screens/Profile";
import Register from "./components/screens/Register";
import CreatePost from "./components/screens/CreatePost";
import { reducer, initialState } from "./reducers/userReducer";
import "./App.css";
import UserProfile from "./components/screens/UserProfile";
import SubsPosts from "./components/screens/SubsPosts";
import FilesList from "./components/FilesList";
import Fileuploads from "./components/screens/Fileuploads";
import Edit from "./components/screens/Edit";
import Details from "./components/screens/Details";
import EditPost from "./components/screens/EditPost";

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      history.push("/login");
    }
  }, []);
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/list">
        <FilesList />
      </Route>
      <Route path="/profile/:userId">
        <UserProfile />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/createpost">
        <CreatePost />
      </Route>
      {/* <Route path="/editpost/:id">
        <EditPost />
      </Route> */}
      <Route path="/myFollowersPosts">
        <SubsPosts />
      </Route>
      {/* <Route exact path="/edit/:id">
        <Edit />
      </Route>
      <Route exact path="/view/:id">
        <Details />
      </Route> */}
      <Route exact path="/fileuploads">
        <Fileuploads />
      </Route>
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
