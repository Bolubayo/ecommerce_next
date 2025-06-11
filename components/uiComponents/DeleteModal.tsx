import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { TrashIcon, X } from 'lucide-react'

const DeleteModal = ({handleDeleteReview, handleDeleteCartitem, deleteCartitem}: {handleDeleteReview?: () => void, handleDeleteCartitem?: ()=> void, deleteCartitem?: boolean}) => {
  return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
          {deleteCartitem ?
            <button className="p-2 rounded-md bg-red-50 hover:bg-red-100 transition text-red-500 border border-red-300">
              <X className="w-5 h-5 cursor-pointer" />
            </button>
            :
            <button className="bg-gray-200 p-2 rounded-md cursor-pointer transition-all hover:bg-gray-300">
              <TrashIcon className="size-5 text-gray-600 cursor-pointer" />
            </button>
          }
        </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      {deleteCartitem ? <AlertDialogDescription>
        You are about to delete this product.
      </AlertDialogDescription> : <AlertDialogDescription>
        This action cannot be undone. This will permanently delete the review you have on this product.
      </AlertDialogDescription>}
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel className='cursor-pointer'>Cancel</AlertDialogCancel>
        <AlertDialogAction className='cursor-pointer' onClick={deleteCartitem ? handleDeleteCartitem : handleDeleteReview}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}

export default DeleteModal