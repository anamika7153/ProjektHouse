//others profile

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils/constants";

function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const { userId } = useParams();
  const [one, setOne] = useState("1");
  const [two, setTwo] = useState("2");
  const [three, setThree] = useState("3");
  const [four, setFour] = useState("4");
  const [five, setFive] = useState("5");
  const [firstterm, setFirstterm] = useState("first");
  const [secondterm, setSecondterm] = useState("second");
  const [thirdterm, setThirdterm] = useState("third");
  useEffect(() => {
    fetch(`${API_URL}/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUserProfile(result);
        setData(result.posts);
        // console.log("result.posts", result.posts)
      });
  }, []);

  const followUser = () => {
    fetch(`${API_URL}/follow`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setUserProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
        // setFollowed(false);
      });
  };

  const unfollowUser = () => {
    fetch(`${API_URL}/unfollow`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setUserProfile((prevState) => {
          const newFollowers = prevState.user.followers.filter(
            (item) => item != data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollowers,
            },
          };
        });
        // setFollowed(true);
      });
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
      {userProfile ? (
        <div className="container" style={{ maxWidth: "1280px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              margin: "25px 10px",
              borderBottom: "2px solid #909CBE",
            }}
          >
            <div>
              <img
                className="profile-img"
                style={{
                  height: "200px",
                  width: "200px",
                  borderRadius: "50%",
                  marginRight: "2px",
                }}
                src={userProfile.user ? userProfile.user.pic : "loading.."}
              />
            </div>
            <div>
              <h4>{userProfile.user.name}</h4>
              <h5>{userProfile.user.email}</h5>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "95%",
                }}
              >
                <h6>{userProfile.posts.length} Posts</h6>
                <h6>{userProfile.user.followers.length} followers</h6>
                <h6>{userProfile.user.following.length} following</h6>
              </div>
              {userProfile.user.followers.includes(state._id) ? (
                <button
                  style={{
                    width: "120px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                  }}
                  type="submit"
                  className="btn btn-medium waves-effect hoverable"
                  onClick={() => unfollowUser()}
                >
                  UnFollow
                </button>
              ) : (
                <button
                  style={{
                    width: "100px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                  }}
                  type="submit"
                  className="btn btn-medium waves-effect hoverable"
                  onClick={() => followUser()}
                >
                  Follow
                </button>
              )}
            </div>
          </div>
          <div className="home container">
            {data.map((item) => {
              return (
                <div
                  style={{ borderRadius: "12px ", backgroundColor: "#BBC2D7" }}
                  className="card home-card"
                  key={item._id}
                >
                  <h5 style={{ padding: "10px 15px" }}>
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
                        src={userProfile.user.pic}
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
                      <i
                        className="material-icons"
                        style={{ float: "right", cursor: "pointer" }}
                        onClick={(e) => deletePost(item._id)}
                      >
                        delete
                      </i>
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
                      <h6 style={{ fontWeight: "900" }}>
                        <u>Members</u>
                      </h6>
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
                              <td>{item.member3}</td>
                              <td>{item.sec3}</td>
                              <td>{item.mobile3}</td>
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
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: "15px 0",
                      }}
                    >
                      <b>Project Link</b>
                      <a
                        style={{ width: "90%", overflow: "hidden" }}
                        href={item.projectlink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>
                          {item.projectlink ? <>{item.projectlink}</> : <></>}
                        </span>
                      </a>
                    </div>
                    <hr></hr>

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
                                    <>
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
                                    </>
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
                                    <>
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
                                    </>
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
                                    <>
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
                                    </>
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
        </div>
      ) : (
        <h2>Loading....</h2>
      )}
    </>
  );
}

export default UserProfile;
