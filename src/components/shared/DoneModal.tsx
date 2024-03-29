import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { CopyIcon, ArrowRightIcon } from "@radix-ui/react-icons";

export default function DoneModal({
  show,
  setShow,
  packId,
  platform,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  packId: string;
  platform: string;
}) {
  if (!show) return null;

  return (
    <section
      className="fixed left-0 top-0 z-9999 flex h-screen w-screen bg-black bg-opacity-80"
      onClick={() => setShow(false)}
    >
      <div className="flex h-full w-full items-center justify-center space-y-5 lg:items-end lg:justify-end">
        <div
          className="mx-2 rounded-lg border-2 border-[#C1410B] bg-[#FED7AA] p-8 text-[#C1410B] md:w-4/5 lg:mb-12 lg:mr-12 lg:w-1/2 xl:w-1/3"
          onClick={(e) => e.stopPropagation()}
        >
          {platform === "discord" ? (
            <div className="space-y-5 text-black">
              <p>Export stickers in a few easy steps:</p>
              <div>
                <ol className="mx-5 list-decimal space-y-2 text-black">
                  <li>
                    Copy the ID code
                    <span className="inline w-full items-center">
                      <strong className="ml-2 text-sm text-[#C1410B] lg:text-xl">
                        {packId}
                      </strong>
                      <CopyIcon
                        className="inline h-10 w-10 cursor-pointer px-2 text-[#C1410B]"
                        onClick={() => {
                          navigator.clipboard.writeText(packId);
                          toast.info("ID copied to clipboard!");
                        }}
                      />
                    </span>
                  </li>
                  <li className="pb-2">
                    Connect your Discord server with Expressionz bot
                  </li>
                  <li>Tag bot and enter the ID code</li>
                </ol>
              </div>
              <button
                className="flex items-center rounded-lg bg-[#C1410B] px-4 py-2 text-white  transition-transform hover:scale-105"
                onClick={() => {
                  if (!packId) return;
                  const botLink =
                    "https://discord.com/api/oauth2/authorize?client_id=1207989611880783942&permissions=8797166767104&scope=bot";

                  navigator.clipboard.writeText(packId);

                  const link = document.createElement("a");
                  link.href = botLink;
                  link.target = "_blank";
                  link.click();
                }}
              >
                Continue to Discord
                <ArrowRightIcon className="ml-1 h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-5 text-black">
              <p>Export stickers in a few easy steps:</p>
              <div>
                <ol className="mx-5 list-decimal space-y-2 text-black">
                  <li>
                    Copy the ID code
                    <span className="inline w-full items-center">
                      <strong className="ml-2 text-sm text-[#C1410B] lg:text-xl">
                        {packId}
                      </strong>
                      <CopyIcon
                        className="inline h-10 w-10 cursor-pointer px-2 text-[#C1410B]"
                        onClick={() => {
                          navigator.clipboard.writeText(packId);
                          toast.info("ID copied to clipboard!");
                        }}
                      />
                    </span>
                  </li>
                  <li className="pb-2">
                    Connect your Telegram account with Expressionz bot
                  </li>
                  <li>Enter the ID code</li>
                </ol>
              </div>
              <button
                className="flex transform items-center rounded-lg bg-[#C1410B] px-4 py-2 text-white transition-transform hover:scale-105"
                onClick={() => {
                  const botLink =
                    "https://t.me/XpressionXpress_bot?start=hello";

                  navigator.clipboard.writeText(packId);

                  const link = document.createElement("a");
                  link.href = botLink;
                  link.target = "_blank";
                  link.click();
                }}
              >
                Continue to Telegram
                <ArrowRightIcon className="ml-1 h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
