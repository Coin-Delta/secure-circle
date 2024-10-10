import { useState } from "react";
import propType from "prop-types";

const ImageUploader = ({ field }) => {
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files[0];

    if (newImages.length > 4) {
      alert("You can upload up to 4 images.");
    } else {
      field.onChange(newImages);
      setPreviewImage(newImages);
    }
    e.target.value = "";
  };

  const handleRemoveImage = () => {
    field.onChange("");
    setPreviewImage(null);
  };

  const getImageSrc = (image) => {
    if (typeof image === "string") {
      return image;
    }
    return URL?.createObjectURL(image);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full ">
      <div className=" relative w-full h-48 border border-border  rounded-3xl flex items-center justify-center p-1">
        {previewImage || field?.value ? (
          <>
            <div className="relative">
              <img
                src={
                  previewImage
                    ? getImageSrc(previewImage)
                    : getImageSrc(field?.value)
                }
                alt="Preview"
                className="w-full h-48 object-contain"
              />
            </div>
            <button
              className="absolute top-3 right-3 bg-red-500 text-white rounded-full text-xs px-2 p-1"
              type="button"
              onClick={() => handleRemoveImage()}
            >
              X
            </button>
          </>
        ) : (
          <div className=" w-full h-full flex justify-center items-center rounded-lg">
            <label
              htmlFor="image-upload"
              className=" flex justify-center my-3 cursor-pointer py-3 px-6 border-primary border text-primary rounded-lg hover:bg-primary hover:text-primary-foreground"
            >
              Upload
            </label>
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        multiple={false}
        onChange={handleImageUpload}
        className="hidden"
        id="image-upload"
      />
    </div>
  );
};

export default ImageUploader;

ImageUploader.propTypes = {
  field: propType.object,
};
