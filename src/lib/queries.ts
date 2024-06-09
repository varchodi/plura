"use server"
import { clerkClient, currentUser } from "@clerk/nextjs/server"
import { db } from "./db";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";

 //server actions 

export const getAuthUserDetails = async () => {
    const user = await currentUser();
    if (!user) {
        return;
    }

    //!! user from db
    const userData = await db.user.findUnique({
        where: { email: user.emailAddresses[0].emailAddress },
        include: {
            Agency: {
                include: {
                    SidebarOption: true,
                    SubAccount: {
                        include:{SidebarOption:true}
                    }
                }
            },
            Permissions:true,
        }
    })

    return userData;
}

//?? activity logs ??
export const saveActivityNotification = async ({
    agencyId,
    description,
    subaccountId
}: {
    agencyId?: string,
    description: string,
    subaccountId?:string
}) => {
    const authUser = await currentUser();
    let userData;
    if (!authUser) {
        const response = await db.user.findFirst({
            where: {
                Agency: {
                    SubAccount: {
                        some:{id:subaccountId},
                    }
                }
            }
        })
        if (response) {
            userData = response;
        }
    } else {
        userData = await db.user.findUnique({
            where:{email:authUser.emailAddresses[0].emailAddress}
        })
    }

    if (!userData) {
        console.warn("could not find a user");
        return;
    }

    let foundAgencyId = agencyId;
    if (!foundAgencyId) {
        if (!subaccountId) {
            throw new Error("You need to provide atleast an agencyId or subaccount Id");
        }

        const response = await db.subAccount.findUnique({
            where:{id:subaccountId},
        })
        if (response) foundAgencyId = response.agencyId;
    }

    if (subaccountId) {
        await db.notification.create({
            data: {
                notification: `${userData.name} | ${description}`,
                User: {
                    connect: {
                        id:userData.id
                    }
                },
                Agency: {
                    connect: {
                        id:foundAgencyId
                    }
                },
                SubAccount: {
                    connect:{id:subaccountId}
                }
            }
        })
    } else {
        await db.notification.create({
            data: {
                notification: `${userData.name} | ${description}`,
                User: {
                    connect: {
                        id:userData.id,
                    }
                },
                Agency: {
                    connect:{id:foundAgencyId}
                }
            }
        })
    }

}

//!! create user
export const createTeamUsers = async (agencyId:string,user:User) => {
    if (user.role === "AGENCY_OWNER") return null;
    const response = await db.user.create({ data: { ...user } }); // create user when invited
    return response;
}
 
//!! get agency 
export const verifyAndAcceptInvitation = async () => {
    const user = await currentUser();
    if (!user) return redirect('/sign-in');
    const invitaionExist = await db.invitation.findUnique({
        where: {
        email:user.emailAddresses[0].emailAddress,status:"PENDING"
        }
    })
    
    if (invitaionExist) {
        const userDetails = await createTeamUsers(invitaionExist.agencyId, {
            email: invitaionExist.email,
            agencyId: invitaionExist.agencyId,
            avatarUrl: user.imageUrl,
            id: user.id,
            name:`${user.firstName} ${user.lastName}`,
            role: invitaionExist.role,
            createdAt: new Date(),
            updatedAt:new Date()
        });
        await saveActivityNotification({
            agencyId: invitaionExist?.agencyId,
            description: "Joined",
            subaccountId:undefined
        })

        if (userDetails) {
            await clerkClient.users.updateUserMetadata(user.id, {
                privateMetadata: {
                    role: userDetails.role || "SUBACCOUNT_USER"
                }
            })
            //delete invitation
            await db.invitation.delete({
                where: { email: userDetails.email }
            });

            return userDetails.agencyId;
        } else return null;
    } else {
        const agency = await db.user.findUnique({
            where:{email:user.emailAddresses[0].emailAddress}
        })

        return agency ? agency.agencyId : null;
    }

}