import React, { useEffect } from "react";
import ReactDOM from "react-dom";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

const Modal = ({ children, onClose }: Props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-9999 grid  h-screen w-screen items-center justify-center overflow-hidden"
      style={{
        zIndex: 9999,
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(50px)",
      }}
    >
      <div className="relative z-20">{children}</div>
      <div
        className="absolute inset-0 z-10 bg-black opacity-60"
        onClick={onClose}
      ></div>
      <button
        onClick={onClose}
        className="fixed left-1/2 top-16 z-20 flex h-12 w-12 -translate-x-1/2 transform cursor-pointer items-center justify-center rounded-full opacity-60 hover:opacity-100"
        style={{
          background: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(10px)",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id=" Outline / close">
            <path
              id="Verctor"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.4141 12L17.7071 7.70701C18.0981 7.31601 18.0981 6.68401 17.7071 6.29301C17.3161 5.90201 16.6841 5.90201 16.2931 6.29301L12.0001 10.586L7.7071 6.29301C7.3161 5.90201 6.6841 5.90201 6.2931 6.29301C5.9021 6.68401 5.9021 7.31601 6.2931 7.70701L10.5861 12L6.2931 16.293C5.9021 16.684 5.9021 17.316 6.2931 17.707C6.4881 17.902 6.7441 18 7.0001 18C7.2561 18 7.5121 17.902 7.7071 17.707L12.0001 13.414L16.2931 17.707C16.4881 17.902 16.7441 18 17.0001 18C17.2561 18 17.5121 17.902 17.7071 17.707C18.0981 17.316 18.0981 16.684 17.7071 16.293L13.4141 12Z"
              fill="#FFFFFF"
            />
          </g>
        </svg>
      </button>
    </div>,
    document.getElementById("modal") as Element,
  );
};

export default Modal;
