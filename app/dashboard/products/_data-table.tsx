'use client';

import { Searchbar } from '~/components/pattern/Searchbar';
import { Loading } from '~/components/ui/loading';
import { useProduct } from '~/services/use-product';
import { ProductCard } from './_product-card';
import { CardMenu } from './_card-menu';
import { If } from '~/components/ui/if';
import { FC } from 'react';

type Props = ReturnType<typeof useProduct>;

export const ProductPortfolio: FC<Props> = ({ isLoading, setSearchKeyword, data }) => {
  return (
    <>
      <div className="flex mb-6">
        <Searchbar className="w-72" onChange={setSearchKeyword} />
      </div>

      {isLoading ? (
        <Loading className="size-6 mx-auto" />
      ) : (
        <div className="grid grid-cols-4 gap-4">
          <If condition={data?.data} fallback="Data product is empty, please create.">
            {data?.data.map((product) => (
              <ProductCard key={product.id} {...product} menuElement={<CardMenu {...product} />} />
            ))}
          </If>
        </div>
      )}
    </>
  );
};
