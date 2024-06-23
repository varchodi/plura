"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { AgencySidebarOption, SubAccount, SubAccountSidebarOption, User } from '@prisma/client';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { ChevronsUpDown, Compass, Menu } from 'lucide-react';
import clsx from 'clsx';
import { AspectRatio } from '../ui/aspect-ratio';
import Image from 'next/image';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Command, CommandEmpty, CommandInput, CommandList } from '../ui/command';

type Props = {
    defaultOpen?: boolean;
    subAccounts: SubAccount[];
    sidebarOpt: AgencySidebarOption[] | SubAccountSidebarOption[];
    sidebarLogo: string;
    details: any;
    user:User| any;
    id: string;
}
const MenuOptions = ({ defaultOpen, subAccounts, sidebarOpt, sidebarLogo,details, user, id }: Props) => {
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
          
      <SheetContent  showX={!defaultOpen} side={'left'} className={clsx("bg-background/80 backdrop-blur-xl fixed top-0 border-red-[1px] p-6 ",{"hidden md:inline-block z-0 w-[300px]":defaultOpen,'inline-block md:hidden z-[100] w-full':!defaultOpen})}>
        <div className="">
            <AspectRatio ratio={16/5}>
                <Image src={sidebarLogo} alt='Sidebar Logo' fill className='rounded-md object-contain'/>
            </AspectRatio>
            <Popover>
                <PopoverTrigger asChild>
                    <Button className='w-full my-4 flex items-center justify-between py-8'
                    variant={'ghost'}
                    >
                        <div className="flex items-center text-left gap-2">
                            <Compass />
                            <div className="flex flex-col">
                                {details.name}
                                      <span className='text-muted-foreground'>{details.address}</span>
                            </div>
                            </div>
                            <div className="">
                                <ChevronsUpDown className='text-muted-foreground' size={16}/>
                            </div>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-80 h-80 mt-4 z-[200]'>
                    {
                        <Command className='rounded-lg'>
                            <CommandInput placeholder='Search account ...'/>
                            <CommandList  className='pb-16'>
                                <CommandEmpty>No Results foun</CommandEmpty>
                                {
                                    (user?.role === 'AGENCY_OWNER' || user?.role === "AGENCY_ADMIN") && user?.agency && <div></div>
                                }
                            </CommandList>
                        </Command>
                    }
                </PopoverContent>
            </Popover>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MenuOptions
