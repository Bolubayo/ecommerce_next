"use server"

import { signOut } from "@/auth"
import { api } from "./api"
import { revalidatePath } from "next/cache"
import axios from "axios"

export async function signOutUser() {
    await signOut({redirectTo: "/"})
}


export async function createReviewAction(formData: FormData) {
  const product_id = Number(formData.get("product_id"));
  const email = formData.get("email");
  const rating = Number(formData.get("rating"));
  const review = formData.get("review");
  const slug = formData.get("slug");

  if (!product_id || !email || !rating || !review || !slug) {
    throw new Error("All fields are required.");
  }

  const reviewObj = { product_id, email, rating, review };

  try {
    const response = await api.post("add_review/", reviewObj);
    revalidatePath(`products/${slug}`);
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      console.error("API Error Response:", err.response.data);
      throw new Error(err.response.data);
    }
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("An unknown error occurred.");
  }
}


export async function updateReviewAction(formData: FormData) {
    const rating = Number(formData.get("rating"));
    const review = formData.get("review");
    const review_id = Number(formData.get("review_id"));
    const slug = formData.get("slug");

  if (!review_id || !rating || !review || !slug) {
    throw new Error("All fields are required.");
  }

  const reviewObj = { rating, review };

  try {
    const response = await api.put(`update_review/${review_id}/`, reviewObj);
    revalidatePath(`products/${slug}`);
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("An unknown error occurred.");
  }
}


export async function deleteReviewAction(formData: FormData) {
    const review_id = Number(formData.get("review_id"));
    const slug = formData.get("slug");

    if (!review_id || isNaN(review_id) || !slug) {
    throw new Error("Review ID and slug are required and must be valid.");
    }
    
    const url = `/delete_review/${review_id}/`;
    console.log("Deleting review with URL:", url);

  try {
    const response = await api.delete(`/delete_review/${review_id}/`);
    revalidatePath(`products/${slug}`);
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("An unknown error occurred.");
  }
}


export async function addToCartAction(formData: FormData) {
    const cart_code = formData.get("cart_code");
    const product_id = formData.get("product_id");
    
    const cartitemObj = { cart_code, product_id };

  try {
    const response = await api.post("add_to_cart/", cartitemObj);
      return response.data;
      
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("An unknown error occurred.");
  }
}


// export async function addToWishlistAction(formData: FormData) {
//   try {
//     const response = await api.post("add_to_wishlist/", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data"
//       }
//     })
//     return response.data
//   } catch (err: unknown) {
//     if (err instanceof Error) throw new Error(err.message)
//     throw new Error("An unknown error occurred.")
//   }
// }

export async function addToWishlistAction(formData: FormData) {
  const email = formData.get("email");
  const product_id = formData.get("product_id");

  // Defensive check  
  if (!email || !product_id) {
    throw new Error("Missing email or product ID in wishlist action.");
  }

  const wishlistObj = { email, product_id };

  try {
    const response = await api.post("add_to_wishlist/", wishlistObj);
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("An unknown error occurred.");
  }
}



export async function updateCartitemAction(formData: FormData) {
    const item_id = Number(formData.get("cartitem_id"))
    const quantity = Number(formData.get("quantity"))
    const cart_code = formData.get("cart_code")

    const cartitemObj = { item_id, quantity }
    
    try {
        const response = await api.put("update_cartitem_quantity/", cartitemObj);
        revalidatePath(`/cart/${cart_code}`);
        return response.data;
        
    } catch (err: unknown) {
        if (err instanceof Error) {
        throw new Error(err.message);
        }
        throw new Error("An unknown error occurred.");
    }
    
}



export async function deleteCartitemAction(formData: FormData) {
    const item_id = Number(formData.get("cartitem_id"));
    const cart_code = formData.get("cart_code");

    // if (!review_id || isNaN(review_id) || !slug) {
    // throw new Error("Review ID and slug are required and must be valid.");
    // }
    
    // const url = `/delete_review/${review_id}/`;
    // console.log("Deleting review with URL:", url);

  try {
    const response = await api.delete(`delete_cartitem/${item_id}/`);
    revalidatePath(`/cart/${cart_code}`);
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("An unknown error occurred.");
  }
}




