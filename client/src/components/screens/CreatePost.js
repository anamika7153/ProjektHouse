import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

function CreatePost() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [member1, setMember1] = useState("");
  const [sec1, setSec1] = useState("");
  const [member2, setMember2] = useState("");
  const [sec2, setSec2] = useState("");
  const [member3, setMember3] = useState("");
  const [sec3, setSec3] = useState("");
  const [member4, setMember4] = useState("");
  const [sec4, setSec4] = useState("");
  const [member5, setMember5] = useState("");
  const [sec5, setSec5] = useState("");

  useEffect(() => {
    fetch("/createpost", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        title,
        description,
        member1,
        sec1,
        member2,
        sec2,
        member3,
        sec3,
        member4,
        sec4,
        member5,
        sec5,
        photo: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darken-3" });
        } else {
          M.toast({ html: "Post Created Successfully", classes: " green" });
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url]);

  const PostDetails = (e) => {
    e.preventDefault();
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "projekthouse");
      data.append("cloud_name", "ddzjlkiyw");
      fetch("https://api.cloudinary.com/v1_1/ddzjlkiyw/image/upload", {
        method: "POST",
        body: data,
      })
        .then((response) => response.json()) // keep it in one line else use return res.json()
        .then((data) => {
          setUrl(data.url);
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else {
      setUrl(null);
    }
  };

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
          <form noValidate>
            <div className="input-field col s12">
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="title">Title</label>
            </div>
            <div className="input-field col s12">
              <textarea
                id="description"
                className="materialize-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <label htmlFor="description">Description</label>
            </div>
            <div className="input-field col s6">
              <input
                id="member1"
                type="text"
                value={member1}
                onChange={(e) => setMember1(e.target.value)}
              />
              <label htmlFor="title">Member 1</label>
            </div>
            <div className="input-field col s6">
              <input
                id="sec1"
                type="text"
                value={sec1}
                onChange={(e) => setSec1(e.target.value)}
              />
              <label htmlFor="title">Roll No, Section</label>
            </div>
            <div className="input-field col s6">
              <input
                id="member2"
                type="text"
                value={member2}
                onChange={(e) => setMember2(e.target.value)}
              />
              <label htmlFor="title">Member 2</label>
            </div>
            <div className="input-field col s6">
              <input
                id="sec2"
                type="text"
                value={sec2}
                onChange={(e) => setSec2(e.target.value)}
              />
              <label htmlFor="title">Roll No, Section</label>
            </div>
            <div className="input-field col s6">
              <input
                id="member3"
                type="text"
                value={member3}
                onChange={(e) => setMember3(e.target.value)}
              />
              <label htmlFor="title">Member 3</label>
            </div>
            <div className="input-field col s6">
              <input
                id="sec3"
                type="text"
                value={sec3}
                onChange={(e) => setSec3(e.target.value)}
              />
              <label htmlFor="title">Roll No, Section</label>
            </div>
            <div className="input-field col s6">
              <input
                id="member4"
                type="text"
                value={member4}
                onChange={(e) => setMember4(e.target.value)}
              />
              <label htmlFor="title">Member 4</label>
            </div>
            <div className="input-field col s6">
              <input
                id="sec4"
                type="text"
                value={sec4}
                onChange={(e) => setSec4(e.target.value)}
              />
              <label htmlFor="title">Roll No, Section</label>
            </div>
            <div className="input-field col s6">
              <input
                id="member5"
                type="text"
                value={member5}
                onChange={(e) => setMember5(e.target.value)}
              />
              <label htmlFor="title">Member 5</label>
            </div>
              <div className="input-field col s6">
              <input
                id="sec5"
                type="text"
                value={sec5}
                onChange={(e) => setSec5(e.target.value)}
                /*placeholder="Roll No, Sec"*/
              />
              <label htmlFor="title">Roll No, Section</label>
            </div>
              
            <div className="input-field col s12">
              <div className="file-field input-field">
                <div className="btn">
                  <span>File</span>
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" />
                </div>
              </div>
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
                onClick={PostDetails}
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;









// import React, { useState, useEffect, useRef } from "react";
// import { Link, useHistory } from "react-router-dom";
// import M from "materialize-css";
// import Dropzone from "react-dropzone";
// import { API_URL } from "../../utils/constants";
// import axios from "axios";

// function CreatePost() {
//   const history = useHistory();
//   const [file, setFile] = useState(null); // state for storing actual image
//   const [previewSrc, setPreviewSrc] = useState(""); // state for storing actual image

//   const [title, setTitle] = useState("");
//   const [member1, setMember1] = useState("");
//   const [member2, setMember2] = useState("");
//   const [member3, setMember3] = useState("");
//   const [member4, setMember4] = useState("");
//   const [member5, setMember5] = useState("");
//   const [image, setImage] = useState("");
//   const [url, setUrl] = useState("");
//   const [description, setDescription] = useState("");

//   const [errorMsg, setErrorMsg] = useState("");
//   const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
//   const dropRef = useRef();

//   const onDrop = (files) => {
//     const [uploadedFile] = files;
//     setFile(uploadedFile);

//     const fileReader = new FileReader();
//     fileReader.onload = () => {
//       setPreviewSrc(fileReader.result);
//     };
//     fileReader.readAsDataURL(uploadedFile);
//     setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
//     dropRef.current.style.border = "2px dashed #e9ebeb";
//   };

//   const updateBorder = (dragState) => {
//     if (dragState === "over") {
//       dropRef.current.style.border = "2px solid #000";
//     } else if (dragState === "leave") {
//       dropRef.current.style.border = "2px dashed #e9ebeb";
//     }
//   };

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

//   const PostDetails = () => {
//     // e.preventDefault();
//     if (image) {
//       const data = new FormData();
//       data.append("file", image);
//       data.append("filew", file);
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
//     <div className="container">
//       <div style={{ marginTop: "4rem" }} className="row">
//         <div className="col s8 offset-s2">
//           <Link to="/" className="btn-flat waves-effect">
//             <i className="material-icons left">keyboard_backspace</i>
//             Back to home
//           </Link>
//           <div className="col s12" style={{ paddingLeft: "11.250px" }}>
//             <h4>
//               <b>Create Post</b>
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
            {/* <div className="input-field col s6">
              <input
                id="member1"
                type="text"
                value={member1}
                onChange={(e) => setMember1(e.target.value)}
              />
              <label htmlFor="title">Member 1</label>
            </div>
            <div className="input-field col s6">
              <input
                id="member2"
                type="text"
                value={member2}
                onChange={(e) => setMember2(e.target.value)}
              />
              <label htmlFor="title">Member 2</label>
            </div>
            <div className="input-field col s6">
              <input
                id="member3"
                type="text"
                value={member3}
                onChange={(e) => setMember3(e.target.value)}
              />
              <label htmlFor="title">Member 3</label>
            </div>
            <div className="input-field col s6">
              <input
                id="member4"
                type="text"
                value={member4}
                onChange={(e) => setMember4(e.target.value)}
              />
              <label htmlFor="title">Member 4</label>
            </div>
            <div className="input-field col s6">
              <input
                id="member5"
                type="text"
                value={member5}
                onChange={(e) => setMember5(e.target.value)}
              />
              <label htmlFor="title">Member 5</label>
            </div> */}
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
//             <div className="upload">
//               <Dropzone
//                 onDrop={onDrop}
//                 onDragEnter={() => updateBorder("over")}
//                 onDragLeave={() => updateBorder("leave")}
//               >
//                 {({ getRootProps, getInputProps }) => (
//                   <div
//                     {...getRootProps({ className: "drop-zone" })}
//                     ref={dropRef}
//                   >
//                     <input {...getInputProps()} />
//                     <p>Drag and drop a file OR click here to select a file</p>
//                     {file && (
//                       <div>
//                         <strong>Selected file:</strong> {file.name}
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </Dropzone>
//               {previewSrc ? (
//                 isPreviewAvailable ? (
//                   <div className="image-preview">
//                     <img
//                       className="preview-image"
//                       src={previewSrc}
//                       alt="Preview"
//                     />
//                   </div>
//                 ) : (
//                   <div className="preview-message">
//                     <p>No preview available for this file</p>
//                   </div>
//                 )
//               ) : (
//                 <div className="preview-message">
//                   <p>Image preview will be shown here after selection</p>
//                 </div>
//               )}
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
//                 onClick={(e)=>{
//                   PostDetails()}}>
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


/*
<div className="input-field col s6">
              <input
                id="member1"
                type="text"
                value={member1}
                onChange={(e) => setMember1(e.target.value)}
              />
              <label htmlFor="title">Member 1</label>
            </div>
            <div className="input-field col s6">
              <input
                id="member2"
                type="text"
                value={member2}
                onChange={(e) => setMember2(e.target.value)}
              />
              <label htmlFor="title">Member 2</label>
            </div>
            <div className="input-field col s6">
              <input
                id="member3"
                type="text"
                value={member3}
                onChange={(e) => setMember3(e.target.value)}
              />
              <label htmlFor="title">Member 3</label>
            </div>
            <div className="input-field col s6">
              <input
                id="member4"
                type="text"
                value={member4}
                onChange={(e) => setMember4(e.target.value)}
              />
              <label htmlFor="title">Member 4</label>
            </div>
            <div className="input-field col s6">
              <input
                id="member5"
                type="text"
                value={member5}
                onChange={(e) => setMember5(e.target.value)}
              />
              <label htmlFor="title">Member 5</label>
            </div>
*/

/*
const PostDetails = () => {
    // e.preventDefault();
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("filew", file);
      data.append("upload_preset", "projekthouse");
      data.append("cloud_name", "ddzjlkiyw");
      fetch("https://api.cloudinary.com/v1_1/ddzjlkiyw/image/upload", {
        method: "POST",
        body: data,
      })
        .then((response) => response.json()) // keep it in one line else use return res.json()
          .then(async (data) => {
          console.log(data)
          await setUrl(data.url);          
          fetch("/createpost", {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
                body: JSON.stringify({
                  title,
                  description,
                  // member1,
                  // member2,
                  // member3,
                  // member4,
                  // member5,
                  photo: url,
                }),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" });
                  } else {
                    M.toast({ html: "Post Created Successfully", classes: " green" });
                    history.push("/");
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else {
      setUrl(null);
    }
  };

*/
/*
<button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                type="submit"
                className="btn btn-large waves-effect hoverable #ff5252 red accent-1"
                onClick={(e)=>{
                  e.preventDefault()
                  PostDetails()}}>
                Post
              </button>

*/