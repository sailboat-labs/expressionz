import { useRouter } from "next/router";

import { METADATA } from "@/data/metadata";
import MoonbirdGalleryImage from "@/components/gallery/moonbirds/gallery_image";

export default function MoonbirdPage() {
  const router = useRouter();
  const { moonbirdId } = router.query;
  const moonbird = METADATA.find((m) => m.id === moonbirdId);

  return (
    <div className="font-pixelify flex h-screen w-full flex-1 items-center justify-center overflow-hidden">
      <img
        src="/images/background.webp"
        className="fixed z-[1] h-screen w-screen object-cover"
      />
      {moonbird && (
        <MoonbirdGalleryImage
          moonbird={moonbird}
          index={Number(moonbird?.meta?.name?.split("#")[1])}
        />
      )}
    </div>
  );
}
