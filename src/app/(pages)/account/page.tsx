import TableAccounts from '@/app/components/account/table-account';
import { Button } from '@/components/ui/button';
import { request } from '@/lib/request';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

async function getAccounts() {
  const response = await request.get('account/getAll', {
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.data.status != 200) {
    console.error('Failed to get accounts');
  }

  return response.data.data;
}
async function Account() {
  const accounts = await getAccounts();

  return (
    <div>
      <div className=" flex justify-between">
        <h1 className="text-3xl font-black">Accounts</h1>
        <Link href={'/account/account-add'}>
          <Button variant="custom">
            <Plus color="#00000066" size={20} />
            Add account
          </Button>
        </Link>
      </div>
      <div className="mt-5">
        <TableAccounts data={accounts} />
      </div>
    </div>
  );
}

export default Account;
