import { getAuthUserDetails, verifyAndAcceptInvitation } from '@/lib/queries';
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'

const Page = async() => {
  const agencyId = await verifyAndAcceptInvitation();
  console.log(`agency: ${agencyId}`);
  //get user details (with server actions /??)
  const user = await getAuthUserDetails();
  return (
    <div>
      <h1>Agency DashBoard</h1>
    </div>
  )
}

export default Page
