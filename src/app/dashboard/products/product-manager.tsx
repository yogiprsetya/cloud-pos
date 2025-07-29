'use client';

import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { FC, useEffect } from 'react';
import { UploadImage } from '~/components/pattern/UploadImage';
import { Textarea } from '~/components/ui/textarea';
import { useProduct } from '~/services/use-product';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProductId } from '~/services/use-product-id';
import { createSelectSchema } from 'drizzle-zod';
import { product } from '~/db/schema/product';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/src/components/ui/select';
import { useProductCategories } from '~/src/services/use-product-categories';
import { If } from '~/src/components/ui/if';
import { Skeleton } from '~/src/components/ui/skeleton';

const CreateProductSchema = createSelectSchema(product);
type Forms = z.infer<typeof CreateProductSchema>;

type Props = {
  id?: string;
};

export const ManageProduct: FC<Props> = ({ id }) => {
  const { createNewProduct } = useProduct();

  const form = useForm<Forms>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      name: '',
      price: 0,
      description: '',
      image: ''
    }
  });

  const { data, isLoading } = useProductId({ id });
  const { isLoading: categoriesIsLoading, data: categories } = useProductCategories();

  useEffect(() => {
    if (data) {
      form.reset(data.data);
    }
  }, [data, form]);

  if (id && isLoading) {
    return <div>Loading...</div>;
  }

  const onSubmit = (values: Forms) => {
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
                      <Input
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        placeholder="Product price"
                        type="number"
                      />
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

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>

                    <If condition={!categoriesIsLoading} fallback={<Skeleton className="h-9 w-full" />}>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        defaultValue={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Product category" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {categories?.data.map((m) => (
                            <SelectItem key={m.id} value={m.id.toString()}>
                              {m.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </If>

                    <FormMessage />
                  </FormItem>
                )}
              />

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
