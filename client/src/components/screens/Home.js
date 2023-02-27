import React, { useContext, useEffect, useState } from "react";
import download from "downloadjs";
import { API_URL } from "../../utils/constants";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import EditPost from "./EditPost";
import axios from "axios";


function Home() {
  const {idd} = useParams()
  // const [title, setTitle] = useState("");
  // const [image, setImage] = useState("");
  // const [url, setUrl] = useState("");
  // const [description, setDescription] = useState("");
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
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState([])
  const [creators, setCreators] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [errorMsg, setErrorMsg] = useState("");

  const [postdata, setPostdata] = useState((
    {
      "title":"",
        "description":"",
        "member1":"",
        "sec1":"",
        "member2":"",
        "sec2":"",
        "member3":"",
        "sec3":"",
        "member4":"",
        "sec4" :"",
        "member5" :"",
        "sec5" :"",
    }
  ))

  const downloadFilew = async (id, path, mimetype) => {
    try {
      console.log("id", id)
      console.log("path", path)
      console.log("mimetype", mimetype)
      const result = await axios.get(`/download/${id}`, {
        responseType: "blob",
        headers: {
          // "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      console.log("downloadd")

      const split = path.split("/");
      const filename = split[split.length - 1];
      setErrorMsg("");
      return download(result.data, filename, mimetype);
    } catch (error) {
      console.log("error",error)
      if (error.response && error.response.status === 400) {
        setErrorMsg("Error while downloading file. Try again later");
      }
    }
  };

  const handleChange = (e) => {
    setPostdata({...postdata,[e.target.name]: e.target.value})
  }
  let {title,description,member1,sec1,member2,sec2,member3,sec3,member4,sec4,member5,sec5} = postdata

  useEffect(() => {
    // console.log("postdata",postdata)
    fetch("/allpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
      });
  }, [creators]);
  useEffect(() => {
    fetch("/top-creators", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result.users);
        setCreators(result.users);
      });
  }, []);
  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (result._id == item._id) return result;
          else return item;
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unlikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (result._id == item._id) return result;
          else return item;
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const updatePost = (id) => {
  //   fetch("/updatepost", {
  //     method: "put",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("jwt"),
  //     },
  //     body: JSON.stringify({
  //       title,
  //       description,
  //       member1,
  //       sec1,
  //       member2,
  //       sec2,
  //       member3,
  //       sec3,
  //       member4,
  //       sec4,
  //       member5,
  //       sec5,
  //     }),
  //   })
  //   .then((res) => res.json())
  //   .then((result) => {
  //     const newData = data.map((item) => {
  //       if (result._id == item._id) return result;
  //       else return item;
  //     });
  //     setData(newData);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }
  const makeComment = (text, postId) => {
    fetch("/comment", {
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
        const newData = data.map((item) => {
          if (result._id == item._id) return result;
          else return item;
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const editPost = (postId) => {
  //   fetch(`${API_URL}/editpost/${postId}`, {
  //     // method: "get",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("jwt"),
  //     },
  //   })
  //     .then((res) => res.json())
  //     // .then((result) => {
  //       // const newData = data.filter((item) => {
  //       //   return item._id != result._id;
  //       // });
  //       // setData(newData);
  //     // })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  const deletePost = (postId) => {
    fetch(`/deletepost/${postId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.filter((item) => {
          return item._id != result._id;
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteComment = (postId, commentId) => {
    fetch(`/deletecomment/${postId}/${commentId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (result._id == item._id) return result;
          else return item;
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="home container">
      {/* <h4>Top Creators</h4>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {creators.slice(0, 4).map((creator) => {
          return (
            <div className="row" style={{ width: "150px" }}>
              <div className="col">
                <div className="card" style={{ width: "200px" }}>
                  <div className="card-image">
                    <img
                      src={creator.pic}
                      style={{ height: "163px", width: "100%" }}
                    />

                    <Link
                      to={
                        creator._id !== state._id
                          ? `/profile/` + creator._id
                          : "/profile"
                      }
                      className="btn-floating halfway-fab waves-effect waves-light red"
                    >
                      <i className="material-icons">add</i>
                    </Link>
                  </div>
                  <div className="card-content">
                    <span className="card-title" style={{ color: "black" }}>
                      {creator.name}
                    </span>
                    <p style={{width: "80%", }}>{creator.email}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div> */}
      
      <h4>Feed</h4>
      {data.map((item) => {
        // console.log("item",item)
        return (
          <div
            className="card home-card"
            key={item._id}
            style={{ borderRadius: "12px " }}
          >
            <h5 style={{ padding: "18px 15px",alignItems: "center", display: "flex", justifyContent: "space-between" }}>
              <Link
                to={
                  item.postedBy._id !== state._id
                    ? `/profile/` + item.postedBy._id
                    : "/profile"
                }
                style={{
                  color: "black",
                }}
              >
                <div style={{ display: "flex",}}>
                  <img
                  src={item.postedBy.pic}
                  style={{
                    height: "40px",
                    width: "40px",
                    borderRadius: "50%",
                    marginRight: "10px",
                    padding: "0",
                    marginBottom: "-15px",
                    marginTop: "-4px",
                  }}
                />
                <div>{item.postedBy.name}</div>
                </div>
                
              </Link>{" "}
              {item.postedBy._id == state._id ? (
                <div style={{display: "flex", justifyContent: "space-between" }}>
                  <i
                  className="material-icons"
                  style={{ float: "right", cursor: "pointer", marginRight: "10px" }}
                  onClick={(e) => deletePost(item._id)}
                >
                  delete
                </i>
                {/* <Link to={`/editpost/${item._id}`}> */}
                <div >
                  <Link to={`/editdata/${item._id}`} >
                    <i
                  className="material-icons"
                  style={{ float: "right", cursor: "pointer",marginRight: "10px" }}
                  // onClick={(e) => editPost(item._id)}
                  // onClick={() => {
                  //   setEdit(item._id);
                  //   // editdata(item._id, item._member1, item._sec1, item._member2, item._sec2, item._member3, item._sec3, item._member4, item._sec4, item._member5, item._sec5,)
                  // }}
                >
                  edit
                </i>
                  </Link>
                
                {/* </Link> */}
                </div>
                {edit === item._id ? <i className="material-icons" style={{ cursor: "pointer"}} onClick={()=> setEdit(false)}>cancel</i> : ""}
                </div>
                
              ) : (
                ""
              )}
            </h5>
            <hr></hr>

            <div style={{ padding: "25px",}}>
              <p style={{ fontSize: "21px" }}>
                <b>{item.title}</b>
              </p>
              <p style={{ fontSize: "18px" }}>{item.description}</p>
              <b>
                <h6 style={{ fontWeight: "900" }}>
                  <u>Members</u>
                </h6>
              </b>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sec</th>
                  <th>Mob. No</th>
                </tr>
              </thead>

              <tbody>
                
                <tr key={item._id}>
                  <td>{item.member1}</td>
                  <td>{item.sec1}</td>
                  <td>{item.mobile1}</td>
                  {/* <td>{ edit === item._id ? <input id="member1" name="member1" value={item.member1} onChange={(e) => member1 = e.target.value} type="text"  /> : item.member1}</td> */}
                  {/* <td>{ edit === item._id ? <input id="member1" name="member1"  type="text"  onChange={(e) => member1 = e.target.value} defaultValue={item.member1}/> : item.member1}</td> */}
                  {/* <td>{ edit === item._id ? <input id="member1" name="member1"  type="text"  onChange={(e) => member1 = e.target.value} defaultValue={item.member1}/> : item.member1}</td> */}
                  {/* <td>{ edit === item._id ? <input id="member1" name="member1"  type="text"  onChange={(e) => handleChange(e)} value={member1}/> : item.member1}</td> */}
                  {/* <td>{ edit === item._id ? <input id="sec1" name="sec1" value={item.sec1} onChange={(e) => sec1 = e.target.value} type="text"  /> :item.sec1}</td> */}
                  {/* <td>{ edit === item._id ? <input id="sec1" name="sec1" defaultValue={item.sec1} onChange={(e) => sec1 = e.target.value} type="text"  /> :item.sec1}</td> */}
                  {/* <td>{ edit === item._id ? <input id="sec1" name="sec1" value={sec1} onChange={(e) => handleChange(e)} type="text"  /> :item.sec1}</td> */}
                  {/* <td>{ edit === item._id ? <input id="title" name="title" value={item.title} onChange={(e) => title = e.target.value} type="text"  /> : item.mobile1}</td> */}
                  {/* <td>{ edit === item._id ? <input id="title" name="title" defaultValue={item.title} onChange={(e) => title = e.target.value} type="text"  /> : item.mobile1}</td> */}
                  {/* <td>{ edit === item._id ? <input id="title" name="title" value={title} onChange={(e) => handleChange(e)} type="text"  /> : item.mobile1}</td> */}
                </tr>
                <tr >
                  <td>{item.member2}</td>
                  <td>{item.sec2}</td>
                  <td>{item.mobile2}</td>
                  {/* <td>{ edit ===item._id ? <input id="member2" name="member2" defaultValue={item.member2} onChange={(e) => member2 = e.target.value} type="text"  /> : item.member2}</td> */}
                  {/* <td>{ edit ===item._id ? <input id="member2" name="member2" value={member2} onChange={(e) => handleChange(e)} type="text"  /> : item.member2}</td> */}
                  {/* <td>{ edit ===item._id ? <input id="sec2" name="sec2" defaultValue={item.sec2} onChange={(e) => sec2 = e.target.value} type="text"  /> : item.sec2}</td> */}
                  {/* <td>{ edit ===item._id ? <input id="sec2" name="sec2" value={sec2} onChange={(e) => handleChange(e)} type="text"  /> : item.sec2}</td> */}
                  {/* <td>{ edit ===item._id ? <input id="title" name="title" defaultValue={item.title} onChange={(e) => title = e.target.value} type="text"  /> : item.mobile2}</td> */}
                  {/* <td>{ edit ===item._id ? <input id="title" name="title" value={title} onChange={(e) => handleChange(e)} type="text"  /> : item.mobile2}</td> */}
                </tr>
                <tr >
                  <td>{item.member3}</td>
                  <td>{item.sec3}</td>
                  <td>{item.mobile3}</td>
                  {/* <td>{ edit ===item._id ? <input id="member3" name="member3" defaultValue={item.member3} onChange={(e) => member3=e.target.value} type="text"  /> : item.member3}</td> */}
                  {/* <td>{ edit ===item._id ? <input id="member3" name="member3" value={member3} onChange={(e) => handleChange(e)} type="text"  /> : item.member3}</td> */}
                  {/* <td>{ edit ===item._id ? <input id="sec3" name="sec3" defaultValue={item.sec3} onChange={(e) => sec3=e.target.value} type="text"  /> : item.sec3}</td> */}
                  {/* <td>{ edit ===item._id ? <input id="sec3" name="sec3" value={sec3} onChange={(e) => handleChange(e)} type="text"  /> : item.sec3}</td> */}
                  {/* <td>{ edit ===item._id ? <input id="title" name="title" defaultValue={item.title} onChange={(e) => title=e.target.value} type="text"  /> : item.mobile3}</td> */}
                  {/* <td>{ edit ===item._id ? <input id="title" name="title" value={title} onChange={(e) => handleChange(e)} type="text"  /> : item.mobile3}</td> */}
                </tr>
                <tr >
                  <td>{item.member4}</td>
                  <td>{item.sec4}</td>
                  <td>{item.mobile4}</td>
                  {/* <td>{ edit ===item._id ? <input id="member4" name="member4" defaultValue={item.member4} onChange={(e) => member4 = e.target.value} type="text"  /> : item.member4}</td> */}
                  {/* <td>{ edit ===item._id ? <input id="member4" name="member4" value={member4} onChange={(e) => handleChange(e)} type="text"  /> : item.member4}</td> */}
                  {/* <td>{ edit ===item._id ? <input id="sec4" name="sec4" defaultValue={item.sec4} onChange={(e) => sec4 = e.target.value} type="text"  /> : item.sec4}</td> */}
                  {/* <td>{ edit ===item._id ? <input id="sec4" name="sec4" value={sec4} onChange={(e) => handleChange(e)} type="text"  /> : item.sec4}</td> */}
                  {/* <td>{ edit ===item._id ? <input id="title" name="title" defaultValue={item.title} onChange={(e) => title = e.target.value} type="text"  /> : item.mobile4}</td> */}
                  {/* <td>{ edit ===item._id ? <input id="title" name="title" value={title} onChange={(e) => handleChange(e)} type="text"  /> : item.mobile4}</td> */}
                </tr>
                <tr >
                  <td>{item.member5}</td>
                  <td>{item.sec5}</td>
                  <td>{item.mobile5}</td>
                  {/* <td>{ edit ===item._id ? <input id="member5" name="member5" defaultValue={item.member5} onChange={(e) => member5 = e.target.value} type="text"  /> : item.member5}</td> */}
                  {/* <td>{ edit ===item._id ? <input id="member5" name="member5" value={member5} onChange={(e) => handleChange(e)} type="text"  /> : item.member5}</td> */}
                  {/* <td>{ edit ===item._id ? <input id="sec5" name="sec5" defaultValue={item.sec5} onChange={(e) => sec5 = e.target.value} type="text"  /> : item.sec5}</td> */}
                  {/* <td>{ edit ===item._id ? <input id="sec5" name="sec5" value={sec5} onChange={(e) => handleChange(e)} type="text"  /> : item.sec5}</td> */}
                  {/* <td>{ edit ===item._id ? <input id="title" name="title" defaultValue={item.title} onChange={(e) => title = e.target.value} type="text"  /> : item.mobile5}</td> */}
                  {/* <td>{ edit ===item._id ? <input id="title" name="title" value={title} onChange={(e) => handleChange(e)} type="text"  /> : item.mobile5}</td> */}
                </tr>
              </tbody>
            </table>
              
              {/* <p style={{ fontSize: "21px" }}>
                <b>{item.member1}</b>
              </p>
              <p style={{ fontSize: "21px" }}>
                <b>{item.member2}</b>
              </p>
              <p style={{ fontSize: "21px" }}>
                <b>{item.member3}</b>
              </p>
              <p style={{ fontSize: "21px" }}>
                <b>{item.member4}</b>
              </p>
              <p style={{ fontSize: "21px" }}>
                <b>{item.member5}</b>
              </p> */}
            </div>
            {/* <div className="card-image">
              <img src={item.photo} />
            </div> */}
            <div className="card-content">
              <i
                className="material-icons"
                style={{ cursor: "pointer", marginRight: "15px" }}
              >
                favorite_border
              </i>
              {item.likes.includes(state._id) ? (
                <i
                  className="material-icons"
                  onClick={() => unlikePost(item._id)}
                  style={{ cursor: "pointer" }}
                >
                  thumb_down
                </i>
              ) : (
                <i
                  className="material-icons"
                  onClick={() => likePost(item._id)}
                  style={{ cursor: "pointer" }}
                >
                  thumb_up
                </i>
              )}

              <h6>{item.likes.length} Likes</h6>

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
                    {(item.postedBy._id == state._id ||
                      comment.postedBy._id == state._id) && (
                      <i
                        className="material-icons"
                        style={{ float: "right", cursor: "pointer" }}
                        onClick={(e) => deleteComment(item._id, comment._id)}
                      >
                        delete
                      </i>
                    )}
                  </h6>
                );
              })}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  makeComment(e.target[0].value, item._id);
                }}
              >
                <input type="text" placeholder="Add comment here" />
              </form>

              <div style={{ padding: "20px", paddingLeft: "25px",}}>
                    <p style={{ fontSize: "18px" }}>
                      <a
                      href="#/"
                      onClick={() =>
                        downloadFilew(item._id, item.file_path, item.file_mimetype)
                      }
                    >
                     <b>Download File</b>
                    </a></p>
                    </div>
              
              {edit === item._id ?
              <i
              className="material-icons"
              style={{ display: "flex", justifyContent: "flex-end", cursor: "pointer", margin:"10px" }}
              // onChange = {(e) => updatePost(item._id)}
            >
              send
            </i> :
            "" 
              }
              
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
