import React from 'react';
import { request } from '@/lib/request';
import FormAddEditAccount from '@/app/components/account/form-add-edit-account';

const EditAccount = async ({ params }: { params: { accountId: number } }) => {
  const getAccountById = async (accountId: number) => {
    const response = await request.get(`account/getById/${accountId}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.data.status != 200) {
      console.error(`Failed to get employee has accountId = ${accountId}`);
    }

    return response.data.data;
  };

  if (params.accountId) {
    var data = await getAccountById(params.accountId);
  }

  return (
    <div>
      <h1 className="text-3xl font-black mb-6">Edit Account</h1>
      <div className="flex justify-center content-center">
        {data ? (
          <FormAddEditAccount data={data} accountId={params.accountId} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default EditAccount;
