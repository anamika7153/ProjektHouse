import React, { useContext, useState, useEffect } from "react";
import download from "downloadjs";
import axios from "axios";
import {UserContext} from '../App'
import { API_URL } from "../utils/constants";
import { Link } from "react-router-dom";


const FilesList = () => {
  const [filesList, setFilesList] = useState([]);
  // const [data, setData] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    console.log("state",state)    
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/getAllTeams`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        });
        setErrorMsg("");
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
  }, []);
  //adding a download link inside the table. Ccalling the downloadFile function when we click on the download link
  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`${API_URL}/downloadfiles/${id}`, {
        responseType: "blob",
        
        //responsetype:blob is very important otherwise will not get the file in the correct format.
      });
      const split = path.split("/");
      const filename = split[split.length - 1];
      setErrorMsg("");
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg("Error while downloading file. Try again later");
      }
    }
  };

  const makeComment = async(text, postId) => {
    // console.log("text", text)
    // console.log("postId", postId)
    // console.log("jwt",localStorage.getItem("jwt"))
    fetch("/commentt", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log("result: ",result)
        const newData = filesList.map((item) => {
          if (result._id == item._id) return result;
          else return item;
        });
        setFilesList(newData);
        console.log("fileList",filesList)
      })
      .catch((err) => {
        console.log(err);
      });
    // const body = JSON.stringify({
    //   postId,
    //   text,
    // })
    //   try {          
    //     const response = await fetch("/commentt", {
    //           method: "put",
    //           headers: {
    //               "Content-Type": "application/json",
    //                Authorization: "Bearer " + localStorage.getItem("jwt"),
    //             },
    //     body, 
    //   })
    //   console.log("response",response)
    // } catch (error) {
    //     console.log("error",error)
    //   }
      
    };

  // const [edit, setEdit] = useState(false)

  return (
    <div style={{marginTop: "50px"}} className="home container">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      {/* <table className="files-table"> */}
        {/* <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Download File</th>
          </tr>
        </thead> */}
        {/* <tbody> */}
          {/* {filesList.length > 0 ? ( */}
            {filesList.map(
              // ({ _id, title, description, postedBy, file_path, file_mimetype }) => (
                (item) => (
                  <div className="card home-card" style={{borderRadius: "12px", marginBottom: "2rem", }}  key={item._id}>
                    <h5 style={{ padding: "15px 25px", margin: "0",alignItems: "center", display: "flex", justifyContent: "space-between"}}>
                    <div>
                      <img
                      src={item.postedBy.pic}
                      style={{
                        height: "40px",
                        width: "40px",
                        borderRadius: "50%",
                        marginRight: "10px",
                        padding: "0",
                        marginBottom: "-15px",
                      }}
                      />
                      {item.postedBy.name}
                    </div>
                    
                    </h5>
                    <hr></hr>
                    <div style={{ paddingLeft: "35px", padding: "20px"}}>
                      <p style={{ fontSize: "21px", paddingBottom: "10px" }}>
                        <b>{item.title}</b>
                      </p>
                      <p style={{ fontSize: "18px", paddingBottom: "10px" }}>{item.description}</p>
                        <h6 style={{ fontWeight: "900", paddingBottom: "10px", margin: "0" }}>
                          <b><u>Members</u></b>
                        </h6>
                      <table>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Sec / Roll No</th>
                            {/* <th>Mob No.</th> */}
                          </tr>
                          
                        </thead>
                        {/* <tbody>  */}

                          {
                            item.members === "2" ? (
                              <tbody>
                                <tr>
                                <td>{item.member1}</td>
                                <td>{item.sec1}</td>
                              </tr>
                              <tr>
                                <td>{item.member2}</td>
                                <td>{item.sec2}</td>
                              </tr>
                              </tbody>
                              
                              
                            )
                            : ""
                          }

                          {/* {
                            (item.members === "1") && (
                              <i className="material-icons">delete</i>
                              
                            )
                          } */}
                          
                          {/* <tr>
                            <td>{item.member1}</td>
                            <td>{item.sec1}</td>
                          </tr>
                          <tr>
                            <td>{item.member2}</td>
                            <td>{item.sec2}</td>
                          </tr>
                          <tr>
                            <td>{item.member3}</td>
                            <td>{item.sec3}</td>
                          </tr>
                          <tr>
                            <td>{item.member4}</td>
                            <td>{item.sec4}</td>
                          </tr> */}
                          
                          
                        {/* </tbody> */}
                      </table>
                      <b>
                        <h6 style={{ fontWeight: "900" }}>
                          <u>Comments</u>
                        </h6>
                      </b>
                      {item.comments.map((comment) => {
                        return (
                          <h6 key={comment._id}>
                            <span style={{ fontWeight: "700" }}>
                              {comment.postedBy.name}
                            </span>
                            {" : "}
                            {comment.text}
                            
                          </h6>
                        );
                      })}
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          // console.log("comment working")
                          makeComment(e.target[0].value, item._id);
                        }}
                      >
                        <input type="text" placeholder="Add comment here" />
                      </form>

                    </div>
                    <div style={{ padding: "20px", paddingLeft: "25px",}}>
                    <p style={{ fontSize: "18px" }}>
                      <a
                      href="#/"
                      onClick={() =>
                        downloadFile(item._id, item.file_path, item.file_mimetype)
                      }
                    >
                     <b>Download File</b>
                    </a></p>
                    </div>

                  </div>
                // <tr key={_id}>
                //   <td className="file-title">{title}</td>
                //   <td className="file-description">{description}</td>
                //   <td>
                //     <a
                //       href="#/"
                //       onClick={() =>
                //         downloadFile(_id, file_path, file_mimetype)
                //       }
                //     >
                //       Download
                //     </a>
                //   </td>
                // </tr>
              )
            )}
          {/* ) : (
            <tr>
              <td colSpan={3} style={{ fontWeight: "300" }}>
                No files found. Please add some.
              </td>
            </tr>
          )
          } */}
        {/* </tbody>
      </table> */}
    </div>
  )



    // <div className="home container">
    //   {filesList.map((item) => {
    //     return (
    //       <div
    //       className="card home-card"
    //       key={item._id}
    //       style={{ borderRadius: "12px" }}
    //       >
    //         <h5 style={{ padding: "10px 15px", alignItems: "center", display: "flex", justifyContent: "space-between" }}>
    //           postedby
    //         </h5>
    //         <hr></hr>
    //         <div style={{paddingLeft: "25px"}}>
    //           <p style={{ fontSize: "21px" }}>
    //             <b>{item.title}</b>
    //           </p>
    //           <p style={{ fontSize: "18px" }}>{item.description}</p>
    //           <b>
    //             <h6 style={{ fontWeight: "900" }}>
    //               <u>Members</u>
    //             </h6>
    //           </b>
    //           <table>
    //             <thead>
    //               <tr>
    //                 <th>Name</th>
    //                 <th>Sec / Roll No</th>
    //                 <th>Mobile</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               <tr key={item._id}>
    //                 <td>{item.member1}</td>
    //                 <td>{item.sec1}</td>
    //                 <td>{item.sec1}</td>
    //               </tr>
    //               <tr key={item._id}>
    //                 <td>{item.member2}</td>
    //                 <td>{item.sec2}</td>
    //                 <td>{item.sec2}</td>
    //               </tr>
    //               <tr key={item._id}>
    //                 <td>{item.member3}</td>
    //                 <td>{item.sec3}</td>
    //                 <td>{item.sec3}</td>
    //               </tr>
    //               <tr key={item._id}>
    //                 <td>{item.member4}</td>
    //                 <td>{item.sec4}</td>
    //                 <td>{item.sec4}</td>
    //               </tr>
    //               <tr key={item._id}>
    //                 <td>{item.member5}</td>
    //                 <td>{item.sec5}</td>
    //                 <td>{item.sec5}</td>
    //               </tr>
    //             </tbody>
    //           </table>
    //         </div>
    //       </div>
    //     )
    //   })}
      
    // </div>
    
  // );
};

export default FilesList;




// return (
//   <div className="card home-card" key={item._id} style={{borderRadius: "12px"}}>
//     <h5 style={{ padding: "10px 15px",alignItems: "center", display: "flex", justifyContent: "space-between" }}>
// <Link
//   to={
//     item.postedBy._id !== state._id
//       ? `/profile/` + item.postedBy._id
//       : "/profile"
//   }
//   style={{
//     color: "black",
//   }}
// >
//   <img
//     src={item.postedBy.pic}
//     style={{
//       height: "40px",
//       width: "40px",
//       borderRadius: "50%",
//       marginRight: "10px",
//       padding: "0",
//       marginBottom: "-15px",
//     }}
//   />
//   {item.postedBy.name}
// </Link>{" "}
// {item.postedBy._id == state._id ? (
//   <div style={{display: "flex", justifyContent: "space-between" }}>
//     <i
//     className="material-icons"
//     style={{ float: "right", cursor: "pointer", marginRight: "10px" }}
//     // onClick={(e) => deletePost(item._id)}
//   >
//     delete
//   </i>
//   {/* <Link to={`/editpost/${item._id}`}> */}
//   <div >
//   <i
//     className="material-icons"
//     style={{ float: "right", cursor: "pointer" }}
//     // onClick={(e) => editPost(item._id)}
//     // onClick={() => setEdit(item._id)}
//   >
//     edit
//   </i>
//   {/* </Link> */}
//   </div>
  
//   </div>
  
// ) : (
//   ""
// )}
// </h5>
// <hr></hr>
// <div style={{ paddingLeft: "25px",}}>
// <p style={{ fontSize: "21px" }}>
//   <b>{item.title}</b>
// </p>
// <p style={{ fontSize: "18px" }}>{item.description}</p>
// <b>
//   <h6 style={{ fontWeight: "900" }}>
//     <u>Members</u>
//   </h6>
// </b>
// <table>
// <thead>
//   <tr>
//     <th>Name</th>
//     <th>Sec</th>
//     <th>Mob. No</th>
//     <th>File</th>
//   </tr>
// </thead>

// <tbody>
// <tr key={_id}>
// <td>{
//     edit === item._id ? <input id="member1" name="member1" value={member1} onChange={(e) => member1 = e.target.value} type="text" defaultValue={item.member1} /> : item.member1
//     }</td>
//     <td>{edit === item._id ? <input id="sec1" name="sec1" value={sec1} onChange={(e) => sec1 = e.target.value} type="text" defaultValue={item.sec1} /> :item.sec1}</td>
//     <td>{ edit === item._id ? <input id="title" name="title" value={title} onChange={(e) => title = e.target.value} type="text" defaultValue={item.mobile1} /> : item.mobile1}</td>
//     <td>
     
//       <a
//         href="#/"
//         onClick={() =>
//           downloadFile(_id, file_path, file_mimetype)
//         }
//       >
//         Download
//       </a>
//       <button onClick={() => setEdit(true)}>edit</button>
//     </td>
//   </tr>
// </tbody>
// </table>
// </div>

//   </div>
// )