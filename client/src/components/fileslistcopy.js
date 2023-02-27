import React, { useContext,useState, useEffect } from "react";
import download from "downloadjs";
import axios from "axios";
// import UserContext from '../App'
import { API_URL } from "../utils/constants";

const FilesList = () => {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/getAllFiles`);
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
      const result = await axios.get(`${API_URL}/download/${id}`, {
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

  // const [edit, setEdit] = useState(false)

  return (
    <div className="files-container">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}

      <table className="files-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Download File</th>
          </tr>
        </thead>
        <tbody>
          {filesList.length > 0 ? (
            filesList.map(
              // ({ _id, title, description,member1,sec1, member2, sec2, file_path, file_mimetype }) => (
                ({ _id, title, description, file_path, file_mimetype }) => (
                <tr key={_id}>
                  {/* <td className="file-title"> {
                      edit  ? <input type="text" defaultValue={title} />:<span>{title}</span> 
                    }</td> */}
                    <td className="file-title"> {title}</td>
                  <td className="file-description">{description}</td>
                  <td>
                   
                    <a
                      href="#/"
                      onClick={() =>
                        downloadFile(_id, file_path, file_mimetype)
                      }
                    >
                      Download
                    </a>
                    {/* <button onClick={() => setEdit(true)}>edit</button> */}
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan={3} style={{ fontWeight: "300" }}>
                No files found. Please add some.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FilesList;

