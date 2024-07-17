import { ICustomer, ICustomerItemProps } from '@/app/interfaces/common';
import { MapPinned } from 'lucide-react';
import React from 'react';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface IProps {
  data: ICustomerItemProps;
}

const CustomerItem = ({ data }: IProps) => {
  return (
    <div className="w-[300px] h-[300px] bg-[var(--sub-color-1)] mt-6 p-5 rounded-md cursor-pointer relative">
      <div className="pb-4">
        <p className="font-bold text-lg">
          {data.business?.name ||
            `${data.individual?.firstName} ${data.individual?.lastName}`}
        </p>
        <div className="flex flex-row">
          <h3 className="text-gray-500">CustId:</h3> {data.customer.custId}
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
          {data.individual.birthDate}
        </div>
      )}

      {data.business && (
        <div className="flex flex-row pb-1 ">
          <div className="flex flex-col">
            <p className="text-gray-500 flex flex-row justify-center items-center">
              Incorporation Date:
            </p>
            {data.business.incorpDate}
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
          <DropdownMenuItem>Delete</DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CustomerItem;
