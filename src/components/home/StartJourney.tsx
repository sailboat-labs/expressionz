import { useState } from "react";
import ContactModal from "../shared/ContactModal";

function StartJourney() {
  const [showContactModal, setShowContactModal] = useState<boolean>(false);

  return (
    <>
      <ContactModal show={showContactModal} setShow={setShowContactModal} />
      <section className="w-full space-y-10 bg-[#E5E5E5] py-12 font-presstart lg:space-y-7 lg:py-16 3xl:space-y-10 3xl:py-24">
        <p className="text-center text-2xl uppercase text-[#2E2E40] lg:text-3xl 3xl:text-4xl">
          Start your journey as a:
        </p>

        <div className="flex flex-col items-center justify-center space-y-5 lg:flex-row lg:space-x-8 lg:space-y-0 3xl:space-x-14">
          <button onClick={() => setShowContactModal(true)}>
            <img
              loading="lazy"
              src="/images/buttons/collector.webp"
              className="w-48 cursor-pointer 3xl:w-80"
              alt="button with 'collector' text"
            />
          </button>

          <button onClick={() => setShowContactModal(true)}>
            <img
              loading="lazy"
              src="/images/buttons/project-team.webp"
              className="w-48 cursor-pointer 3xl:w-80"
              onClick={() => setShowContactModal(true)}
              alt="button with 'project-team' text"
            />
          </button>

          <button onClick={() => setShowContactModal(true)}>
            <img
              loading="lazy"
              src="/images/buttons/community-group.webp"
              className="w-48 cursor-pointer 3xl:w-80"
              alt="button with 'community group' text"
            />
          </button>
        </div>
      </section>
    </>
  );
}

export default StartJourney;
