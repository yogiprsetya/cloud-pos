'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '~/components/ui/sidebar';
import { Home, GalleryVerticalEnd, ShoppingCart, Shirt, Group } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { If } from '~/components/ui/if';
import Link from 'next/link';

const productItems = [
  {
    title: 'Category',
    url: '/dashboard/product-category',
    icon: Group
  },
  {
    title: 'Items',
    url: '/dashboard/products',
    icon: Shirt
  }
  // {
  //   title: 'Stock',
  //   url: '/dashboard/stocks',
  //   icon: Package2
  // }
];

const posItems = [
  {
    title: 'Point of Sale',
    url: '/dashboard/point-of-sale',
    icon: ShoppingCart
  }
];

const Groups = (props: { children: ReactNode; title?: string }) => (
  <SidebarGroup>
    <If condition={props.title}>
      <SidebarGroupLabel>{props.title}</SidebarGroupLabel>
    </If>

    <SidebarGroupContent>
      <SidebarMenu>{props.children}</SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
);

const Header = () => (
  <SidebarHeader className="flex flex-row">
    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
      <GalleryVerticalEnd className="size-4" />
    </div>

    <div className="leading-none">
      <h1 className="font-semibold">Cloud POS</h1>
      <p className="text-xs">Cloud-based store management</p>
    </div>
  </SidebarHeader>
);

export const AppSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar>
      <Header />

      <SidebarContent>
        <Groups>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/dashboard'}>
              <Link href="/dashboard">
                <Home />
                <span>Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </Groups>

        <Groups title="Product">
          {posItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={pathname === item.url}>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </Groups>

        <Groups title="Library">
          {productItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={pathname === item.url}>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </Groups>
      </SidebarContent>
    </Sidebar>
  );
};
