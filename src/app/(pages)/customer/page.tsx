import CustomerItem from '@/app/components/customer-item';
import { ICustomerItemProps } from '@/app/interfaces/common';
import { Button } from '@/components/ui/button';
import { request } from '@/lib/request';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

async function getDataCustomer() {
  const response = await request.get('customer/getAll', {
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.data.status != 200) {
    console.error('Failed to get customers');
  }

  return response.data.customers;
}
async function Customer() {
  //getall
  const customers = await getDataCustomer();

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
          // <Link href={`/customer/${cust.customer.custId}`} >
          <CustomerItem data={cust} key={index} />
          // </Link>
        ))}
      </div>
    </div>
  );
}

export default Customer;
