"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ReviewPage() {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

const submitReview = async () => {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    alert("Please login first");
    return;
  }

  const user = session.user;

    const { error } = await supabase.from("reviews").insert([
      {
        user_id: user.id,
        rating: rating,
        review_text: text,
      },
    ]);

    if (error) {
      alert("Error submitting review");
      console.log(error);
    } else {
      alert("Review submitted successfully!");
      setRating(0);
      setText("");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Rate Our Smart Learning ⭐
      </h1>

      <div className="flex justify-center mb-6">
        {[1,2,3,4,5].map((star)=>(
          <span
            key={star}
            onClick={()=>setRating(star)}
            className={`text-4xl cursor-pointer ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>

      <textarea
        className="w-full border p-3 rounded mb-4"
        rows={4}
        placeholder="Write your feedback..."
        value={text}
        onChange={(e)=>setText(e.target.value)}
      />

      <button
        onClick={submitReview}
        className="w-full bg-blue-600 text-white py-2 rounded-lg"
      >
        Submit Review
      </button>
    </div>
  );
}