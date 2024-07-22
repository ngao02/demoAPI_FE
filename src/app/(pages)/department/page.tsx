import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { request } from '@/lib/request';
import { Button } from '@/components/ui/button';
import TableDepartments from '@/app/components/department/table-department';

const Department = async () => {
  async function getDataDepartment() {
    const response = await request.get('department/getAll', {
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.data.status != 200) {
      console.error('Failed to get customers');
    }

    return response.data.data;
  }
  const departments = await getDataDepartment();

  return (
    <div>
      <div className=" flex justify-between">
        <h1 className="text-3xl font-black">Departments</h1>
        <Link href={'/department/dept-add'}>
          <Button variant="custom">
            <Plus color="#00000066" size={20} />
            Add department
          </Button>
        </Link>
      </div>

      <div className="mt-5">
        <TableDepartments data={departments} />
      </div>
    </div>
  );
};

export default Department;
