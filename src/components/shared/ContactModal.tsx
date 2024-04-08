import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "sonner";

export default function ContactModal({
  show,
  setShow,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}) {
  const [email, setEmail] = useState("");
  const [xHandle, setXHandle] = useState("");

  function handleSubmit() {
    if (!email && !xHandle) return toast.info("No details provided");

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const valid = emailRegex.test(email);
      if (!valid) return toast.error("Invalid email address");
    }

    if (email && xHandle) return toast.success("Email and X handle submitted!");

    if (email) return toast.success("Email submitted!");

    if (xHandle) return toast.success("X handle submitted!");
  }

  if (!show) return null;

  return (
    <section
      className="fixed left-0 top-0 z-9999 flex h-screen w-screen bg-black bg-opacity-80"
      onClick={() => setShow(false)}
    >
      <div className="flex h-full w-full items-center justify-center space-y-5">
        <div
          className="font-presstart relative h-auto w-[90%] bg-[#D9D9D9] pb-8 pt-12 lg:w-1/2 lg:px-12 lg:py-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute right-3 top-3">
            <IoClose
              className="h-6 w-6 text-black"
              onClick={() => setShow(false)}
            />
          </div>
          <p className="mb-5 text-center text-base uppercase text-[#6565AD] lg:text-xl">
            Please, leave your details so we can contact you
          </p>
          <div className="mb-5 flex w-full flex-col items-center justify-between space-y-5 lg:flex-row lg:space-y-0">
            <div className="w-4/5 space-y-2 lg:w-2/5">
              <p className="text-xs text-[#2E2E40]">Your Email</p>
              <input
                type="email"
                name="email"
                id="email"
                className="h-9 w-full rounded bg-white px-3 font-sans text-sm text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <p className="text-xs text-[#6565AD]">OR</p>
            <div className="w-4/5 space-y-2 lg:w-2/5">
              <p className="flex items-center text-xs text-[#2E2E40]">
                <img src="/images/logos/x-dark.webp" className="mr-2 h-5 w-5" />
                Handle
              </p>
              <input
                type="email"
                name="email"
                id="email"
                className="h-9 w-full rounded bg-white px-3 font-sans text-sm text-black"
                value={xHandle}
                onChange={(e) => setXHandle(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center pt-3">
            <button
              onClick={() => {
                handleSubmit();

                setXHandle("");
                setEmail("");
                setShow(false);
              }}
            >
              <img
                src="/images/buttons/submit.webp"
                className="h-auto w-48 object-contain"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
