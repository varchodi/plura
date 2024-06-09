import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'

const Page = async() => {
  const authAuser = await currentUser();
  if (!authAuser) redirect('/sign-in');

  //get user details 
  return (
    <div>
      <h1>Agency DashBoard</h1>
    </div>
  )
}

export default Page
