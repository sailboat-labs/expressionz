import BaseLayout from "@/components/shared/BaseLayout";
import Seo from "@/components/shared/Seo";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { motion } from "framer-motion";

const CollectionsPage = () => {
  return (
    <>
      <Seo title="Collections" />
      <BaseLayout>
        <h1
          className={cn(
            "pb-16 pt-8 text-center text-3xl text-yellow md:my-10 md:text-5xl",
          )}
        >
          Collections
        </h1>
        <section>
          <div
            className={cn(
              "mx-auto grid max-w-md place-content-center gap-8 sm:flex sm:grid-cols-2",
              "md:max-w-7xl md:gap-20",
            )}
          >
            <motion.div className="w-fit" whileHover={{ scale: 1.15 }}>
              <Link
                className={cn(
                  "flex flex-col items-center",
                  "max-w-[300px]  border-2 border-yellow p-4 pb-0",
                )}
                href="/collections/moonbirds"
              >
                <strong
                  className={cn(
                    "font-presstart translate-y-4 uppercase text-yellow",
                  )}
                >
                  Moonbirds
                </strong>
                <img
                  className="h-auto w-[200px]"
                  src="/images/moonbird.png"
                  alt="moonbird"
                />
              </Link>
            </motion.div>
            <motion.div className="w-fit" whileHover={{ scale: 1.15 }}>
              <Link
                className={cn(
                  "flex flex-col items-center",
                  "h-full max-w-[300px] border-2 border-yellow px-4 pb-0 pt-8",
                )}
                href="/collections/wizards"
              >
                <strong className={cn("font-presstart uppercase text-yellow")}>
                  Wizards
                </strong>
                <img
                  className="h-auto w-[200px]"
                  src="/images/wizard.png"
                  alt="moonbird"
                />
              </Link>
            </motion.div>
          </div>
        </section>
      </BaseLayout>
    </>
  );
};

export default CollectionsPage;
