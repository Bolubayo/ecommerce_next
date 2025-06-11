import { auth } from '@/auth'
import { ProductDetail, Review } from '@/lib/type'
import { CollapsibleDemo } from '../uiComponents/Collapse'

const ReviewCardContainer = async ({ reviews, product }: { reviews: Review[], product: ProductDetail }) => {
  
  const session = await auth()
  const user = session?.user

  return (
    <div className="main-max-width mx-auto padding-x ">

      <CollapsibleDemo reviews={reviews} loggedInUser={user} product={product} />

      {/* <h4 className="my-4 font-semibold">{reviews.length < 2 ? "Review" : "Reviews"} ({reviews.length})</h4>
      {reviews.map((review) => <ReviewCard key={review.id} review={review} loggedInUser={user} />)} */}
    </div>
  )
}

export default ReviewCardContainer