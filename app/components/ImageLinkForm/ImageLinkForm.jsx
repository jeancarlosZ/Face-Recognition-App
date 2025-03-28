import { useState } from "react";
import "./ImageLinkForm.css";
import { imageUrlSubmit, imageSubmitCount, checkUrlIfImage } from "../../api/image";

const ImageLinkForm = ({ setImageUrl, setFaceBoxes, onRouteChange, user, setUser, token }) => {
	const [imageUrlEntry, setImageUrlEntry] = useState("");

	const calculateFaceLocations = (faceBoxes) => {
		const image = document.getElementById("image-from-url");
		const width = Number(image.width);
		const height = Number(image.height);

		faceBoxes.map((faceBox) => {
			faceBox.topRow = faceBox.topRow * height;
			faceBox.rightCol = width - (faceBox.rightCol * width);
			faceBox.bottomRow = height - (faceBox.bottomRow * height);
			faceBox.leftCol = faceBox.leftCol * width;
		})

		return faceBoxes;
	}

	const displayFaceBoxes = (faceBoxes) => {
		setFaceBoxes(faceBoxes);
	}

	const onImageUrlEntryChange = (event) => {
		setImageUrlEntry(event.target.value);
	}

	const onDetectSubmit = async () => {
		try {
			const isImage = await checkUrlIfImage(token, imageUrlEntry);

			if (isImage === "Unauthorized: Token expired") {
				alert("Session expired. Logging out...");
				onRouteChange("signout");
			} else if (isImage) {
				setImageUrl(imageUrlEntry);
				const response = await imageUrlSubmit(token, imageUrlEntry);

				if (Array.isArray(response)) {
					const entries = await imageSubmitCount(token, user);

					setUser(prevUser => ({ ...prevUser, entries: entries }));
					displayFaceBoxes(calculateFaceLocations(response));
				}
			} else {
				alert("Invalid image URL");
				setImageUrl("");
			}
		} catch (err) {
			console.log(err);
		}

		setImageUrlEntry("");
	}

	return (
		<div>
			<strong className="f3">
				{"This website will detect faces in your pictures. Give it a try."}
			</strong>
			<div className="center pa3">
				<div className="form center pa4 br3 shadow-5">
					<input
						className="f4 pa2 w-70 center bg-white"
						type="text"
						id="image-url-entry"
						value={imageUrlEntry}
						placeholder="Please enter image URL"
						autoComplete="url"
						onChange={onImageUrlEntryChange}
					/>
					<button
						className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
						onClick={onDetectSubmit}
					>Detect</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;