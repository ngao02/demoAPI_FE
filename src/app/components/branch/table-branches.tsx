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
import { IBranch } from '@/app/interfaces/common';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

import { request } from '@/lib/request';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const TableBranches = ({ data }: { data: IBranch[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState<number>(1);
  const route = useRouter();
  const deleteBranch = async (branchId: number) => {
    try {
      const response = await request.delete(`branch/delete/${branchId}`, {
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
  console.log(data);
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="w-full">
            <TableHead className="w-[5%]">Branch_Id</TableHead>
            <TableHead className="w-[15%]">Name</TableHead>
            <TableHead className="w-[20%]">Address</TableHead>
            <TableHead className="w-[15%]">City</TableHead>
            <TableHead className="w-[15%]">State</TableHead>
            <TableHead className="w-[100px]">Zip_Code</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((branch: IBranch) => (
            <TableRow key={branch.branchId}>
              <TableCell className="text-center font-bold">
                {branch.branchId}
              </TableCell>
              <TableCell>{branch.name}</TableCell>
              <TableCell>{branch.address}</TableCell>
              <TableCell>{branch.city}</TableCell>
              <TableCell>{branch.status}</TableCell>
              <TableCell>{branch.zipCode}</TableCell>
              <TableCell className="flex flex-row gap-4  pr-6 justify-end ">
                <Link href={`/branch/branch-edit/${branch.branchId}`}>
                  <Button variant="edit">
                    <Pencil color="#00000066" size={16} />
                    Edit
                  </Button>
                </Link>

                <Button
                  variant="delete"
                  onClick={() => {
                    setSelectedBranchId(branch.branchId);
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
              You definitely want to delete customer has branchId =
              {' ' + selectedBranchId}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Branch has branchId ={' ' + selectedBranchId} will be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteBranch(selectedBranchId);
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

export default TableBranches;
