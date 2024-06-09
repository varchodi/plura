import { getAuthUserDetails, verifyAndAcceptInvitation } from '@/lib/queries';
import { currentUser } from '@clerk/nextjs/server'
import { Plan } from '@prisma/client';
import { redirect } from 'next/navigation';
import React from 'react'

const Page = async({searchParams}:{searchParams:{plan:Plan,state:string,code:string}}) => {
  const agencyId = await verifyAndAcceptInvitation();
  console.log(`agency: ${agencyId}`);
  //get user details (with server actions /??)
  const user = await getAuthUserDetails();
  if (agencyId) {
    if (user?.role === "SUBACCOUNT_GUEST" || user?.role === "SUBACCOUNT_USER") {
      return redirect('/subaccount')
    } else if (user?.role === "AGENCY_OWNER" || user?.role === "AGENCY_ADMIN") {
      if (searchParams.plan) {
        return redirect(`/agency/${agencyId}/billing?plan=${searchParams.plan}`)
      }

      if (searchParams.state) {
        const statePath = searchParams.state.split("__")[0];
        const stateAgencyId = searchParams.state.split("___")[1];
        if (!stateAgencyId) return <div>Not authorized</div>
        return redirect(`/agency/${stateAgencyId}/${statePath}?code=${searchParams.code}`);
      } else return redirect(`/agency/${agencyId}`);
    } else {
      return <div>Not authorized</div>
      }
  }
  // return (
  //   <div>
  //     <h1>Agency DashBoard</h1>
  //   </div>
  // )
const authUser = await currentUser();
  return <div className='flex justify-center items-center mt-4'>
    <div className="max-w-[850px] border-[1px] p-4 rounded-xl">
      <h1 className='text-4xl'>Create an Agency</h1>
  </div>
</div>
}


export default Page
