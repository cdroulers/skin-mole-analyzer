import { ChangeEvent, FunctionComponent, useState } from "react";
import "./ImageUpload.css";

interface Props {}

const ImageUpload: FunctionComponent<Props> = () => {
  const [src, setSrc] = useState<string>();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e, e.target.files);
    if (e.target && e.target.files && e.target.files.length === 1) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        setSrc(URL.createObjectURL(file));
      }
    }
  };

  return (
    <section className="ImageUpload">
      <div className="ImageUpload-input">
        <label>
          Upload an image of moles.
          <br />
          <input type="file" onChange={onChange} />
        </label>
      </div>
      <div className="ImageUpload-preview">{src && <img alt="preview" src={src} />}</div>
    </section>
  );
};

export default ImageUpload;
