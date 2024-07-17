import CustomerItem from '@/app/components/customer-item';
import { ICustomerItemProps } from '@/app/interfaces/common';
import { Button } from '@/components/ui/button';
import { request } from '@/lib/request';
import { Plus } from 'lucide-react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import React, { useState } from 'react';
import https from 'https';
import axios from 'axios';

// function Customer({
//   customers,
// }: InferGetStaticPropsType<typeof getStaticProps>) {
export default async function Customer() {
  const agent = new https.Agent({
    rejectUnauthorized: false, // Bỏ qua lỗi chứng chỉ không hợp lệ
  });
  const res = await axios.get('https://localhost:44343/api/customer/getAll', {
    httpsAgent: agent,
  });
  const customers = res.data.customers;
  // console.log(customers);
  return (
    <div>
      <div className=" flex justify-between">
        <h1 className="text-3xl font-black">Customers</h1>
        <Button variant="custom">
          <Plus color="#00000066" size={20} />
          Add customer
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        {customers.map((cust: ICustomerItemProps, index: number) => (
          <CustomerItem key={index} data={cust} />
        ))}
      </div>
    </div>
  );
}
// export const getStaticProps: GetStaticProps = async () => {
//   let customers = [];
//   try {
//     const response = await request.get('customer/getAll', {
//       headers: { 'Content-Type': 'application/json' },
//     });
//     customers = response.data.customers || []; // Đảm bảo lấy đúng trường
//   } catch (err) {
//     console.error('Error fetching customers:', err);
//   }

//   return {
//     props: {
//       customers,
//     },
//   };
// };
// export default Customer;
