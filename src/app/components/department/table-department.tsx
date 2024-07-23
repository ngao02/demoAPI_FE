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
import { IBranch, IDepartment } from '@/app/interfaces/common';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

import { request } from '@/lib/request';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const TableDepartments = ({ data }: { data: IDepartment[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDeptId, setSelectedDeptId] = useState<number>(1);
  const route = useRouter();
  const deleteDepartment = async (deptId: number) => {
    try {
      const response = await request.delete(`department/delete/${deptId}`, {
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
            <TableHead className="w-[10%] text-center">Dept_Id</TableHead>
            <TableHead className="w-[55%]">Name</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((dept: IDepartment) => (
            <TableRow key={dept.deptId}>
              <TableCell className="text-center font-bold">
                {dept.deptId}
              </TableCell>
              <TableCell>{dept.name}</TableCell>
              <TableCell className="flex flex-row gap-4  pr-28 justify-end ">
                <Link href={`/department/dept-edit/${dept.deptId}`}>
                  <Button variant="edit">
                    <Pencil color="#00000066" size={16} />
                    Edit
                  </Button>
                </Link>

                <Button
                  variant="delete"
                  onClick={() => {
                    setSelectedDeptId(dept.deptId);
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
              You definitely want to delete department has departmentId =
              {' ' + selectedDeptId}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Department has departmentId ={' ' + selectedDeptId} will be
              deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteDepartment(selectedDeptId);
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

export default TableDepartments;
