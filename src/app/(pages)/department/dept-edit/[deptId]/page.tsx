import FormAddEditDepartment from '@/app/components/department/form-add-edit-department';
import { request } from '@/lib/request';
import React from 'react';

const DeptEdit = async ({ params }: { params: { deptId: number } }) => {
  const getDataDeptById = async (deptId: number) => {
    const response = await request.get(`department/getById/${deptId}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.data.status != 200) {
      console.error(`Failed to get customer has departmentId = ${deptId}`);
    }

    return response.data.data;
  };

  if (params.deptId) {
    var data = await getDataDeptById(params.deptId);
  }
  return (
    <div>
      <h1 className="text-3xl font-black mb-6">Edit Department</h1>
      <div className=" flex justify-center content-center">
        {data ? (
          <FormAddEditDepartment data={data} deptId={params.deptId} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default DeptEdit;
