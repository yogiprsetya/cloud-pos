import { useForm, useFormContext } from 'react-hook-form';
import { ProductManagerSchema, ProductManagerType } from './model';
import { zodResolver } from '@hookform/resolvers/zod';

export const UseForms = () => {
  const form = useForm<ProductManagerType>({
    resolver: zodResolver(ProductManagerSchema),
    defaultValues: {
      name: '',
      price: 0,
      description: '',
      image: ''
    }
  });

  const formContext = useFormContext<ProductManagerType>();

  return {
    form,
    formContext
  };
};
