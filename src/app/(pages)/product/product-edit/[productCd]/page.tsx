import FormAddEditProduct from '@/app/components/product/form-add-edit-product';
import { request } from '@/lib/request';
import React from 'react';

const ProductEdit = async ({ params }: { params: { productCd: string } }) => {
  const getProductById = async (productCd: string) => {
    const response = await request.get(`product/getById/${productCd}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.data.status != 200) {
      console.error(`Failed to get product has productCd = ${productCd}`);
    }

    return response.data.data;
  };

  if (params.productCd) {
    var data = await getProductById(params.productCd);
  }
  return (
    <div>
      <h1 className="text-3xl font-black mb-6">Edit Product</h1>
      <div className=" flex justify-center content-center">
        {data ? (
          <FormAddEditProduct data={data} productCd={params.productCd} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ProductEdit;
