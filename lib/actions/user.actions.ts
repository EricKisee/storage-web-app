'use server'

import { Query, ID } from "node-appwrite";
import { createAdminCLient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";

// **Create Account flow **
// 1. User enters full name and email
// 2. Check if the user already exists using the email
// 3. Send OTP to user's email
// 4. This will send a secret key for creating a session
// 5. Create a new user document if user is new
// 6. Return the user's accountid that will be used to complete login
// 7. Verify OTP and authenticate to login

const getUserByEmail = async (email:string) =>{
    const {databases} = await createAdminCLient()

    const result = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        [Query.equal('email',[email])]
    )

    return result.total > 0 ? result.documents[0] : null
}

const handleError = (error: unknown, message: string) => {
    console.log(error, message)
    throw error
}

export const sendEmailOTP = async ({email} : {email: string}) => {
    const {account} = await createAdminCLient()
    try{
        const session = await account.createEmailToken(ID.unique(), email)

        console.log(session)
        return session.userId
    }catch (error) {
        handleError(error, "Failed to send email OTP")
    }
}

export const createAccount = async ({fullName, email} : {fullName: string; email: string}) =>{
    const existingUser = await getUserByEmail(email)
    const accountId = await sendEmailOTP({email})

    if(!accountId) throw new Error('Failed to send OTP')
    if(!existingUser){
        const { databases } = await createAdminCLient()

        await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            ID.unique(),
            {
                fullName,
                email,
                avatar:'https://commons.wikimedia.org/wiki/File:Profile_avatar_placeholder_large.png',
                accountId
            }
        )
    }

    return parseStringify({accountId})
}

export const verifySecret = async ({accountId, password}:{accountId: string; password: string}) => {
    try{
        const { account } = await createAdminCLient()
        const session = await account.createSession(accountId, password);
        (await cookies()).set('appwrite-session', session.secret, {
            path:'/',
            httpOnly: true,
            sameSite: 'strict',
            secure: true
        })
        return parseStringify({sessionId: session.$id})
    }catch (error){
        handleError(error, 'Unable to verify OTP')
    }
}