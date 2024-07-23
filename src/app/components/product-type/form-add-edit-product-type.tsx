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
import { IBranch, IProductType } from '@/app/interfaces/common';

const formSchema = z.object({
  ProductTypeCd: z
    .string()
    .max(10, {
      message: 'Name must be at max 10 characters.',
    })
    .min(1, {
      message: 'Required.',
    }),
  Name: z
    .string()
    .max(50, {
      message: 'Name must be at max 50 characters.',
    })
    .optional(),
});

const FormAddEditProductType = ({
  data,
  productTypeCd,
}: {
  data?: IProductType;
  productTypeCd?: string;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ProductTypeCd: productTypeCd || '',
      Name: data?.name || '',
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (data) {
      try {
        const response = await request.put(
          `productType/update/${productTypeCd}`,
          values,
          {
            headers: { 'Content-Type': 'application/json' },
          },
        );

        if (response.status === 200) {
          toast.success('success!');

          route.push('/product-type');
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
        const response = await request.post('productType/create', values, {
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 200) {
          toast.success('success!');

          route.push('/product-type');
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
        {data ? (
          <FormField
            control={form.control}
            name="ProductTypeCd"
            render={({ field }) => (
              <FormItem className="h-[95px]">
                <FormLabel>Product Type Cd</FormLabel>
                <FormControl>
                  <Input placeholder="P1" {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={form.control}
            name="ProductTypeCd"
            render={({ field }) => (
              <FormItem className="h-[95px]">
                <FormLabel>Product Type Cd</FormLabel>
                <FormControl>
                  <Input placeholder="P1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="Name"
          render={({ field }) => (
            <FormItem className="h-[95px]">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="product type 1" {...field} />
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

export default FormAddEditProductType;
