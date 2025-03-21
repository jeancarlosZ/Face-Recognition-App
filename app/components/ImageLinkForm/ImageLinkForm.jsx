import "./ImageLinkForm.css";

const ImageLinkForm = ({ imageUrlEntry, onImageUrlEntryChange, onButtonSubmit }) => {
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
						onClick={onButtonSubmit}
					>Detect</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;