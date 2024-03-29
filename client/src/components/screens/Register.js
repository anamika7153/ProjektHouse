import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import M from "materialize-css";
import { API_URL } from "../../utils/constants";

function Register() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);
  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url]);
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "projekthouse");
    data.append("cloud_name", "dpoeooxra");
    fetch(
      "https://res.cloudinary.com/dpoeooxra/image/upload/v1683117175/profile%20pic/default_ljqs1s.png",
      {
        method: "POST",
        body: data,
      }
    )
      .then((response) => response.json()) // keep it in one line else use return res.json()
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const uploadFields = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({
        html: "Invalid Email address",
        classes: "c62828 red darken-3",
      });
      return;
    }
    Axios.post(`${API_URL}/signup`, {
      name,
      email,
      password,
      pic: url,
    })
      .then((res) => {
        M.toast({ html: res.data.message, classes: " green" });
        history.push("/login");
      })
      .catch((err) => {
        M.toast({
          html: err.response.data.error,
          classes: "c62828 red darken-3",
        });
      });
  };
  const PostData = (e) => {
    e.preventDefault();
    if (image) {
      uploadImage();
    } else {
      uploadFields();
    }
  };
  return (
    <div style={{ height: "65vh" }} className="container">
      <div style={{ marginTop: "4rem" }} className="row">
        <div className="col s8 offset-s2">
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Register</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
          <form noValidate>
            <div className="input-field col s12">
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="name">PanelNumber_GroupNumber (Eg: P4_G5)</label>
            </div>
            <div className="input-field col s12">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field col s12">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                type="submit"
                className="btn btn-large waves-effect  hoverable"
                onClick={PostData}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
