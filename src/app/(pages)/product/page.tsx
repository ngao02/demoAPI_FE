import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { request } from '@/lib/request';
import { Button } from '@/components/ui/button';
import TableProducts from '@/app/components/product/table-product';

const Product = async () => {
  async function getDataProduct() {
    const response = await request.get('product/getAll', {
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.data.status != 200) {
      console.error('Failed to get customers');
    }

    return response.data.data;
  }
  const products = await getDataProduct();

  return (
    <div>
      <div className=" flex justify-between">
        <h1 className="text-3xl font-black">Products</h1>
        <Link href={'/product/product-add'}>
          <Button variant="custom">
            <Plus color="#00000066" size={20} />
            Add product
          </Button>
        </Link>
      </div>

      <div className="mt-5">
        <TableProducts data={products} />
      </div>
    </div>
  );
};

export default Product;
