import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { request } from '@/lib/request';
import { Button } from '@/components/ui/button';
import TableBraches from '@/app/components/branch/table-branches';

const Branch = async () => {
  async function getDataBranch() {
    const response = await request.get('branch/getAll', {
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.data.status != 200) {
      console.error('Failed to get customers');
    }

    return response.data.data;
  }
  const branches = await getDataBranch();

  return (
    <div>
      <div className=" flex justify-between">
        <h1 className="text-3xl font-black">Branches</h1>
        <Link href={'/branch/branch-add'}>
          <Button variant="custom">
            <Plus color="#00000066" size={20} />
            Add branch
          </Button>
        </Link>
      </div>

      <div className="mt-5">
        <TableBraches data={branches} />
      </div>
    </div>
  );
};

export default Branch;
