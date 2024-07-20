import React, { useState } from 'react';
import FormAddEditCustomer from '@/app/components/customer/form-add-edit-customer';
import { request } from '@/lib/request';

const EditCustomer = async ({ params }: { params: { custId: number } }) => {
  const getDataCustomerById = async (custId: number) => {
    const response = await request.get(`customer/getById/${custId}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.data.status != 200) {
      console.error(`Failed to get customer has custId = ${custId}`);
    }

    return response.data.customer;
  };

  if (params.custId) {
    var data = await getDataCustomerById(params.custId);
  }

  return (
    <div>
      <h1 className="text-3xl font-black mb-6">Edit Customer</h1>
      <div className="flex justify-center content-center">
        {data ? (
          <FormAddEditCustomer data={data} custId={params.custId} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default EditCustomer;
