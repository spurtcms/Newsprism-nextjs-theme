import Link from 'next/link';
import React from 'react'

const News_Layout4 = ({ array3 }) => {
    return (
        <>
            <div
                className="gap-[24px] border-[#131313] grid grid-cols-[1fr_1.7fr] max-[1024px]:grid-cols-1 p-[20px_0px] border-b-[1px] border-solid">
                <div>
                    <Link href={`/news/${array3?.[4]?.slug}`} legacyBehavior>
                        <a
                            className="mb-[10px] font-normal text-[#131313] text-[26px] hover:underline no-underline leading-[32px]">
                            {array3?.[4]?.title}

                        </a>
                    </Link>

                    <p
                        className=" mb-[10px] line-clamp-4 font-inter font-normal text-[#131313] text-base leading-[24px]"
                        dangerouslySetInnerHTML={{
                            __html: array3?.[4]?.description
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

                    <h4 className="font-bold text-[#131313] text-[14px] leading-[19px] ">

                        {`${array3?.[4]?.authorDetails?.firstName} ${array3?.[4]?.authorDetails?.lastName}`}
                    </h4>
                </div>

                <div className="gap-[10px] grid grid-cols-[1fr_auto_1fr] max-[768px]:grid-cols-1">
                    <div>
                        <img
                            src={array3?.[5]?.coverImage}
                            alt={array3?.[5]?.title}
                            className="w-full"
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null;  // Prevent infinite loop if fallback fails
                                currentTarget.src = "/img/no-image.png";  // Fallback to a default image
                            }}

                        />
                    </div>
                    <span className="bg-[#13131366] w-[1px] max-[768px]:w-full h-hull max-[768px]:h-[1px]"></span>
                    <ul>
                        <li
                            className="border-[#13131366] last-of-type:border-0 mb-[10px] last-of-type:mb-0 pb-[10px] last-of-type:pb-0 border-b-[1px] border-solid"
                            style={{ display: [undefined, null, ""].includes(array3?.[5]?.title) ? "none" : "" }}
                        >
                            <Link href={`/news/${array3?.[5]?.slug}`} legacyBehavior>
                                <a
                                    className="font-normal text-[#131313] text-[18px] hover:underline no-underline leading-[22px]">

                                    {array3?.[5]?.title}
                                </a>
                            </Link>
                        </li>
                        <li
                            className="border-[#13131366] last-of-type:border-0 mb-[10px] last-of-type:mb-0 pb-[10px] last-of-type:pb-0 border-b-[1px] border-solid"
                            style={{ display: [undefined, null, ""].includes(array3?.[6]?.title) ? "none" : "" }}
                        >
                            <Link href={`/news/${array3?.[6]?.slug}`} legacyBehavior>
                                <a
                                    className="font-normal text-[#131313] text-[18px] hover:underline no-underline leading-[22px]">
                                    {array3?.[6]?.title}

                                </a>
                            </Link>
                        </li>
                        <li
                            className="border-[#13131366] last-of-type:border-0 mb-[10px] last-of-type:mb-0 pb-[10px] last-of-type:pb-0 border-b-[1px] border-solid"
                            style={{ display: [undefined, null, ""].includes(array3?.[7]?.title) ? "none" : "" }}
                        >
                            <Link href={`/news/${array3?.[7]?.slug}`} legacyBehavior
                            >

                                <a
                                    className="font-normal text-[#131313] text-[18px] hover:underline no-underline leading-[22px]">

                                    {array3?.[7]?.title}
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

        </>
    )
}
export default News_Layout4;
