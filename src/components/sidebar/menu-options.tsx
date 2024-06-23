"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { AgencySidebarOption, SubAccount, SubAccountSidebarOption, User } from '@prisma/client';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';
type Props = {
    defaultOpen?: boolean;
    subAccounts: SubAccount[];
    sidebarOpt: AgencySidebarOption[] | SubAccountSidebarOption[];
    sidebarLogo: string;
    details: any;
    user:User| any;
    id: string;
}
const MenuOptions = ({ defaultOpen, subAccounts, sidebarOpt, sidebarLogo, user, id }: Props) => {
    const [isMounted, setIsMounted] = useState(false);

    const openState = useMemo(() => {
        return defaultOpen ? { open: true } : {}
    }, [defaultOpen]);

    useEffect(() => {
        setIsMounted(true);
    }, [])
    
  return (
    <Sheet modal={false} {...openState}>
      <SheetTrigger asChild className='absolute left-4 top-4 z-[100] md:!hidden flex'>
        <Button variant='outline' size={'icon'}>
            <Menu/>
        </Button>
          </SheetTrigger>
          
      <SheetContent >
        
      </SheetContent>
    </Sheet>
  )
}

export default MenuOptions
