import { progress } from "framer-motion";
import React from "react";
import MoonbirdsVideoLoader from "../MoonbirdsLoader";
import { WizardsLoader } from "../WizardsLoader";

function Loader({
  show,
  collection,
  progress,
  totalSizeOfGeneratedImages,
}: {
  show: boolean;
  collection: string;
  progress: number;
  totalSizeOfGeneratedImages: number;
}) {
  if (collection == "wizards") return <WizardsLoader show={show} />;

  if (collection == "moonbirds")
    return (
      <MoonbirdsVideoLoader
        show={show}
        progress={progress}
        // total={moonbirdEmojis.length}
        total={totalSizeOfGeneratedImages}
      />
    );

  return <></>;
}

export default Loader;
