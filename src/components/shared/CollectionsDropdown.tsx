import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function Collections() {
  const router = useRouter();

  return (
    <div className="w-52 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full items-center justify-center rounded-md text-xs font-medium text-white">
            Collections
            <IoIosArrowDown
              className="-mr-1 ml-1 h-5 w-5 text-white"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-44 origin-top-right rounded-md bg-darkPurple shadow-lg">
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-yellow bg-opacity-25" : "bg-transparent"
                    } group flex w-full items-center rounded-md px-2 py-2 text-xs text-white`}
                    onClick={() => router.push("/collections/moonbirds")}
                  >
                    Moonbirds
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-yellow bg-opacity-25" : "bg-transparent"
                    } group flex w-full items-center rounded-md px-2 py-2 text-xs text-white`}
                    onClick={() => router.push("/collections/wizards")}
                  >
                    Wizards
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
