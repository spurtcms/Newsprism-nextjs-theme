import Link from 'next/link';
import React from 'react'

const News_Layout6 = ({ array3 }) => {
    return (
        <>
            <div
                className="border-[#131313] grid grid-cols-[1fr_1.7fr] max-[1024px]:grid-cols-1 p-[20px_0px] border-b-[1px] border-solid">
                <div>
                    <Link href={`/news/${array3?.[12]?.slug}`} legacyBehavior>
                        <a
                            className="mb-[20px] font-normal text-[#131313] text-[24px] hover:underline no-underline leading-[32px]">

                            {array3?.[12]?.title}
                        </a>
                    </Link>
                    <ul>
                        <li className="border-[#13131366] mt-[10px] pt-[10px] border-t-[1px] border-solid"
                            style={{ display: [undefined, null, ""].includes(array3?.[13]?.title) ? "none" : "" }}
                        >
                            <Link href={`/news/${array3?.[13]?.slug}`} legacyBehavior>
                                <a
                                    className="font-normal text-[#131313] text-[18px] hover:underline no-underline leading-[22px]">
                                    {array3?.[13]?.title}
                                </a>
                            </Link>
                        </li>
                        <li className="border-[#13131366] mt-[10px] pt-[10px] border-t-[1px] border-solid"
                            style={{ display: [undefined, null, ""].includes(array3?.[14]?.title) ? "none" : "" }}
                        >
                            <Link href={`/news/${array3?.[14]?.slug}`} legacyBehavior>
                                <a
                                    className="font-normal text-[#131313] text-[18px] hover:underline no-underline leading-[22px]">

                                    {array3?.[14]?.title}
                                    {console.log("qwqw221", array3?.[14]?.title)}
                                </a>
                            </Link>
                        </li>

                    </ul>

                </div>
                <div
                    className="gap-[8px] border-[#13131366] min-[1025px]:border-s-[1px] grid grid-cols-[1fr_1fr] max-[1024px]:mt-[16px] max-[1024px]:pt-[16px] max-[1024px]:border-t-[1px] border-solid min-[1025px]:ms-[16px] min-[1025px]:ps-[16px]">
                    <div>
                        <Link href={`/news/${array3?.[15]?.slug}`} legacyBehavior>
                            <a
                                className="mb-[10px] font-normal text-[#131313] text-[26px] hover:underline no-underline leading-[32px]">

                                {array3?.[15]?.title}
                            </a>
                        </Link>

                        <p
                            className="line-clamp-4 font-inter font-normal text-[#131313] text-base leading-[24px]"
                            dangerouslySetInnerHTML={{
                                __html: array3?.[15]?.description
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
                            src={array3?.[15]?.coverImage || "/img/no-image.png"}
                            alt={array3?.[15]?.title} className="w-full"
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null;  // Prevent infinite loop if fallback fails
                                currentTarget.src = "/img/no-image.png";  // Fallback to a default image
                            }}

                        />
                    </div>

                </div>
            </div>

        </>
    )
}
export default News_Layout6;
