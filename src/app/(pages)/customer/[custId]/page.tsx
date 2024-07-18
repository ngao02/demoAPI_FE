'use client';
import { ICustomer, ICustomerItemProps } from '@/app/interfaces/common';
import { request } from '@/lib/request';
import dayjs from 'dayjs';
import { MapPinned } from 'lucide-react';
import { useEffect, useState } from 'react';

const CustomerDetail = ({ params }: { params: { custId: number } }) => {
  const [customerDetail, setCustomerDetail] =
    useState<ICustomerItemProps | null>(null);

  const getDataCustomerById = async (custId: number) => {
    const response = await request.get(`customer/getById/${custId}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.data.status != 200) {
      console.error(`Failed to get customer has custId = ${custId}`);
    }

    return response.data.customer;
  };

  useEffect(() => {
    if (params.custId) {
      getDataCustomerById(params.custId).then((data) => {
        setCustomerDetail(data);
      });
    }
  }, [params.custId]);
  const dateValue =
    customerDetail?.business?.incorpDate ||
    customerDetail?.individual?.birthDate;
  const date = dateValue ? dayjs(dateValue).format('DD/MM/YYYY') : '';

  return (
    <div>
      <h1 className="text-3xl font-black">Detail Customer</h1>
      {customerDetail ? (
        <div className="w-[300px] h-[300px] bg-[var(--sub-color-1)] mt-6 p-5 rounded-md  relative">
          <div className="pb-4">
            <p className="font-bold text-lg">
              {customerDetail.business?.name ||
                `${customerDetail.individual?.firstName} ${customerDetail.individual?.lastName}`}
            </p>
            <div className="flex flex-row">
              <h3 className="text-gray-500">CustId:</h3>{' '}
              {customerDetail.customer.custId}
            </div>
          </div>
          <div className="flex flex-row pb-1">
            <p className="text-gray-500">CustTypeCd: </p>
            {customerDetail.customer.custTypeCd}
          </div>
          <div className="flex flex-row pb-1">
            <p className="text-gray-500">Postal Code:</p>{' '}
            {customerDetail.customer.postalCode}
          </div>
          <div className="flex flex-row pb-1">
            <p className="text-gray-500 ">State:</p>{' '}
            {customerDetail.customer.state}
          </div>
          {customerDetail.individual && (
            <div className="flex flex-row pb-1">
              <p className="text-gray-500">Birth Date:</p>
              {date}
            </div>
          )}
          {customerDetail.business && (
            <div className="flex flex-row pb-1 ">
              <div className="flex flex-col">
                <p className="text-gray-500 flex flex-row justify-center items-center">
                  Incorporation Date:
                </p>
                {date}
              </div>
              <div className="flex flex-col pl-10">
                <p className="text-gray-500">State_Id:</p>{' '}
                {customerDetail.business?.stateId}
              </div>
            </div>
          )}
          <div className="flex flex-row justify-start items-start">
            <MapPinned className="pr-1 text-gray-500" />
            <div>
              <div className="flex flex-row">
                <p className="text-gray-500">Address:</p>{' '}
                {customerDetail.customer.address}
              </div>
              <div className="flex flex-row">
                <p className="text-gray-500">City:</p>{' '}
                {customerDetail.customer.city}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CustomerDetail;
