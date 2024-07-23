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
import { IBranch, IProduct } from '@/app/interfaces/common';

const formSchema = z.object({
  ProductCd: z
    .string()
    .max(10, {
      message: 'ProductCd must be at max 10 characters.',
    })
    .min(1, {
      message: 'Required.',
    }),
  ProductTypeCd: z
    .string()
    .max(10, {
      message: 'Name must be at max 10 characters.',
    })
    .optional(),
  DateOffered: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'DateOffered must be a valid date',
    })
    .optional(),
  DateRetired: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'DateRetired must be a valid date',
    })
    .optional(),
  Name: z
    .string()
    .max(50, {
      message: 'Name must be at max 50 characters.',
    })
    .min(1, {
      message: 'Required.',
    }),
});

const FormAddEditProduct = ({
  data,
  productCd,
}: {
  data?: IProduct;
  productCd?: string;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ProductCd: productCd || '',
      Name: data?.name || '',
      DateOffered: data?.dateOffered || ' ',
      DateRetired: data?.dateRetired || ' ',
      ProductTypeCd: data?.productTypeCd || ' ',
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (data) {
      try {
        const response = await request.put(
          `product/update/${productCd}`,
          values,
          {
            headers: { 'Content-Type': 'application/json' },
          },
        );

        if (response.status === 200) {
          toast.success('success!');

          route.push('/product');
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
        const response = await request.post('product/create', values, {
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 200) {
          toast.success('success!');

          route.push('/product');
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
            name="ProductCd"
            render={({ field }) => (
              <FormItem className="h-[95px]">
                <FormLabel>Product Cd</FormLabel>
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
            name="ProductCd"
            render={({ field }) => (
              <FormItem className="h-[95px]">
                <FormLabel>Product Cd</FormLabel>
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
        <FormField
          control={form.control}
          name="DateOffered"
          render={({ field }) => (
            <FormItem className="h-[95px]">
              <FormLabel>Date Offered</FormLabel>
              <FormControl>
                <Input placeholder="2014-09-10" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="DateRetired"
          render={({ field }) => (
            <FormItem className="h-[95px]">
              <FormLabel>Date Retired</FormLabel>
              <FormControl>
                <Input placeholder="2014-09-10" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ProductTypeCd"
          render={({ field }) => (
            <FormItem className="h-[95px]">
              <FormLabel>Product Type Cd</FormLabel>
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

export default FormAddEditProduct;
