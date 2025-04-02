import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, faceBoxes }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="image-from-url" alt="" src={imageUrl} width="500px" height="auto" />
        {faceBoxes.map((faceBox, index) => (
          <div
            key={index}
            className="bounding-box"
            style={{ top: faceBox.topRow, right: faceBox.rightCol, bottom: faceBox.bottomRow, left: faceBox.leftCol }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default FaceRecognition;
