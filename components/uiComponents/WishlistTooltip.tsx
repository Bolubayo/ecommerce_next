import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const WishlistTooltip = ({loggedInUserEmail}: {loggedInUserEmail: string | null | undefined}) => {
  return (
    <Tooltip>
          <TooltipTrigger disabled={!Boolean(loggedInUserEmail)} className="wish-btn disabled:opacity-50 disabled:cursor-not-allowed">Add to Wishlist
              {/* <Button disabled={!Boolean(loggedInUserEmail)} className="wish-btn disabled:opacity-50 disabled:cursor-not-allowed">
                Add to Wishlist
              </Button> */}
          </TooltipTrigger>
        <TooltipContent>
            <p>Login to add product to wishlist.</p>
        </TooltipContent>
    </Tooltip>
  )
}

export default WishlistTooltip