import React, { useState, useRef , useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Dropzone from "react-dropzone";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import M from "materialize-css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../utils/constants";


function EditPost() {
  const history = useHistory();
  const [file, setFile] = useState([]); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState("");
  const { id } = useParams();

  const [postdata, setPostdata] = useState((
    {
        "title":"",
        "description":"",
        "members": "",
        "member1":"",
        "sec1":"",        
        "mobile1":"",
        "member2":"",
        "sec2":"",        
        "mobile2":"",
        "member3":"",
        "sec3":"",        
        "mobile3":"",
        "member4":"",
        "sec4" :"",        
        "mobile4":"",
        "member5" :"",
        "sec5" :"",        
        "mobile5" :""
    }
  ))

  const handleChange = (e) => {
    setPostdata({...postdata,[e.target.name]: e.target.value})
  }
  let {title,description,members,member1,sec1,mobile1,member2,sec2,mobile2,member3,sec3,mobile3,member4,sec4,mobile4,member5,sec5,mobile5} = postdata

  useEffect (() => {
    loaddata()
  },[])

  const loaddata = async() => {
    const result = await axios.get('http://localhost:5000/edit/'+id)
    setPostdata(result.data)
    console.log("result.data",result.data)
  }

  const submitForm = async(e) => {
    e.preventDefault();
    await axios.put(`${API_URL}/updatedata/${id}`, postdata)
    M.toast({ html: "Data updated Successfully", classes: " green" });
    history.push("/");
    // .then((result) => {
    //   console.log("result",result)
    // }).catch((err)=> {
    //   console.log(err)
    // })
  }
  const [errorMsg, setErrorMsg] = useState("");
  // const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  // const dropRef = useRef();

  // const onDrop = (files) => {
  //   const [uploadedFile] = files;
  //   setFile(files);

  //   const fileReader = new FileReader();
  //   fileReader.onload = () => {
  //     setPreviewSrc(fileReader.result);
  //   };
  //   fileReader.readAsDataURL(uploadedFile);
  //   setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
  //   dropRef.current.style.border = "2px dashed #e9ebeb";
  // };

  // const updateBorder = (dragState) => {
  //   if (dragState === "over") {
  //     dropRef.current.style.border = "2px solid #000";
  //   } else if (dragState === "leave") {
  //     dropRef.current.style.border = "2px dashed #e9ebeb";
  //   }
  // };

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
              <b>Edit Team Details</b>
            </h4>
          </div>

          <Form onSubmit={e => submitForm(e)} >
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            <Row >
              <Col style={{width: "100%"}}>
                <Form.Group controlId="title">
                  <Form.Control type="text" name="title" placeholder="Enter title" value={title} onChange={e => handleChange(e)}/>
                </Form.Group>
              </Col>
            </Row>
            <Row className="quarter-div">
          <Col style={{ width: "70%"}}>
            <Form.Group controlId="description">
              <Form.Control
                type="text"
                name="description"
                // value={state.description || ""}
                value={description}
                placeholder="Enter description"
                onChange={e => handleChange(e)}
              />
            </Form.Group>
          </Col>
          <Col style={{width: "30%"}}>
            <Form.Group controlId="members">
              <Form.Control
                type="number"
                name="members"
                value={members }
                placeholder="Total Members"
                onChange={e => handleChange(e)}
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
                value={member1 }
                placeholder="Member1"
                onChange={e => handleChange(e)}
              />
            </Form.Group>
          </div>
          <div >
            <Form.Group controlId="sec1">
              <Form.Control
                type="text"
                name="sec1"
                value={sec1 }
                placeholder="Sec / Roll No"
                onChange={e => handleChange(e)}
              />
            </Form.Group>
          </div>
          <div className="half-div-child">
            <Form.Group controlId="mobile1">
              <Form.Control
                type="number"
                name="mobile1"
                value={mobile1 }
                placeholder="Mob No"
                onChange={e => handleChange(e)}
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
                value={member2 }
                placeholder="Member2"
                onChange={e => handleChange(e)}
              />
            </Form.Group>
          </div>
          <div >
            <Form.Group controlId="sec2">
              <Form.Control
                type="text"
                name="sec2"
                value={sec2 }
                placeholder="Sec / Roll No"
                onChange={e => handleChange(e)}
              />
            </Form.Group>
          </div>
          <div className="half-div-child">
            <Form.Group controlId="mobile2">
              <Form.Control
                type="number"
                name="mobile2"
                value={mobile2 }
                placeholder="Mob No"
                onChange={e => handleChange(e)}
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
                value={member3 }
                placeholder="Member3"
                onChange={e => handleChange(e)}
              />
            </Form.Group>
          </div>
          <div >
            <Form.Group controlId="sec3">
              <Form.Control
                type="text"
                name="sec3"
                value={sec3 }
                placeholder="Sec / Roll No"
                onChange={e => handleChange(e)}
              />
            </Form.Group>
          </div>
          <div className="half-div-child">
            <Form.Group controlId="mobile3">
              <Form.Control
                type="number"
                name="mobile3"
                value={mobile3 }
                placeholder="Mob No"
                onChange={e => handleChange(e)}
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
                value={member4 }
                placeholder="Member4"
                onChange={e => handleChange(e)}
              />
            </Form.Group>
          </div>
          <div >
            <Form.Group controlId="sec4">
              <Form.Control
                type="text"
                name="sec4"
                value={sec4 }
                placeholder="Sec / Roll No"
                onChange={e => handleChange(e)}
              />
            </Form.Group>
          </div>
          <div className="half-div-child">
            <Form.Group controlId="mobile4">
              <Form.Control
                type="number"
                name="mobile4"
                value={mobile4 }
                placeholder="Mob No"
                onChange={e => handleChange(e)}
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
                value={member5 }
                placeholder="Member5"
                onChange={e => handleChange(e)}
              />
            </Form.Group>
          </div>
          <div >
            <Form.Group controlId="sec5">
              <Form.Control
                type="text"
                name="sec5"
                value={sec5 }
                placeholder="Sec / Roll No"
                onChange={e => handleChange(e)}
              />
            </Form.Group>
          </div>
          <div className="half-div-child">
            <Form.Group controlId="mobile5">
              <Form.Control
                type="number"
                name="mobile5"
                value={mobile5 }
                placeholder="Mob No"
                onChange={e => handleChange(e)}
              />
            </Form.Group>
          </div>
        </Row>
              
            {/* <div className="upload-section">
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
            </div> */}
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

export default EditPost;













// import React, { useContext, useState, useEffect } from "react";
// import { Link, useHistory } from "react-router-dom";
// import M from "materialize-css";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { UserContext } from "../../App";


// function EditPost() {
//   const history = useHistory();
//   const [data, setData] = useState([]);
//   const { state, dispatch } = useContext(UserContext);
//   const { userId } = useParams();


//   const [post, setPost] = useState({});
//   const [title, setTitle] = useState("");
//   const [image, setImage] = useState("");
//   const [url, setUrl] = useState("");
//   const [description, setDescription] = useState("");
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


//   // useEffect(() => {
//   //   const fetchPost = async () = {
//   //     // const {data} = await axios.get(`/editpost`)
//   //   }
//   // }, [])
  
//   useEffect(() => {
//     fetch(`/editpost/${userId}`, {
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem("jwt"),
//       },
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         setData(result.post);
//       });
//   }, []);

//   // useEffect(() => {
//   //   fetch(`/editpost/:id`, {
//   //     method: "post",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //       Authorization: "Bearer " + localStorage.getItem("jwt"),
//   //     },
//   //     body: JSON.stringify({
//   //       title,
//   //       description,
//   //       member1,
//   //       sec1,
//   //       member2,
//   //       sec2,
//   //       member3,
//   //       sec3,
//   //       member4,
//   //       sec4,
//   //       member5,
//   //       sec5,
//   //       photo: url,
//   //     }),
//   //   })
//   //     .then((res) => res.json())
//   //     .then((data) => {
//   //       if (data.error) {
//   //         M.toast({ html: data.error, classes: "#c62828 red darken-3" });
//   //       } else {
//   //         M.toast({ html: "Post Created Successfully", classes: " green" });
//   //         history.push("/");
//   //       }
//   //     })
//   //     .catch((err) => {
//   //       console.log(err);
//   //     });
//   // }, [url]);

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
//     // <div><h1>PostId: </h1>
//     // </div>

//     <div className="container post-container">
//       <div style={{ marginTop: "4rem" }} className="row">
//         <div className="col s10 offset-s1">
//           <Link to="/" className="btn-flat waves-effect">
//             <i className="material-icons left">keyboard_backspace</i>
//             Back to home
//           </Link>
//           <div className="col s12" style={{ paddingLeft: "11.250px" }}>
//             <h4>
//               <b>Create Post</b>
//               {/* <br /> postID : {postId} */}
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
//             <div className="input-field col s12">
//               <textarea
//                 id="description"
//                 className="materialize-textarea"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               ></textarea>
//               <label htmlFor="description">Description</label>
//             </div>
//             <div className="input-field col s6">
//               <input
//                 id="member1"
//                 type="text"
//                 value={member1}
//                 onChange={(e) => setMember1(e.target.value)}
//               />
//               <label htmlFor="title">Member 1</label>
//             </div>
//             <div className="input-field col s6">
//               <input
//                 id="sec1"
//                 type="text"
//                 value={sec1}
//                 onChange={(e) => setSec1(e.target.value)}
//               />
//               <label htmlFor="title">Roll No, Section</label>
//             </div>
//             <div className="input-field col s6">
//               <input
//                 id="member2"
//                 type="text"
//                 value={member2}
//                 onChange={(e) => setMember2(e.target.value)}
//               />
//               <label htmlFor="title">Member 2</label>
//             </div>
//             <div className="input-field col s6">
//               <input
//                 id="sec2"
//                 type="text"
//                 value={sec2}
//                 onChange={(e) => setSec2(e.target.value)}
//               />
//               <label htmlFor="title">Roll No, Section</label>
//             </div>
//             <div className="input-field col s6">
//               <input
//                 id="member3"
//                 type="text"
//                 value={member3}
//                 onChange={(e) => setMember3(e.target.value)}
//               />
//               <label htmlFor="title">Member 3</label>
//             </div>
//             <div className="input-field col s6">
//               <input
//                 id="sec3"
//                 type="text"
//                 value={sec3}
//                 onChange={(e) => setSec3(e.target.value)}
//               />
//               <label htmlFor="title">Roll No, Section</label>
//             </div>
//             <div className="input-field col s6">
//               <input
//                 id="member4"
//                 type="text"
//                 value={member4}
//                 onChange={(e) => setMember4(e.target.value)}
//               />
//               <label htmlFor="title">Member 4</label>
//             </div>
//             <div className="input-field col s6">
//               <input
//                 id="sec4"
//                 type="text"
//                 value={sec4}
//                 onChange={(e) => setSec4(e.target.value)}
//               />
//               <label htmlFor="title">Roll No, Section</label>
//             </div>
//             <div className="input-field col s6">
//               <input
//                 id="member5"
//                 type="text"
//                 value={member5}
//                 onChange={(e) => setMember5(e.target.value)}
//               />
//               <label htmlFor="title">Member 5</label>
//             </div>
//               <div className="input-field col s6">
//               <input
//                 id="sec5"
//                 type="text"
//                 value={sec5}
//                 onChange={(e) => setSec5(e.target.value)}
//                 /*placeholder="Roll No, Sec"*/
//               />
//               <label htmlFor="title">Roll No, Section</label>
//             </div>
              
//             <div className="input-field col s12">
//               <div className="file-field input-field">
//                 <div className="btn">
//                   <span>File</span>
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

// export default EditPost;



