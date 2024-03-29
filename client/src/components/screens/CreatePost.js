import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { API_URL } from "./../../utils/constants";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import M from "materialize-css";

function CreatePost() {
  const history = useHistory();
  const [state, setState] = useState({
    title: "",
    description: "",
    members: "",
    member1: "",
    sec1: "",
    mobile1: "",
    member2: "",
    sec2: "",
    mobile2: "",
    mobile3: "",
    member3: "",
    sec3: "",
    member4: "",
    sec4: "",
    mobile4: "",
    member5: "",
    sec5: "",
    mobile5: "",
    projectlink: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const {
        title,
        description,
        members,
        member1,
        sec1,
        mobile1,
        member2,
        sec2,
        mobile2,
        member3,
        sec3,
        mobile3,
        member4,
        sec4,
        mobile4,
        member5,
        sec5,
        mobile5,
        projectlink,
      } = state;

      if (title && description && members && member1 && sec1 && mobile1) {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("members", members);
        formData.append("member1", member1);
        formData.append("mobile1", mobile1);
        formData.append("sec1", sec1);
        formData.append("member2", member2);
        formData.append("mobile2", mobile2);
        formData.append("sec2", sec2);
        formData.append("member3", member3);
        formData.append("mobile3", mobile3);
        formData.append("sec3", sec3);
        formData.append("member4", member4);
        formData.append("mobile4", mobile4);
        formData.append("sec4", sec4);
        formData.append("member5", member5);
        formData.append("mobile5", mobile5);
        formData.append("sec5", sec5);
        formData.append("projectlink", projectlink);
        setErrorMsg("");
        await axios.post(`${API_URL}/createteam`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        });
        M.toast({ html: "Team created Successfully", classes: " green" });
        history.push("/");
      } else {
        setErrorMsg("Please enter all the field values.");
      }
    } catch (error) {
      console.log(error);
      error.response && setErrorMsg(error.response.data);
    }
  };

  return (
    <div className="container post-container">
      <div style={{ marginTop: "2rem" }} className="row">
        <div className="col s10 offset-s1">
          <Link to="/" className="btn-flat waves-effect" style={{paddingLeft: "0"}}>
            <i className="material-icons left">keyboard_backspace</i>
            Back to home
          </Link>
          <div className="col s12" style={{ paddingLeft: "0px" }}>
            <h4>
              <b>Create Team</b>
            </h4>
            <span style={{color: "#E76161"}}>Fields marked with (*) are mandatory.</span>
          </div>
          <Form onSubmit={handleOnSubmit}>
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            <Row>
              <Col style={{ width: "100%" }}>
                <Form.Group controlId="title">
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter title *"
                    value={state.title || ""}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="quarter-div">
              <Col style={{ width: "70%" }}>
                <Form.Group controlId="description">
                  <Form.Control
                    type="text"
                    name="description"
                    value={state.description || ""}
                    placeholder="Area of Project *"
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col style={{ width: "30%" }}>
                <Form.Group controlId="members">
                  <Form.Control
                    type="number"
                    name="members"
                    value={state.members || ""}
                    placeholder="Total Members *"
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="half-div">
              <div className="half-div-child">
                <Form.Group controlId="member1">
                  <Form.Control
                    type="text"
                    name="member1"
                    value={state.member1 || ""}
                    placeholder="Member1 *"
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </div>
              <div>
                <Form.Group controlId="sec1">
                  <Form.Control
                    type="text"
                    name="sec1"
                    value={state.sec1 || ""}
                    placeholder="Sec / Roll No *"
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </div>
              <div>
                <Form.Group controlId="mobile1">
                  <Form.Control
                    type="number"
                    name="mobile1"
                    value={state.mobile1 || ""}
                    placeholder="Mobile No *"
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </div>
            </Row>

            <Row className="half-div">
              <div className="half-div-child">
                <Form.Group controlId="member2">
                  <Form.Control
                    type="text"
                    name="member2"
                    value={state.member2 || ""}
                    placeholder="Member2"
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
              <div>
                <Form.Group controlId="sec2">
                  <Form.Control
                    type="text"
                    name="sec2"
                    value={state.sec2 || ""}
                    placeholder="Sec / Roll No"
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
              <div>
                <Form.Group controlId="mobile2">
                  <Form.Control
                    type="number"
                    name="mobile2"
                    value={state.mobile2 || ""}
                    placeholder="Mobile No"
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
            </Row>
            <Row className="half-div">
              <div className="half-div-child">
                <Form.Group controlId="member3">
                  <Form.Control
                    type="text"
                    name="member3"
                    value={state.member3 || ""}
                    placeholder="Member3"
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
              <div>
                <Form.Group controlId="sec3">
                  <Form.Control
                    type="text"
                    name="sec3"
                    value={state.sec3 || ""}
                    placeholder="Sec / Roll No"
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
              <div>
                <Form.Group controlId="mobile3">
                  <Form.Control
                    type="number"
                    name="mobile3"
                    value={state.mobile3 || ""}
                    placeholder="Mobile No"
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
            </Row>
            <Row className="half-div">
              <div className="half-div-child">
                <Form.Group controlId="member4">
                  <Form.Control
                    type="text"
                    name="member4"
                    value={state.member4 || ""}
                    placeholder="Member4"
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
              <div>
                <Form.Group controlId="sec4">
                  <Form.Control
                    type="text"
                    name="sec4"
                    value={state.sec4 || ""}
                    placeholder="Sec / Roll No"
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
              <div>
                <Form.Group controlId="mobile4">
                  <Form.Control
                    type="number"
                    name="mobile4"
                    value={state.mobile4 || ""}
                    placeholder="Mobile No"
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
            </Row>
            <Row className="half-div">
              <div className="half-div-child">
                <Form.Group controlId="member5">
                  <Form.Control
                    type="text"
                    name="member5"
                    value={state.member5 || ""}
                    placeholder="Member5"
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
              <div>
                <Form.Group controlId="sec5">
                  <Form.Control
                    type="text"
                    name="sec5"
                    value={state.sec5 || ""}
                    placeholder="Sec / Roll No"
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
              <div>
                <Form.Group controlId="mobile5">
                  <Form.Control
                    type="number"
                    name="mobile5"
                    value={state.mobile5 || ""}
                    placeholder="Mobile No"
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
            </Row>
            <Row>
              <Col style={{ width: "100%" }}>
                <Form.Group controlId="projectlink">
                  <Form.Control
                    type="url"
                    name="projectlink"
                    value={state.projectlink || ""}
                    placeholder="Enter project link"
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              {/* <Col style={{ width: "50%" }}>
                <Form.Group controlId="githublink">
                  <Form.Control
                    type="url"
                    name="githublink"
                    value={state.githublink || ""}
                    placeholder="Enter github link"
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col> */}
            </Row>
            <div className="col s12" style={{ paddingLeft: "0" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                type="submit"
                className="btn btn-large waves-effect hoverable"
              >
                Post
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
