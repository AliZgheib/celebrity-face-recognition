import React from "react";
import "./App.css";

const convertFileToBase64 = async (file: any): Promise<any> => {
  return new Promise((res, rej) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      res(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
      rej(error);
    };
  });
};

interface CelebtritiesData {
  celebrityFaces: any[];
  unrecognizedFaces: any[];
}
function App() {
  const [file, setFile] = React.useState<File | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [showModal, setShowModal] = React.useState(false);
  const [celebritiesData, setCelebtritiesData] =
    React.useState<CelebtritiesData | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (!file) {
        return setError("Image not found.");
      }
      setIsLoading(true);
      const fileBase64 = await convertFileToBase64(file);

      const fileNameClean = fileBase64.split("base64,")[1];

      const rawResponse = await fetch(
        "http://API_URL/dev/rekognition",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageBase64: fileNameClean }),
        }
      );
      const content = await rawResponse.json();

      setCelebtritiesData(content);
      setShowModal(true);
    } catch (error) {
      setError("Image is invalid or too large.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return setFile(null);
    }

    setFile(e.target.files[0]);
    setError(null);
  };
  return (
    <div className="container">
      <div className="card">
        <h3>Detect celebrities through pictures</h3>
        <div className="drop_box">
          <h4>Upload File here</h4>
          <p>Files Supported: PNG & JPG</p>

          <form onSubmit={handleSubmit}>
            <div className="form">
              <input
                type="file"
                accept=".png,.jpg"
                id="fileID"
                disabled={isLoading}
                onChange={handleFileChange}
              />
              <h6 id="file-name"></h6>

              <p id="error">{error}</p>
              <button
                type="submit"
                className="btn"
                id="submit-btn"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {showModal && (
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>
              &times;
            </span>

            <div className="modal-actual-content">
              <h3>
                {`Number of recognized celebrities: ${celebritiesData?.celebrityFaces.length}`}
              </h3>
              <ul>
                {celebritiesData?.celebrityFaces.map((celebrityFace) => {
                  return <li>{celebrityFace.Name}</li>;
                })}
              </ul>

              {celebritiesData &&
                celebritiesData?.unrecognizedFaces.length > 0 && (
                  <h5>
                    {`we weren't able to recognize ${celebritiesData?.unrecognizedFaces.length} celebrities: `}
                  </h5>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
