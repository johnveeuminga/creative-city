import React, { Fragment, useEffect, useRef, useState } from "react";

let useClickOutside = (handler: any) => {
  const domNode = useRef(null);

  useEffect(() => {
    let maybeHandler = (event: any) => {
      const node = domNode.current as any;
      if (! node.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};

const ImgViews = ({ close, src }: {
  close: any,
  src: any,
}) => {
  let domNode = useClickOutside(() => {
    close(false);
  });
  return (
    <Fragment>
      <div className="mfp-bg mfp-ready" onClick={() => close(false)}></div>
      <div
        className="mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-ready"
        tabIndex={-1}
        style={{ overflow: "hidden auto" }}
      >
        <div
          className={`mfp-container mfp-s-ready mfp-iframe-holder mfp-img-container`}
        >
          <div className="mfp-content" ref={domNode}>
            <div className="mfp-iframe-scaler">
              <button
                title="Close (Esc)"
                type="button"
                className="mfp-close"
                onClick={() => close()}
              >
                ×
              </button>
              <img className="mfp-img" src={src} />
            </div>
          </div>
          <div className="mfp-preloader">Loading...</div>
        </div>
      </div>
    </Fragment>
  );
};

const ImageView = () => {
  const [img, setImg] = useState(false);
  const [imgValue, setImgValue] = useState(null);

  useEffect(() => {
    const a = document.querySelectorAll("a");
    a.forEach((a: any) => {
      if (a.href.includes("assets/")) {
        a.addEventListener("click", (e: any) => {
          e.preventDefault();
          setImgValue(a.href);
          setImg(true);
        });
      }
    });
  }, []);
  return (
    <Fragment>
      {img && <ImgViews close={() => setImg(false)} src={imgValue} />}
    </Fragment>
  );
};
export default ImageView;
