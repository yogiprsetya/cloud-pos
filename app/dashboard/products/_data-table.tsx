'use client';

import { Searchbar } from '~/components/pattern/Searchbar';
import { Loading } from '~/components/ui/loading';
import { useProduct } from '~/services/use-product';
import { ProductCard } from './_product-card';
import { CardMenu } from './_card-menu';
import { If } from '~/components/ui/if';
import { FC, Fragment, useMemo } from 'react';
import { Product } from '~/model/types/product';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

type Props = ReturnType<typeof useProduct>;

export const ProductPortfolio: FC<Props> = ({ isLoading, setSearchKeyword, data }) => {
  const columns: ColumnDef<Product>[] = useMemo(
    () => [
      { header: 'Name', accessorKey: 'name' },
      { header: 'Price', accessorKey: 'price' },
      { header: 'Stock', accessorKey: 'stock' },
      { header: 'Category', accessorKey: 'category' },
      {
        header: 'Menu',
        accessorKey: 'menu',
        cell: ({ row }) => <CardMenu {...row.original} />
      }
    ],
    []
  );

  const table = useReactTable({
    data: data?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <>
      <div className="flex mb-6">
        <Searchbar className="w-72" onChange={setSearchKeyword} />
      </div>

      {isLoading ? (
        <Loading className="size-6 mx-auto" />
      ) : (
        <div className="grid grid-cols-4 gap-4">
          <If
            condition={table.getRowModel().rows?.length}
            fallback="Data product is empty, please create."
          >
            {table.getRowModel().rows.map((row) => (
              <Fragment key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  const menuEl = cell.row
                    .getVisibleCells()
                    .find(({ column }) => column.id === 'menu');

                  return (
                    <ProductCard
                      key={row.original.id}
                      id={row.original.id}
                      name={row.original.name}
                      description={row.original.description}
                      image={row.original.image}
                      price={row.original.price}
                      menuElement={flexRender(menuEl?.column.columnDef.cell, cell.getContext())}
                    />
                  );
                })}
              </Fragment>
            ))}
          </If>
        </div>
      )}
    </>
  );
};
