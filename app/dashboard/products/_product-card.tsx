import { Boxes } from 'lucide-react';
import { FC, ReactNode } from 'react';
import { Card } from '~/components/ui/card';
import { If } from '~/components/ui/if';
import { type Product } from '~/model/types/product';
import { formatRp } from '~/utils/rupiah';

type Props = Omit<Product, 'createdAt' | 'updatedAt'> & {
  menuElement: ReactNode;
};

export const ProductCard: FC<Props> = ({ image, name, description, price, menuElement }) => (
  <Card className="overflow-hidden">
    <div className="w-full bg-secondary flex items-center h-40 justify-center">
      {image ? <img src={image} alt={name} /> : <Boxes className="text-primary size-8" />}
    </div>

    <div className="p-4 h-full">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{name}</h3>
        {menuElement}
      </div>

      <p className="text-xs">{formatRp(price)}</p>

      <If condition={description}>
        <p className="text-sm mt-2">{description}</p>
      </If>
    </div>
  </Card>
);
