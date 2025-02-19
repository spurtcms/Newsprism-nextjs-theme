import Link from 'next/link';
import React from 'react'

const News_Layout7 = ({ array3 }) => {
    return (
        <>
            <div
                className="gap-[24px] border-[#131313] grid grid-cols-[1fr_1.7fr] max-[1024px]:grid-cols-1 p-[20px_0px] border-b-[1px] border-solid">
                <div>
                    <Link href={`/news/${array3?.[16]?.slug}`} legacyBehavior>

                        <a
                            className="mb-[10px] font-normal text-[#131313] text-[26px] hover:underline no-underline leading-[32px]">
                            {array3?.[16]?.title}
                        </a>
                    </Link>
                    <p
                        className="line-clamp-4 font-inter font-normal text-[#131313] text-base leading-[24px]"
                        dangerouslySetInnerHTML={{
                            __html: array3?.[16]?.description
                            ?.replaceAll("<br>", " ") // Replace <br> tags with spaces
                            .replaceAll(/<div className="card[^"]*"(.*?)<\/div>/g, '') // Remove specific <div> tags
                            .replaceAll(/<img[^>]*>/g, "") // Remove all <img> tags
                            .replace(/<h1[^>]*>.*?<\/h1>/, "") // Remove the first <h1> tag and its content
                            .replace(/p-\[24px_60px_10px\]/g, "") // Remove specific styles
                            .replace(/<\/?[^>]+(>|$)/g, "") // Remove all remaining HTML tags
                            .split(/\s+/) // Split text into words
                            .slice(0, 35) // Limit to the first 35 words
                            .join(" ") // Join the words back into a string
                            .concat("...") // Add ellipsis if text is truncated

                        }}
                    ></p>



                </div>
                <div>
                    <img
                        src={array3?.[16]?.coverImage || "/img/no-image.png"}
                        alt={array3?.[16]?.title} className="w-full"
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;  // Prevent infinite loop if fallback fails
                            currentTarget.src = "/img/no-image.png";  // Fallback to a default image
                        }}

                    />
                </div>
            </div>

        </>
    )
}
export default News_Layout7;
