import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import { UserContext } from "../../App";
import axios from "axios";

function PasswordForm(props) {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [disablebtn, setDisablebtn] = useState(false);
  const [inputField, setInputField] = useState({
    otpCode: "",
    password: "",
    cpassword: "",
  });
  const [errField, setErrField] = useState({
    emailErr: "",
    passwordErr: "",
    cpasswordErr: "",
  });
  const validForm = () => {
    let formIsValid = true;
    setDisablebtn(true);
    setErrField({
      otpCodeErr: "",
      passwordErr: "",
      cpasswordErr: "",
    });
    if (inputField.otpCode == "") {
      formIsValid = false;
      setDisablebtn(false);
      setErrField((prevstate) => ({
        ...prevstate,
        otpCodeErr: "Please Enter OTP",
      }));
      M.toast({ html: "Please Enter OTP", classes: "#c62828 red darken-3" });
    }
    if (inputField.password == "") {
      formIsValid = false;
      setDisablebtn(false);
    }
    if (inputField.cpassword == "") {
      formIsValid = false;
      setDisablebtn(false);
    }
    if (inputField.password != inputField.cpassword) {
      formIsValid = false;
      setDisablebtn(false);
    }
    // setDisablebtn(true)

    return formIsValid;
  };

  const inputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    if (validForm()) {
      Object.assign(inputField, props);
      // console.log('props',inputField,props)
      try {
        let url = "https://projekt-house-backend.vercel.app/user/changepassword";
        let options = {
          method: "PUT",
          url: url,
          data: inputField,
        };
        let response = await axios(options);
        let record = response.data;
        if (record.statusText == "success") {
          M.toast({ html: "Password Changed Successfully", classes: " green" });
          history.push("/login");
        } else {
          M.toast({ html: record.message, classes: "#c62828 red darken-3" });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      M.toast({ html: "Form is Invalid", classes: "#c62828 red darken-3" });
    }
  };
  return (
    <form validForm method="post">
      <div className="input-field col s12">
        <input
          id="otpCode"
          type="number"
          value={inputField.otpCode}
          onChange={inputHandler}
          maxLength="4"
          name="otpCode"
        />
        <label htmlFor="otpCode">Enter OTP</label>
      </div>
      <div className="input-field col s12">
        <input
          id="password"
          type="password"
          value={inputField.password}
          onChange={inputHandler}
          name="password"
        />
        <label htmlFor="password">New Password</label>
      </div>
      <div className="input-field col s12">
        <input
          id="cpassword"
          type="password"
          value={inputField.cpassword}
          onChange={inputHandler}
          name="cpassword"
        />
        <label htmlFor="cpassword">Confirm Password</label>
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
          className="btn btn-large waves-effect hoverable"
          onClick={PostData}
        >
          Change Password
        </button>
      </div>
    </form>
  );
}

export default PasswordForm;
