import FormAddEditBranch from '@/app/components/branch/form-add-edit-branch';
import React from 'react';

const BranchAdd = () => {
  return (
    <div>
      <h1 className="text-3xl font-black mb-6">Create New Branch</h1>
      <div className=" flex justify-center content-center">
        <FormAddEditBranch />
      </div>
    </div>
  );
};

export default BranchAdd;
