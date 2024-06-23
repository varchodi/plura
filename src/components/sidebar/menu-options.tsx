"use client"
import React from 'react'
import { AgencySidebarOption, SubAccount, SubAccountSidebarOption, User } from '@prisma/client';
type Props = {
    defaultOpen?: boolean;
    subAccounts: SubAccount[];
    sidebarOpt: AgencySidebarOption[] | SubAccountSidebarOption[];
    sidebarLogo: string;
    details: any;
    user:User| any;
    id: string;
}
const MenuOptions = ({defaultOpen,subAccounts,sidebarOpt,sidebarLogo,user,id}:Props) => {
  return (
    <div>
      Menu Option
    </div>
  )
}

export default MenuOptions
