'use client'
import {
    Dialog,
  } from "@/components/ui/dialog"

  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { actionsDropdownItems } from "@/constants"
import Image from "next/image"
import { Models } from "node-appwrite"
import { useState } from "react"
  
  

const ActionsDropdown = ({file} : {file:Models.Document}) => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [action, setAction] = useState<ActionType | null>(null)
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen} >
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger className="shad-no-focus">
                <Image src='/assets/icons/dots.svg' alt="dots" width={34} height={34} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel className="max-w-[200px] truncate" >My {file.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {actionsDropdownItems.map((actionItem) => (
                    <DropdownMenuItem key={actionItem.value} className="shad-dropdown-item" onClick={()=>{
                        setAction(actionItem)
                        if(['rename','share', 'delete','details'].includes(actionItem.value)){ 
                            setIsModalOpen(true) 
                            //continue here : 3:39:52
                            }
                        }}>
                        {actionItem.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>

    </Dialog>
  
  )
}

export default ActionsDropdown