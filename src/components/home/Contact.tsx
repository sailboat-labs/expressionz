import React from "react";

function Contact() {
  return (
    <section className="font-presstart w-full space-y-10 py-12 lg:space-y-7 lg:py-32 3xl:space-y-14">
      <p className="text-center text-2xl uppercase text-white lg:text-3xl 3xl:text-4xl">
        Get in touch
      </p>

      <div className="flex flex-col items-center justify-center space-y-5 lg:flex-row lg:space-x-8 lg:space-y-0">
        <button>
          <img
            src="/images/buttons/twitter.webp"
            className="w-32 lg:w-40 3xl:w-60"
          />
        </button>
        <button>
          <img
            src="/images/buttons/email.webp"
            className="w-80 3xl:w-[500px]"
          />
        </button>
      </div>
    </section>
  );
}

export default Contact;
