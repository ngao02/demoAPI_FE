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
  Name: z
    .string()
    .max(20, {
      message: 'Name must be at max 20 characters.',
    })
    .min(1, {
      message: 'Required.',
    }),
});

const FormAddEditDepartment = ({
  data,
  deptId,
}: {
  data?: IBranch;
  deptId?: number;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: data?.name || '',
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (data) {
      try {
        const response = await request.put(
          `department/update/${deptId}`,
          values,
          {
            headers: { 'Content-Type': 'application/json' },
          },
        );

        if (response.status === 200) {
          toast.success('success!');

          route.push('/department');
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
        const response = await request.post('department/create', values, {
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 200) {
          toast.success('success!');

          route.push('/department');
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
                <Input placeholder="HR" {...field} />
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

export default FormAddEditDepartment;
