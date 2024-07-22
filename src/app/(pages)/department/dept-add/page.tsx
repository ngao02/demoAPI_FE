import FormAddEditDepartment from '@/app/components/department/form-add-edit-department';
import React from 'react';

const DeptAdd = () => {
  return (
    <div>
      <h1 className="text-3xl font-black mb-6">Create New Department</h1>
      <div className=" flex justify-center content-center">
        <FormAddEditDepartment />
      </div>
    </div>
  );
};

export default DeptAdd;
