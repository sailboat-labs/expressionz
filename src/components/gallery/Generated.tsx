/* eslint-disable no-console */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Switch } from "@headlessui/react";
import { ArrowLeftIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { emojis } from "@/lib/data";
import { downloadImagesAsZip } from "@/lib/download.lib";
import { createDiscordEmojiPack } from "@/http/discord.http";
import { createTelegramStickerPack } from "@/http/telegram.http";
import { cn } from "@/lib/misc.lib";
import { TWizardGeneratorAPIPayload } from "@/types/wizard.type";
import { EPlatform, TCollection } from "@/types/misc.type";
import { generateWizardEmojis } from "@/http/wizard.http";
import ThemedIconButton from "@/components/shared/ThemedIconButton";
import useElementHeightMonitor from "@/hooks/useElementHeightMonitor";
import GeneratedItem from "@/components/shared/GeneratedItem";
import Image from "next/image";
import { moonbirdEmojis } from "@/data/emoji.data";
import { generateMoonBirdEmojis } from "@/http/moonbird.http";
import consoleLog from "@/lib/logger";
import { TMoonBirdGeneratorAPIPayload } from "@/types/moonbird.type";
import Loader from "./Loader";
import { BiLogoTelegram } from "react-icons/bi";
import { FaDiscord } from "react-icons/fa6";
import { LiaDownloadSolid } from "react-icons/lia";
import DoneModal from "../shared/DoneModal";

export default function GeneratedGalleryImage({
  index,
  collection,
  theme,
  imageType,
}: {
  index: number;
  collection: string;
  theme: string;
  imageType: string;
}) {
  const router = useRouter();
  const { collectionId } = router.query;

  const [progress, setProgress] = useState(0);
  const [totalSizeOfGeneratedImages, setTotalSizeOfGeneratedImages] =
    useState(1);

  const [loading, setLoading] = useState(true);
  const [isExportingStickers, setIsExportingStickers] = useState(false);

  const [generatedEmojis, setGeneratedEmojis] = useState<any[]>([]);
  const [generatedEmojisTransparent, setGeneratedEmojisTransparent] = useState<
    any[]
  >([]);

  const [selectedEmojis, setSelectedEmojis] = useState<number[]>([]);

  const [selectedType, setSelectedType] = useState<"png" | "gif" | "">("");

  const [hasBg, setHasBg] = useState(true);

  const [platform, setPlatform] = useState<EPlatform>(EPlatform.NONE);
  const [isDownloading, setIsDownloading] = useState(false);

  const [packId, setPackId] = useState<string>("ABCDEFGHIJKL");

  const [showDoneModal, setShowDoneModal] = useState(false);

  const wrapperElement = useRef<HTMLDivElement>(null);
  const gridWrapperHeight = useElementHeightMonitor(wrapperElement.current);

  const isGenerating =
    loading &&
    generatedEmojis.length == 0 &&
    generatedEmojisTransparent.length == 0;

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        router.replace(`/collections/${collectionId}`);
      }
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (!collectionId) return;

    if (collectionId == "wizards") {
      generateWizardsCollection();
    } else if (collectionId == "moonbirds") {
      generateMoonBirdsCollection();
    }
  }, [collectionId]);

  function goToPreviousPage() {
    router.replace(`/collections/${collectionId}`);
  }

  async function generateWizardsCollection() {
    // if (selectedType == '') {
    //   console.error("select a type");
    //   return;
    // }

    const payload: TWizardGeneratorAPIPayload = {
      tokenId: index - 1,
      platform,
      emojis: [],
    };

    for (const emoji of emojis) {
      payload.emojis.push({
        name: emoji.emoji_type,
        type: emoji.type as "gif" | "png",
      });
    }

    try {
      let images = await generateWizardEmojis(
        payload,
        (progress: number, total: number) => {
          // setProgress(progress);
          // setTotalSizeOfGeneratedImages(total);
        },
      );
      setGeneratedEmojis(images.colored);
      setGeneratedEmojisTransparent(images.transparent);
    } catch (error) {
      console.error(error);
      setLoading(false);

      toast.dismiss();
      toast.error("Error generating emojis", {
        position: "bottom-right",
      });
    } finally {
      setLoading(false);
    }
  }

  async function generateMoonBirdsCollection() {
    setLoading(true);

    try {
      const payload: TMoonBirdGeneratorAPIPayload = {
        tokenId: index,
        platform,
        emojiTypes: [],
      };
      for (const emoji of moonbirdEmojis) {
        payload.emojiTypes.push(emoji.emoji_type);
      }

      let images = await generateMoonBirdEmojis(
        payload,
        (progress: number, total: number) => {
          setProgress(progress);
          setTotalSizeOfGeneratedImages(total);
        },
      );
      setGeneratedEmojis(images.colored);
      setGeneratedEmojisTransparent(images.transparent);
    } catch (error) {
      consoleLog(error);
    } finally {
      setLoading(false);
    }
  }

  async function downloadEmojis() {
    setPlatform(EPlatform.NONE);

    setIsDownloading(true);

    const selected = hasBg
      ? generatedEmojis.filter((_, i) => selectedEmojis.includes(i))
      : generatedEmojisTransparent.filter((_, i) => selectedEmojis.includes(i));

    // If none are selected, download all
    if (selected.length === 0) {
      downloadImagesAsZip(
        collection.toLowerCase() as TCollection,
        hasBg ? generatedEmojis : generatedEmojisTransparent,
        index,
      );
      return;
    }

    await downloadImagesAsZip(
      collection.toLowerCase() as TCollection,
      selected,
      collection.toLocaleLowerCase() === "wizards" ? index : index + 1,
    );

    setIsDownloading(false);
    setPlatform(EPlatform.NONE);
    setSelectedEmojis([]);
    setSelectedType("");
  }

  async function exportStickers(platform: EPlatform) {
    setIsExportingStickers(true);
    const loadingToastID = toast.loading("Preparing emojis...", {
      unstyled: true,
      classNames: {
        toast: "bg-white rounded-md shadow flex items-center gap-2 px-4 py-2",
        title: "font-pixelify-r text-black",
      },
    });

    const generatedCollection = hasBg
      ? generatedEmojis
      : generatedEmojisTransparent;

    const _selectedEmojis: any[] = generatedCollection.filter((_, index) =>
      selectedEmojis.includes(index),
    );

    try {
      if (platform === EPlatform.DISCORD) {
        const id = await createDiscordEmojiPack({
          collection: collectionId as "wizards" | "moonbirds",
          hasBackground: hasBg,
          tokenId: collectionId == "wizards" ? index - 1 : index,
          selected: _selectedEmojis,
        });

        if (id.length <= 2) throw new Error("Error creating discord pack");

        setPackId(id);
        toast.dismiss(loadingToastID);
        setShowDoneModal(true);
        return;
      }

      const id = await createTelegramStickerPack({
        collection: collectionId as "wizards" | "moonbirds",
        hasBackground: hasBg,
        tokenId: collectionId == "wizards" ? index - 1 : index,
        selected: _selectedEmojis,
      });

      if (id.length <= 2) throw new Error("Error creating telegram pack");

      setPackId(id);
      toast.dismiss(loadingToastID);
      setShowDoneModal(true);
    } catch (error: any) {
      console.error("Error exporting stickers", error);
      toast.dismiss();
      toast.error(error.message);
    } finally {
      toast.dismiss(loadingToastID);
      setIsExportingStickers(false);
    }
  }

  function onSelectEmojis(emoji: any, i: number) {
    setSelectedType(emoji.type);

    if (platform == EPlatform.TELEGRAM) {
      if (selectedType === emoji.type) {
        if (selectedEmojis.includes(i)) {
          const _selectedEmojis = selectedEmojis.filter((j) => j !== i);
          setSelectedEmojis(_selectedEmojis);

          if (_selectedEmojis.length === 0) setSelectedType("");
        } else {
          setSelectedEmojis([...selectedEmojis, i]);
        }
      } else {
        setSelectedEmojis([i]);
      }
    } else {
      if (selectedEmojis.includes(i)) {
        setSelectedEmojis(selectedEmojis.filter((j) => j !== i));
      } else {
        setSelectedEmojis([...selectedEmojis, i]);
      }
    }
  }

  async function exportEmojis() {
    if (selectedEmojis.length === 0) {
      toast.warning("Select at least one emoji to export!");
      return;
    }

    if (platform == EPlatform.TELEGRAM) {
      // Check if included stickers are animated or static
      const selected = generatedEmojis.filter((_, i) =>
        selectedEmojis.includes(i),
      );

      if (selected.some((emoji) => emoji.type !== selectedType)) {
        toast.error(
          "Telegram sticker pack cannot include both animated and static stickers!",
        );
        return;
      }

      await exportStickers(platform);
    } else {
      await exportStickers(platform);
    }
  }

  const gridClasses = (() => {
    const GRID_GAP = 16; /**16 pixels == gap-4 */
    const availableHeight = gridWrapperHeight - 16; /** 16 pixels */
    const GRID_GAPS_INCLUDED = 2;
    const EXPECTED_NUMBER_OF_ROWS = 3;
    /**
     * 3x3 grid rows height - 140px
     * 4x3 grid rows height - 110px
     */
    const is3ColumnGrid =
      availableHeight >=
      160 * EXPECTED_NUMBER_OF_ROWS + GRID_GAP * GRID_GAPS_INCLUDED;

    const is4ColumnGrid =
      availableHeight >=
      120 * EXPECTED_NUMBER_OF_ROWS + GRID_GAP * GRID_GAPS_INCLUDED;

    return cn("grid grid-cols-5 gap-4 pt-4 ", {
      "grid-cols-4": is4ColumnGrid,
      "grid-cols-3 ": is3ColumnGrid,
      "max-w-[360px]": is3ColumnGrid && availableHeight < 500,
    });
  })();

  return (
    <div className="z-[2] mt-1 flex h-[calc(100vh-64px)] w-screen items-center justify-center font-pixelify-r  text-black">
      <div className=" inset-0 hidden scale-90 items-center justify-center overflow-y-auto lg:flex">
        <div className=" hidden h-screen w-[80rem] transform flex-col-reverse items-center justify-center gap-3 overflow-hidden rounded p-3 text-left align-middle transition-all md:flex">
          <Image
            src={`/images/collections/${collectionId}/desktop-bg.webp`}
            className="absolute h-[40vw] w-[40vw] rounded-t-md md:h-full md:w-full"
            height={2000}
            width={2000}
            alt="Collection Background"
            priority
            loading="eager"
          />
          <div className="z-[2] -mt-10 flex h-[70%] w-[80%] md:-mt-20">
            <div className="mr-16 h-full w-full flex-1">
              <div className="z-[2] mr-5 flex flex-col gap-5 md:flex-row">
                <div className="flex w-full flex-col items-center justify-center gap-5">
                  <div className="flex w-full flex-col items-center justify-center gap-5 pt-5">
                    <div className="relative ml-12 flex items-center gap-4 self-stretch">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 1 }}
                        className={`
                            absolute left-0 top-0 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded border-2 
                            ${theme == "violet" && " border-violet-200 text-violet-200"}
                            ${theme == "orange" && " border-[#C1410B] text-[#C1410B]"}
                            `}
                        onClick={() => goToPreviousPage()}
                      >
                        <ArrowLeftIcon className="h-6 w-6 rounded" />
                      </motion.button>
                      <div
                        className={`
                            flex-1 text-center font-pixelify-b md:text-xl xl:text-3xl
                            ${theme == "violet" && " text-white"}
                            ${theme == "orange" && " text-black"}
                        `}
                      >
                        {collection} #
                        {collection.toLowerCase() == "wizards"
                          ? index
                          : index + 1}
                      </div>
                    </div>

                    <div className="relative flex h-[18vw] w-[18vw] items-center justify-center">
                      <img
                        src={`/images/collections/${collectionId}/tokens/${index}.${imageType}`}
                        className=" h-[15vw] w-[15vw] rounded"
                      />
                      <img
                        src={`/images/collections/${collectionId}/token-frame.webp`}
                        className="absolute top-0 rounded"
                      />
                    </div>
                    <div className="mb-5 mt-2 flex flex-col items-center gap-5 md:flex md:gap-4">
                      <button
                        onClick={async () => {
                          const response = await fetch(
                            `/images/collection/${collectionId}/tokens/${index}.webp`,
                          );
                          const blob = await response.blob();
                          const url = URL.createObjectURL(blob);
                          const link = document.createElement("a");
                          link.href = url;
                          link.download = `${collectionId}_${collection.toLowerCase() == "wizards" ? index : index + 1}.webp`;
                          link.click();
                          URL.revokeObjectURL(url);
                        }}
                        className="w-fit cursor-pointer"
                      >
                        <img src="/images/download_pfp.webp" className="w-48" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`h-full w-1/2 flex-1 ${theme == "violet" && " text-white"}
                        ${theme == "orange" && " text-[#3E1600]"}`}
            >
              <div className=" flex h-full flex-col gap-2 pl-0 pr-3 lg:gap-0">
                {/* Step 1 */}
                <div className="z-[2] -mt-3 mb-2 flex h-fit items-center justify-between gap-4 2xl:gap-10">
                  <div className="flex flex-1 flex-col items-center">
                    <div className="flex-1 text-xl font-bold">
                      Export your emojis
                    </div>
                    <div className="mb-1.5 mt-0.5">1. Pick where to export</div>
                    <div className="flex items-center gap-2">
                      <ThemedIconButton
                        className={cn("text-2xl font-semibold", {
                          "!scale-110 !border-transparent !bg-yellow !text-black":
                            platform == EPlatform.TELEGRAM &&
                            collectionId == "moonbirds",
                          "!scale-110 !border-transparent !bg-[#C1410B] !text-[#FED7AA]":
                            platform == EPlatform.TELEGRAM &&
                            collectionId == "wizards",
                        })}
                        onClick={() => {
                          if (platform === "") {
                            setSelectedEmojis([]);
                          }
                          setPlatform(
                            platform === EPlatform.TELEGRAM
                              ? EPlatform.NONE
                              : EPlatform.TELEGRAM,
                          );
                          setIsDownloading(false);
                        }}
                        variant={theme}
                        icon={<BiLogoTelegram className="h-6 w-6" />}
                      />
                      <ThemedIconButton
                        className={cn("text-2xl font-semibold", {
                          "!scale-110 !border-transparent !bg-yellow !text-black":
                            platform == EPlatform.DISCORD &&
                            collectionId == "moonbirds",
                          "!scale-110 !border-transparent !bg-[#C1410B] !text-[#FED7AA]":
                            platform == EPlatform.DISCORD &&
                            collectionId == "wizards",
                        })}
                        onClick={() => {
                          if (platform === "") {
                            setSelectedEmojis([]);
                          }
                          setPlatform(
                            platform === EPlatform.DISCORD
                              ? EPlatform.NONE
                              : EPlatform.DISCORD,
                          );
                          setIsDownloading(false);
                        }}
                        variant={theme}
                        icon={<FaDiscord className="h-6 w-6" />}
                      />
                      <ThemedIconButton
                        className={cn("text-2xl font-semibold", {
                          "!scale-110 !border-transparent !bg-yellow !text-black":
                            isDownloading && collectionId == "moonbirds",
                          "!scale-110 !border-transparent !bg-[#C1410B] !text-[#FED7AA]":
                            isDownloading && collectionId == "wizards",
                        })}
                        variant={theme}
                        onClick={() => {
                          setSelectedEmojis([]);
                          setSelectedType("");
                          setPlatform(EPlatform.NONE);
                          setIsDownloading(!isDownloading);
                        }}
                        icon={<LiaDownloadSolid className="h-6 w-6" />}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <ThemedIconButton
                      variant={theme}
                      onClick={goToPreviousPage}
                      icon={<Cross1Icon className="h-5 w-5" />}
                    />
                  </div>
                </div>

                {/* Step 2 */}
                <div className="mb-1">
                  2. Pick your emojis{" "}
                  {platform == EPlatform.TELEGRAM && (
                    <span className="ml-2">
                      (static or animated for Telegram)
                    </span>
                  )}
                </div>
                <div
                  className={`flex-1 ${collectionId == "wizards" && " overflow-clip"}`}
                  ref={wrapperElement}
                >
                  <div
                    className={cn(
                      "mx-auto grid grid-cols-3 gap-4",
                      collectionId == "moonbirds" &&
                        " my-3 h-[55vh] grid-cols-4 overflow-y-auto pr-3",
                    )}
                    style={
                      collectionId == "wizards"
                        ? {
                            maxWidth: gridWrapperHeight - 66,
                          }
                        : {}
                    }
                  >
                    {hasBg
                      ? generatedEmojis.map((emoji, i) => (
                          <GeneratedItem
                            key={i}
                            item={emoji}
                            selectedType={selectedType}
                            platform={platform}
                            selected={selectedEmojis.includes(i)}
                            onSelect={() => onSelectEmojis(emoji, i)}
                            selectEnabled={!!platform || isDownloading}
                          />
                        ))
                      : generatedEmojisTransparent.map((emoji, i) => (
                          <GeneratedItem
                            key={i}
                            item={emoji}
                            platform={platform}
                            selectedType={selectedType}
                            selected={selectedEmojis.includes(i)}
                            onSelect={() => onSelectEmojis(emoji, i)}
                            selectEnabled={!!platform}
                          />
                        ))}
                  </div>
                </div>

                {/* Step 3 */}
                <div
                  style={{
                    maxWidth: gridWrapperHeight,
                  }}
                  className={cn(
                    "mx-auto mt-3 flex h-12 w-full items-center justify-between",
                  )}
                >
                  {platform || isDownloading ? (
                    <button
                      className="h-fit w-fit disabled:cursor-not-allowed disabled:opacity-80"
                      onClick={() => {
                        if (isDownloading) return downloadEmojis();

                        exportEmojis();
                      }}
                      disabled={isExportingStickers}
                    >
                      <img
                        src={`/images/share/export-${
                          selectedEmojis.length == 0 || isExportingStickers
                            ? "pressed.webp"
                            : "active.webp"
                        }`}
                        alt="Export button"
                        className={`h-auto w-36 ${
                          selectedEmojis.length == 0 || isExportingStickers
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                      />
                    </button>
                  ) : (
                    <div />
                  )}
                  {/* Background */}
                  <div className="flex flex-row items-center gap-1">
                    <Switch
                      checked={hasBg}
                      onChange={(checked) => {
                        setHasBg(checked);
                      }}
                      className={`${
                        hasBg
                          ? theme == "violet"
                            ? "bg-violet-200"
                            : "bg-[#C1410B]"
                          : theme == "violet"
                            ? "bg-violet-700"
                            : "bg-[#FED7AA]"
                      } relative inline-flex h-5 w-9 items-center rounded-full border-2
                      ${theme == "violet" ? "border-violet-200" : "border-[#C1410B]"} " transition-colors"`}
                    >
                      <span
                        className={`${
                          hasBg
                            ? theme == "violet"
                              ? "translate-x-4 bg-violet-700"
                              : "translate-x-4 bg-[#FED7AA]"
                            : theme == "violet"
                              ? "translate-x-0 bg-violet-200"
                              : "translate-x-0 bg-[#C1410B]"
                        } inline-block h-4 w-4 transform rounded-full transition-transform`}
                      />
                    </Switch>
                    <div className="text-base font-semibold">Background</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Done Modal */}
      <DoneModal
        packId={packId}
        setShow={setShowDoneModal}
        show={showDoneModal}
        platform={platform}
      />

      <Loader
        collection={collectionId as string}
        show={isGenerating}
        progress={progress}
        totalSizeOfGeneratedImages={totalSizeOfGeneratedImages}
      />
    </div>
  );
}
