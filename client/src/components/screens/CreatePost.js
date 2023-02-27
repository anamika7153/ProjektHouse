import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Dropzone from "react-dropzone";
import axios from "axios";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import M from "materialize-css";

function CreatePost() {
  const history = useHistory();
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState("");
  const [state, setState] = useState({
    title: "",
    // image: "",
    description: "",
    members: "",
    member1: "",
    sec1: "",
    member2: "",
    sec2: "",
    member3: "",
    sec3: "",
    member4: "",
    sec4: "",
    member5: "",
    sec5: "",
  });

 

  // const [title, setTitle] = useState("");
  // const [image, setImage] = useState("");
  // const [url, setUrl] = useState("");
  // const [description, setDescription] = useState("");
  // const [members, setMembers] = useState("");
  // const [member1, setMember1] = useState("");
  // const [sec1, setSec1] = useState("");
  // const [member2, setMember2] = useState("");
  // const [sec2, setSec2] = useState("");
  // const [member3, setMember3] = useState("");
  // const [sec3, setSec3] = useState("");
  // const [member4, setMember4] = useState("");
  // const [sec4, setSec4] = useState("");
  // const [member5, setMember5] = useState("");
  // const [sec5, setSec5] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef();

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
    dropRef.current.style.border = "2px dashed #e9ebeb";
  };

  const updateBorder = (dragState) => {
    if (dragState === "over") {
      dropRef.current.style.border = "2px solid #000";
    } else if (dragState === "leave") {
      dropRef.current.style.border = "2px dashed #e9ebeb";
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const { title, description, members, member1, sec1, mobile1, member2, sec2, mobile2, member3, sec3, mobile3, member4, sec4, mobile4, member5, sec5, mobile5, } = state;
      if (title.trim() !== "" && description.trim() !== "") {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
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

          setErrorMsg("");

            // .then((response) => response.json()) // keep it in one line else use return res.json()
            // .then((data) => {
            //   setUrl(data.url);
            // })
            // .catch((err) => {
            //   console.log(err.response);
            // });

            await axios.post(`/createpost`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
              },
            });
            M.toast({ html: "post uploaded Successfully", classes: " green" });
            history.push("/");
        } else {
          setErrorMsg("Please select a file to add.");
        }
      }
      else {
        setErrorMsg("Please enter all the field values.");
      }
    } catch (error) {
      console.log(error)
      error.response && setErrorMsg(error.response.data);
    }
  }


  return (
    <div className="container post-container">
      <div style={{ marginTop: "4rem" }} className="row">
        <div className="col s10 offset-s1">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i>
            Back to home
          </Link>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Create Team</b>
            </h4>
          </div>
          <Form onSubmit={handleOnSubmit} >
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            <Row >
              <Col style={{width: "100%"}}>
                <Form.Group controlId="title">
                  <Form.Control type="text" name="title" placeholder="Enter title" value={state.title || ""} onChange={handleInputChange}/>
                </Form.Group>
              </Col>
            </Row>
            <Row className="quarter-div">
          <Col style={{ width: "70%"}}>
            <Form.Group controlId="description">
              <Form.Control
                type="text"
                name="description"
                value={state.description || ""}
                placeholder="Area of Project"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col style={{width: "30%"}}>
            <Form.Group controlId="members">
              <Form.Control
                type="number"
                name="members"
                value={state.members || ""}
                placeholder="Total Members"
                onChange={handleInputChange}
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
                placeholder="Member1"
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          <div >
            <Form.Group controlId="sec1">
              <Form.Control
                type="text"
                name="sec1"
                value={state.sec1 || ""}
                placeholder="Sec / Roll No"
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          <div >
            <Form.Group controlId="mobile1">
              <Form.Control
                type="number"
                name="mobile1"
                value={state.mobile1 || ""}
                placeholder="Mobile No"
                onChange={handleInputChange}
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
          <div >
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
          <div >
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
          <div >
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
          <div >
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
          <div >
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
          <div >
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
          <div >
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
          <div >
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
              
            <div className="upload-section">
              <Dropzone onDrop={onDrop} onDragEnter={() => updateBorder("over")} onDragLeave={() => updateBorder("leave")} >
              {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: "drop-zone" })} ref={dropRef}>
                <input {...getInputProps()} />
                <p>Drag and drop a file OR click here to select a file</p>
                {file && (
                  <div>
                    <strong>Selected file:</strong> {file.name}
                  </div>
                )}
              </div>
            )}
              </Dropzone>
              {previewSrc ? (
                isPreviewAvailable ? (
                  <div className="image-preview">
                    <img className="preview-image" src={previewSrc} alt="Preview" />
                  </div>
                ) : (
                  <div className="preview-message">
                    <p>No preview available for this file</p>
                  </div>
                )
              ) : (
                <div className="preview-message">
                  <p>Image preview will be shown here after selection</p>
                </div>
              )}
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
                className="btn btn-large waves-effect hoverable #ff5252 red accent-1"
                // onClick={PostDetails}
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





// no error


// import React, { useState, useEffect } from "react";
// import { Link, useHistory } from "react-router-dom";
// import M from "materialize-css";

// function CreatePost() {
//   const history = useHistory();
//   const [title, setTitle] = useState("");
//   const [image, setImage] = useState("");
//   const [url, setUrl] = useState("");
//   const [description, setDescription] = useState("");
//   const [members, setMembers] = useState("");
//   const [member1, setMember1] = useState("");
//   const [sec1, setSec1] = useState("");
//   const [member2, setMember2] = useState("");
//   const [sec2, setSec2] = useState("");
//   const [member3, setMember3] = useState("");
//   const [sec3, setSec3] = useState("");
//   const [member4, setMember4] = useState("");
//   const [sec4, setSec4] = useState("");
//   const [member5, setMember5] = useState("");
//   const [sec5, setSec5] = useState("");

//   useEffect(() => {
//     fetch("/createpost", {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + localStorage.getItem("jwt"),
//       },
//       body: JSON.stringify({
//         title,
//         description,
//         members,
//         member1,
//         sec1,
//         member2,
//         sec2,
//         member3,
//         sec3,
//         member4,
//         sec4,
//         member5,
//         sec5,
//         photo: url,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.error) {
//           M.toast({ html: data.error, classes: "#c62828 red darken-3" });
//         } else {
//           M.toast({ html: "Post Created Successfully", classes: " green" });
//           history.push("/");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [url]);

//   const PostDetails = (e) => {
//     e.preventDefault();
//     if (image) {
//       const data = new FormData();
//       data.append("file", image);
//       data.append("upload_preset", "projekthouse");
//       data.append("cloud_name", "ddzjlkiyw");
//       fetch("https://api.cloudinary.com/v1_1/ddzjlkiyw/image/upload", {
//         method: "POST",
//         body: data,
//       })
//         .then((response) => response.json()) // keep it in one line else use return res.json()
//         .then((data) => {
//           setUrl(data.url);
//         })
//         .catch((err) => {
//           console.log(err.response);
//         });
//     } else {
//       setUrl(null);
//     }
//   };

//   return (
//     <div className="container post-container">
//       <div style={{ marginTop: "4rem" }} className="row">
//         <div className="col s10 offset-s1">
//           <Link to="/" className="btn-flat waves-effect">
//             <i className="material-icons left">keyboard_backspace</i>
//             Back to home
//           </Link>
//           <div className="col s12" style={{ paddingLeft: "11.250px" }}>
//             <h4>
//               <b>Create Team</b>
//             </h4>
//           </div>
//           <form noValidate>
//             <div className="input-field col s12">
//               <input
//                 id="title"
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               />
//               <label htmlFor="title">Title</label>
//             </div>
//             <div className="input-field col s9">
//               <textarea
//                 id="description"
//                 className="materialize-textarea"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               ></textarea>
//               <label htmlFor="description">Description</label>
//             </div>
//             <div className="input-field col s3">
//               <input
//                 id="members"
//                 type="number"
//                 value={members}
//                 onChange={(e) => setMembers(e.target.value)}
//               />
//               <label htmlFor="members">Total Members</label>
//             </div>
//             <div className="input-field col s6">
//               <input
//                 id="member1"
//                 type="text"
//                 value={member1}
//                 onChange={(e) => setMember1(e.target.value)}
//               />
//               <label htmlFor="member1">Member 1</label>
//             </div>
//             <div className="input-field col s6">
//               <input
//                 id="sec1"
//                 type="text"
//                 value={sec1}
//                 onChange={(e) => setSec1(e.target.value)}
//               />
//               <label htmlFor="sec1">Roll No, Section</label>
//             </div>
//             <div className="input-field col s6">
//               <input
//                 id="member2"
//                 type="text"
//                 value={member2}
//                 onChange={(e) => setMember2(e.target.value)}
//               />
//               <label htmlFor="member2">Member 2</label>
//             </div>
//             <div className="input-field col s6">
//               <input
//                 id="sec2"
//                 type="text"
//                 value={sec2}
//                 onChange={(e) => setSec2(e.target.value)}
//               />
//               <label htmlFor="sec2">Roll No, Section</label>
//             </div>
//             <div className="input-field col s6">
//               <input
//                 id="member3"
//                 type="text"
//                 value={member3}
//                 onChange={(e) => setMember3(e.target.value)}
//               />
//               <label htmlFor="member3">Member 3</label>
//             </div>
//             <div className="input-field col s6">
//               <input
//                 id="sec3"
//                 type="text"
//                 value={sec3}
//                 onChange={(e) => setSec3(e.target.value)}
//               />
//               <label htmlFor="sec3">Roll No, Section</label>
//             </div>
//             <div className="input-field col s6">
//               <input
//                 id="member4"
//                 type="text"
//                 value={member4}
//                 onChange={(e) => setMember4(e.target.value)}
//               />
//               <label htmlFor="member4">Member 4</label>
//             </div>
//             <div className="input-field col s6">
//               <input
//                 id="sec4"
//                 type="text"
//                 value={sec4}
//                 onChange={(e) => setSec4(e.target.value)}
//               />
//               <label htmlFor="sec4">Roll No, Section</label>
//             </div>
//             <div className="input-field col s6">
//               <input
//                 id="member5"
//                 type="text"
//                 value={member5}
//                 onChange={(e) => setMember5(e.target.value)}
//               />
//               <label htmlFor="member5">Member 5</label>
//             </div>
//               <div className="input-field col s6">
//               <input
//                 id="sec5"
//                 type="text"
//                 value={sec5}
//                 onChange={(e) => setSec5(e.target.value)}
//                 /*placeholder="Roll No, Sec"*/
//               />
//               <label htmlFor="sec5">Roll No, Section</label>
//             </div>
              
//             <div className="input-field col s12">
//               <div className="file-field input-field">
//                 <div className="btn">
//                   <span>Profile</span>
//                   <input
//                     type="file"
//                     onChange={(e) => setImage(e.target.files[0])}
//                   />
//                 </div>
//                 <div className="file-path-wrapper">
//                   <input className="file-path validate" type="text" />
//                 </div>
//               </div>
//             </div>
//             <div className="col s12" style={{ paddingLeft: "11.250px" }}>
//               <button
//                 style={{
//                   width: "150px",
//                   borderRadius: "3px",
//                   letterSpacing: "1.5px",
//                   marginTop: "1rem",
//                 }}
//                 type="submit"
//                 className="btn btn-large waves-effect hoverable #ff5252 red accent-1"
//                 onClick={PostDetails}
//               >
//                 Post
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreatePost;


