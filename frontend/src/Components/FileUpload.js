import React, { useState } from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const FileUpload = ({ values, setValues }) => {
  const [uploading, setUploading] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const config = {
    headers: {
      Authorization: userInfo.token,
    },
  };

  const handleImageRemove = (public_id) => {
    setUploading(true);
    axios
      .post("/api/images/remove", { public_id }, config)
      .then((res) => {
        setUploading(false);
        const { images } = values;
        const filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        setUploading(false);
        console.log(err);
        toast.error("Cannot be deleted");
      });
  };
  const uploadFileAndResize = (e) => {
    // e.target.files
    // resize the file
    const files = e.target.files;
    const imagesUploaded = values.images;
    if (files) {
      setUploading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            // send back to server upload to cloudinary
            axios
              .post("/api/images/upload", { image: uri }, config)
              .then((response) => {
                setUploading(false);

                // set url to images[] of values in CreateProduct
                imagesUploaded.push(response.data);

                setValues({ ...values, images: imagesUploaded });
              })
              .catch((err) => {
                setUploading(false);
                console.log(err);
                toast.error("Uploading fail");
              });
          },
          "base64"
        );
      }
    }
  };
  return (
    <>
      <div className="row">
        {values.images &&
          values.images.map((image) => {
            return (
              <Badge
                key={image.public_id}
                count="X"
                style={{ cursor: "pointer" }}
                onClick={() => handleImageRemove(image.public_id)}
              >
                <Avatar
                  src={image.url}
                  size={100}
                  shape="square"
                  className="ml-3 mb-3"
                />
              </Badge>
            );
          })}
      </div>
      <div className="row">
        {uploading ? (
          <LoadingOutlined className="text-info h1" />
        ) : (
          <label className="btn btn-outline-info">
            <input
              type="file"
              multiple
              accept="images/*"
              hidden
              onChange={uploadFileAndResize}
            />
            Choose files
          </label>
        )}
      </div>
    </>
  );
};

export default FileUpload;
