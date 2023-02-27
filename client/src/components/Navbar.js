import React, { useContext, useRef, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

import { UserContext } from "../App";
// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.sidenav');
//     var instances = M.Sidenav.init(elems, {});
//   });
const Navbar = () => {
  // const [isMobile, setIsMobile] =useState(false);
  const searchModal = useRef(null);
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    console.log("in navbar state",state)
    M.Modal.init(searchModal.current);
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
        <li key="3">
          <Link to="/createpost">Create Post</Link>
        </li>,
        <li key="4">
          <Link to="/profile">Profile</Link>
        </li>,
        <li key="5">
          <Link to="/myFollowersPosts">Feed</Link>
        </li>,
        // <li key="6">
        //   <Link to="/upload">Upload</Link>
        // </li>,
      //   <li key="6">
      //   <Link to="/createteam">Create Team</Link>
      // </li>,
    //   <li key="7">
    //   <Link to="/list">File Lists</Link>
    // </li>,
        <li key="8">
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
    //   <li key="9">
    //     <a href="#" data-target="mobile-demo" class="sidenav-trigger show-on-med-and-down"><i class="material-icons">menu</i></a>
    // </li>, 
        
      ];
    } else {
      return [
        <li key="9">
          <Link to="/login">Login</Link>
        </li>,
        <li key="10">
          <Link to="/register">Register</Link>
        </li>,
      ];
    }
  };
  const fetchUsers = (query) => {
    setSearch(query);
    if (query.length > 0) {
      fetch("/search-users", {
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
          console.log("result",result);
          console.log("result.user",result.user);
          // console.log("result.user.name",result.user[0].name);
        });
    } else {
      setUserDetails([]);
    }
  };
  return (
    <nav className="nav-extended">
      {/* <div className={isMobile ? "nav-wrapper-mobile" : "nav-wrapper"}> */}
      <div className="nav-wrapper mobi-nav">
        <Link
          to={state ? "/" : "/login"}
          className="brand-logo left"
          style={{ padding: "0 25px" }}
        >
          ProjektHouse
        </Link>
        <ul
          id="nav-mobile"
          className="right mob-nav"
          style={{ padding: "0 25px" }}
        >

          
          {renderList()}
        </ul>
        {/* <div className="mobile-nav"> <i className="material-icons">menu</i></div> */}

        {/* <ul
          id="mobile-demo"
          className="sidenav show-on-medium-and-down"
          style={{ padding: "0 25px" }}
        >
          <li><a href="#">Sass</a></li>
          <li><a href="#">Components</a></li>
        </ul> */}
      </div>

      {/* <Link href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></Link>
      <ul class="sidenav" id="mobile-demo">
    <li><a href="sass.html">Sass</a></li>
    <li><a href="badges.html">Components</a></li>
    <li><a href="collapsible.html">Javascript</a></li>
    <li><a href="mobile.html">Mobile</a></li>
  </ul> */}
      {/* <div className="nav-content show-on-small hide-on-med-and-up">
        
        <ul
          id="nav-mobile"
          className="tabs tabs-transparent show-on-small hide-on-med-and-up"
          // className="right show-on-small-only"
          style={{ padding: "0 25px" }}
        >
          {renderList()}
        </ul>
      </div> */}
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
  );
};

export default Navbar;
