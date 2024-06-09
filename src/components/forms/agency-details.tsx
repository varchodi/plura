import { Agency } from '@prisma/client'
import React from 'react'
type Props = {
    data?:Partial<Agency>
}
const AgencyDetails = ({ data }: Props) => {
    
  return (
    <div>
      <h1>agency Details</h1>
    </div>
  )
}

export default AgencyDetails
