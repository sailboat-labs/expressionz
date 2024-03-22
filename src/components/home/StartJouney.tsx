import React from "react";

function StartJouney() {
  return (
    <section className="font-presstart w-full space-y-10 bg-[#E5E5E5] py-12 lg:space-y-7 lg:py-16">
      <p className="text-center text-2xl uppercase text-[#2E2E40] lg:text-3xl">
        Start your journey as a:
      </p>

      <div className="flex flex-col items-center justify-center space-y-5 lg:flex-row lg:space-x-8 lg:space-y-0">
        <button>
          <img src="/images/buttons/collector.webp" className="w-48" />
        </button>
        <button>
          <img src="/images/buttons/project-team.webp" className="w-48" />
        </button>
        <button>
          <img src="/images/buttons/community-group.webp" className="w-48" />
        </button>
      </div>
    </section>
  );
}

export default StartJouney;
