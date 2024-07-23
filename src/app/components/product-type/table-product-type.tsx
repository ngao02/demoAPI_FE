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
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { request } from '@/lib/request';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { IProductType } from '@/app/interfaces/common';

const TableProductTypes = ({ data }: { data: IProductType[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProductTypeCd, setSelectedProductTypeCd] =
    useState<string>('');
  const route = useRouter();
  const deleteProductType = async (productTypeCd: string) => {
    try {
      const response = await request.delete(
        `productType/delete/${productTypeCd}`,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

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
            <TableHead className="w-[10%] text-center">
              Product Type Cd
            </TableHead>
            <TableHead className="w-[55%]">Name</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((productType: IProductType) => (
            <TableRow key={productType.productTypeCd}>
              <TableCell className="text-center font-bold">
                {productType.productTypeCd}
              </TableCell>
              <TableCell>{productType.name}</TableCell>
              <TableCell className="flex flex-row gap-4  pr-28 justify-end ">
                <Link
                  href={`/product-type/product-type-edit/${productType.productTypeCd}`}
                >
                  <Button variant="edit">
                    <Pencil color="#00000066" size={16} />
                    Edit
                  </Button>
                </Link>

                <Button
                  variant="delete"
                  onClick={() => {
                    setSelectedProductTypeCd(productType.productTypeCd);
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
              You definitely want to delete ProductType has ProductTypeCd =
              {' ' + selectedProductTypeCd}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              ProductType has ProductTypeCd ={' ' + selectedProductTypeCd} will
              be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteProductType(selectedProductTypeCd);
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

export default TableProductTypes;
