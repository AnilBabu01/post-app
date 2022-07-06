import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import "./Formcontrol.css";
const Formcontrol = () => {
  const [post, setpost] = useState({
    title: "",
    body: "",
  });
  const [formerror, setFormerror] = useState({});
  const [issubmit, setIssubmit] = useState(false);
  const [userid, setuserid] = useState("");
  const [successful, setsuccessful] = useState(false);
  const [users, setusers] = useState([]);
  const success = "success";
  const onChange = (e) => {
    const { title, body } = e.target;

    console.log(title, body);

    setpost({ ...post, [e.target.name]: e.target.value });
  };
  const handleuserid = (e) => {
    setuserid(e.target.value);

    console.log(e.target.value);
  };
  const getuser = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    console.log("users", response.data);
    setusers(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormerror(validate(post));
    setIssubmit(true);

    const { title, body } = post;
    console.log("post data is ", title, body,userid);
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title: title,
          body: body,
          userId: userid,
        }
      );

      if (title && body && response) {
        setsuccessful(true);
        setTimeout(() => {
          setsuccessful(false);
        }, 1500);
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    if (Object.keys(formerror) && issubmit) {
    }
  }, [formerror]);
  useEffect(() => {
    getuser();
  }, []);

  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = "Title is required";
    }
    if (!values.body) {
      errors.body = "body is required";
    }

    return errors;
  };
  return (
    <>
      <div className="main mobileview">
        <div className="mainfirst mobileviewmainfirst">
          <div className="leftpart mobileviewrleftpart ">
            <div style={{ width: "400px" }}>
              <label for="user">Choose a user </label>

              <select
                value={userid}
                onChange={handleuserid}
                id="user"
                style={{ width: "400px", height: "45px" }}
              >
                {users.map((item) => {
                  return (
                    <>
                      <option value={item.id}>{item.name}</option>
                    </>
                  );
                })}
              </select>
              <p style={{color:"black"}}>selected user is</p>
              <p style={{color:"black"}}>{userid}</p>
            </div>
          </div>
          <div className="rightpart">
            <div className="imgcontent">
              <div>
                <h2>Create a post</h2>
              </div>
            </div>
            <div className="formcontainer">
              <div className="mobileform lapform">
                <form onSubmit={handleSubmit}>
                  <div className="inputdiv">
                    {successful && (
                      <Alert variant="filled" severity={success}>
                        post successfully
                      </Alert>
                    )}
                  </div>

                  <div className="inputdiv" Htmlfor="title">
                    <label>Title</label>
                    <input
                      className={
                        formerror.title && issubmit ? "input3" : "input"
                      }
                      type="text"
                      name="title"
                      value={post.title}
                      onChange={onChange}
                      id="title"
                    />
                  </div>

                  <p className="errorcolor">
                    {issubmit ? formerror.title : ""}
                  </p>

                  <div className="inputdiv">
                    <label Htmlfor="body">body</label>
                    <input
                      className={
                        formerror.body && issubmit ? "input3" : "input"
                      }
                      type="body"
                      name="body"
                      value={post.body}
                      onChange={onChange}
                      id="body"
                    ></input>
                  </div>
                  <p className="errorcolor">{issubmit ? formerror.body : ""}</p>
                  <div className="inputdiv">
                    <button className="postbtn">Post</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Formcontrol;
