import React, { useContext, useEffect, useState } from "react";
import { API_URL } from "../../utils/constants";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const [data, setData] = useState([]);
  const [creators, setCreators] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [errorMsg, setErrorMsg] = useState("");
  const [firstterm, setFirstterm] = useState("first");
  const [secondterm, setSecondterm] = useState("second");
  const [thirdterm, setThirdterm] = useState("third");
  const [one, setOne] = useState("1");
  const [two, setTwo] = useState("2");
  const [three, setThree] = useState("3");
  const [four, setFour] = useState("4");
  const [five, setFive] = useState("5");
  const [showfirst, setShowfirst] = useState(false);
  const [showsecond, setShowsecond] = useState(false);
  const [showthird, setShowthird] = useState(false);
  const [card, setCard] = useState("");

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5, // Number of users to display at a time
    slidesToScroll: 1,
    autoplay: false,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 999,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  useEffect(() => {
    fetch(`${API_URL}/allpost`, {
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
    fetch(`${API_URL}/top-creators`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setCreators(result.users);
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
    <div className="home container">
      {/* <h4>Top Creators</h4> */}
      <div style={{ minHeight: "170px", marginTop: "1.52rem"}}>
        <Slider {...settings}>
          {creators.map((creator) => (
            <div key={creator.id}>
              <div
                className="creator-pic"
                style={{
                  margin: "auto",
                  height: "100px",
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
                      creator._id !== state._id
                        ? `/profile/` + creator._id
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
                      src={creator.pic}
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
                      {creator.name}
                    </span>
                  </Link>
                </div>
              </div>
              {/* <span style={{fontSize: "14px"}}>{creator.name}</span> */}
              {/* <p>Followers: {creator.followers}</p> */}
            </div>
          ))}
        </Slider>
      </div>
      {/* <div
        style={{
          display: "flex",
          minHeight: "150px",
          flexDirection: "row",
          marginBottom: "3.52rem",
        }}
      >
        {creators.slice(0, 4).map((creator) => {
          return (
            <div
              className="creator-pic"
              style={{
                margin: "auto",
                height: "100px",
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
                    creator._id !== state._id
                      ? `/profile/` + creator._id
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
                    src={creator.pic}
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
                    {creator.name}
                  </span>
                </Link>
              </div>
            </div>
          );
        })}
      </div> */}

      <h4 style={{ marginBottom: "1.52rem" }}>Feed</h4>
      {data?.map((item) => {
        return (
          <div
            className="card home-card"
            key={item._id}
            style={{ borderRadius: "12px ", backgroundColor: "#BBC2D7" }}
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
              >
                <div style={{ display: "flex" }}>
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
                      border: "1px solid #8a7c81",
                    }}
                  />
                  <div>{item.postedBy.name}</div>
                </div>
              </Link>{" "}
              {item.postedBy._id == state._id ? (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
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

            <div style={{ padding: "25px 25px 0 25px" }}>
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
              {/* <b>
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
                <input
                  type="text"
                  style={{ color: "rgba(0,0,0,0.87)" }}
                  placeholder="Add comment here"
                />
              </form> */}
              {item.postedBy._id == state._id ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "15px 0",
                    }}
                  >
                    <h6
                      style={{
                        fontWeight: "900",
                        margin: "0",
                        paddingRight: "10px",
                      }}
                    >
                      Upload Files
                    </h6>
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
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
