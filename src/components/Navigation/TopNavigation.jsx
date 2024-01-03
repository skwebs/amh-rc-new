import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import { navigation } from "@/constants/links";
import { useSelector } from "react-redux";
import { useLogout } from "@/hooks/useAuth";
// @ts-ignore
import dummyUser from "@/assets/dummy-user.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TopNavigation = () => {
  // @ts-ignore
  const { isAuthenticated } = useSelector((state) => state.auth); // useStore(authZustandStore);

  const { mutateAsync: mutateLogout } = useLogout();

  const logout = () => {
    mutateLogout();
  };

  return (
    <Disclosure as="nav" className="bg-gray-800 sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <Link to={`/`} className="flex flex-shrink-0 items-center">
                  <span className="text-white font-semibold">AMH</span>
                </Link>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      // <NavLink key={item.name} to={item.href} className={({ isActive }) => classNames(isActive ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white", "block rounded-md px-3 py-2 text-base font-medium")} aria-current={item.current ? "page" : undefined}>
                      //   {item.name}
                      // </NavLink>

                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                          `${
                            isActive
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white"
                          } block rounded-md px-3 py-2 text-base font-medium"}`
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}

                    {/* {isAuthenticated &&
                      navigation.map(
                        (item) =>
                          item.protected && (
                            <NavLink key={item.name} to={item.href} className={classNames(item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white", "block rounded-md px-3 py-2 text-base font-medium")} aria-current={item.current ? "page" : undefined}>
                              {item.name}
                            </NavLink>
                          )
                      )}

                    {!isAuthenticated &&
                      navigation.map(
                        (item) =>
                          !item.protected && (
                            <Link key={item.name} to={item.href} className={classNames(item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white", "block rounded-md px-3 py-2 text-base font-medium")} aria-current={item.current ? "page" : undefined}>
                              {item.name}
                            </Link>
                          )
                      )} */}

                    {/* {isAuthenticated ? (
                      <button className='text-white ' type='button' onClick={() => logout()}>
                        Logout
                      </button>
                    ) : (
                      <Link to={`/login`} className='bg-gray-900 text-white hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'>
                        Login
                      </Link>
                    )} */}

                    {/* {navigation.map(
                      (item) =>
                        item.protected === isAuthenticated && (
                          <div key={item.name} className='text-white'>
                            {item.protected && "protected"}
                          </div>
                        )
                    )} */}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="text-gray-400 hover:text-white  relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      {isAuthenticated ? (
                        <>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={dummyUser}
                            alt="User Profile Image"
                          />
                        </>
                      ) : (
                        <>
                          <UserCircleIcon
                            className="size-8"
                            aria-hidden="true"
                          />
                        </>
                      )}
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {isAuthenticated ? (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to={`/profile`}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Profile
                              </Link>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to={`Settings`}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Settings
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => logout()}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700 w-full text-left border-t"
                                )}
                              >
                                Logout
                              </button>
                            )}
                          </Menu.Item>
                        </>
                      ) : (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={`/login`}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Login
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
export default TopNavigation;
