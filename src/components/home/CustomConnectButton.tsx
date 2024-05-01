/* eslint-disable @next/next/no-img-element */

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import Button, { TButtonColor } from "../shared/Button";

const CustomConnectButton = ({
  text,
  id,
  className = "",
  color = "purple",
}: {
  text: string;
  id?: string;
  className?: string;
  color?: TButtonColor;
}) => {
  const router = useRouter();
  // const { setAuth } = useContext(AuthContext);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        if (connected)
          console.log({ account, chain, authenticationStatus, mounted });

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    text={text}
                    color={color}
                    onClick={openConnectModal}
                    id={id}
                    classes={className}
                  />
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    text="Wrong network"
                    color="blue"
                    onClick={openChainModal}
                    id={id}
                    classes={className}
                  />
                );
              }

              return (
                <Button
                  text={text}
                  color="purple"
                  onClick={() => router.push("/collections")}
                  id={id}
                  classes={className}
                />
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomConnectButton;
