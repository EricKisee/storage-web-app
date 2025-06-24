import Header from "@/components/Header"
import MobileNavigation from "@/components/MobileNavigation"
import Sidebar from "@/components/Sidebar"
import { getCurrentUser } from "@/lib/actions/user.actions"
import { redirect } from "next/navigation"
import { Toaster } from "@/components/ui/toaster"
import React from "react"

const Layout = async ({children} : {children: React.ReactNode}) => {
 var currentUser;
  try {
     currentUser = await getCurrentUser()
    if (!currentUser) return redirect('/sign-in')
  } catch (error) {
    console.error("Error fetching current user:", error)
    return redirect('/sign-in')
  }

  return (
    <main className="flex h-screen">
        <Sidebar {...currentUser}/>
        <section className="flex h-full flex-1 flex-col">
            <MobileNavigation {...currentUser}/>
            <Header userId={currentUser.$id} accountId={currentUser.accountId} />
            <div className="main-content" >{children}</div>
        </section>
        <Toaster />
    </main>
  )
}

export default Layout