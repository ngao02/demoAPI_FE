import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from '@/app/favicon.ico';
import { ThemeProvider } from 'next-themes';
import { DarkMode } from '../dark-mode';

function Header() {
  return (
    <header className="bg-white border-gray-200 border-b-[1px]  px-4 lg:px-6 py-2.5 dark:bg-gray-800 sticky top-0  w-full z-50">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <Link href="/" className="flex items-center">
          <Image className="mr-3 h-6 w-9 sm:h-9" src={logo} alt="Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            DemoAPI
          </span>
        </Link>
        <div className="flex items-center lg:order-2">
          <Link
            href="/login"
            className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
          >
            Log in
          </Link>
          <DarkMode />
        </div>
      </div>
    </header>
  );
}

export default Header;
