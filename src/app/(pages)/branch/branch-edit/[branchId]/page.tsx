import FormAddEditBranch from '@/app/components/branch/form-add-edit-branch';
import { request } from '@/lib/request';
import React from 'react';

const BranchEdit = async ({ params }: { params: { branchId: number } }) => {
  const getDataBranchById = async (branchId: number) => {
    const response = await request.get(`branch/getById/${branchId}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.data.status != 200) {
      console.error(`Failed to get customer has branchId = ${branchId}`);
    }
    return response.data.data;
  };

  if (params.branchId) {
    var data = await getDataBranchById(params.branchId);
  }
  return (
    <div>
      <h1 className="text-3xl font-black mb-6">Edit Branch</h1>
      <div className=" flex justify-center content-center">
        {data ? (
          <FormAddEditBranch data={data} branchId={params.branchId} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default BranchEdit;
