'use client';
import clsx from 'clsx';
import { User, CreditCard, Users, Building, Box, Package } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

const navItems = [
  {
    href: '/customer',
    icon: <User strokeWidth={1.5} />,
    label: 'Customer',
  },
  {
    href: '/account',
    icon: <CreditCard strokeWidth={1.5} />,
    label: 'Account',
  },
  {
    href: '/acc-transition',
    icon: <CreditCard strokeWidth={1.5} />,
    label: 'Acc_Transition',
  },
  {
    href: '/employee',
    icon: <Users strokeWidth={1.5} />,
    label: 'Employee',
  },
  {
    href: '/branch',
    icon: <Building strokeWidth={1.5} />,
    label: 'Branch',
  },
  {
    href: '/department',
    icon: <Building strokeWidth={1.5} />,
    label: 'Department',
  },
  {
    href: '/product',
    icon: <Box strokeWidth={1.5} />,
    label: 'Product',
  },
  {
    href: '/product-type',
    icon: <Package strokeWidth={1.5} />,
    label: 'Product_Type',
  },
];

const Navbar: React.FC = () => {
  const [activeItem, setActiveItem] = useState(navItems[0].href);
  return (
    <nav className=" flex-col w-52 pt-8 border-r-[1px] hidden md:flex bg-[var(--sub-color-1)] h-[1000px] fixed top-[60px]">
      {navItems.map((item, index) => (
        <Link
          href={item.href}
          key={index}
          onClick={() => setActiveItem(item.href)}
          className={clsx(
            'flex flex-row mt-1 rounded-sm  p-5 hover:bg-[var(--light-primary-color)] hover:text-[var(--sub-primary-color)] group',
            {
              'bg-[var(--light-primary-color)] text-[var(--sub-primary-color)]':
                activeItem === item.href,
            },
          )}
        >
          <div
            className={clsx(
              'pr-3 text-gray-400 group-hover:text-[var(--sub-primary-color)]',
              {
                '!text-[var(--sub-primary-color)]': activeItem === item.href,
              },
            )}
          >
            {item.icon}
          </div>
          <p className="font-[600] text-base">{item.label}</p>
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
