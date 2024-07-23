import FormAddEditProductType from '@/app/components/product-type/form-add-edit-product-type';
import React from 'react';

const ProductTypeAdd = () => {
  return (
    <div>
      <h1 className="text-3xl font-black mb-6">Create New Product Type</h1>
      <div className=" flex justify-center content-center">
        <FormAddEditProductType />
      </div>
    </div>
  );
};

export default ProductTypeAdd;
