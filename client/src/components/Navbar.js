import React, { useContext, useRef, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

import { UserContext } from "../App";
import { API_URL } from "../utils/constants";
const Navbar = () => {
  const searchModal = useRef(null);
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    // console.log("in navbar state",state)
    M.Modal.init(searchModal.current);
  }, []);
  const mobnav = () => {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems);
    });
  }
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
            className="btn waves-effect hoverable #ff5252 red accent-1"
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
    console.log("query", query);
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
          // console.log("result",result);
          // console.log("result.user",result.user);
          // console.log("result.user.name",result.user[0].name);
        });
    } else {
      setUserDetails([]);
    }
  };
  return (
    <>
      <nav style={{height: "10vh"}} className="nav-extended">
        {/* <div className={isMobile ? "nav-wrapper-mobile" : "nav-wrapper"}> */}
        <div  className="nav-wrapper mobi-nav">
          <Link
            to={state ? "/" : "/login"}
            className="brand-logo left"
            style={{ padding: "10px 25px" }}
          >
            ProjektHouse
          </Link>
          <ul
            id="nav-mobile"
            className="right mob-nav"
            style={{ padding: "10px 25px" }}
          >
            {renderList()}
          </ul>
        </div>
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
      {/* <ul id="slide-out" className="sidenav">
        <li>
          <div className="user-view">
            <div className="background">
              <img src="images/office.jpg" />
            </div>
            <a href="#user">
              <img className="circle" src="images/yuna.jpg" />
            </a>
            <a href="#name">
              <span className="white-text name">John Doe</span>
            </a>
            <a href="#email">
              <span className="white-text email">jdandturk@gmail.com</span>
            </a>
          </div>
        </li>
        <li>
          <a href="#!">
            <i className="material-icons">cloud</i>First Link With Icon
          </a>
        </li>
        <li>
          <a href="#!">Second Link</a>
        </li>
        <li>
          <div className="divider"></div>
        </li>
        <li>
          <a className="subheader">Subheader</a>
        </li>
        <li>
          <a className="waves-effect" href="#!">
            Third Link With Waves
          </a>
        </li>
      </ul>
      <a href="#" data-target="slide-out" className="sidenav-trigger">
        <i className="material-icons" onClick={mobnav}>menu</i>
      </a> */}
    </>
  );
};

export default Navbar;
