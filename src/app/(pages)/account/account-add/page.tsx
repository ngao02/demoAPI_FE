import FormAddEditAccount from '@/app/components/account/form-add-edit-account';
import React from 'react';

const AddEmployee = () => {
  return (
    <div>
      <h1 className="text-3xl font-black mb-6">Create New Account</h1>
      <div className=" flex justify-center content-center">
        <FormAddEditAccount />
      </div>
    </div>
  );
};

export default AddEmployee;
