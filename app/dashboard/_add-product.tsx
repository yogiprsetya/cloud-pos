'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Product } from '~/domain/types/Product';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { FC, ReactNode, useState } from 'react';
import { UploadImage } from '~/components/pattern/UploadImage';
import { If } from '~/components/ui/if';

const baseForm: z.ZodType<Omit<Product, 'id' | 'image'>> = z.object({
  sku: z.string().min(2).max(50),
  name: z.string().min(2).max(100),
  price: z.coerce.number().min(50),
});

const imageForm: z.ZodType<Pick<Product, 'image'>> = z.object({
  image: z.string(),
});

const DefaultValue = {
  1: {
    sku: '',
    name: '',
    price: 0,
  },
  2: {
    image: '',
  },
};

const Schema = {
  1: baseForm,
  2: imageForm,
};

type FormType = {
  1: z.infer<typeof baseForm>;
  2: z.infer<typeof imageForm>;
};

type Props = {
  trigger: ReactNode;
};

export const AddProduct: FC<Props> = ({ trigger }) => {
  const [step, setStep] = useState<keyof FormType>(1);

  const form = useForm<FormType[typeof step]>({
    resolver: zodResolver(Schema[step]),
    defaultValues: DefaultValue[step],
  });

  const onSubmit = (values: FormType[typeof step]) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    setStep(2);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new product</DialogTitle>

          <DialogDescription>
            Fill in the form below to create a new product. <small>(1/3)</small>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            id="product-form"
            className="grid gap-4 py-4"
          >
            <If condition={step === 1}>
              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center">
                    <FormLabel className="text-right mr-4">SKU</FormLabel>

                    <FormControl>
                      <Input placeholder="Type product SKU" className="col-span-3" {...field} />
                    </FormControl>

                    <FormMessage className="col-span-3 col-end-5 mt-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center">
                    <FormLabel className="text-right mr-4">Name</FormLabel>

                    <FormControl>
                      <Input placeholder="Product name" className="col-span-3" {...field} />
                    </FormControl>

                    <FormMessage className="col-span-3 col-end-5 mt-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center">
                    <FormLabel className="text-right mr-4">Price</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Product price"
                        type="number"
                        className="col-span-3"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="col-span-3 col-end-5 mt-1" />
                  </FormItem>
                )}
              />
            </If>

            <If condition={step === 2}>
              <UploadImage label="Image" />
            </If>
          </form>
        </Form>

        <DialogFooter>
          <Button type="submit" form="product-form">
            {step === 1 ? 'Create Product' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
