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
import { IEmployee } from '@/app/interfaces/common';
import dayjs from 'dayjs';

const formSchema = z.object({
  FirstName: z
    .string()
    .max(20, {
      message: 'FirstName must be at max 20 characters.',
    })
    .min(1, {
      message: 'Required.',
    }),
  LastName: z
    .string()
    .max(20, {
      message: 'LastName must be at max 20 characters.',
    })
    .min(1, {
      message: 'Required.',
    }),
  Title: z
    .string()
    .max(20, {
      message: 'Address must be at max 20 characters.',
    })
    .optional(),

  StartDay: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'StartDay must be a valid date',
  }),

  EndTime: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'End Day must be a valid date',
    })
    .optional(),

  AssignedBranchId: z
    .union([
      z
        .string()
        .max(10, { message: 'SuperiorEmpId must be at most 10 digits.' })
        .regex(/^\d+$/, { message: 'SuperiorEmpId must be a number.' }),
      z.number(),
    ])
    .transform((val) => (typeof val === 'string' ? parseInt(val, 10) : val))
    .optional(),
  DeptId: z
    .union([
      z
        .string()
        .max(10, { message: 'SuperiorEmpId must be at most 10 digits.' })
        .regex(/^\d+$/, { message: 'SuperiorEmpId must be a number.' }),
      z.number(),
    ])
    .transform((val) => (typeof val === 'string' ? parseInt(val, 10) : val))
    .optional(),
  SuperiorEmpId: z
    .union([
      z
        .string()
        .max(10, { message: 'SuperiorEmpId must be at most 10 digits.' })
        .regex(/^\d+$/, { message: 'SuperiorEmpId must be a number.' }),
      z.number(),
    ])
    .transform((val) => (typeof val === 'string' ? parseInt(val, 10) : val))
    .optional(),
});

const FormAddEditEmployee = ({
  data,
  empId,
}: {
  data?: IEmployee;
  empId?: number;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      FirstName: data?.firstName || '',
      LastName: data?.lastName || '',
      Title: data?.title || '',
      StartDay: dayjs(data?.startDay).format('YYYY-MM-DD') || undefined,
      EndTime: dayjs(data?.endTime).format('YYYY-MM-DD') || undefined,
      AssignedBranchId: data?.assignedBranchId
        ? parseInt(data?.assignedBranchId.toString(), 10)
        : undefined,
      DeptId: data?.deptId ? parseInt(data.deptId.toString(), 10) : undefined,
      SuperiorEmpId: data?.superiorEmpId
        ? parseInt(data.superiorEmpId.toString(), 10)
        : undefined,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (data) {
      try {
        const response = await request.put(`employee/update/${empId}`, values, {
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 200) {
          toast.success('success!');

          route.push('/employee');
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
        const response = await request.post('employee/create', values, {
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 200) {
          toast.success('success!');

          route.push('/employee');
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
            name="FirstName"
            render={({ field }) => (
              <FormItem className="w-[47%] h-[95px]">
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
              <FormItem className="w-[47%] h-[95px]">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Nam" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="Title"
          render={({ field }) => (
            <FormItem className="h-[95px]">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row justify-between">
          <FormField
            control={form.control}
            name="StartDay"
            render={({ field }) => (
              <FormItem className=" w-[47%] h-[95px]">
                <FormLabel>Start Day</FormLabel>
                <FormControl>
                  <Input placeholder="2014-09-10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="EndTime"
            render={({ field }) => (
              <FormItem className="w-[47%] h-[95px]">
                <FormLabel>End Day</FormLabel>
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
          name="AssignedBranchId"
          render={({ field }) => (
            <FormItem className="h-[95px]">
              <FormLabel>Assigned Branch Id</FormLabel>
              <FormControl>
                <Input placeholder="1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="DeptId"
          render={({ field }) => (
            <FormItem className="h-[95px]">
              <FormLabel>Department Id</FormLabel>
              <FormControl>
                <Input placeholder="1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="SuperiorEmpId"
          render={({ field }) => (
            <FormItem className="h-[95px]">
              <FormLabel>Superior Employee Id</FormLabel>
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

export default FormAddEditEmployee;
