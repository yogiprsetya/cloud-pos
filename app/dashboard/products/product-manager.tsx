'use client';

import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { FC, useEffect } from 'react';
import { UploadImage } from '~/components/pattern/UploadImage';
import { Textarea } from '~/components/ui/textarea';
import { useProduct } from '~/services/use-product';
import { useForm } from 'react-hook-form';
import { ProductManagerSchema, ProductManagerType } from './model';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProductId } from '~/services/use-product-id';

type Props = {
  id?: string;
};

export const ManageProduct: FC<Props> = ({ id }) => {
  const { createNewProduct } = useProduct();

  const form = useForm<ProductManagerType>({
    resolver: zodResolver(ProductManagerSchema),
    defaultValues: {
      name: '',
      price: 0,
      description: '',
      image: ''
    }
  });

  const { data, isLoading } = useProductId({ id });

  useEffect(() => {
    if (data) {
      console.log('data', data.data);

      form.reset(data.data);
    }
  }, [data, form]);

  if (id && isLoading) {
    return <div>Loading...</div>;
  }

  const onSubmit = (values: ProductManagerType) => {
    createNewProduct(values);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id="manage-product" className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>

                    <FormControl>
                      <Input placeholder="Product name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>

                    <FormControl>
                      <Input placeholder="Product price" type="number" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>

                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about this product"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <UploadImage label="Image" existingImageUrl={field.value} onUploaded={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>

      <div className=" w-full -bottom-6 mt-6 flex justify-center left-0">
        <Button type="submit" form="manage-product">
          {id ? 'Save Changes' : 'Create Product'}
        </Button>
      </div>
    </>
  );
};
