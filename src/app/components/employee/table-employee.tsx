'use client';
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { IEmployee } from '@/app/interfaces/common';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

import { request } from '@/lib/request';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

const TableEmployees = ({ data }: { data: IEmployee[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmpId, setSelectedEmpId] = useState<number>(1);
  const route = useRouter();
  const deleteEmployee = async (empId: number) => {
    try {
      const response = await request.delete(`employee/delete/${empId}`, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        route.refresh();
      }
    } catch (error: any) {
      if (error.response.data.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="w-full">
            <TableHead className="w-[8%] text-center">Emp_Id</TableHead>
            <TableHead className="w-[10%]">First Name</TableHead>
            <TableHead className="w-[10%]">Last Name</TableHead>
            <TableHead className="w-[18%] text-center">Title</TableHead>
            <TableHead className="w-[15%] text-center">Start Day</TableHead>
            <TableHead className="w-[15%] text-center">End Day</TableHead>
            <TableHead className="w-[10%]">Assigned Branch Id</TableHead>
            <TableHead className="w-[10%]">Dept Id</TableHead>
            <TableHead className="w-[10%]">Superior Emp Id</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((emp: IEmployee) => (
            <TableRow key={emp.empId}>
              <TableCell className="text-center font-bold">
                {emp.empId}
              </TableCell>

              <TableCell className="text-center ">{emp.firstName}</TableCell>
              <TableCell className="text-center ">{emp.lastName}</TableCell>
              <TableCell className="text-center ">{emp.title}</TableCell>
              <TableCell className="text-center ">
                {dayjs(emp.startDay).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell className="text-center ">
                {dayjs(emp.endTime).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell className="text-center font-bold">
                {emp.assignedBranchId}
              </TableCell>
              <TableCell className="text-center font-bold">
                {emp.deptId}
              </TableCell>
              <TableCell className="text-center font-bold ">
                {emp.superiorEmpId}
              </TableCell>

              <TableCell className="flex flex-row gap-1  pr-1 justify-end ">
                <Link href={`/employee/employee-edit/${emp.empId}`}>
                  <Button variant="edit">
                    <Pencil color="#00000066" size={16} />
                    Edit
                  </Button>
                </Link>

                <Button
                  variant="delete"
                  onClick={() => {
                    setSelectedEmpId(emp.empId);
                    setIsOpen(true);
                  }}
                >
                  <Trash2 color="#00000066" size={16} />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>sd</TableFooter> */}
      </Table>
      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              You definitely want to delete employee has empId =
              {' ' + selectedEmpId}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Employee has empId ={' ' + selectedEmpId} will be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteEmployee(selectedEmpId);
                setIsOpen(false);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Toaster position="top-center" />
    </>
  );
};

export default TableEmployees;
