/* eslint-disable no-console */
/* eslint-disable @next/next/no-img-element */
import { Switch } from "@headlessui/react";
import { motion } from "framer-motion";
import { ArrowDownIcon, ArrowLeftIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { generateGifs } from "@/lib/createGif";
import { emojis, shareIcons } from "@/lib/data";
import { download, downloadImagesAsZip } from "@/lib/download";
import { generateEmojis } from "@/lib/generateEmojis";
import { EmojiTypes } from "@/lib/interface";

import { GALLERY } from "@/data/gallery";
import GeneratedItem from "@/components/shared/GeneratedItem";
import DoneModal from "@/components/shared/DoneModal";
import { WizardsLoader } from "@/components/WizardsLoader";
import { createDiscordEmojiPack } from "@/lib/utils/share/wizards/discord";
import { createTelegramStickerPack } from "@/lib/utils/share/wizards/telegram";
import { cn } from "@/lib/utils";

type GeneratedWizardsProps = {
  wizard: (typeof GALLERY)[0];
  index: number;
};

export default function GeneratedWizards({
  wizard,
  index,
}: Readonly<GeneratedWizardsProps>) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [generatedEmojis, setGeneratedEmojis] = useState<any[]>([]);
  const [generatedEmojisTransparent, setGeneratedEmojisTransparent] = useState<
    any[]
  >([]);

  const [selectedEmojis, setSelectedEmojis] = useState<number[]>([]);

  const [selectedType, setSelectedType] = useState("");

  const [hasBg, setHasBg] = useState(true);

  // For progress bar
  const [progress, setProgress] = useState(0);

  const [platform, setPlatform] = useState("");

  const [packId, setPackId] = useState<string>("ABCDEFGHIJKL");

  const [showDoneModal, setShowDoneModal] = useState(false);

  // Generate emojis
  useEffect(() => {
    generate();
  }, []);

  // On click escape, go to wizard screen
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        router.replace(`/collections/wizards/${wizard.id}`);
      }
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  async function generate() {
    setLoading(true);

    try {
      const _generated: any[] = [];
      const _generatedTransparent: any[] = [];

      for await (const emoji of emojis) {
        if (emoji.type == "gif") {
          const response = await generateGifs(
            index - 1,
            emoji.emoji_type as EmojiTypes,
          );

          if (response) {
            _generated.push({
              image: response.colored,
              emoji_type: emoji.emoji_type,
              type: "gif",
            });

            _generatedTransparent.push({
              image: response.transparent,
              emoji_type: emoji.emoji_type,
              type: "gif",
            });
          }
        } else {
          const response = await generateEmojis(
            index - 1,
            emoji.emoji_type as EmojiTypes,
          );

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
        }

        setProgress(_generated.length);

        setGeneratedEmojis(_generated);
        setGeneratedEmojisTransparent(_generatedTransparent);
      }
      setGeneratedEmojis(_generated);
      setGeneratedEmojisTransparent(_generatedTransparent);

      // setSelectedEmojis(Array.from({ length: _generated.length }, (_, i) => i));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const isGenerating =
    loading ||
    generatedEmojis.length == 0 ||
    generatedEmojisTransparent.length == 0;

  async function downloadEmojis() {
    // if (selectedEmojis.length === 0) {
    //   toast.error('Select at least one emoji to export!');
    //   return;
    // }

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

  async function exportStickers(platform: string) {
    setLoading(true);

    try {
      console.log("Selected emojis", selectedEmojis.length);

      if (platform === "discord") {
        const id = await createDiscordEmojiPack(
          index - 1,
          selectedEmojis,
          hasBg,
        );

        if (!id) throw new Error("Error creating discord pack");

        setPackId(id);
        setShowDoneModal(true);

        console.log("Discord pack created", id);

        // TODO - export to discord emoji/sticker pack (includes both png and gif(animated) images)
        return;
      }

      if (platform === "telegram") {
        const id = await createTelegramStickerPack(
          index - 1,
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

  function onSelectEmojis(emoji: any, i: number) {
    setSelectedType(emoji.type);

    if (platform == "telegram") {
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

    if (platform == "telegram") {
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

  function getText() {
    switch (platform) {
      case "telegram":
        return (
          <p>
            Select either animated or <br />
            static stickers to export.
          </p>
        );
      case "discord":
        return (
          <p>
            You can choose both animated <br />
            and static stickers to export.
          </p>
        );

      default:
        return (
          <p>
            Choose a platform to <br />
            export your stickers to
          </p>
        );
    }
  }

  return (
    <div className="z-[2] flex h-screen w-screen items-center justify-center text-black">
      {/* Desktop */}
      <div className="fixed inset-0 hidden scale-90 items-start justify-center overflow-y-auto md:flex">
        <div className="hidden h-screen w-[80rem] transform flex-col-reverse items-center justify-center gap-3 overflow-hidden rounded p-3 text-left align-middle transition-all md:flex">
          <img
            src="/images/desktop_wizard_background.webp"
            className="absolute h-[40vw] w-[40vw] rounded-t-md md:h-full md:w-full"
            alt="Wizard Background Image"
          />
          <div className=" z-[2] -mt-10 flex h-[75%] w-[80%] md:-mt-20">
            <div className="relative mr-10 mt-8 flex h-full w-1/2 flex-1 items-start  justify-center">
              <div className="z-[2] mr-5 flex w-full flex-1 flex-col gap-5  md:flex-row">
                <div className="flex w-full flex-col items-center justify-center gap-5 ">
                  <div className="relative flex w-full flex-col items-center justify-center gap-5">
                    <div className="relative flex w-full items-center justify-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 1 }}
                        className="absolute left-8 flex h-8 w-8 cursor-pointer items-center justify-center rounded border-2 border-[#C1410B] text-[#C1410B]"
                        onClick={() => {
                          router.push(`/collections/wizards/${wizard.id}`);
                        }}
                      >
                        <ArrowLeftIcon className="h-6 w-6 rounded" />
                      </motion.button>
                      <div className=" font-presstart md:text-2xl">
                        Wizard #{index}
                      </div>
                    </div>
                    <div className="relative mt-8 flex h-[30vw] max-h-[350px] w-[30vw] max-w-[350px] items-center justify-center">
                      <img
                        src={`/images/gallery/${index}.webp`}
                        className="h-[25.71vw] max-h-[300px] w-[25.71vw] max-w-[300px] rounded"
                        alt={`Wizard ${index} image`}
                      />
                      <img
                        src="/images/frame.webp"
                        className="absolute top-0 rounded"
                        alt="Wizard frame"
                      />
                    </div>
                    <div className="mb-5 mt-4 flex flex-col items-center gap-5 md:flex md:gap-4">
                      <button
                        onClick={() => {
                          download(`/images/gallery/${index}.webp`, index);
                        }}
                        className="h-fit w-fit cursor-pointer"
                      >
                        <img
                          src="/images/download_pfp.webp"
                          className="w-40"
                          alt="Download pfp button"
                        />
                      </button>
                      {/* <button className="w-fit cursor-not-allowed">
                        <img
                          // src='/images/expressionz-btn-disabled.webp'
                          src="/images/generate-pressed-btn.webp"
                          className="w-48"
                          alt="Generate button"
                        />
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-full w-1/2 flex-1">
              <div className=" flex h-full flex-col gap-2 pl-0 pr-3 lg:gap-1">
                <div className="z-[2] mb-2 mt-8 flex h-fit items-center justify-between">
                  <div className="flex items-center gap-4">
                    {shareIcons.map((messenger, i) => (
                      <button
                        key={i}
                        className="h-9 w-9 cursor-pointer"
                        onClick={async () => {
                          setSelectedEmojis([]);
                          setSelectedType("");

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
                      </button>
                    ))}
                  </div>

                  <div className="text-center">
                    {/* Background */}
                    <div className="flex flex-row gap-3">
                      <Switch
                        checked={hasBg}
                        onChange={(checked) => {
                          setHasBg(checked);
                        }}
                        className={`${
                          hasBg ? "bg-[#C1410B]" : "bg-[#FED7AA]"
                        } relative inline-flex h-6 w-11 items-center rounded-full border-2 border-[#C1410B] transition-colors`}
                      >
                        <span
                          className={`${
                            hasBg
                              ? "translate-x-6 bg-[#FED7AA]"
                              : "translate-x-1 bg-[#C1410B]"
                          } inline-block h-4 w-4 transform rounded-full transition-transform`}
                        />
                      </Switch>
                      <div className="text-base font-semibold">Background</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={downloadEmojis}
                      className="ml-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded border-2 border-orange-700 bg-orange-200 text-orange-700"
                    >
                      <ArrowDownIcon className="h-5 w-5" />
                    </button>
                    {/* <button
                      onClick={() => {
                        router.replace(`/collections/wizards/${index}`);
               
                      }}
                      className="ml-1 flex  h-8 w-8 cursor-pointer items-center justify-center rounded border-2 border-orange-700 bg-orange-200 text-orange-700"
                    >
                      <Cross1Icon className="h-5 w-5" />
                    </button> */}
                  </div>
                </div>

                {/* Background */}
                {/* <div className="flex flex-row gap-3">
                  <Switch
                    checked={hasBg}
                    onChange={(checked) => {
                      setHasBg(checked);
                    }}
                    className={`${
                      hasBg ? "bg-[#C1410B]" : "bg-[#FED7AA]"
                    } relative inline-flex h-6 w-11 items-center rounded-full border-2 border-[#C1410B] transition-colors`}
                  >
                    <span
                      className={`${
                        hasBg
                          ? "translate-x-6 bg-[#FED7AA]"
                          : "translate-x-1 bg-[#C1410B]"
                      } inline-block h-4 w-4 transform rounded-full transition-transform`}
                    />
                  </Switch>
                  <div className="text-base font-semibold">Background</div>
                </div> */}

                <div className="flex-1 overflow-y-auto">
                  <div className="grid gap-1 pt-4  md:grid-cols-3">
                    {hasBg
                      ? generatedEmojis.map((emoji, i) => (
                          <GeneratedItem
                            key={i}
                            item={emoji}
                            selectedType={selectedType}
                            platform={platform}
                            selected={selectedEmojis.includes(i)}
                            onSelect={() => onSelectEmojis(emoji, i)}
                            selectEnabled={!!platform}
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
                  <div
                    className={cn(
                      "mt-4 justify-center",
                      platform ? "flex " : "hidden ",
                    )}
                  >
                    <button
                      className="h-fit w-fit"
                      onClick={() => exportEmojis()}
                    >
                      <img
                        src={`/images/share/export-${
                          selectedEmojis.length == 0
                            ? "pressed.webp"
                            : "active.webp"
                        }`}
                        alt="Export button"
                        className={`h-auto w-40 ${
                          selectedEmojis.length == 0
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="fixed inset-0 block scale-95 overflow-y-hidden md:hidden">
        <div className="relative flex h-[100vh] w-full transform flex-col items-center justify-center gap-3 overflow-auto rounded p-3 text-left align-middle transition-all md:hidden">
          <Image
            src="/images/mobile_wizard_background.webp"
            className="absolute h-full w-full rounded-t-md md:h-full md:w-full"
            height={1000}
            width={1000}
            alt="Wizard Background"
            onLoad={() => {
              console.log("loaded");
            }}
            loading="eager"
            priority
          />

          <div className="z-2 absolute top-6 flex w-4/5 items-center justify-between px-3">
            <div className="flex items-center space-x-3">
              <button
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded border border-[#C1410B] bg-[#FED7AA] text-[#C1410B]"
                onClick={() => {
                  router.push(`/collections/wizards/${wizard.id}`);
                }}
              >
                <ArrowLeftIcon className="h-5 w-5 rounded" />
              </button>
              <div className="mt-0 text-xl font-semibold">Wizard #{index}</div>
            </div>

            <div className="flex items-center gap-5">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://twoo.expressionz.xyz/?id=${wizard.id}`,
                  );
                  toast.success("Copied link to clipboard");
                }}
                className="ml-1 flex  h-5 w-5 scale-150 cursor-pointer items-center justify-center  rounded border border-orange-700 bg-orange-200 text-orange-700"
              >
                <ion-icon name="share-social"></ion-icon>
              </button>
              {/* <button
                onClick={() => {
                  router.push("/");
                }}
                className="ml-1 flex  h-5 w-5 scale-150 cursor-pointer items-center justify-center  rounded border border-orange-700 bg-orange-200 text-orange-700"
              >
                <ion-icon name="close"></ion-icon>
              </button> */}
            </div>
          </div>

          <div className="absolute z-[2] mt-5 h-[72vh] w-[75vw] overflow-auto">
            {/* Wizard */}
            <div className="flex flex-col items-center">
              <div className="relative flex h-[50vw] w-[50vw] items-center justify-center">
                <img
                  src={`/images/gallery/${index}.webp`}
                  className="h-[45vw] w-[45vw] rounded"
                  alt={`Wizzard ${index} image`}
                />
                <img
                  src="/images/frame.webp"
                  className="absolute top-0 rounded"
                  alt="Wizard frame"
                />
              </div>
              <div className="mb-5 mt-5 flex flex-col items-center gap-4 md:flex md:gap-4">
                <button
                  onClick={() =>
                    download(`/images/gallery/${index}.webp`, index)
                  }
                  className="w-fit cursor-pointer"
                >
                  <img
                    src="/images/download_pfp.webp"
                    className="w-36"
                    alt="Download button"
                  />
                </button>
                {/* <div
                  className="w-fit cursor-pointer"
                  onClick={() => {
                    router.push(`${wizard.id}/generated`);
                  }}
                >
                  <img
                    src="/images/generate-pressed-btn.webp"
                    className="w-48"
                    alt="Generate button disabled"
                  />
                </div> */}
              </div>
            </div>

            {/* Share and download icons */}
            <div className="mt-1 flex w-full items-center justify-between px-2">
              <div className="flex items-center justify-between gap-3">
                {shareIcons.map((messenger, i) => (
                  <button
                    key={i}
                    className="h-9 w-9 cursor-pointer"
                    onClick={async () => {
                      setSelectedEmojis([]);
                      setSelectedType("");

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
                  </button>
                ))}
              </div>
              <button
                onClick={downloadEmojis}
                className="ml-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded border-2 border-orange-700 bg-orange-200 text-orange-700"
              >
                <ArrowDownIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Background */}
            <div className="mx-2 mt-4 flex flex-row gap-3">
              <Switch
                checked={hasBg}
                onChange={(checked) => {
                  setHasBg(checked);
                }}
                className={`${
                  hasBg ? "bg-[#C1410B]" : "bg-[#FED7AA]"
                } relative inline-flex h-6 w-11 items-center rounded-full border-2 border-[#C1410B] transition-colors`}
              >
                <span
                  className={`${
                    hasBg
                      ? "translate-x-6 bg-[#FED7AA]"
                      : "translate-x-1 bg-[#C1410B]"
                  } inline-block h-4 w-4 transform rounded-full transition-transform`}
                />
              </Switch>
              <div className="text-base font-semibold">Background</div>
            </div>

            <div className="mx-2 mt-2 text-left">{getText()}</div>

            {/* Generated Emojis */}
            <div className="pb-10">
              <div className="grid grid-cols-2 place-items-center gap-3 px-2">
                {hasBg
                  ? generatedEmojis.map((emoji, i) => (
                      <GeneratedItem
                        key={i}
                        item={emoji}
                        platform={platform}
                        selectedType={selectedType}
                        selected={selectedEmojis.includes(i)}
                        onSelect={() => onSelectEmojis(emoji, i)}
                        selectEnabled={!!platform}
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

              <div
                className={`
                  ${platform ? "flex" : "hidden"}
                  mt-5 justify-center
                  `}
              >
                <button className="h-fit w-fit" onClick={() => exportEmojis()}>
                  <img
                    src={`/images/share/export-${
                      selectedEmojis.length == 0
                        ? "pressed.webp"
                        : "active.webp"
                    }`}
                    alt="Export button"
                    className={`h-auto w-32 ${
                      selectedEmojis.length == 0
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  />
                </button>
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

      {/* Loading */}
      <WizardsLoader show={isGenerating} progress={progress} total={12} />
    </div>
  );
}
