import React from 'react'
import BasicRating from './card/ratting'

export default function Productreview({reviews}) {
  return (
    <div class="reviews w-75">
    <h3>Other's Reviews:</h3>
    <hr />
    {reviews && reviews.map(review => (
        <div key={review._id} class="review-card my-3">
            {/* <div class="rating-outer">
                <div class="rating-inner" style={{width: `${review.rating/5*100}%`}}></div>
            </div> */}
            <BasicRating rating={review.rating}/>
            <p class="review_user">by {review.user.name}</p>
            <p class="review_comment">{review.comment}</p>

            <hr />
        </div>
    ))
    }
   
</div>
  )
}
