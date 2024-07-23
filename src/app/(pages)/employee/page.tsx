import TableEmployees from '@/app/components/employee/table-employee';
import { Button } from '@/components/ui/button';
import { request } from '@/lib/request';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

async function getDataEmployee() {
  const response = await request.get('employee/getAll', {
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.data.status != 200) {
    console.error('Failed to get employees');
  }

  return response.data.data;
}
async function Employee() {
  const employees = await getDataEmployee();

  return (
    <div>
      <div className=" flex justify-between">
        <h1 className="text-3xl font-black">Employees</h1>
        <Link href={'/employee/employee-add'}>
          <Button variant="custom">
            <Plus color="#00000066" size={20} />
            Add employee
          </Button>
        </Link>
      </div>
      <div className="mt-5">
        <TableEmployees data={employees} />
      </div>
    </div>
  );
}

export default Employee;
