import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import { getCollectionInfo } from "@/data/collections/getData";
import MoonbirdPage from "@/components/gallery/moonbirds/MoonbirdsPage";
import WizardPage from "@/components/gallery/wizards/WizardsPage";

export default function TokenPage() {
  const router = useRouter();
  const { tokenId, collectionId } = router.query;

  const [collectionInfo, setCollectionInfo] = useState<any>();

  useEffect(() => {
    if (!collectionId) return;

    const _collectionInfo = getCollectionInfo(collectionId as string);
    setCollectionInfo(_collectionInfo);
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

  if (collectionId == "moonbirds") return <MoonbirdPage />;

  if (collectionId == "wizards") return <WizardPage />;

  return null;
}
