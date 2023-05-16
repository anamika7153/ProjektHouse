import React, { useContext, useRef, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

import { UserContext } from "../App";
import { API_URL } from "../utils/constants";
const Navbar = () => {
  const searchModal = useRef(null);
  const sideNav = useRef(null);
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    M.Modal.init(searchModal.current);
    M.Sidenav.init(document.querySelectorAll(".sidenav"));
  }, []);


  const renderList = () => {
    if (state) {
      return [
        <li key="1">
          <i
            data-target="modal1"
            className="large material-icons modal-trigger"
            style={{ color: "black", cursor: "pointer" }}
          >
            search
          </i>
        </li>,
        <li key="2">
          <Link to="/createteam">Create Team</Link>
        </li>,
        <li key="3">
          <Link to="/profile">Profile</Link>
        </li>,
        <li key="4">
          <Link to="/myTeams">My Teams</Link>
        </li>,
        <li key="5">
          <button
            type="submit"
            className="logout-btn btn waves-effect hoverable"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/login");
            }}
          >
            LogOut
          </button>
        </li>,
      ];
    } else {
      return [
        <li key="6">
          <Link to="/login">Login</Link>
        </li>,
        <li key="7">
          <Link to="/register">Register</Link>
        </li>,
      ];
    }
  };
  const fetchUsers = (query) => {
    setSearch(query);
    // console.log("query", query);
    if (query.length > 0) {
      fetch(`${API_URL}/search-users`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          query,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          setUserDetails(result.user);
        });
    } else {
      setUserDetails([]);
    }
  };
  return (
    <>
      <nav style={{height: "60px", backgroundColor: "#8294C4"}} className="nav-extended">
        <div  className="nav-wrapper">
          <Link
            to={state ? "/" : "/login"}
            className="brand-logo left"
            style={{ padding: "0 15px" }}
          >
            ProjektHouse
          </Link>
          <a style={{float: "right"}} href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
          <ul style={{ padding: "0 15px", display: "flex", alignItems: "center" }} className="right hide-on-med-and-down">
            {renderList()}
          </ul>
        </div>
        <ul className="sidenav" id="mobile-demo">
        {renderList()}
      </ul>
        <div id="modal1" className="modal" ref={searchModal}>
          <div className="modal-content">
            <input
              type="text"
              placeholder="search a user"
              value={search}
              onChange={(e) => fetchUsers(e.target.value)}
            />
            <ul
              class="collection"
              style={{ display: "flex", flexDirection: "column" }}
            >
              {userDetails.map((user) => {
                return (
                  <li class="collection-item avatar" style={{ color: "black" }}>
                    <img src={user.pic} alt="profile pic" class="circle" />
                    <span class="title">{user.name}</span>
                    <p>{user.email}</p>
                    <Link
                      class="secondary-content modal-close"
                      to={
                        user._id !== state._id
                          ? `/profile/` + user._id
                          : "/profile"
                      }
                    >
                      <i class="material-icons">send</i>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="modal-footer">
            <button
              className="modal-close waves-effect waves-green btn-flat"
              onClick={() => {
                setSearch("");
                setUserDetails([]);
              }}
            >
              close
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
