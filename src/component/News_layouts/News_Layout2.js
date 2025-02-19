import Link from 'next/link';
import React from 'react'

const News_Layout2 = ({ array3 }) => {
    return (
        <>
            <div
                class="gap-[24px] border-[#131313] grid grid-cols-[1fr_1.7fr] max-[1024px]:grid-cols-1 p-[20px_0px] border-b-[1px] border-solid">
                <div>
                    <Link href={`/news/${array3?.[1]?.slug}`} legacyBehavior>
                        <a href="#"
                            class="mb-[10px] font-normal text-[#131313] text-[26px] hover:underline no-underline leading-[32px]">
                            {array3?.[1]?.title}

                        </a>
                    </Link>
                    <p
                        class="line-clamp-4 font-inter font-normal text-[#131313] text-base leading-[24px]"
                        dangerouslySetInnerHTML={{
                            __html: array3?.[1]?.description
                                ?.replaceAll("<br>", " ") // Replace <br> tags with spaces
                                .replaceAll(/<div class="card[^"]*"(.*?)<\/div>/g, '') // Remove specific <div> tags
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

                <div class="gap-[10px] grid grid-cols-[1fr_auto_1fr] max-[768px]:grid-cols-1">
                    <div>
                        <img
                            src={array3?.[1]?.coverImage}
                            alt={array3?.[1]?.title} class="w-full"
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null;  // Prevent infinite loop if fallback fails
                                currentTarget.src = "/img/no-image.png";  // Fallback to a default image
                            }}

                        />
                    </div>
                    <span class="bg-[#13131366] w-[1px] max-[768px]:w-full h-hull max-[768px]:h-[1px]"></span>
                    <ul>
                        <li
                            class="border-[#13131366] last-of-type:border-0 pb-[10px] last-of-type:pb-0 border-b-[1px] border-solid">

                            {/* <h4 class="mb-[1px] font-normal text-[#5A5A5A] text-[22px] leading-[32px]">

                                {`${array3?.[2]?.authorDetails?.firstName} ${array3?.[2]?.authorDetails?.lastName}`}
                            </h4> */}

                            <Link href={`/news/${array3?.[2]?.slug}`} legacyBehavior>
                                <a class="font-normal text-[#131313] text-[22px] hover:underline no-underline leading-[26px]">

                                    {array3?.[2]?.title}
                                </a>
                            </Link>
                            <p
                                class="line-clamp-4 font-inter font-normal text-[#131313] text-base leading-[24px]"
                                dangerouslySetInnerHTML={{
                                    __html: array3?.[2]?.description
                                        ?.replaceAll("<br>", " ") // Replace <br> tags with spaces
                                        .replaceAll(/<div class="card[^"]*"(.*?)<\/div>/g, '') // Remove specific <div> tags
                                        .replaceAll(/<img[^>]*>/g, "") // Remove all <img> tags
                                        .replace(/<h1[^>]*>.*?<\/h1>/, "") // Remove the first <h1> tag and its content
                                        .replace(/p-\[24px_60px_10px\]/g, "") // Remove specific styles
                                        .replace(/<\/?[^>]+(>|$)/g, "") // Remove all remaining HTML tags
                                        .split(/\s+/) // Split text into words
                                        .slice(0, 30) // Limit to the first 35 words
                                        .join(" ") // Join the words back into a string
                                        .concat("...") // Add ellipsis if text is truncated

                                }}
                            ></p>


                        </li>
                    </ul>
                </div>
            </div>

        </>
    )
}
export default News_Layout2;
