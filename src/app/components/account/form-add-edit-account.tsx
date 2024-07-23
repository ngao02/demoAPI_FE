'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { request } from '@/lib/request';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { IAccount } from '@/app/interfaces/common';
import dayjs from 'dayjs';

const formSchema = z.object({
  AvailBalance: z
    .union([
      z.string().regex(/^\d+$/, { message: 'AvailBalance must be a number.' }),
      z.number(),
    ])
    .transform((val) => (typeof val === 'string' ? parseInt(val, 10) : val))
    .optional(),
  OpenDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'OpenDate must be a valid date',
  }),
  LastActivityDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'LastActivityDate must be a valid date',
    })
    .optional(),
  CloseDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'CloseDate must be a valid date',
    })
    .optional(),
  PendingBalance: z
    .union([
      z
        .string()
        .regex(/^\d+$/, { message: 'PendingBalance must be a number.' }),
      z.number(),
    ])
    .transform((val) => (typeof val === 'string' ? parseInt(val, 10) : val))
    .optional(),
  Status: z
    .string()
    .max(10, {
      message: 'Status must be at max 10 characters.',
    })
    .optional(),
  CustId: z
    .union([
      z
        .string()
        .max(10, { message: 'CustId must be at most 10 digits.' })
        .regex(/^\d+$/, { message: 'CustId must be a number.' }),
      z.number(),
    ])
    .transform((val) => (typeof val === 'string' ? parseInt(val, 10) : val))
    .optional(),
  OpenBranchId: z
    .union([
      z
        .string()
        .max(10, { message: 'OpenBranchId must be at most 10 digits.' })
        .regex(/^\d+$/, { message: 'OpenBranchId must be a number.' }),
      z.number(),
    ])
    .transform((val) => (typeof val === 'string' ? parseInt(val, 10) : val))
    .optional(),
  OpenEmpId: z
    .union([
      z
        .string()
        .max(10, { message: 'OpenEmpId must be at most 10 digits.' })
        .regex(/^\d+$/, { message: 'OpenEmpId must be a number.' }),
      z.number(),
    ])
    .transform((val) => (typeof val === 'string' ? parseInt(val, 10) : val))
    .optional(),
  ProductCd: z.string().max(10, {
    message: 'ProductCd must be at max 10 characters.',
  }),
});

const FormAddEditAccount = ({
  data,
  accountId,
}: {
  data?: IAccount;
  accountId?: number;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      AvailBalance: data?.availBalance
        ? parseInt(data.availBalance.toString())
        : undefined,
      OpenDate: dayjs(data?.openDate).format('YYYY-MM-DD') || undefined,
      CloseDate: dayjs(data?.closeDate).format('YYYY-MM-DD') || undefined,
      LastActivityDate:
        dayjs(data?.lastActivityDate).format('YYYY-MM-DD') || undefined,
      PendingBalance: data?.pendingBalance
        ? parseInt(data.pendingBalance.toString())
        : undefined,
      Status: data?.status || '',
      CustId: data?.custId ? parseInt(data?.custId.toString(), 10) : undefined,
      OpenBranchId: data?.openBranchId
        ? parseInt(data.openBranchId.toString(), 10)
        : undefined,
      OpenEmpId: data?.openEmpId
        ? parseInt(data.openEmpId.toString(), 10)
        : undefined,

      ProductCd: data?.productCd || '',
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (data) {
      try {
        const response = await request.put(
          `account/update/${accountId}`,
          values,
          {
            headers: { 'Content-Type': 'application/json' },
          },
        );

        if (response.status === 200) {
          toast.success('success!');

          route.push('/account');
          route.refresh();
        }
      } catch (error: any) {
        if (error.response.data.status === 400) {
          console.log(error.response);
          toast.error(error.response.data.message);
        }
      }
    } else {
      try {
        const response = await request.post('account/create', values, {
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 200) {
          toast.success('success!');

          route.push('/account');
          route.refresh();
        }
      } catch (error: any) {
        if (error.response.data.status === 400) {
          console.log(error.response);
          toast.error(error.response.data.message);
        }
      }
    }
  }
  const route = useRouter();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" w-[70%] relative "
      >
        <FormField
          control={form.control}
          name="AvailBalance"
          render={({ field }) => (
            <FormItem className="h-[95px]">
              <FormLabel>Avail Balance</FormLabel>
              <FormControl>
                <Input placeholder="100" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row justify-between">
          <FormField
            control={form.control}
            name="OpenDate"
            render={({ field }) => (
              <FormItem className=" w-[47%] h-[95px]">
                <FormLabel>Open Date</FormLabel>
                <FormControl>
                  <Input placeholder="2014-09-10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="CloseDate"
            render={({ field }) => (
              <FormItem className="w-[47%] h-[95px]">
                <FormLabel>Close Date</FormLabel>
                <FormControl>
                  <Input placeholder="2014-09-10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="LastActivityDate"
          render={({ field }) => (
            <FormItem className=" h-[95px]">
              <FormLabel>Last Activity Date </FormLabel>
              <FormControl>
                <Input placeholder="2014-09-10" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="PendingBalance"
          render={({ field }) => (
            <FormItem className="h-[95px]">
              <FormLabel>Pending Balance</FormLabel>
              <FormControl>
                <Input placeholder="1000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Status"
          render={({ field }) => (
            <FormItem className="h-[95px]">
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Input placeholder="stt" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="CustId"
          render={({ field }) => (
            <FormItem className="h-[95px]">
              <FormLabel>Cust Id</FormLabel>
              <FormControl>
                <Input placeholder="1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="OpenBranchId"
          render={({ field }) => (
            <FormItem className="h-[95px]">
              <FormLabel>Open Branch Id</FormLabel>
              <FormControl>
                <Input placeholder="1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="OpenEmpId"
          render={({ field }) => (
            <FormItem className="h-[95px]">
              <FormLabel>Open Employee Id</FormLabel>
              <FormControl>
                <Input placeholder="1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ProductCd"
          render={({ field }) => (
            <FormItem className="h-[95px]">
              <FormLabel>Product Cd</FormLabel>
              <FormControl>
                <Input placeholder="1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="absolute right-0 mt-8"
          variant={'custom'}
          type="submit"
        >
          Submit
        </Button>
      </form>
      <Toaster position="top-center" />
    </Form>
  );
};

export default FormAddEditAccount;
