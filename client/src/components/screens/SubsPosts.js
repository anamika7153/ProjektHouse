import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { API_URL } from "../../utils/constants";

function SubsPosts() {
  const [data, setData] = useState([]);
  const [isempty, setIsempty] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [one, setOne] = useState("1");
  const [two, setTwo] = useState("2");
  const [three, setThree] = useState("3");
  const [four, setFour] = useState("4");
  const [five, setFive] = useState("5");
  const [firstterm, setFirstterm] = useState("first");
  const [secondterm, setSecondterm] = useState("second");
  const [thirdterm, setThirdterm] = useState("third");
  useEffect(() => {
    fetch(`${API_URL}/getSubPost`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setIsempty(result.posts);
        setData(result.posts);
        setOne("1");
        setTwo("2");
        setThree("3");
        setFour("4");
        setFive("5");
        setFirstterm("first");
        setSecondterm("second");
        setThirdterm("third");
      });
  }, []);

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
    <div className="home container">
      <div style={{ marginTop: "4rem" }} className="row">
        <div className="col s10 " style={{ paddingLeft: "0" }}>
          <Link
            to="/"
            className="btn-flat waves-effect"
            style={{ paddingLeft: "0" }}
          >
            <i className="material-icons left">keyboard_backspace</i>
            Back to home
          </Link>
          <div className="col s12" style={{ paddingLeft: "0" }}>
            <h4>
              <b>My Teams</b>
            </h4>
          </div>
        </div>
      </div>
      {/* <h4>Feed</h4> */}

      {data.length ? (
        <>
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
                    style={{ color: "black" }}
                  >
                    <img
                      src={item.postedBy.pic}
                      alt="profile pic"
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
                </h5>
                <hr></hr>
                <div className="card-content">
                  <b>
                    <h6 style={{ fontWeight: "900" }}>{item.title}</h6>
                  </b>
                  <p>{item.description}</p>
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
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: "20px 0",
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
                  <hr />
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
                      <h6 key={f._id}>
                        {f.term == firstterm ? (
                          <div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
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
                                      // onClick={(e) => deleteFile(item._id, f._id)}
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
                      <h6 key={f._id}>
                        {f.term == secondterm ? (
                          <div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
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
                      <h6 key={f._id}>
                        {f.term == thirdterm ? (
                          <div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
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
                                      // onClick={(e) => deleteFile(item._id, f._id)}
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
        </>
      ) : (
        <>
          {/* <h1>No teams' data? Follow a team to display data.</h1> */}
        </>
      )}
    </div>
  );
}

export default SubsPosts;
