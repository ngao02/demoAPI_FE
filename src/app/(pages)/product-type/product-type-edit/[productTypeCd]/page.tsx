import FormAddEditProductType from '@/app/components/product-type/form-add-edit-product-type';
import { request } from '@/lib/request';
import React from 'react';

const ProductTypeEdit = async ({
  params,
}: {
  params: { productTypeCd: string };
}) => {
  const getProductTypeById = async (productTypeCd: string) => {
    const response = await request.get(`productType/getById/${productTypeCd}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.data.status != 200) {
      console.error(
        `Failed to get productType has productTypeCd = ${productTypeCd}`,
      );
    }

    return response.data.data;
  };

  if (params.productTypeCd) {
    var data = await getProductTypeById(params.productTypeCd);
  }
  return (
    <div>
      <h1 className="text-3xl font-black mb-6">Edit Product Type</h1>
      <div className=" flex justify-center content-center">
        {data ? (
          <FormAddEditProductType
            data={data}
            productTypeCd={params.productTypeCd}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ProductTypeEdit;
