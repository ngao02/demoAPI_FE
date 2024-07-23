import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { request } from '@/lib/request';
import { Button } from '@/components/ui/button';
import TableProductTypes from '@/app/components/product-type/table-product-type';

const ProductType = async () => {
  async function getDataProductType() {
    const response = await request.get('productType/getAll', {
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.data.status != 200) {
      console.error('Failed to get customers');
    }

    return response.data.data;
  }
  const productTypes = await getDataProductType();

  return (
    <div>
      <div className=" flex justify-between">
        <h1 className="text-3xl font-black">Product Types</h1>
        <Link href={'/product-type/product-type-add'}>
          <Button variant="custom">
            <Plus color="#00000066" size={20} />
            Add productType
          </Button>
        </Link>
      </div>

      <div className="mt-5">
        <TableProductTypes data={productTypes} />
      </div>
    </div>
  );
};

export default ProductType;
