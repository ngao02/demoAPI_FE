import FormAddEditEmployee from '@/app/components/employee/form-add-edit-employee';
import React from 'react';

const AddEmployee = () => {
  return (
    <div>
      <h1 className="text-3xl font-black mb-6">Create New Employee</h1>
      <div className=" flex justify-center content-center">
        <FormAddEditEmployee />
      </div>
    </div>
  );
};

export default AddEmployee;
