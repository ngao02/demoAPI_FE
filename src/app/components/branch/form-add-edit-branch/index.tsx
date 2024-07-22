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
import { IBranch } from '@/app/interfaces/common';

const formSchema = z.object({
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

  Name: z
    .string()
    .max(20, {
      message: 'Name must be at max 20 characters.',
    })
    .min(1, {
      message: 'Required.',
    }),

  Status: z
    .string()
    .max(20, {
      message: 'State must be at max 20 characters.',
    })
    .optional(),
  ZipCode: z
    .string()
    .max(12, {
      message: 'Name must be at max 12 characters.',
    })
    .optional(),
});

const FormAddEditBranch = ({
  data,
  branchId,
}: {
  data?: IBranch;
  branchId?: number;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Address: data?.address || '',
      City: data?.city || '',
      ZipCode: data?.zipCode || '',
      Status: data?.status || '',
      Name: data?.name || '',
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (data) {
      try {
        const response = await request.put(
          `branch/update/${branchId}`,
          values,
          {
            headers: { 'Content-Type': 'application/json' },
          },
        );

        if (response.status === 200) {
          toast.success('success!');

          route.push('/branch');
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
        const response = await request.post('branch/create', values, {
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 200) {
          toast.success('success!');

          route.push('/branch');
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
          name="Name"
          render={({ field }) => (
            <FormItem className="h-[95px]">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="BIDV" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          name="Status"
          render={({ field }) => (
            <FormItem className="h-[95px]">
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Input placeholder="success" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ZipCode"
          render={({ field }) => (
            <FormItem className="h-[95px]">
              <FormLabel>Zip Code</FormLabel>
              <FormControl>
                <Input placeholder="50000" {...field} />
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

export default FormAddEditBranch;
