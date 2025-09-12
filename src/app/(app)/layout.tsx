'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Icons } from '@/components/icons';
import {
  Tractor,
  User,
  Phone,
  LogOut,
  ShoppingCart
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <Link href="/rent" className="flex items-center gap-2">
                <Icons.logo className="size-7 text-primary" />
                <span className="text-lg font-semibold">farmerhive</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith('/rent')}
                  tooltip={{ children: 'Rentals' }}
                >
                  <Link href="/rent">
                    <Tractor />
                    <span>Rentals</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith('/buy')}
                  tooltip={{ children: 'Buy' }}
                >
                  <Link href="/buy">
                    <ShoppingCart />
                    <span>Buy</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === '/profile'}
                  tooltip={{ children: 'Profile' }}
                >
                  <Link href="/profile">
                    <User />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === '/support'}
                  tooltip={{ children: 'Support' }}
                >
                  <Link href="/support">
                    <Phone />
                    <span>Support</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={{children: 'Logout'}}>
                        <Link href="/">
                            <LogOut />
                            <span>Logout</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex flex-col">
            <SiteHeader />
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
