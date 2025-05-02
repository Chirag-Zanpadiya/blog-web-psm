import { IKContext, IKUpload } from "imagekitio-react";
import React, { useRef } from "react";
import { toast } from "react-toastify";

const authenticator = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/posts/upload-auth`
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    // TODO: response me koi galati aa sakati hia
    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const Upload = ({ children, type, setProgress, setData }) => {
  const ref = useRef(null);

  const onError = (err) => {
    console.log("Write.jsx :: onError :: Of Image upload in Imagekit");
    console.log(err);
    toast.error("Image Upload Failed ❌🖼️");
  };
  const onSuccess = (res) => {
    console.log("Write.jsx :: onSuccess :: Of Image upload in Imagekit");
    console.log(res);
    setData(res);
  };
  const onUploadProgress = (progress) => {
    console.log("Write.jsx :: onSuccess :: Of Image upload in Imagekit");
    console.log(progress);
    // setCover(res);
    setProgress(Math.round((progress.loaded / progress.total) * 100));
  };
  return (
    <IKContext
      publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      authenticator={authenticator}
    >
      {/* ...child components */}
      <IKUpload
        // fileName="test-upload.png"
        useUniqueFileName
        onError={onError}
        onSuccess={onSuccess}
        onUploadProgress={onUploadProgress}
        className="hidden"
        ref={ref}
        accept={`${type}/*`}
      />
      <div className="cursor-pointer" onClick={() => ref.current.click()}>
        {children}
      </div>
    </IKContext>
  );
};

export default Upload;
