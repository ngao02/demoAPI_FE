import React from 'react';
import { request } from '@/lib/request';
import FormAddEditEmployee from '@/app/components/employee/form-add-edit-employee';

const EditEmployee = async ({ params }: { params: { empId: number } }) => {
  const getEmployeeById = async (empId: number) => {
    const response = await request.get(`employee/getById/${empId}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.data.status != 200) {
      console.error(`Failed to get employee has empId = ${empId}`);
    }

    return response.data.data;
  };

  if (params.empId) {
    var data = await getEmployeeById(params.empId);
  }

  return (
    <div>
      <h1 className="text-3xl font-black mb-6">Edit Employee</h1>
      <div className="flex justify-center content-center">
        {data ? (
          <FormAddEditEmployee data={data} empId={params.empId} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default EditEmployee;
