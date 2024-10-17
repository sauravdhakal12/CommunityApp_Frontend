import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'CommunitiesApp', href: '#', current: true },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]
// const communities = [
//   { name: "Community1", desc: "Lorem", private: true, price: "Free", members: 1200 },
//   { name: "Community2", desc: "Lorem", private: true, price: "Free", members: 200 },
//   { name: "Community3", desc: "Lorem", private: false, price: "Paid", members: 1600 },
//   { name: "Community4", desc: "Lorem", private: true, price: "Paid", members: 5200 },
//   { name: "Community5", desc: "Lorem", private: false, price: "Free", members: 9100 },
//   { name: "Community6", desc: "Lorem", private: true, price: "Paid", members: 2000 },
// ]

type communities_type = {
  id: string,
  name: string,
  desc: string,
  private: boolean,
  price: number,
  membercount: number,
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function CommunityCard({
  id, name, desc, isPrivate, price, members
}:
  { id:string, name: string, desc: string, isPrivate: boolean, price: number, members: number }) {
  return (
    <Link className="max-w-6xl px-4 py-6 sm:px-6 lg:px-8 text-white" href={"https://localhost:3000/community/" + id}>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiFevKxJrbPBVlILYjNXA_sRs0uv3wx57e7w&s" alt="Sunset in the mountains" />
        <div className="px-6 py-4 bg-stone-900">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-base line-clamp-3">
            {desc}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2 bg-stone-900">
          <span className="inline-block bg-stone-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">{isPrivate ? "Private" : "Public"}</span>
          <span className="inline-block bg-stone-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">{members < 1000 ? members : members / 1000 + "K"} members</span>
          <span className="inline-block bg-stone-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">{Number(price) === 0 ? "Free" : "$" + price}</span>
        </div>
      </div>
    </Link >
  )
}

export default async function Example() {
  const communities_data = await axios.get("https://localhost:4000/community");
  const communities = communities_data.data.data;
  console.log(communities);

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-stone-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {/* <Image
                    width={20}
                    height={20}
                    alt="Your Company"
                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                    className="h-8 w-8"
                  /> */}
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current ? 'bg-stone-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="h-6 w-6" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img alt="" src={user.imageUrl} className="h-8 w-8 rounded-full" />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          <a
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                          >
                            {item.name}
                          </a>
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img alt="" src={user.imageUrl} className="h-10 w-10 rounded-full" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">{user.name}</div>
                  <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
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
          </DisclosurePanel>
        </Disclosure>

        <header className="bg-white shadow">
          <div className="flex flex-col isolate overflow-hidden bg-zinc-800 py-24 sm:py-32 text-center">
            {/* <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center" /> */}
            {/* <div className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl" aria-hidden="true">
                <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style={{"clipPath": "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"}}></div>
              </div> */}
            {/* <div className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu" aria-hidden="true">
                <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style={{"clipPath": "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"}}></div>
              </div> */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Discover Communities</h2>
                <p className="mt-6 text-2xl leading-8 text-gray-300">or create your own</p>
              </div>
              <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
              </div>
            </div>


            <form className="max-w-md mx-auto w-full">
              <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-stone-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Communities" required />
                {/* <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
              </div>
            </form>

          </div>

        </header>
        <main className="bg-zinc-800 grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
          {/* <main> */}

          {/* <div className="max-w-6xl px-4 py-6 sm:px-6 lg:px-8 text-white">
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <img className="w-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiFevKxJrbPBVlILYjNXA_sRs0uv3wx57e7w&s" alt="Sunset in the mountains" />
              <div className="px-6 py-4 bg-stone-900">
                <div className="font-bold text-xl mb-2">Community 1</div>
                <p className="text-base line-clamp-3">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                </p>
              </div>
              <div className="px-6 pt-4 pb-2 bg-stone-900">
                <span className="inline-block bg-stone-900 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">Private</span>
                <span className="inline-block bg-stone-900 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">1.2K Members</span>
                <span className="inline-block bg-stone-900 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">Paid</span>
              </div>
            </div>
          </div>

          <div className="max-w-6xl px-4 py-6 sm:px-6 lg:px-8 text-white">
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <img className="w-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiFevKxJrbPBVlILYjNXA_sRs0uv3wx57e7w&s" alt="Sunset in the mountains" />
              <div className="px-6 py-4 bg-stone-900">
                <div className="font-bold text-xl mb-2">Community 2</div>
                <p className="text-base line-clamp-3">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                </p>
              </div>
              <div className="px-6 pt-4 pb-2 bg-stone-900">
                <span className="inline-block bg-stone-900 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">Private</span>
                <span className="inline-block bg-stone-900 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">6.8K Members</span>
                <span className="inline-block bg-stone-900 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">Free</span>
              </div>
            </div>
          </div> */}

          {communities.map((community: communities_type) => (
            <CommunityCard
              id={community.id}
              name={community.name}
              desc={community.desc}
              isPrivate={community.private}
              price={community.price}
              members={community.membercount}
            />
          ))}
        </main>
      </div>
    </>
  )
}

