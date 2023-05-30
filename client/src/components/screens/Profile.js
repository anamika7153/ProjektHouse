import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils/constants";

function Profile() {
  const [data, setData] = useState([]);
  const [image, setImage] = useState("");
  const { state, dispatch } = useContext(UserContext);
  const [one, setOne] = useState("1");
  const [two, setTwo] = useState("2");
  const [three, setThree] = useState("3");
  const [four, setFour] = useState("4");
  const [five, setFive] = useState("5");
  const [firstterm, setFirstterm] = useState("first");
  const [secondterm, setSecondterm] = useState("second");
  const [thirdterm, setThirdterm] = useState("third");
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);

  const showFollowingUsers = () => {
    setShowFollowing(!showFollowing);
    setShowFollowers(false);
  };
  const showFollowersUsers = () => {
    setShowFollowing(false);
    setShowFollowers(!showFollowers);
  };

  useEffect(() => {
    fetch(`${API_URL}/mypost`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.myposts);
      });
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/listFollowers`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setFollowers(result.followers);
      });
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/listFollowing`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setFollowing(result.following);
      });
  }, []);

  useEffect(() => {
    if (image) {
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
          fetch(`${API_URL}/updatepic`, {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, pic: result.pic })
              );
              dispatch({ type: "UPDATE_PIC", payload: result.pic });
            });
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }, [image]);
  const updatePhoto = (file) => {
    setImage(file);
  };
  const makeComment = (text, postId) => {
    fetch(`${API_URL}/comment`, {
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
  const deleteFile = (postId, fileid) => {
    fetch(`${API_URL}/deletefile/${postId}/${fileid}`, {
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
  const deletePost = (postId) => {
    fetch(`${API_URL}/deletepost/${postId}`, {
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
    fetch(`${API_URL}/deletecomment/${postId}/${commentId}`, {
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
    <>
      {state ? (
        <div className="container" style={{ maxWidth: "1280px" }}>
          <div
            style={{
              margin: "25px auto",
              borderBottom: "2px solid #909CBE",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <div className="profile-left">
                <img
                  className="profile-img"
                  style={{
                    height: "200px",
                    width: "200px",
                    borderRadius: "50%",
                  }}
                  src={state ? state.pic : "loading.."}
                />
                <div className="file-field input-field">
                  <div className="btn" style={{ marginBottom: "1rem" }}>
                    <span className="profile-image">Update Image</span>
                    <input
                      type="file"
                      onChange={(e) => updatePhoto(e.target.files[0])}
                    />
                  </div>
                  <div
                    className="file-path-wrapper"
                    style={{ width: "0", overflow: "unset" }}
                  >
                    <input className="file-path validate" type="text" />
                  </div>
                </div>
              </div>
              <div className="profile-right" style={{ paddingLeft: "18px" }}>
                <h4 className="profile-name">{state ? state.name : ""}</h4>
                <h5>{state ? state.email : ""}</h5>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "95%",
                    flexWrap: "wrap",
                  }}
                >
                  <h6>{data.length} Posts</h6>
                  <span
                    className="link-col"
                    style={{
                      paddingRight: "12px",
                      cursor: "pointer",
                      fontWeight: "normal",
                      letterSpacing: "1px",
                    }}
                    onClick={(e) => showFollowersUsers()}
                  >
                    <h6>{state.followers.length} Followers</h6>
                  </span>
                  <span
                    className="link-col"
                    style={{
                      cursor: "pointer",
                      fontWeight: "normal",
                      letterSpacing: "1px",
                    }}
                    onClick={(e) => showFollowingUsers()}
                  >
                    <h6>{state.following.length} Following</h6>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="gallery">
            {data.map((item) => {
              return <img className="item" src={item.photo} key={item._id} />;
            })}
          </div> */}
          <div
            className="home container profile-container"
            style={{
              width: "95%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div className="width-full" style={{ width: "70%" }}>
              {data?.map((item) => {
                return (
                  <div
                    style={{
                      borderRadius: "12px ",
                      backgroundColor: "#BBC2D7",
                    }}
                    className="card home-card"
                    key={item._id}
                  >
                    <h5
                      style={{
                        padding: "18px 15px",
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Link
                        to={
                          item.postedBy._id !== state._id
                            ? `/profile/` + item.postedBy._id
                            : "/profile"
                        }
                        style={{
                          color: "black",
                        }}
                        className="namePost"
                      >
                        <img
                          src={state.pic}
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
                      </Link>{" "}
                      {item.postedBy._id == state._id ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <i
                            className="material-icons"
                            style={{
                              float: "right",
                              cursor: "pointer",
                              marginRight: "10px",
                            }}
                            onClick={(e) => deletePost(item._id)}
                          >
                            delete
                          </i>
                          <div>
                            <Link to={`/editdata/${item._id}`}>
                              <i
                                className="material-icons"
                                style={{
                                  float: "right",
                                  cursor: "pointer",
                                  marginRight: "10px",
                                }}
                              >
                                edit
                              </i>
                            </Link>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </h5>
                    <hr></hr>
                    <div style={{ paddingLeft: "25px" }}>
                      <b>
                        <h6 style={{ fontWeight: "900" }}>{item.title}</h6>
                      </b>
                      <p style={{ fontSize: "18px" }}>{item.description}</p>
                      <b>
                        <h6 style={{ fontWeight: "900" }}>Members</h6>
                      </b>

                      <table>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Sec / Roll No.</th>
                            <th>Mob. No</th>
                          </tr>
                        </thead>

                        {item.members == one ? (
                          <>
                            <tbody>
                              <tr key={item._id}>
                                <td>{item.member1}</td>
                                <td>{item.sec1}</td>
                                <td>{item.mobile1}</td>
                              </tr>
                            </tbody>
                          </>
                        ) : item.members == two ? (
                          <>
                            <tbody>
                              <tr key={item._id}>
                                <td>{item.member1}</td>
                                <td>{item.sec1}</td>
                                <td>{item.mobile1}</td>
                              </tr>
                              <tr key={item._id}>
                                <td>{item.member2}</td>
                                <td>{item.sec2}</td>
                                <td>{item.mobile2}</td>
                              </tr>
                            </tbody>
                          </>
                        ) : item.members == three ? (
                          <>
                            <tbody>
                              <tr key={item._id}>
                                <td>{item.member1}</td>
                                <td>{item.sec1}</td>
                                <td>{item.mobile1}</td>
                              </tr>
                              <tr key={item._id}>
                                <td>{item.member2}</td>
                                <td>{item.sec2}</td>
                                <td>{item.mobile2}</td>
                              </tr>
                              <tr key={item._id}>
                                <td>{item.member3}</td>
                                <td>{item.sec3}</td>
                                <td>{item.mobile3}</td>
                              </tr>
                            </tbody>
                          </>
                        ) : item.members == four ? (
                          <>
                            <tbody>
                              <tr key={item._id}>
                                <td>{item.member1}</td>
                                <td>{item.sec1}</td>
                                <td>{item.mobile1}</td>
                              </tr>
                              <tr key={item._id}>
                                <td>{item.member2}</td>
                                <td>{item.sec2}</td>
                                <td>{item.mobile2}</td>
                              </tr>
                              <tr key={item._id}>
                                <td>{item.member2}</td>
                                <td>{item.sec2}</td>
                                <td>{item.mobile2}</td>
                              </tr>
                              <tr key={item._id}>
                                <td>{item.member4}</td>
                                <td>{item.sec4}</td>
                                <td>{item.mobile4}</td>
                              </tr>
                            </tbody>
                          </>
                        ) : item.members == five ? (
                          <>
                            <tbody>
                              <tr key={item._id}>
                                <td>{item.member1}</td>
                                <td>{item.sec1}</td>
                                <td>{item.mobile1}</td>
                              </tr>
                              <tr key={item._id}>
                                <td>{item.member2}</td>
                                <td>{item.sec2}</td>
                                <td>{item.mobile2}</td>
                              </tr>
                              <tr key={item._id}>
                                <td>{item.member3}</td>
                                <td>{item.sec3}</td>
                                <td>{item.mobile3}</td>
                              </tr>
                              <tr key={item._id}>
                                <td>{item.member4}</td>
                                <td>{item.sec4}</td>
                                <td>{item.mobile4}</td>
                              </tr>
                              <tr key={item._id}>
                                <td>{item.member5}</td>
                                <td>{item.sec5}</td>
                                <td>{item.mobile5}</td>
                              </tr>
                            </tbody>
                          </>
                        ) : (
                          <></>
                        )}
                      </table>
                    </div>
                    <div className="card-content">
                      {item.projectlink ? (
                        <>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                              padding: "15px 0",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                paddingBottom: "10px",
                              }}
                            >
                              <b>Project Link</b>
                              <a
                                style={{ width: "70%", overflow: "hidden" }}
                                href={item.projectlink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <span>{item.projectlink}</span>
                              </a>
                            </div>
                          </div>
                          <hr />
                        </>
                      ) : (
                        <></>
                      )}
                      <b>
                        <h6 style={{ fontWeight: "900" }}>Comments</h6>
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
                                onClick={(e) =>
                                  deleteComment(item._id, comment._id)
                                }
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
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "15px 0",
                        }}
                      >
                        <b>
                          <h6
                            style={{
                              fontWeight: "900",
                              margin: "0",
                              paddingRight: "10px",
                            }}
                          >
                            Upload Files
                          </h6>
                        </b>
                        {item.postedBy._id == state._id ? (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginRight: "30px",
                            }}
                            className="upload-files"
                          >
                            <Link
                              className="direction-column"
                              to={`/firstterm/${item._id}`}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                paddingRight: "22px",
                              }}
                            >
                              <i
                                className="material-icons"
                                style={{
                                  float: "right",
                                  cursor: "pointer",
                                  marginRight: "10px",
                                }}
                              >
                                upload_file
                              </i>
                              <span>First Term</span>
                            </Link>
                            <Link
                              className="direction-column"
                              to={`/secondterm/${item._id}`}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                paddingRight: "22px",
                              }}
                            >
                              <i
                                className="material-icons"
                                style={{
                                  float: "right",
                                  cursor: "pointer",
                                  marginRight: "10px",
                                }}
                              >
                                upload_file
                              </i>
                              <span>Second Term</span>
                            </Link>
                            <Link
                              className="direction-column"
                              to={`/thirdterm/${item._id}`}
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <i
                                className="material-icons"
                                style={{
                                  float: "right",
                                  cursor: "pointer",
                                  marginRight: "10px",
                                }}
                              >
                                upload_file
                              </i>
                              <span>Third Term</span>
                            </Link>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <hr></hr>
                      <h6>
                        <span>First Term Files</span>
                      </h6>
                      {item.filee.map((f) => {
                        return (
                          <h6 key={f._id} style={{ width: "95%" }}>
                            {f.term == firstterm ? (
                              <div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexWrap: "wrap",
                                  }}
                                >
                                  <a
                                    href={f.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                  >
                                    <div style={{ display: "flex" }}>
                                      <span>{f.filenamee}</span>
                                      <i
                                        className="material-icons"
                                        style={{
                                          cursor: "pointer",
                                          paddingLeft: "10px",
                                        }}
                                      >
                                        file_download
                                      </i>
                                    </div>
                                  </a>
                                  <div>
                                    {item.postedBy._id == state._id ? (
                                      <div className="profile-files">
                                        <Link
                                          to={`/editfiles/${item._id}/${f._id}`}
                                        >
                                          <i
                                            className="material-icons"
                                            style={{
                                              float: "right",
                                              cursor: "pointer",
                                              marginRight: "10px",
                                              paddingLeft: "20px",
                                            }}
                                          >
                                            edit
                                          </i>
                                        </Link>
                                        <i
                                          className="material-icons"
                                          style={{
                                            float: "right",
                                            cursor: "pointer",
                                          }}
                                          onClick={(e) =>
                                            deleteFile(item._id, f._id)
                                          }
                                        >
                                          delete
                                        </i>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <></>
                            )}
                          </h6>
                        );
                      })}

                      <h6>
                        <span>Second Term Files</span>
                      </h6>
                      {item.filee.map((f) => {
                        return (
                          <h6 key={f._id} style={{ width: "95%" }}>
                            {f.term == secondterm ? (
                              <div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexWrap: "wrap",
                                  }}
                                >
                                  <a
                                    href={f.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                  >
                                    <div style={{ display: "flex" }}>
                                      <span>{f.filenamee}</span>
                                      <i
                                        className="material-icons"
                                        style={{
                                          cursor: "pointer",
                                          paddingLeft: "10px",
                                        }}
                                      >
                                        file_download
                                      </i>
                                    </div>
                                  </a>
                                  <div>
                                    {item.postedBy._id == state._id ? (
                                      <div className="profile-files">
                                        <Link
                                          to={`/editfiles/${item._id}/${f._id}`}
                                        >
                                          <i
                                            className="material-icons"
                                            style={{
                                              float: "right",
                                              cursor: "pointer",
                                              marginRight: "10px",
                                              paddingLeft: "20px",
                                            }}
                                          >
                                            edit
                                          </i>
                                        </Link>
                                        <i
                                          className="material-icons"
                                          style={{
                                            float: "right",
                                            cursor: "pointer",
                                          }}
                                          onClick={(e) =>
                                            deleteFile(item._id, f._id)
                                          }
                                        >
                                          delete
                                        </i>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <></>
                            )}
                          </h6>
                        );
                      })}

                      <h6>
                        <span>Third Term Files</span>
                      </h6>
                      {item.filee.map((f) => {
                        return (
                          <h6 key={f._id} style={{ width: "95%" }}>
                            {f.term == thirdterm ? (
                              <div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexWrap: "wrap",
                                  }}
                                >
                                  <a
                                    href={f.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                  >
                                    <div style={{ display: "flex" }}>
                                      <span>{f.filenamee}</span>
                                      <i
                                        className="material-icons"
                                        style={{
                                          cursor: "pointer",
                                          paddingLeft: "10px",
                                        }}
                                      >
                                        file_download
                                      </i>
                                    </div>
                                  </a>
                                  <div>
                                    {item.postedBy._id == state._id ? (
                                      <div className="profile-files">
                                        <Link
                                          to={`/editfiles/${item._id}/${f._id}`}
                                        >
                                          <i
                                            className="material-icons"
                                            style={{
                                              float: "right",
                                              cursor: "pointer",
                                              marginRight: "10px",
                                              paddingLeft: "20px",
                                            }}
                                          >
                                            edit
                                          </i>
                                        </Link>
                                        <i
                                          className="material-icons"
                                          style={{
                                            float: "right",
                                            cursor: "pointer",
                                          }}
                                          onClick={(e) =>
                                            deleteFile(item._id, f._id)
                                          }
                                        >
                                          delete
                                        </i>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <></>
                            )}
                          </h6>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ width: "30%" }}>
              <div>
                {following && showFollowing ? (
                  <>
                    <h5 style={{ textAlign: "center", marginBottom: "16px" }}>
                      My Following
                    </h5>
                    {following.map((followed) => {
                      return (
                        <div
                          className="creator-pic profile-creator-pic"
                          style={{
                            margin: "auto",
                            height: "150px",
                            width: "100px",
                            paddingRight: "12px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              backgroundSize: "contain",
                              height: "100%",
                            }}
                          >
                            <Link
                              to={
                                followed._id !== state._id
                                  ? `/profile/` + followed._id
                                  : "/profile"
                              }
                            >
                              <img
                                style={{
                                  width: "100%",
                                  height: "60%",
                                  borderRadius: "50%",
                                  backgroundSize: "contain",
                                  border: "1px solid #8a7c81",
                                }}
                                src={followed.pic}
                              />
                              <span
                                className="card-title"
                                style={{
                                  textAlign: "center",
                                  display: "flex",
                                  justifyContent: "center",
                                  paddingTop: "10px",
                                  color: "black",
                                  fontSize: "14px",
                                }}
                              >
                                {followed.name}
                              </span>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
                {followers && showFollowers ? (
                  <>
                    <h5 style={{ textAlign: "center", marginBottom: "16px" }}>
                      My Followers
                    </h5>
                    {followers.map((follower) => {
                      return (
                        <div
                          className="creator-pic profile-creator-pic"
                          style={{
                            margin: "auto",
                            height: "150px",
                            width: "100px",
                            paddingRight: "12px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              backgroundSize: "contain",
                              height: "100%",
                            }}
                          >
                            <Link
                              to={
                                follower._id !== state._id
                                  ? `/profile/` + follower._id
                                  : "/profile"
                              }
                            >
                              <img
                                style={{
                                  width: "100%",
                                  height: "60%",
                                  borderRadius: "50%",
                                  backgroundSize: "contain",
                                  border: "1px solid #8a7c81",
                                }}
                                src={follower.pic}
                              />
                              <span
                                className="card-title"
                                style={{
                                  textAlign: "center",
                                  display: "flex",
                                  justifyContent: "center",
                                  paddingTop: "10px",
                                  color: "black",
                                  fontSize: "14px",
                                }}
                              >
                                {follower.name}
                              </span>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2>Loading....</h2>
      )}
    </>
  );
}

export default Profile;
