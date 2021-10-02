import { ChangeEvent, FunctionComponent, SyntheticEvent, useRef, useState } from "react";
import cv from "@techstark/opencv-js";
import "./ImageUpload.css";

//declare var cv: any;

interface Props {}

const ImageUpload: FunctionComponent<Props> = () => {
  const [src, setSrc] = useState<string>();
  const imageRef = useRef(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files.length === 1) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        setSrc(URL.createObjectURL(file));
      }
    }
  };

  const onLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    let mat = cv.imread(e.target as any as HTMLImageElement);
    let src_gray = new cv.Mat();
    let dst = cv.Mat.zeros(mat.cols, mat.rows, cv.CV_8UC3);
    cv.cvtColor(mat, src_gray, cv.COLOR_RGBA2GRAY, 0);
    cv.threshold(src_gray, src_gray, 120, 200, cv.THRESH_BINARY);
    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();
    // You can try more different parameters
    cv.findContours(src_gray, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
    // draw contours with random Scalar
    for (let i = 0; i < contours.rows; ++i) {
      let color = new cv.Scalar(
        Math.round(Math.random() * 255),
        Math.round(Math.random() * 255),
        Math.round(Math.random() * 255),
      );
      cv.drawContours(dst, contours, i, color, 1, cv.LINE_8, hierarchy, 100);
    }
    cv.imshow("outputsCanvas", src_gray);

    mat.delete();
    src_gray.delete();
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
      <div className="ImageUpload-preview">
        <div>
          <img src={src} onLoad={onLoad} alt="preview" ref={imageRef} />
        </div>
        <div>
          <canvas id="outputsCanvas"></canvas>
        </div>
      </div>
    </section>
  );
};

export default ImageUpload;
