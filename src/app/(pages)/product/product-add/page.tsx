import FormAddEditProduct from '@/app/components/product/form-add-edit-product';
import React from 'react';

const ProductAdd = () => {
  return (
    <div>
      <h1 className="text-3xl font-black mb-6">Create New Product</h1>
      <div className=" flex justify-center content-center">
        <FormAddEditProduct />
      </div>
    </div>
  );
};

export default ProductAdd;
