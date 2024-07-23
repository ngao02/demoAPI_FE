'use client';
import { ICustomerItemProps } from '@/app/interfaces/common';
import { MapPinned } from 'lucide-react';
import React, { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import dayjs from 'dayjs';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { request } from '@/lib/request';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import Link from 'next/link';

interface IProps {
  data: ICustomerItemProps;
}

const CustomerItem = ({ data }: IProps) => {
  const dateValue = data.business?.incorpDate || data.individual?.birthDate;
  var date = dayjs(dateValue).format('DD/MM/YYYY');

  const [isOpen, setIsOpen] = useState(false);
  const route = useRouter();

  const deleteCustomer = async (custId: number) => {
    try {
      const response = await request.delete(`customer/delete/${custId}`, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        toast.success(response.data.message);

        route.refresh();
      }
    } catch (error: any) {
      if (error.response.data.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="w-[300px] h-[300px] bg-[var(--sub-color-1)] mt-6 p-5 rounded-md  relative">
      <div className="pb-4">
        <p className="font-bold text-lg text-[var(--sub-primary-color)]">
          {data.business?.name ||
            `${data.individual?.firstName} ${data.individual?.lastName}`}
        </p>
        <div className="flex flex-row font-bold">
          <h3 className="text-gray-500 ">CustId: </h3>
          {data.customer.custId}
        </div>
      </div>
      <div className="flex flex-row pb-1">
        <p className="text-gray-500">CustTypeCd: </p>
        {data.customer.custTypeCd}
      </div>
      <div className="flex flex-row pb-1">
        <p className="text-gray-500">Postal Code:</p> {data.customer.postalCode}
      </div>
      <div className="flex flex-row pb-1">
        <p className="text-gray-500 ">State:</p> {data.customer.state}
      </div>
      {data.individual && (
        <div className="flex flex-row pb-1">
          <p className="text-gray-500">Birth Date:</p>
          {date}
        </div>
      )}
      {data.business && (
        <div className="flex flex-row pb-1 ">
          <div className="flex flex-col">
            <p className="text-gray-500 flex flex-row justify-center items-center">
              Incorporation Date:
            </p>
            {date}
          </div>
          <div className="flex flex-col pl-10">
            <p className="text-gray-500">State_Id:</p> {data.business?.stateId}
          </div>
        </div>
      )}
      <div className="flex flex-row justify-start items-start">
        <MapPinned className="pr-1 text-gray-500" />
        <div>
          <div className="flex flex-row">
            <p className="text-gray-500">Address:</p> {data.customer.address}
          </div>
          <div className="flex flex-row">
            <p className="text-gray-500">City:</p> {data.customer.city}
          </div>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer absolute right-4 top-5">
          <p className="text-gray-600 p-1 px-2 hover:bg-slate-200 rounded-full">
            •••
          </p>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full ">
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            Delete
          </DropdownMenuItem>
          <Link href={`customer/customer-edit/${data.customer.custId}`}>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </Link>
          <Link href={`/customer/${data.customer.custId}`}>
            <DropdownMenuItem>Detail</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              You definitely want to delete customer has custId =
              {' ' + data.customer.custId}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Customer has custId ={' ' + data.customer.custId} will be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteCustomer(data.customer.custId);
                setIsOpen(false);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Toaster position="top-center" />
    </div>
  );
};

export default CustomerItem;
