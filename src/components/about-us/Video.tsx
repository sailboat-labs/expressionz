import Modal from "./Modal";

interface VideoProps {
  show: boolean;
  src: string;
  onClose: () => void;
}

const Video = ({ onClose, src, show = false }: VideoProps) => {
  if (!show) return null;

  return (
    <Modal onClose={onClose}>
      <video
        src={src}
        className="w-full max-w-5xl px-4"
        autoPlay
        playsInline
        loop
      ></video>
      {/* <iframe
        style={{
          width: isMobile ? "90vw" : "80vw",
          height: isMobile ? "36vh" : "62vh",
          margin: "0 1em",
          objectFit: "contain",
        }}
        className="h-fit w-fit"
        src={src}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe> */}
    </Modal>
  );
};

export default Video;
