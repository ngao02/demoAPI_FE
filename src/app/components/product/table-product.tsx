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
import { IProduct } from '@/app/interfaces/common';

const TableProducts = ({ data }: { data: IProduct[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProductCd, setSelectedProductCd] = useState<string>('');
  const route = useRouter();
  const deleteProduct = async (productCd: string) => {
    try {
      const response = await request.delete(`product/delete/${productCd}`, {
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
            <TableHead className="w-[10%] text-center">Product Cd</TableHead>
            <TableHead className="w-[20%]">Name</TableHead>
            <TableHead className="w-[20%]">Date Offered</TableHead>
            <TableHead className="w-[20%]">Date Retired</TableHead>
            <TableHead className="w-[10%]">Product Type Cd</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((product: IProduct) => (
            <TableRow key={product.productCd}>
              <TableCell className="text-center font-bold">
                {product.productCd}
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.dateOffered}</TableCell>
              <TableCell>{product.dateRetired}</TableCell>
              <TableCell className="text-center">
                {product.productTypeCd}
              </TableCell>
              <TableCell className="flex flex-row gap-4  pr-4 justify-end ">
                <Link href={`/product/product-edit/${product.productCd}`}>
                  <Button variant="edit">
                    <Pencil color="#00000066" size={16} />
                    Edit
                  </Button>
                </Link>

                <Button
                  variant="delete"
                  onClick={() => {
                    setSelectedProductCd(product.productCd);
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
              You definitely want to delete Product has ProductCd =
              {' ' + selectedProductCd}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Product has ProductCd ={' ' + selectedProductCd} will be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteProduct(selectedProductCd);
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

export default TableProducts;
