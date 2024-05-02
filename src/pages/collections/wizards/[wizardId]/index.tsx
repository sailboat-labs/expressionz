import { useRouter } from "next/router";

import { GALLERY } from "@/data/gallery";
import GalleryImage from "@/components/gallery/wizards/WizardGalleryImage";
import Seo from "@/components/shared/Seo";

export default function WizardPage() {
  const router = useRouter();
  const { wizardId } = router.query;
  const wizard = GALLERY.find((w) => w.id === wizardId);

  return (
    <>
      <Seo title={`${wizard?.meta.name}`} />
      <main className="flex h-screen w-full flex-1 items-center justify-center overflow-hidden">
        <img
          src="/images/background.png"
          className="fixed z-[1] h-screen w-screen object-cover"
        />
        {wizard && (
          <GalleryImage
            wizard={wizard}
            index={Number(wizard?.meta?.name?.split("#")[1])}
          />
        )}
      </main>
    </>
  );
}
