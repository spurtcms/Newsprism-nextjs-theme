import Link from 'next/link';
import React from 'react'

const News_Layout5 = ({ array3 }) => {
    return (
        <>
            <div
                className="gap-[24px] border-[#131313] grid grid-cols-[1fr_1.7fr] max-[1024px]:grid-cols-1 p-[20px_0px] border-b-[1px] border-solid">
                <div>
                    <Link href={`/news/${array3?.[8]?.slug}`} legacyBehavior>
                        <a
                            className="mb-[10px] font-normal text-[#131313] text-[26px] hover:underline no-underline leading-[32px]">
                            {array3?.[8]?.title}

                        </a>
                    </Link>
                </div>

                <div className="gap-[10px] grid grid-cols-[1fr_auto_1fr] max-[768px]:grid-cols-1">
                    <div>
                        <img
                            src={array3?.[8]?.coverImage}
                            alt={array3?.[8]?.title} className="w-full"
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
                            style={{ display: [undefined, null, ""].includes(array3?.[9]?.title) ? "none" : "" }}
                        >
                            <Link href={`/news/${array3?.[9]?.slug}`} legacyBehavior>
                                <a
                                    className="font-normal text-[#131313] text-[18px] hover:underline no-underline leading-[22px]">
                                    {array3?.[9]?.title}

                                </a>
                            </Link>
                        </li>
                        <li
                            className="border-[#13131366] last-of-type:border-0 mb-[10px] last-of-type:mb-0 pb-[10px] last-of-type:pb-0 border-b-[1px] border-solid"
                            style={{ display: [undefined, null, ""].includes(array3?.[10]?.title) ? "none" : "" }}
                        >
                            <Link href={`/news/${array3?.[10]?.slug}`} legacyBehavior>
                                <a
                                    className="font-normal text-[#131313] text-[18px] hover:underline no-underline leading-[22px]">
                                    {array3?.[10]?.title}

                                </a>
                            </Link>
                        </li>
                        <li
                            className="border-[#13131366] last-of-type:border-0 mb-[10px] last-of-type:mb-0 pb-[10px] last-of-type:pb-0 border-b-[1px] border-solid"
                            style={{ display: [undefined, null, ""].includes(array3?.[11]?.title) ? "none" : "" }}
                        >
                            <Link href={`/news/${array3?.[11]?.slug}`} legacyBehavior>
                                <a
                                    className="font-normal text-[#131313] text-[18px] hover:underline no-underline leading-[22px]">
                                    {array3?.[11]?.title}
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

        </>
    )
}
export default News_Layout5;
