import React, { useEffect, useState } from "react";
import GeneratedItem from "@/components/shared/GeneratedItem";
import DoneModal from "@/components/shared/DoneModal";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { METADATA } from "@/data/metadata";
import { ArrowDownIcon, ArrowLeftIcon } from "@radix-ui/react-icons";
import { downloadImagesAsZip, downloadPfp } from "@/lib/utils/download";
import { moonbirdEmojis } from "@/lib/utils/emojis";
import { generateMoonbirdEmojis } from "@/lib/utils/generateEmojis";
import { createDiscordEmojiPack } from "@/lib/utils/share/discord";
import { createTelegramStickerPack } from "@/lib/utils/share/telegram";
import { FaDiscord } from "react-icons/fa";
import { BiLogoTelegram } from "react-icons/bi";
import Seo from "@/components/shared/Seo";
import MoonbirdDetailsFrame from "./MoonbirdDetailsFrame";
import ThemedIconButton from "@/components/shared/ThemedIconButton";
import { cn } from "@/lib/utils";
import { Switch } from "@headlessui/react";
import MoonbirdsVideoLoader from "@/components/MoonbirdsLoader";

// const shareIcons = [
//   {
//     name: "Telegram",
//     active: "/images/share/telegram-active.webp",
//     inactive: "/images/share/telegram-inactive.webp",
//     activeIcon: <PiTelegramLogo className="h-6 w-6" />,
//     inactiveIcon: <FaTelegramPlane className="h-6 w-6" />,
//     platform: "telegram",
//   },
//   {
//     name: "Discord",
//     active: "/images/share/discord-active.webp",
//     activeIcon: <RiDiscordLine className="h-6 w-6" />,
//     inactiveIcon: <BiLogoDiscordAlt className="h-6 w-6" />,
//     inactive: "/images/share/discord-inactive.webp",
//     platform: "discord",
//   },
// ];

export default function MoonbirdGenerated({
  moonbird,
  index,
}: {
  moonbird: (typeof METADATA)[0];
  index: number;
}) {
  const router = useRouter();

  const [progress, setProgress] = useState(0);
  const [platform, setPlatform] = useState("");
  const [loading, setLoading] = useState(true);

  const [hasBg, setHasBg] = useState(true);
  const [showDoneModal, setShowDoneModal] = useState(false);
  const [allEmojisSelected, setAllEmojisSelected] = useState(false);
  const [packId, setPackId] = useState<string>("ABCDEFGHIJKL");
  const [generatedEmojis, setGeneratedEmojis] = useState<any[]>([]);
  const [selectedEmojis, setSelectedEmojis] = useState<number[]>([]);
  const [generatedEmojisTransparent, setGeneratedEmojisTransparent] = useState<
    any[]
  >([]);

  //On click escape, go to homescreen
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        router.replace("/");
      }
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Generate emojis
  useEffect(() => {
    generate();
  }, []);

  async function generate() {
    setLoading(true);

    try {
      const _generated: any[] = [];
      const _generatedTransparent: any[] = [];

      for await (const emoji of moonbirdEmojis) {
        const response = await generateMoonbirdEmojis(index, emoji.emoji_type);

        if (response) {
          _generated.push({
            image: response.colored,
            emoji_type: emoji.emoji_type,
            type: "png",
          });

          // const transparentImage = response.transparentImages[0];
          _generatedTransparent.push({
            image: response.transparent,
            emoji_type: emoji.emoji_type,
            type: "png",
          });
        }

        setProgress(_generated.length);

        setGeneratedEmojis(_generated);
        setGeneratedEmojisTransparent(_generatedTransparent);
      }
      setGeneratedEmojis(_generated);
      setGeneratedEmojisTransparent(_generatedTransparent);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function downloadEmojis() {
    if (selectedEmojis.length === 0) {
      toast.error("Select at least one emoji to export!");
      return;
    }

    const selected = hasBg
      ? generatedEmojis.filter((_, i) => selectedEmojis.includes(i))
      : generatedEmojisTransparent.filter((_, i) => selectedEmojis.includes(i));

    // If none are selected, download all
    if (selected.length === 0) {
      downloadImagesAsZip(
        hasBg ? generatedEmojis : generatedEmojisTransparent,
        index,
      );
      return;
    }

    downloadImagesAsZip(selected, index);
  }

  const onSelectEmojis = (index: number) => {
    if (selectedEmojis.includes(index)) {
      setSelectedEmojis(selectedEmojis.filter((i) => i !== index));
    } else {
      setSelectedEmojis([...selectedEmojis, index]);
    }
  };

  async function exportStickers(platform: string) {
    setLoading(true);

    try {
      console.log("Selected emojis", selectedEmojis.length);

      if (platform === "discord") {
        const id = await createDiscordEmojiPack(
          "moonbirds",
          index,
          selectedEmojis,
          hasBg,
        );

        if (!id) throw new Error("Error creating discord pack");

        setPackId(id);
        setShowDoneModal(true);

        console.log("Discord pack created", id);
        return;
      }

      if (platform === "telegram") {
        const id = await createTelegramStickerPack(
          "moonbirds",
          index,
          selectedEmojis,
          hasBg,
        );

        if (!id) throw new Error("Error creating telegram pack");

        setPackId(id);
        setShowDoneModal(true);

        console.log("Telegram pack created", id);

        // TODO - export to telegram sticker pack (includes both png and gif(animated) images)
      }
    } catch (error) {
      console.log("Error exporting stickers", error);
    } finally {
      setLoading(false);
    }
  }

  function selectAll() {
    if (allEmojisSelected) {
      setSelectedEmojis([]);
      setAllEmojisSelected(false);
      return;
    }

    let selectedIndices = [];
    for (let i = 0; i < generatedEmojis.length; i++) {
      selectedIndices[i] = i;
    }

    setSelectedEmojis(selectedIndices);
    setAllEmojisSelected(true);
  }

  return (
    <>
      <Seo title="Emojis" />
      <MoonbirdDetailsFrame>
        {[
          <React.Fragment key="left-content">
            {/* LEFT CONTENT */}
            <div className="z-[2] mr-5 flex flex-col gap-5 md:flex-row">
              <div className="flex w-full flex-col items-center  gap-5">
                <div className="flex w-full flex-1 items-center justify-between ">
                  <ThemedIconButton
                    className="text-2xl font-semibold"
                    onClick={() =>
                      router.replace(`/collections/moonbirds/${moonbird.id}`)
                    }
                    variant="violet"
                    icon={<ArrowLeftIcon className="h-6 w-6 rounded" />}
                  />
                  <h1 className="flex-1  text-center font-pixelify-b  text-white md:text-xl xl:text-3xl">
                    Moonbird #{index + 1}
                  </h1>

                  <div className="flex items-center gap-2 lg:hidden">
                    <ThemedIconButton
                      className="text-2xl font-semibold"
                      onClick={downloadEmojis}
                      variant="violet"
                      icon={<ArrowDownIcon className="h-5 w-5" />}
                    />
                    <ThemedIconButton
                      className="text-2xl font-semibold"
                      onClick={() => router.replace("/collections/moonbirds")}
                      variant="violet"
                      icon={<ion-icon name="close"></ion-icon>}
                    />
                    {/* <div
                      onClick={downloadEmojis}
                      className="ml-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded border-2 border-violet-700 bg-violet-200 text-violet-700"
                    >
                      <ArrowDownIcon className="h-5 w-5" />
                    </div>

                    <div
                      onClick={() => {
                        router.push("/moonbirds");
                      }}
                      className="ml-1 flex  h-8 w-8 cursor-pointer items-center justify-center rounded border-2 border-violet-700 bg-violet-200 text-violet-700"
                    >
                      <Cross1Icon className="h-5 w-5" />
                    </div> */}
                  </div>
                </div>

                <div className="relative flex w-full flex-col items-center justify-center gap-5 pt-5">
                  <div className="relative mt-4 flex h-[320px] w-[320px] items-center justify-center lg:h-[21vw] lg:w-[21vw]">
                    <img
                      src={`/images/moonbirds/tokens/${index}.png`}
                      className="h-[274px] w-[274px] rounded lg:h-[18vw] lg:w-[18vw]"
                    />
                    <img
                      src="/images/moonbird-frame.webp"
                      className="absolute top-0 rounded"
                    />
                  </div>
                  <div className="mb-5 mt-2 flex flex-col items-center gap-5 md:flex md:gap-4">
                    <div
                      onClick={() => {
                        downloadPfp(
                          `/images/moonbirds/tokens/${index}.png`,
                          index,
                        );
                      }}
                      className="w-fit cursor-pointer"
                    >
                      <img
                        src="/images/buttons/download_pfp.webp"
                        className="w-40"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>,
          <React.Fragment key="right-content">
            {/* RIGHT CONTENT */}
            <div className=" mb-8 flex h-full flex-col gap-2  ">
              <div className="z-[2] flex items-center justify-between">
                {/* <div className="flex items-center gap-4">
                  {shareIcons.map((messenger, i) => (
                      <React.Fragment key={i}>
                        <IconButton
                          key={i}
                          theme="violet"
                          className="h-9 w-9"
                          onClick={async () => {
                            setSelectedEmojis([]);

                            if (platform === messenger.platform)
                              return setPlatform("");

                            setPlatform(messenger.platform);
                          }}
                        >
                          <div>
                            {platform == messenger.platform
                              ? messenger.activeIcon
                              : messenger.inactiveIcon}
                          </div>
                        </IconButton>
                        <div
                          key={i}
                          className="h-9 w-9 cursor-pointer"
                          onClick={async () => {
                            setSelectedEmojis([]);

                            if (platform === messenger.platform)
                              return setPlatform("");

                            setPlatform(messenger.platform);
                          }}
                        >
                          <img
                            src={
                              platform == messenger.platform
                                ? messenger.active
                                : messenger.inactive
                            }
                            className="h-full w-full"
                            alt={`${messenger.platform} icon`}
                          />
                        </div>
                      </React.Fragment>
                    ))}
                </div> */}

                <div className="my-6 flex w-full items-center gap-2 lg:mt-0">
                  <ThemedIconButton
                    className={cn("text-2xl font-semibold ", {
                      "!border-transparent !bg-yellow !text-black":
                        platform == "telegram",
                    })}
                    onClick={() => {
                      if (platform === "") {
                        setSelectedEmojis([]);
                      }
                      setPlatform(platform === "telegram" ? "" : "telegram");
                    }}
                    variant="violet"
                    icon={<BiLogoTelegram className="h-5 w-5" />}
                  />
                  <ThemedIconButton
                    className={cn("text-2xl font-semibold", {
                      "!border-transparent !bg-yellow !text-black":
                        platform == "discord",
                    })}
                    onClick={() => {
                      if (platform === "") {
                        setSelectedEmojis([]);
                      }
                      setPlatform(platform === "discord" ? "" : "discord");
                    }}
                    variant="violet"
                    icon={<FaDiscord className="h-5 w-5" />}
                  />
                  <div className="ml-auto flex items-center gap-5 lg:hidden">
                    {/* Background */}
                    <div className="mb-2 flex flex-row gap-3">
                      <Switch
                        checked={hasBg}
                        onChange={(checked) => {
                          setHasBg(checked);
                        }}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full border-2 !border-[#BDBCFF] !bg-[#BDBCFF] transition-colors`}
                      >
                        <span
                          className={cn(
                            "inline-block h-4 w-4 transform rounded-full  transition-transform",
                            hasBg ? "!bg-white" : " !bg-[#3E2A57]",
                            hasBg ? "translate-x-6 " : "translate-x-1 ",
                          )}
                        />
                      </Switch>
                      <div className="text-base font-semibold text-white">
                        Background
                      </div>
                    </div>
                    {/* Select all */}
                    <div
                      className={cn("mb-2 flex flex-row gap-3", {
                        invisible: platform === "",
                      })}
                    >
                      <Switch
                        checked={allEmojisSelected}
                        disabled={platform === ""}
                        onChange={(checked) => selectAll()}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full border-2 !border-[#BDBCFF]  !bg-[#BDBCFF] transition-colors`}
                      >
                        <span
                          className={cn(
                            "inline-block h-4 w-4 transform rounded-full  transition-transform",
                            allEmojisSelected ? " !bg-white" : "!bg-[#3E2A57]",
                            allEmojisSelected
                              ? "translate-x-6 "
                              : "translate-x-1 ",
                          )}
                        />
                      </Switch>
                      <div className="text-base font-semibold text-white">
                        Select all
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden items-center gap-2 lg:flex">
                  <ThemedIconButton
                    className="text-2xl font-semibold"
                    onClick={downloadEmojis}
                    variant="violet"
                    icon={<ArrowDownIcon className="h-5 w-5" />}
                  />
                  <ThemedIconButton
                    className="text-2xl font-semibold"
                    onClick={() => router.replace("/collections/moonbirds")}
                    variant="violet"
                    icon={<ion-icon name="close"></ion-icon>}
                  />
                  {/* <div
                      onClick={downloadEmojis}
                      className="ml-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded border-2 border-violet-700 bg-violet-200 text-violet-700"
                    >
                      <ArrowDownIcon className="h-5 w-5" />
                    </div>

                    <div
                      onClick={() => {
                        router.push("/moonbirds");
                      }}
                      className="ml-1 flex  h-8 w-8 cursor-pointer items-center justify-center rounded border-2 border-violet-700 bg-violet-200 text-violet-700"
                    >
                      <Cross1Icon className="h-5 w-5" />
                    </div> */}
                </div>
              </div>

              <div className="my-4 hidden lg:block">
                {/* Background */}
                <div className="mb-2 flex flex-row gap-3">
                  <Switch
                    checked={hasBg}
                    onChange={(checked) => {
                      setHasBg(checked);
                    }}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full border-2 !border-[#BDBCFF] !bg-[#BDBCFF] transition-colors`}
                  >
                    <span
                      className={cn(
                        "inline-block h-4 w-4 transform rounded-full  transition-transform",
                        hasBg ? "!bg-white" : " !bg-[#3E2A57]",
                        hasBg ? "translate-x-6 " : "translate-x-1 ",
                      )}
                    />
                  </Switch>
                  <div className="text-base font-semibold text-white">
                    Background
                  </div>
                </div>

                {/* Select all */}
                <div
                  className={cn("mb-2 flex flex-row gap-3", {
                    invisible: platform === "",
                  })}
                >
                  <Switch
                    checked={allEmojisSelected}
                    disabled={platform === ""}
                    onChange={(checked) => selectAll()}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full border-2 !border-[#BDBCFF]  !bg-[#BDBCFF] transition-colors`}
                  >
                    <span
                      className={cn(
                        "inline-block h-4 w-4 transform rounded-full  transition-transform",
                        allEmojisSelected ? " !bg-white" : "!bg-[#3E2A57]",
                        allEmojisSelected ? "translate-x-6 " : "translate-x-1 ",
                      )}
                    />
                  </Switch>
                  <div className="text-base font-semibold text-white">
                    Select all
                  </div>
                </div>
              </div>

              <div
                className={cn(
                  "grid grid-cols-2 gap-4 overflow-y-auto overflow-x-clip  sm:grid-cols-3 md:grid-cols-4 ",
                  "flex-1 pr-1",
                )}
              >
                {hasBg
                  ? generatedEmojis.map((emoji, i) => (
                      <GeneratedItem
                        key={i}
                        item={emoji}
                        selectedType="png"
                        platform={platform}
                        selected={selectedEmojis.includes(i)}
                        onSelect={() => onSelectEmojis(i)}
                        selectEnabled={platform ? true : false}
                      />
                    ))
                  : generatedEmojisTransparent.map((emoji, i) => (
                      <GeneratedItem
                        key={i}
                        item={emoji}
                        platform={platform}
                        selectedType="png"
                        selected={selectedEmojis.includes(i)}
                        onSelect={() => onSelectEmojis(i)}
                        selectEnabled={platform ? true : false}
                      />
                    ))}
              </div>
              <div
                className={`${
                  platform ? "flex " : "invisible"
                }  mt-3 justify-center`}
              >
                <img
                  src={`/images/share/export-${
                    selectedEmojis.length == 0 ? "pressed.webp" : "active.webp"
                  }`}
                  alt="Export button"
                  className={`h-auto w-40 ${
                    selectedEmojis.length == 0
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  onClick={async () => {
                    if (selectedEmojis.length === 0) {
                      toast.error("Select at least one emoji to export!");
                      return;
                    }

                    await exportStickers(platform);
                  }}
                />
              </div>
            </div>
          </React.Fragment>,
        ]}
      </MoonbirdDetailsFrame>

      {/* Done Modal */}
      <DoneModal
        packId={packId}
        setShow={setShowDoneModal}
        show={showDoneModal}
        platform={platform}
      />

      {/* Loading */}
      <MoonbirdsVideoLoader
        show={loading}
        progress={progress}
        total={moonbirdEmojis.length}
      />
    </>
  );
}
