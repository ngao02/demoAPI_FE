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
import { IAccount, IEmployee } from '@/app/interfaces/common';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

import { request } from '@/lib/request';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

const TableAccounts = ({ data }: { data: IAccount[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState<number>(1);
  const route = useRouter();
  const deleteEmployee = async (accountId: number) => {
    try {
      const response = await request.delete(`account/delete/${accountId}`, {
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
            <TableHead className="w-[8%] text-center">Account Id</TableHead>
            <TableHead className="w-[10%] text-center">Avail Balance</TableHead>
            <TableHead className="w-[10%] text-center">Open Date</TableHead>
            <TableHead className="w-[18%] text-center">Close Date</TableHead>
            <TableHead className="w-[15%] text-center">
              Last Activity Date
            </TableHead>
            <TableHead className="w-[15%] text-center">
              Pending Balance
            </TableHead>
            <TableHead className="w-[10%] text-center">Status</TableHead>
            <TableHead className="w-[10%] text-center">Cust Id</TableHead>
            <TableHead className="w-[10%] text-center">
              Open Branch Id
            </TableHead>
            <TableHead className="w-[10%] text-center">
              Open Employee Id
            </TableHead>
            <TableHead className="w-[10%] text-center">Product Cd</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((acc: IAccount) => (
            <TableRow key={acc.accountId}>
              <TableCell className="text-center font-bold">
                {acc.accountId}
              </TableCell>

              <TableCell className="text-center ">{acc.availBalance}</TableCell>

              <TableCell className="text-center ">
                {dayjs(acc.openDate).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell className="text-center ">
                {dayjs(acc.closeDate).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell className="text-center ">
                {dayjs(acc.lastActivityDate).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell className="text-center ">
                {acc.pendingBalance}
              </TableCell>
              <TableCell className="text-center ">{acc.status}</TableCell>
              <TableCell className="text-center ">{acc.custId}</TableCell>
              <TableCell className="text-center ">{acc.openBranchId}</TableCell>
              <TableCell className="text-center ">{acc.openEmpId}</TableCell>
              <TableCell className="text-center ">{acc.productCd}</TableCell>

              <TableCell className="flex flex-row gap-1  pr-1 justify-end ">
                <Link href={`/account/account-edit/${acc.accountId}`}>
                  <Button variant="edit">
                    <Pencil color="#00000066" size={16} />
                  </Button>
                </Link>

                <Button
                  variant="delete"
                  onClick={() => {
                    setSelectedAccountId(acc.accountId);
                    setIsOpen(true);
                  }}
                >
                  <Trash2 color="#00000066" size={16} />
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
              You definitely want to delete account has accountId =
              {' ' + selectedAccountId}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Account has accountId ={' ' + selectedAccountId} will be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteEmployee(selectedAccountId);
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

export default TableAccounts;
