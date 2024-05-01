import { useRouter } from "next/router";

import { GALLERY } from "@/data/gallery";
import GeneratedWizards from "@/components/gallery/wizards/GeneratedWizards";
import Seo from "@/components/shared/Seo";

function Generated() {
  const router = useRouter();
  const { wizardId } = router.query;
  const wizard = GALLERY.find((w) => w.id === wizardId);

  return (
    <>
      <Seo title="Emojis" />
      <div className="flex h-screen w-full flex-1 items-center justify-center overflow-hidden">
        <img
          src="/images/background.png"
          className="fixed z-[1] h-screen w-screen object-cover"
        />
        {wizard && (
          <GeneratedWizards
            wizard={wizard}
            index={Number(wizard?.meta?.name?.split("#")[1])}
          />
        )}
      </div>
    </>
  );
}

export default Generated;
