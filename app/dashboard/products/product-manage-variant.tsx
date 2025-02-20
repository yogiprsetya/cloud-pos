'use client';
import { ComponentPropsWithoutRef, FC } from 'react';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '~/components/ui/dialog';
import { Product, ProductVariantItem, ProductVariantLabel } from '~/model/types/product';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { Input } from '~/components/ui/input';
import { Plus } from 'lucide-react';

type DialogProps = Omit<ComponentPropsWithoutRef<typeof Dialog>, 'children'>;

type Props = DialogProps & {
  data?: Product;
};

type SchemaType = {
  variants: Array<
    Pick<ProductVariantLabel, 'name'> & {
      items: Pick<ProductVariantItem, 'name' | 'price'>[];
    }
  >;
};

const schema: z.ZodType<SchemaType> = z.object({
  variants: z.array(
    z.object({
      name: z.string().min(2).max(100),
      items: z.array(
        z.object({
          name: z.string().min(2).max(100),
          price: z.number().min(1)
        })
      )
    })
  )
});

type FormValues = z.infer<typeof schema>;

export const ProductManageVariant: FC<Props> = ({ data, ...props }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema)
  });

  const variant = useFieldArray({
    control: form.control,
    name: 'variants'
  });

  const onSubmit = (values: FormValues) => {
    // createNewProduct(values);
    console.log(values);
  };

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Product Variant</DialogTitle>

          <DialogDescription>
            You can manage variant for <b>{data?.name}</b>.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="manage-product-variant">
            {variant.fields.map((field, index) => (
              <div key={field.id}>
                <FormField
                  control={form.control}
                  name={`variants.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Label Name</FormLabel>

                      <FormControl>
                        <Input size={100} placeholder="Ex: size, color" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}

            <div className="flex justify-center mt-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  variant.append({ name: '', items: [] });
                }}
              >
                <Plus className="size-4" /> Add new variant
              </Button>
            </div>
          </form>
        </Form>

        <DialogFooter className="border-t pt-4">
          <Button variant="secondary">Cancel</Button>
          <Button form="manage-product-variant">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
