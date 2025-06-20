"use client";

import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import Button from "../uiComponents/Button";
import { cn } from "@/lib/utils";
import { Textarea } from '@/components/ui/textarea';
import { ProductDetail, Review } from "@/lib/type";
import { createReviewAction, updateReviewAction } from "@/lib/actions";
import { toast } from 'react-toastify';

interface Props {
  rating: number;
  review: string;
}

const ReviewForm = ({ product, loggedInUserEmail, review, updateReviewForm }: { product?: ProductDetail; loggedInUserEmail: string | null | undefined; review?: Review; updateReviewForm?:boolean }) => {
  
  
  // const {rating, review: reviewMessage} = review
  const [customerReview, setCustomerReview] = useState("")
  const [reviewBtnLoader, setReviewButtonLoader] = useState(false)

  const [hoverRating, setHoverRating] = useState(0);
  const [hoverReview, setHoverReview] = useState("");

  const [clickedRating, setClickedRating] = useState(0);
  const [clickedReview, setClickedReview] = useState("");

  const handleStarClick = ({ rating, review }: Props) => {
    setClickedRating(rating);
    setClickedReview(review);
  };

  const handleHoverIn = ({ rating, review }: Props) => {
    setHoverRating(rating);
    setHoverReview(review);
  };

  const handleHoverOut = () => {
    setHoverRating(0);
    setHoverReview("");
  };

  const ratings = [
    { rating: 1, review: "Poor" },
    { rating: 2, review: "Fair" },
    { rating: 3, review: "Good" },
    { rating: 4, review: "Very Good" },
    { rating: 5, review: "Excellent" },
  ];

  useEffect(() => {
    if (updateReviewForm && review) {
      const {rating, review: reviewMessage} = review
      setClickedRating(rating)
      setCustomerReview(reviewMessage)

      const ratingTag = ratings.find((r) => r.rating === rating);
      setClickedReview(ratingTag ? ratingTag.review : "");
    }

  }, [updateReviewForm])

  async function handleUpdateReview(e: React.FormEvent) {
    e.preventDefault()
    setReviewButtonLoader(true)
    const formData = new FormData()
    formData.set("slug", product?.slug ? product.slug : "")
    formData.set("review", customerReview)
    formData.set("rating", String(clickedRating))
    formData.set("review_id", review? String(review.id) : "")

    try {
      await updateReviewAction(formData);
      toast.success("Review updated successfully.")
    }

    catch (err: unknown) {
    if (err instanceof Error) {
      toast.error(err.message)
      throw new Error(err.message)
      }
      toast.error("An unknown error occured.")
    throw new Error("An unknown error occured.")
    }
    
    finally {
      setReviewButtonLoader(false)
    }
  }


  async function handleCreateReview(e: React.FormEvent) {
    e.preventDefault()
    setReviewButtonLoader(true)
    const formData = new FormData()
    formData.set("product_id", product?.id ? String(product.id) : "");
    formData.set("slug", product?.slug ? product.slug : "")
    formData.set("review", customerReview)
    formData.set("rating", String(clickedRating))
    formData.set("email", String(loggedInUserEmail))

    try {
      await createReviewAction(formData);
      toast.success("Review added successfully.")
    }

    catch (err: unknown) {
    if (err instanceof Error) {
      toast.error(err.message)
      throw new Error(err.message)
      }
      toast.error("An unknown error occured.")
    throw new Error("An unknown error occured.")
    }
    
    finally {
      setReviewButtonLoader(false)
    }
  }

  return (
    <div className="w-full mx-auto bg-white rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">
        Rate and review this product
      </h3>

      <div className="flex items-center justify-center gap-2 mb-4">
        {ratings.map(({ rating, review }) => (
          <Star
            key={rating}
            onPointerEnter={() => handleHoverIn({ rating, review })}
            onPointerLeave={handleHoverOut}
            onClick={() => handleStarClick({ rating, review })}
            className={cn(
              "w-7 h-7 cursor-pointer text-black hover:text-black transition",
              rating <= hoverRating ||
                (rating <= clickedRating && hoverRating < 1)
                ? "fill-black"
                : ""
            )}
          />
        ))}
      </div>

      <p className="text-center text-gray-600 text-sm">
        {hoverReview || clickedReview || "Review Score"}
      </p>

      {/* Review Form */}

      <form className="flex flex-col gap-4 mt-4" onSubmit={updateReviewForm ? handleUpdateReview : handleCreateReview}>
        <Textarea
          name="content"
          value={customerReview}
          onChange={(e) => setCustomerReview(e.target.value)}
          className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300 rounded-lg p-3 w-full resize-none"
          placeholder="Write your review..."
          required
        />

        <Button disabled={ (clickedRating) < 1 || (customerReview && customerReview.trim()).length==0 || reviewBtnLoader} className="bg-black text-white w-full py-2 rounded-lg hover:bg-gray-900 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
          {/* {reviewBtnLoader ? "Adding Review..." : "Add Review"} */}
          {updateReviewForm ? reviewBtnLoader ? "Updating review..." : "Update review" : reviewBtnLoader ? "Adding Review..." : "Add Review"}
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;