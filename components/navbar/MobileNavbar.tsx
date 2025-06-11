import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { LuAlignJustify } from "react-icons/lu";
import NavItems from './NavItems';

interface Props{
  loggedInUser?: {
    name: string;
    email: string;
    image: string;
  }
}

const MobileNavbar = ({loggedInUser}: Props) => {
  return (
    <Sheet>
        <SheetTrigger><LuAlignJustify className='text-3xl cursor-pointer' /></SheetTrigger>
        <SheetContent side="left">
            <SheetHeader>
            <SheetTitle className="text-center font-bold text-xl">Daniel Shop</SheetTitle>
            </SheetHeader>
            
            {loggedInUser && (
              <NavItems mobile={true} loggedInUser={loggedInUser} />
            )}
            
            {/* <SheetClose className="overflow-y-auto">
                <NavItems mobile />
            </SheetClose> */}
              
        </SheetContent>
    </Sheet>
  )
}

export default MobileNavbar