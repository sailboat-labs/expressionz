import React from "react";
import Modal from "./Modal";
import { isMobile } from "react-device-detect";

interface VideoProps {
  show: boolean;
  src: string;
  onClose: () => void;
}

const Video = ({ onClose, src, show = false }: VideoProps) => {
  if (!show) return null;

  return (
    <Modal onClose={onClose}>
      <iframe
        style={{
          width: isMobile ? "90vw" : "80vw",
          height: isMobile ? "36vh" : "62vh",
          margin: "0 1em",
          objectFit: "contain",
        }}
        src={src}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Modal>
  );
};

export default Video;
