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
import { ICustomerItemProps } from '@/app/interfaces/common';
import dayjs from 'dayjs';

const formSchema = z
  .object({
    Address: z
      .string()
      .max(30, {
        message: 'Address must be at max 30 characters.',
      })
      .optional(),
    City: z
      .string()
      .max(20, {
        message: 'City must be at max 20 characters.',
      })
      .optional(),
    CustTypeCd: z
      .string()
      .min(1)
      .regex(/^[IB]$/, {
        message: 'CustTypeCd must be either "I" or "B".',
      }),
    FedId: z
      .string()
      .max(12, {
        message: 'FedId must be at max 12 characters.',
      })
      .min(1, {
        message: 'Required.',
      }),
    PostalCode: z
      .string()
      .max(10, {
        message: 'PostalCode must be at max 10 characters.',
      })
      .optional(),
    State: z
      .string()
      .max(20, {
        message: 'State must be at max 20 characters.',
      })
      .optional(),
    IncorpDate: z
      .string()
      .refine((date) => !isNaN(Date.parse(date)), {
        message: 'IncorpDate must be a valid date',
      })
      .optional(),

    Name: z
      .string()
      .max(255, {
        message: 'Name must be at max 255 characters.',
      })
      .optional(),
    StateId: z
      .string()
      .max(10, {
        message: 'StateId must be at max 10 characters.',
      })
      .optional(),
    BirthDate: z
      .string()
      .refine((date) => !isNaN(Date.parse(date)), {
        message: 'BirthDate must be a valid date',
      })
      .optional(),
    FirstName: z
      .string()
      .max(30, {
        message: 'FirstName must be at max 30 characters.',
      })
      .optional(),
    LastName: z
      .string()
      .max(30, {
        message: 'LastName must be at max 30 characters.',
      })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.CustTypeCd === 'B') {
        return !!data.Name && !!data.StateId;
      }
      return true;
    },
    {
      message: 'Name and StateId are required when CustTypeCd is B',
      path: ['CustTypeCd'],
    },
  )
  .refine(
    (data) => {
      if (data.CustTypeCd === 'I') {
        return !!data.FirstName && !!data.LastName;
      }
      return true;
    },
    {
      message: 'Firstname and Lastname are required when CustTypeCd is I',
      path: ['CustTypeCd'],
    },
  );
const FormAddEditCustomer = ({
  data,
  custId,
}: {
  data?: ICustomerItemProps;
  custId?: number;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Address: data?.customer?.address || '',
      City: data?.customer?.city || '',
      CustTypeCd: data?.customer.custTypeCd || '',
      FedId: data?.customer.fedId || '',
      PostalCode: data?.customer?.postalCode || '',
      State: data?.customer?.state || '',
      IncorpDate:
        dayjs(data?.business?.incorpDate).format('YYYY-MM-DD') || undefined,
      Name: data?.business?.name || '',
      StateId: data?.business?.stateId || '',
      BirthDate:
        dayjs(data?.individual?.birthDate).format('YYYY-MM-DD') || undefined,
      FirstName: data?.individual?.firstName || '',
      LastName: data?.individual?.lastName || '',
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (data) {
      try {
        const response = await request.put(
          `customer/update/${custId}`,
          values,
          {
            headers: { 'Content-Type': 'application/json' },
          },
        );

        if (response.status === 200) {
          toast.success('success!');

          route.push('/customer');
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
        const response = await request.post('customer/create', values, {
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 200) {
          toast.success('success!');

          route.push('/customer');
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
        <div className="flex flex-row justify-between">
          <FormField
            control={form.control}
            name="Address"
            render={({ field }) => (
              <FormItem className="w-[47%] h-[95px]">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="108 Trung Nu Vuong" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="City"
            render={({ field }) => (
              <FormItem className="w-[47%] h-[95px]">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Quang Nam" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="CustTypeCd"
          render={({ field }) => (
            <FormItem className="h-[95px]">
              <FormLabel>Cust Type Cd</FormLabel>
              <FormControl>
                <Input placeholder="I or B" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="FedId"
          render={({ field }) => (
            <FormItem className="h-[95px]">
              <FormLabel>Fed Id</FormLabel>
              <FormControl>
                <Input placeholder="Isd" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="PostalCode"
          render={({ field }) => (
            <FormItem className="h-[95px]">
              <FormLabel>Postal Code</FormLabel>
              <FormControl>
                <Input placeholder="50000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="State"
          render={({ field }) => (
            <FormItem className="h-[95px]">
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder="success" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row justify-between">
          <div className="w-[47%]">
            <FormField
              control={form.control}
              name="IncorpDate"
              render={({ field }) => (
                <FormItem className="h-[95px]">
                  <FormLabel>Incorp Date</FormLabel>
                  <FormControl>
                    <Input placeholder="2014-09-10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Name"
              render={({ field }) => (
                <FormItem className="h-[95px]">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Nguyen Nhat Ha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="StateId"
              render={({ field }) => (
                <FormItem className="h-[95px]">
                  <FormLabel>State Id</FormLabel>
                  <FormControl>
                    <Input placeholder="state1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-[47%] ">
            <FormField
              control={form.control}
              name="BirthDate"
              render={({ field }) => (
                <FormItem className="h-[95px]">
                  <FormLabel>Birth Date</FormLabel>
                  <FormControl>
                    <Input placeholder="2014-09-10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="FirstName"
              render={({ field }) => (
                <FormItem className="h-[95px]">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Nguyen" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="LastName"
              render={({ field }) => (
                <FormItem className="h-[95px]">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
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

export default FormAddEditCustomer;
