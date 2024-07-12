'use client'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

import logo from "../../public/logo.svg";
import classNames from "@/utils/classNames";

import { usePathname } from "next/navigation";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Add", href: "/repo/add", current: false },
  { name: "Repos", href: "/repo/list", current: false },
];

export default function Header({ session, user }) {
  const profile = {
    name: session ? session.user.name : "Guest",
    email: session ? session.user.email : "unknown",
    imageUrl: session
      ? session.user.image
      : "https://images.unsplash.com/photo-1589254066213-a0c9dc853511?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };
  let userNavigation = [];

  if (user) {
    userNavigation = [
      { name: "Settings", href: "/account/profile" },
      { name: "Sign Out", href: "#" },
    ];
  }


  const path = usePathname();

  return (
    <Disclosure as="header" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-700 lg:px-8">
        <div className="relative flex h-16 justify-between">
          <div className="relative z-10 flex px-2 lg:px-0 gap-6">
            <div className="flex flex-shrink-0 items-center">
              <Image
                alt="Open Source HealthCheck"
                src={logo}
                className="h-8 w-auto"
                height={32}
                width={32}
              />
            </div>
            <div className="flex items-end text-gray-400 text-xl">
              The Open Source HealthCheck
            </div>
          </div>
          <div className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
            <div className="w-full sm:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-400"
                  />
                </div>
                <input
                  id="search"
                  name="search"
                  type="search"
                  placeholder="Search"
                  disabled={true}
                  className="block w-full rounded-md border-0 bg-gray-700 py-1.5 pl-10 pr-3 text-gray-300 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="relative z-10 flex items-center lg:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
            {/* <button
              type="button"
              className="relative flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button> */}

            {/* Profile dropdown */}
            {session && (
              <Menu as="div" className="relative ml-4 flex-shrink-0">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <Image
                      alt="Profile picture of logged in user"
                      src={user.imageUrl}
                      className="h-8 w-8 rounded-full"
                      height={32}
                      width={32}
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  {userNavigation.map((item) => (
                    <MenuItem key={item.name}>
                      <Link
                        href={item.href}
                        className='block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 active:bg-gray-700 active:text-white'
                      >
                        {item.name}
                      </Link>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            )}
          </div>
        </div>
        <nav
          aria-label="Global"
          className="hidden lg:flex lg:space-x-8 lg:py-2"
        >
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                path === item.href ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
  
             
            >

              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <DisclosurePanel as="nav" aria-label="Global" className="lg:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              className={`
                ${path === item.href ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}
                block rounded-md px-3 py-2 text-base font-medium
              `}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
        {session && (
          <div className="border-t border-gray-700 pb-3 pt-4">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <Image
                  alt="Profile picture of logged in user"
                  src={user.imageUrl}
                  className="h-10 w-10 rounded-full"
                  height={48}
                  width={48}
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">
                  {user.name}
                </div>
                <div className="text-sm font-medium text-gray-400">
                  {user.email}
                </div>
              </div>
              <button
                type="button"
                className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-3 space-y-1 px-2">
              {userNavigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </div>
        )}
      </DisclosurePanel>
    </Disclosure>
  );
}
