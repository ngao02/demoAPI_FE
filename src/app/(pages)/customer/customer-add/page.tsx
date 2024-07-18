import FormAddCustomer from '@/app/components/customer/form-add-customer';
import React from 'react';

const AddCustomer = () => {
  return (
    <div>
      <h1 className="text-3xl font-black mb-6">Create New Customer</h1>
      <div className=" flex justify-center content-center">
        <FormAddCustomer />
      </div>
    </div>
  );
};

export default AddCustomer;
