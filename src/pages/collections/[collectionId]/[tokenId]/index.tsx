import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import { getCollectionInfo } from "@/data/collections/getData";
import { isMobile } from "react-device-detect";
import MoonbirdPage from "@/components/gallery/moonbirds/MoonbirdsPage";
import WizardPage from "@/components/gallery/wizards/WizardsPage";
import GalleryImage from "@/components/gallery/GalleryImage";
import Seo from "@/components/shared/Seo";
import BaseLayout from "@/components/shared/BaseLayout";
import Link from "next/link";

export default function TokenPage() {
  const router = useRouter();
  const { tokenId, collectionId } = router.query;

  const [collectionInfo, setCollectionInfo] = useState<any>();
  const [token, setToken] = useState<any>();

  useEffect(() => {
    if (!collectionId) return;

    const _collectionInfo = getCollectionInfo(collectionId as string);
    setCollectionInfo(_collectionInfo);

    const _token = _collectionInfo.gallery.find((t) => t.id === tokenId);
    setToken(_token);
  }, [collectionId]);

  if (!collectionInfo)
    return (
      <>
        <Head>
          <title>Collection</title>
        </Head>
        <div className="h-screen w-screen bg-gray-700 py-24 text-center text-white">
          Loading token...
        </div>
      </>
    );

  if (isMobile) {
    if (collectionId == "moonbirds") return <MoonbirdPage />;
    if (collectionId == "wizards") return <WizardPage />;

    return null;
  }

  return (
    <>
      <Seo title={`${token?.meta.name}`} />
      <img
        src={`/images/collections/${collectionId}/background.webp`}
        className="fixed z-[1] h-screen w-screen object-cover"
      />
      <BaseLayout
        hideFooter
        variant="logo"
        transparentBackground={collectionId == "wizards"}
        childrenClass="h-[calc(100vh-64px)] flex  w-full flex-1 items-center justify-center overflow-hidden font-pixelify-r"
        logo={
          <Link
            href={`/collections/${collectionId}`}
            className="flex items-center gap-2 text-base font-semibold"
          >
            <img
              src={`/images/collections/${collectionId}/logo.webp`}
              className="h-12 w-12 rounded-full "
              alt="collection logo"
            />
            {collectionInfo.collectionName}
          </Link>
        }
      >
        {token && (
          <GalleryImage
            token={token}
            index={Number(token?.meta?.name?.split("#")[1])}
            collection={collectionInfo.collectionName}
            showMagicEdenLink={collectionInfo.showMagicEden}
            showOrdinalsLink={collectionInfo.showOrdinals}
            theme={collectionInfo.theme}
            imageType={collectionInfo.imageType}
            showInscription={collectionInfo.showInscription}
          />
        )}
      </BaseLayout>
    </>
  );

  return null;
}
