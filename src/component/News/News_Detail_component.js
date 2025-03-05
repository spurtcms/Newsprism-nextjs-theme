"use client"
import moment from "moment";
import Link from "next/link";
import React, { useState } from "react";
import SocialShare from "../SocialShare/SocialShare";
import DOMPurify from 'dompurify';

const sanitizeHTML = (html) => {
    const sanitized = DOMPurify.sanitize(html, {
        // FORBID_TAGS: ['h1', 'img'], // Remove <h1> and <img> tags
        FORBID_ATTR: ['style'], // Remove inline styles for consistency
    });
    return sanitized
        .replace(/<br>/g, ' ') // Replace <br> with spaces
        .replace(/<div className="card[^"]*"(.*?)<\/div>/g, '') // Remove specific <div> tags
        .replace(/<h1[^>]*>.*?<\/h1>/, "") // Remove the first <h1> tag and its content

};


const News_Detail_component = ({ params, detail_result, moreStories_data, More_news, popular_stories }) => {


    const data = detail_result?.ChannelEntryDetail

    const more_News_mapping_arr = More_news?.ChannelEntriesList?.channelEntriesList?.filter(item => item.slug !== params.detail);

    const [popular_stories_apiResult, setpopular_stories_apiResult] = useState(popular_stories?.ChannelEntriesList?.channelEntriesList);

    const [startIndex, setStartIndex] = useState(0);
    const visibleCount = 5;
    const handleNext = () => {
        if (startIndex + visibleCount < more_News_mapping_arr?.length) {
            setStartIndex(startIndex + 1);
        }
        console.log("startIndex", startIndex)
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    console.log("datasss", data)

    const convert_tags_intoArray = data.tags.split(",");

    // Map over the array if you need to transform each tag (e.g., capitalize)
    const tagsArray = convert_tags_intoArray.map(tag => tag.trim()); // Trim to remove extra spaces

    console.log("tagsArray", [undefined, null, ""].includes(tagsArray), tagsArray == "");


    return (
        <>

            <section className="mx-auto p-[13px_16px_32px] max-w-[1280px]">



                <h1 className="mb-[10px] font-normal text-[#131313] text-[50px] leading-[68px]">

                    {data?.title}
                </h1>
                <section
                    className="gap-[12px] border-[#131313] grid grid-cols-[3.1fr_294px] max-[700px]:grid-cols-1 max-[768px]:grid-cols-[1.5fr_1fr] pt-[53px] pb-[53px] border-b-[0.5px] border-solid">
                    <div className="my-custom-container p-6 bg-[#FFF6E3] ">
                        <div
                            className="my-custom-content text-gray-800 text-base leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: sanitizeHTML(data?.description || ""),
                            }}
                        ></div>
                    </div>
                    <div className="flex flex-col h-full">
                        <div className="mb-[30px] pl-[12px] max-[700px]:pl-0">

                            <div className="border-[#13131366] mb-[20px] pb-[20px] border-b border-solid">
                                <h3 className="mb-[6px] font-[600] font-inter text-[#131313] text-[16px] leading-[19px]">
                                    {`${data?.authorDetails?.firstName} ${data?.authorDetails?.lastName}`}
                                </h3>
                                <p className="font-inter font-normal text-[#131313D4] text-[16px] leading-[19px]">
                                    {data?.authorDetails?.roleName}
                                </p>
                            </div>

                            <div className="border-[#13131366] mb-[20px] pb-[20px] border-b border-solid">
                                <p className="mb-[16px] font-inter font-normal text-[#13131399] text-[14px] leading-[24px]">
                                    {/* 02
                                    January 2025,
                                    8:46 GMT */}
                                    {moment(data?.createdOn).format("MMM DD, YYYY [-] hh:mm A")}




                                </p>
                                <div className="flex items-center"> <img src="/img/notification.svg" alt="" />
                                    <h3 className="font-inter font-medium text-[#131313] text-base leading-[19px] ms-[6px]">
                                        {data?.viewCount}
                                    </h3>
                                    <p className="font-inter font-normal text-[#131313] text-base leading-[24px] ms-[4px]">
                                        Interested in this article
                                    </p>
                                </div>
                            </div>

                            {/* <ul className="flex items-center space-x-[30px]">
                                <li>
                                    <a href="">
                                        <img src="/img/facebook.svg" alt="facebook" />
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <img src="/img/whatsapp.svg" alt="whatsapp" />
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <img src="/img/instagram.svg" alt="instagram" />
                                    </a>
                                </li>
                            </ul> */}
                            <SocialShare />


                        </div>
                        <div className="border-[#13131366] pl-[12px] max-[700px]:pl-0 border-l max-[700px]:border-l-0 border-solid">

                            <div>
                                <h3
                                    className="border-[#131313] pb-[10px] border-b border-solid font-normal text-[#131313] text-[18px] leading-[24px]">
                                    More Stories</h3>

                                <ul>
                                    {moreStories_data.ChannelEntriesList.channelEntriesList.slice(0, 6).map((val, i) => (
                                        <>

                                            <Link href={`/news/${val?.slug}`} legacyBehavior>
                                                <li>
                                                    <a href=""
                                                        className="flex items-start gap-[10px] border-[#13131366] py-[10px] border-b-[0.5px] border-solid group">
                                                        <div className="min-w-[83px] h-[83px]">
                                                            <img src={val.coverImage || "/img/no-image.png"} alt={val.title}
                                                                onError={({ currentTarget }) => {
                                                                    currentTarget.onerror = null;  // Prevent infinite loop if fallback fails
                                                                    currentTarget.src = "/img/no-image.png";  // Fallback to a default image
                                                                }}
                                                                style={{ width: "83px", height: "83px" }}
                                                            />
                                                        </div>
                                                        <h4
                                                            className="font-normal text-[#131313] text-[14px] group-hover:underline leading-[19px]">
                                                            {val.title}
                                                        </h4>
                                                    </a>
                                                </li>

                                            </Link>
                                        </>

                                    ))}

                                </ul>
                            </div>



                            <div className="mt-[20px]">
                                <h3
                                    className="border-[#131313] pb-[10px] border-b border-solid font-normal text-[#131313] text-[18px] leading-[24px]">
                                    Popular Post</h3>

                                <ul>
                                    <Link href={`/news/${popular_stories_apiResult?.[0]?.slug}`} legacyBehavior>
                                        <li className="py-[10px]">
                                            <a href="" className="block relative max-[700px]:mx-auto max-[700px]:w-fit">
                                                <div className="overflow-hidden group">
                                                    <img src={popular_stories_apiResult?.[0].coverImage || '/img/no-image.png'} alt=" healty diet"
                                                        className="group-hover:scale-[1.1] transition-all w-[293px]"
                                                        style={{ height: "250px", width: "293px" }}
                                                    />
                                                </div>
                                                <div className="bottom-[16px] left-[16px] absolute">
                                                    <h4 className="mb-[4px] font-normal text-[#B7AEAB] text-[18px] leading-[24px]">
                                                        {popular_stories_apiResult?.[0].title}
                                                    </h4>
                                                    <p className="font-inter font-normal text-[#B7AEAB] text-[14px]">-
                                                        {moment(
                                                            popular_stories_apiResult?.[0]?.createdOn
                                                        ).format(
                                                            "MMM DD, YYYY"
                                                        )}



                                                    </p>
                                                </div>
                                            </a>
                                        </li>
                                    </Link>
                                    <Link href={`/news/${popular_stories_apiResult?.[1]?.slug}`} legacyBehavior>
                                        <li>
                                            <a href=""
                                                className="flex items-start gap-[10px] border-[#13131366] py-[10px] border-b-[0.5px] border-solid group">
                                                <div className="min-w-[83px]">
                                                    <img src={popular_stories_apiResult?.[1].coverImage || '/img/no-image.png'} alt="sample image"
                                                        style={{ height: "83px", width: "83px" }}
                                                    />
                                                </div>
                                                <h4
                                                    className="font-normal text-[#131313] text-[14px] group-hover:underline leading-[19px]">

                                                    {popular_stories_apiResult?.[1].title}
                                                </h4>
                                            </a>
                                        </li>
                                    </Link>
                                    <Link href={`/news/${popular_stories_apiResult?.[2]?.slug}`} legacyBehavior>
                                        <li>
                                            <a href=""
                                                className="flex items-start gap-[10px] border-[#13131366] py-[10px] border-b-[0.5px] border-solid group">
                                                <div className="min-w-[83px]">
                                                    <img src={popular_stories_apiResult?.[2].coverImage || '/img/no-image.png'} alt="sample image"
                                                        style={{ height: "83px", width: "83px" }}
                                                    />
                                                </div>
                                                <h4
                                                    className="font-normal text-[#131313] text-[14px] group-hover:underline leading-[19px]">

                                                    {popular_stories_apiResult?.[2].title}

                                                </h4>
                                            </a>
                                        </li>
                                    </Link>
                                </ul>
                            </div>


                            <div className="mt-[20px]">
                                <h3
                                    className="border-[#131313] mb-[20px] pb-[10px] border-b border-solid font-normal text-[#131313] text-[18px] leading-[24px]">
                                    Tags</h3>

                                <ul className="flex flex-wrap items-center gap-[7px]">
                                    {tagsArray.length == 0 || [undefined, null, ""].includes(tagsArray) || tagsArray == "" ? <></> : <>
                                        {tagsArray.map((val, i) => (
                                            <li>
                                                <a
                                                    className="inline-block border-[#00000038] hover:border-[#000000] p-[10px_14px] border border-solid font-inter font-normal text-[#000000] text-[14px] leading-[16px]">
                                                    {val}
                                                </a>
                                            </li>

                                        ))}
                                    </>}
                                </ul>
                            </div>



                        </div>
                    </div>




                </section>


                <section className="py-[20px]">
                    <div className="flex justify-between items-center space-x-3 ">
                        <h2 className="mb-[42px] font-normal text-[#131313] text-[32px]">More from News</h2>
                        <div className="flex items-center space-x-1">

                            <a
                                onClick={(e) => handlePrev(e)}
                                disabled={startIndex === 0}
                                className="flex justify-center items-center bg-[#920406] hover:bg-[#7e1d1e] w-6 h-6"

                                // className={`px-4 py-2 rounded mr-2 transition-all duration-200 ${startIndex > 0
                                //     ? "bg-gray-300 cursor-pointer hover:bg-gray-400"
                                //     : "bg-gray-200 cursor-default opacity-50"
                                //     }`}
                                style={{ cursor: startIndex > 0 ? "pointer" : "default" }}

                            >
                                <p className="flex justify-center items-center bg-[#920406] hover:bg-[#7e1d1e] w-6 h-6">
                                    <img src="/img/left-arrow.svg" alt="" />
                                </p>
                            </a>
                            <a
                                onClick={(e) => handleNext(e)}
                                disabled={startIndex + visibleCount >= more_News_mapping_arr?.length}

                                // className={`px-4 py-2 rounded transition-all duration-200 ${startIndex + visibleCount < BlogCards.length
                                //         ? "bg-gray-300 cursor-pointer hover:bg-gray-400"
                                //         : "bg-gray-200 cursor-default opacity-50"
                                //     }`}
                                style={{
                                    cursor:
                                        startIndex + visibleCount < more_News_mapping_arr.length ? "pointer" : "default",

                                }}

                                className="flex justify-center items-center bg-[#920406] hover:bg-[#7e1d1e] w-6 h-6"
                            >
                                <p className="flex justify-center items-center bg-[#920406] hover:bg-[#7e1d1e] w-6 h-6">
                                    <img src="/img/right-arrow.svg" alt="" />
                                </p>
                            </a>
                        </div>
                    </div>

                    <div className="relative">

                        <div className="gap-[20px] flex overflow-hidden ">

                            {more_News_mapping_arr.slice(startIndex, startIndex + visibleCount).map((val, index) => (
                                <>
                                    <Link href={`/news/${val?.slug}`} legacyBehavior>

                                        <a className="hover:underline min-w-[234px] ">
                                            <div className="mb-[17px] overflow-hidden">
                                                <img
                                                    src={val?.coverImage || "/img/no-image.png"}
                                                    alt={val?.title}
                                                    className="w-full h-[154px]"
                                                    onError={({ currentTarget }) => {
                                                        currentTarget.onerror = null;  // Prevent infinite loop if fallback fails
                                                        currentTarget.src = "/img/no-image.png";  // Fallback to a default image
                                                    }}

                                                />
                                            </div>
                                            <h3 className="font-normal text-[#131313] text-[18px] leading-[24px] tracking-[1px]">
                                                {val?.title}
                                            </h3>

                                        </a>
                                    </Link>
                                </>
                            ))}
                        </div>
                    </div>
                </section>


            </section>





        </>
    );
};

export default News_Detail_component;
