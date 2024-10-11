import { useState } from 'react';
import PropTypes from 'prop-types';

const VideoUploader = ({ field }) => {
  const [previewMedia, setPreviewMedia] = useState(null);

  const handleMediaUpload = e => {
    const files = Array.from(e.target.files);
    const newMedia = [...(field.value || []), ...files]; // Ensure field.value is defined

    if (newMedia.length > 4) {
      alert('You can upload up to 4 media files.');
    } else {
      field.onChange(newMedia);
      setPreviewMedia(files[0]); // Set the preview to the newly uploaded file
    }
  };

  const handleRemoveMedia = index => {
    const newMedia = (field?.value || []).filter((_, i) => i !== index);
    field.onChange(newMedia);
    if (index === 0) setPreviewMedia(null); // Clear the preview if the first item is removed
  };

  const getMediaSrc = media => {
    if (typeof media === 'string') {
      return media;
    }
    return URL?.createObjectURL(media);
  };

  const hasMedia = previewMedia || (field?.value && field.value.length > 0);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="relative w-full h-48 border border-border rounded-3xl flex items-center justify-center p-1">
        {hasMedia ? (
          <>
            <div className="relative">
              {previewMedia?.type?.startsWith('video') ||
              (field?.value[0]?.type?.startsWith('video') ?? false) ? (
                <video
                  src={
                    previewMedia
                      ? getMediaSrc(previewMedia)
                      : getMediaSrc(field?.value[0])
                  }
                  controls
                  className="w-full h-48 object-contain"
                />
              ) : (
                <img
                  src={
                    previewMedia
                      ? getMediaSrc(previewMedia)
                      : getMediaSrc(field?.value[0])
                  }
                  alt="Preview"
                  className="w-full h-48 object-contain"
                />
              )}
            </div>
            <button
              className="absolute top-3 right-3 bg-red-500 text-white rounded-full text-xs px-2 p-1"
              type="button"
              onClick={() => handleRemoveMedia(0)}
            >
              X
            </button>
          </>
        ) : (
          <div className="w-full h-full flex justify-center items-center rounded-lg">
            <label
              htmlFor="media-upload"
              className="flex justify-center my-3 cursor-pointer py-3 px-6 border-primary border text-primary rounded-lg hover:bg-primary hover:text-primary-foreground"
            >
              Upload
            </label>
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/*, video/*"
        multiple={false}
        onChange={handleMediaUpload}
        className="hidden"
        id="media-upload"
      />
    </div>
  );
};

export default VideoUploader;

VideoUploader.propTypes = {
  field: PropTypes.object.isRequired,
};
