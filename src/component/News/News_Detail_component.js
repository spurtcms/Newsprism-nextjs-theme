"use client"
import moment from "moment";
import Link from "next/link";
import React, { useState } from "react";

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

    console.log("popular_stories_apiResult", popular_stories_apiResult)

    const convert_tags_intoArray = data.tags.split(",");

    // Map over the array if you need to transform each tag (e.g., capitalize)
    const tagsArray = convert_tags_intoArray.map(tag => tag.trim()); // Trim to remove extra spaces

    console.log("tagsArray", [undefined, null, ""].includes(tagsArray), tagsArray == "");


    return (
        <>

            <section class="mx-auto p-[13px_16px_32px] max-w-[1280px]">

                {/* <h1 class="mb-[10px] font-normal text-[#131313] text-[50px] leading-[68px]">
                    Don’t go outside in the morning or
                    evening. <br />
                    NHS warns as Britain braces for snow</h1> */}

                <h1 class="mb-[10px] font-normal text-[#131313] text-[50px] leading-[68px]">
                    {/* Don’t go outside in the morning or
                        evening. <br />
                        NHS warns as Britain braces for snow */}
                    {data?.title}
                </h1>


                {/* <p class="font-inter font-medium text-[#131313] text-[20px] leading-[30px]">
                    UK Health Security Agency
                    issued amber
                    cold weather alert for England from Thursday into next week</p> */}





                <section
                    class="gap-[12px] border-[#131313] grid grid-cols-[3.1fr_294px] max-[700px]:grid-cols-1 max-[768px]:grid-cols-[1.5fr_1fr] pt-[53px] pb-[53px] border-b-[0.5px] border-solid">
                    <div>
                        <div
                            className="pr-[12px] max-[700px]:pr-0 "
                            style={{ color: 'black' }}
                            dangerouslySetInnerHTML={{
                                __html: data?.description
                            }}
                        >
                        </div>


                        {/* <div class="mt-[65px] max-w-[611px]">

                            <h1 class="mb-[26px] font-normal text-[#131313] text-[32px] leading-[43px]">
                                Join the conversation
                            </h1>

                            <ul class="flex items-center mb-[28px]">
                                <li class="w-full max-w-[294px] me-[20px]">
                                    <a href="javascript:void(0)"
                                        class="block bg-[#1A1A1A] hover:bg-[#2c2c2c] p-[12px_24px] w-full font-inter font-medium text-[#FFFFFF] text-[16px] text-center leading-[19px]">Show
                                        all comments</a>
                                </li>
                                <li class="me-[30px]">
                                    <a href="">
                                        <img src="/img/facebook.svg" alt="facebook" />
                                    </a>
                                </li>
                                <li class="me-[30px]">
                                    <a href="">
                                        <img src="/img/whatsapp.svg" alt="whatsapp" />
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <img src="/img/instagram.svg" alt="instagram" />
                                    </a>
                                </li>
                            </ul>

                            <p class="mb-[10px] font-inter font-normal text-[#131313] text-[14px] leading-[22px]">The
                                Telegraph values your comments but kindly requests all posts are on topic, constructive and
                                respectful. Please review our commenting policy.</p>
                        </div> */}





                    </div>
                    <div class="flex flex-col h-full">
                        <div class="mb-[55px] pl-[12px] max-[700px]:pl-0">

                            <div class="border-[#13131366] mb-[20px] pb-[20px] border-b border-solid">
                                <h3 class="mb-[6px] font-[600] font-inter text-[#131313] text-[16px] leading-[19px]">
                                    {`${data?.authorDetails?.firstName} ${data?.authorDetails?.lastName}`}
                                </h3>
                                <p class="font-inter font-normal text-[#131313D4] text-[16px] leading-[19px]">
                                    Senior News Reporter
                                </p>
                            </div>
                            {/* <div class="border-[#13131366] mb-[20px] pb-[20px] border-b border-solid">
                                <h3 class="mb-[6px] font-[600] font-inter text-[#131313] text-[16px] leading-[19px]">Related
                                    Topics</h3>
                                <p class="font-inter font-normal text-[#131313D4] text-[16px] leading-[24px]">
                                    UK Weather, Met Office, Snow, Flooding, Greater Manchester
                                </p>
                            </div> */}

                            <div class="border-[#13131366] mb-[20px] pb-[20px] border-b border-solid">
                                <p class="mb-[16px] font-inter font-normal text-[#13131399] text-[14px] leading-[24px]">
                                    {/* 02
                                    January 2025,
                                    8:46 GMT */}
                                    {moment(
                                        data?.createdOn
                                    ).format(
                                        "MMM DD, YYYY"
                                    )}

                                </p>
                                <div class="flex items-center mb-[27px]"> <img src="/img/notification.svg" alt="" />
                                    <h3 class="font-inter font-medium text-[#131313] text-base leading-[19px] ms-[6px]">4313
                                    </h3>
                                    <p class="font-inter font-normal text-[#131313] text-base leading-[24px] ms-[4px]">
                                        Interested in this article
                                    </p>
                                </div>
                                {/* <div class="max-[700px]:flex max-[420px]:flex-col max-[420px]:space-x-[unset] max-[700px]:space-x-[10px] max-[420px]:space-y-[10px]">
                                    <a href=""
                                        class="block flex justify-center items-center space-x-[4px] bg-[#1A1A1A] hover:bg-[#2c2c2c] mb-[10px] max-[700px]:mb-0 p-[12px_24px] w-full max-w-[294px] max-[700px]:max-w-full font-medium text-[#FFFFFF] text-base text-center leading-[19px]">

                                        <img src="/img/save.svg" alt="save" />
                                        <span class="font-inter">
                                            Save this article
                                        </span>
                                    </a>
                                    <a href=""
                                        class="block flex justify-center items-center space-x-[4px] bg-[#1A1A1A] hover:bg-[#2c2c2c] p-[12px_24px] w-full max-w-[294px] max-[700px]:max-w-full font-inter font-medium text-[#FFFFFF] text-base text-center leading-[19px]">
                                        <img src="/img/gift.svg" alt="gift" />
                                        <span class="font-inter">
                                            Gift this article
                                        </span>
                                    </a>
                                </div> */}
                            </div>

                            <ul class="flex items-center space-x-[30px]">
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
                            </ul>


                        </div>
                        <div class="border-[#13131366] pl-[12px] max-[700px]:pl-0 border-l max-[700px]:border-l-0 border-solid">

                            <div>
                                <h3
                                    class="border-[#131313] pb-[10px] border-b border-solid font-normal text-[#131313] text-[18px] leading-[24px]">
                                    More Stories</h3>

                                <ul>
                                    {moreStories_data.ChannelEntriesList.channelEntriesList.slice(0, 6).map((val, i) => (
                                        <>

                                            <Link href={`/news/${val?.slug}`} legacyBehavior>
                                                <li>
                                                    <a href=""
                                                        class="flex items-start gap-[10px] border-[#13131366] py-[10px] border-b-[0.5px] border-solid group">
                                                        <div class="min-w-[83px] h-[83px]">
                                                            <img src={val.coverImage || "/img/no-image.png"} alt={val.title}
                                                                onError={({ currentTarget }) => {
                                                                    currentTarget.onerror = null;  // Prevent infinite loop if fallback fails
                                                                    currentTarget.src = "/img/no-image.png";  // Fallback to a default image
                                                                }}
                                                                style={{ width: "83px", height: "83px" }}
                                                            />
                                                        </div>
                                                        <h4
                                                            class="font-normal text-[#131313] text-[14px] group-hover:underline leading-[19px]">
                                                            {val.title}
                                                        </h4>
                                                    </a>
                                                </li>

                                            </Link>
                                        </>

                                    ))}

                                    {/* <li>
                                        <a href=""
                                            class="flex items-start gap-[10px] border-[#13131366] py-[10px] border-b-[0.5px] border-solid group">
                                            <div class="min-w-[83px]">
                                                <img src="/img/sampleImage21.svg" alt="sample image" />
                                            </div>
                                            <h4
                                                class="font-normal text-[#131313] text-[14px] group-hover:underline leading-[19px]">
                                                Labour block
                                                grooming gang inquiry into starmer’s conduct as CPS head</h4>
                                        </a>
                                    </li>

                                    <li>
                                        <a href=""
                                            class="flex items-start gap-[10px] border-[#13131366] py-[10px] border-b-[0.5px] border-solid group">
                                            <div class="min-w-[83px]">
                                                <img src="/img/sampleImage22.svg" alt="sample image" />
                                            </div>
                                            <h4
                                                class="font-normal text-[#131313] text-[14px] group-hover:underline leading-[19px]">
                                                Labour block
                                                grooming gang inquiry into starmer’s conduct as CPS head</h4>
                                        </a>
                                    </li>

                                    <li>
                                        <a href=""
                                            class="flex items-start gap-[10px] border-[#13131366] py-[10px] border-b-[0.5px] border-solid group">
                                            <div class="min-w-[83px]">
                                                <img src="/img/sampleImage23.svg" alt="sample image" />
                                            </div>
                                            <h4
                                                class="font-normal text-[#131313] text-[14px] group-hover:underline leading-[19px]">
                                                Labour block
                                                grooming gang inquiry into starmer’s conduct as CPS head</h4>
                                        </a>
                                    </li>

                                    <li>
                                        <a href=""
                                            class="flex items-start gap-[10px] border-[#13131366] py-[10px] border-b-[0.5px] border-solid group">
                                            <div class="min-w-[83px]">
                                                <img src="/img/sampleImage24.svg" alt="sample image" />
                                            </div>
                                            <h4
                                                class="font-normal text-[#131313] text-[14px] group-hover:underline leading-[19px]">
                                                Labour block
                                                grooming gang inquiry into starmer’s conduct as CPS head</h4>
                                        </a>
                                    </li>


                                    <li>
                                        <a href="" class="flex items-start gap-[10px] pt-[10px] group">
                                            <div class="min-w-[83px]">
                                                <img src="/img/sampleImage25.svg" alt="sample image" />
                                            </div>
                                            <h4
                                                class="font-normal text-[#131313] text-[14px] group-hover:underline leading-[19px]">
                                                Labour block
                                                grooming gang inquiry into starmer’s conduct as CPS head</h4>
                                        </a>
                                    </li> */}
                                </ul>
                            </div>



                            <div class="mt-[20px]">
                                <h3
                                    class="border-[#131313] pb-[10px] border-b border-solid font-normal text-[#131313] text-[18px] leading-[24px]">
                                    Popular Post</h3>

                                <ul>

                                    <li class="py-[10px]">
                                        <a href="" class="block relative max-[700px]:mx-auto max-[700px]:w-fit">
                                            <div class="overflow-hidden group">
                                                <img src={popular_stories_apiResult?.[0].coverImage || '/img/no-image.png'} alt=" healty diet"
                                                    class="group-hover:scale-[1.1] transition-all w-[293px]"
                                                    style={{ height: "250px", width: "293px" }}
                                                />
                                            </div>
                                            <div class="bottom-[16px] left-[16px] absolute">
                                                <h4 class="mb-[4px] font-normal text-[#FFFFFF] text-[18px] leading-[24px]">
                                                    {popular_stories_apiResult?.[0].title}
                                                </h4>
                                                <p class="font-inter font-normal text-[#FFFFFF] text-[14px]">-
                                                    {moment(
                                                        popular_stories_apiResult?.[0]?.createdOn
                                                    ).format(
                                                        "MMM DD, YYYY"
                                                    )}

                                                </p>
                                            </div>
                                        </a>
                                    </li>

                                    <li>
                                        <a href=""
                                            class="flex items-start gap-[10px] border-[#13131366] py-[10px] border-b-[0.5px] border-solid group">
                                            <div class="min-w-[83px]">
                                                <img src={popular_stories_apiResult?.[1].coverImage || '/img/no-image.png'} alt="sample image"
                                                    style={{ height: "83px", width: "83px" }}
                                                />
                                            </div>
                                            <h4
                                                class="font-normal text-[#131313] text-[14px] group-hover:underline leading-[19px]">

                                                {popular_stories_apiResult?.[1].title}
                                            </h4>
                                        </a>
                                    </li>
                                    <li>
                                        <a href=""
                                            class="flex items-start gap-[10px] border-[#13131366] py-[10px] border-b-[0.5px] border-solid group">
                                            <div class="min-w-[83px]">
                                                <img src={popular_stories_apiResult?.[2].coverImage || '/img/no-image.png'} alt="sample image"
                                                    style={{ height: "83px", width: "83px" }}
                                                />
                                            </div>
                                            <h4
                                                class="font-normal text-[#131313] text-[14px] group-hover:underline leading-[19px]">

                                                {popular_stories_apiResult?.[2].title}

                                            </h4>
                                        </a>
                                    </li>
                                </ul>
                            </div>


                            <div class="mt-[20px]">
                                <h3
                                    class="border-[#131313] mb-[20px] pb-[10px] border-b border-solid font-normal text-[#131313] text-[18px] leading-[24px]">
                                    Tags</h3>

                                <ul class="flex flex-wrap items-center gap-[7px]">
                                    {tagsArray.length == 0 || [undefined, null, ""].includes(tagsArray) || tagsArray == "" ? <></> : <>
                                        {tagsArray.map((val, i) => (
                                            <li>
                                                <a
                                                    class="inline-block border-[#00000038] hover:border-[#000000] p-[10px_14px] border border-solid font-inter font-normal text-[#000000] text-[14px] leading-[16px]">
                                                    {val}
                                                </a>
                                            </li>

                                        ))}
                                    </>}
                                    {/* 
                                    <li><a href=""
                                        class="inline-block border-[#00000038] hover:border-[#000000] p-[10px_14px] border border-solid font-inter font-normal text-[#000000] text-[14px] leading-[16px]">Gadget</a>
                                    </li>

                                    <li><a href=""
                                        class="inline-block border-[#00000038] hover:border-[#000000] p-[10px_14px] border border-solid font-inter font-normal text-[#000000] text-[14px] leading-[16px]">food</a>
                                    </li>

                                    <li><a href=""
                                        class="inline-block border-[#00000038] hover:border-[#000000] p-[10px_14px] border border-solid font-inter font-normal text-[#000000] text-[14px] leading-[16px]">Exercise</a>
                                    </li>

                                    <li><a href=""
                                        class="inline-block border-[#00000038] hover:border-[#000000] p-[10px_14px] border border-solid font-inter font-normal text-[#000000] text-[14px] leading-[16px]">Tech</a>
                                    </li>

                                    <li><a href=""
                                        class="inline-block border-[#00000038] hover:border-[#000000] p-[10px_14px] border border-solid font-inter font-normal text-[#000000] text-[14px] leading-[16px]">Lifestyle</a>
                                    </li>

                                    <li><a href=""
                                        class="inline-block border-[#00000038] hover:border-[#000000] p-[10px_14px] border border-solid font-inter font-normal text-[#000000] text-[14px] leading-[16px]">Travel</a>
                                    </li>

                                    <li><a href=""
                                        class="inline-block border-[#00000038] hover:border-[#000000] p-[10px_14px] border border-solid font-inter font-normal text-[#000000] text-[14px] leading-[16px]">Tour</a>
                                    </li>

                                    <li><a href=""
                                        class="inline-block border-[#00000038] hover:border-[#000000] p-[10px_14px] border border-solid font-inter font-normal text-[#000000] text-[14px] leading-[16px]">Video</a>
                                    </li>

                                    <li><a href=""
                                        class="inline-block border-[#00000038] hover:border-[#000000] p-[10px_14px] border border-solid font-inter font-normal text-[#000000] text-[14px] leading-[16px]">Games</a>
                                    </li>
                                    <li><a href=""
                                        class="inline-block border-[#00000038] hover:border-[#000000] p-[10px_14px] border border-solid font-inter font-normal text-[#000000] text-[14px] leading-[16px]">Health</a>
                                    </li>
                                    <li><a href=""
                                        class="inline-block border-[#00000038] hover:border-[#000000] p-[10px_14px] border border-solid font-inter font-normal text-[#000000] text-[14px] leading-[16px]">Festival</a>
                                    </li>

                                    <li><a href=""
                                        class="inline-block border-[#00000038] hover:border-[#000000] p-[10px_14px] border border-solid font-inter font-normal text-[#000000] text-[14px] leading-[16px]">Manufacture</a>
                                    </li> */}
                                </ul>
                            </div>


                            {/* <div class="mt-[20px]">
                                <h3
                                    class="border-[#131313] mb-[20px] pb-[10px] border-b border-solid font-normal text-[#131313] text-[18px] leading-[24px]">
                                    Newsletter</h3>

                                <div class="border-[#FFB620] bg-[#FFF0D1] p-[20px] border border-solid w-full">
                                    <h4 class="mb-[16px] font-normal text-[#000000] text-[18px] leading-[24px]">Get Update</h4>
                                    <p class="mb-[19px] font-normal text-[#000000] text-[13px] leading-[21px]">Subscriber our
                                        newsletter to get the best stories into your inbox!</p>
                                    <input type="text" placeholder="Your email address"
                                        class="block !border-[#FFE2A7] shadow-none p-[10px_12px] border border-solid w-full h-[41px] font-inter font-normal text-[#131313] text-[14px] leading-[21px] !outline-none" />

                                    <button
                                        class="bg-[#920406] hover:bg-[#7e1d1e] mt-[40px] p-[10px_20px] border-none font-inter font-medium text-[#ffffff] text-[13px]">SIGN
                                        UP</button>

                                </div>

                            </div> */}

                        </div>
                    </div>




                </section>


                <section class="py-[20px]">
                    <h2 class="mb-[42px] font-normal text-[#131313] text-[32px]">More from News</h2>
                    <div className="relative">
                        <a
                            onClick={(e) => handlePrev(e)}
                            disabled={startIndex === 0}
                            className="absolute -left-20 top-1/2 text-[#131313]  bg-white px-3 py-1 rounded"

                            // className={`px-4 py-2 rounded mr-2 transition-all duration-200 ${startIndex > 0
                            //     ? "bg-gray-300 cursor-pointer hover:bg-gray-400"
                            //     : "bg-gray-200 cursor-default opacity-50"
                            //     }`}
                            style={{ cursor: startIndex > 0 ? "pointer" : "default" }}

                        >
                            <p class="flex justify-center items-center bg-[#920406] hover:bg-[#7e1d1e] w-6 h-6">
                                <img src="/img/left-arrow.svg" alt="" />
                            </p>
                        </a>

                        <div class="gap-[20px] flex overflow-hidden  px-6">

                            {more_News_mapping_arr.slice(startIndex, startIndex + visibleCount).map((val, index) => (
                                <>
                                    <Link href={`/news/${val?.slug}`} legacyBehavior>

                                        <a class="hover:underline min-w-[234px] ">
                                            <div class="mb-[17px] overflow-hidden">
                                                <img
                                                    src={val?.coverImage || "/img/no-image.png"}
                                                    alt={val?.title}
                                                    class="w-full h-[154px]"
                                                    onError={({ currentTarget }) => {
                                                        currentTarget.onerror = null;  // Prevent infinite loop if fallback fails
                                                        currentTarget.src = "/img/no-image.png";  // Fallback to a default image
                                                    }}

                                                />
                                            </div>
                                            <h3 class="font-normal text-[#131313] text-[18px] leading-[24px] tracking-[1px]">
                                                {val?.title}
                                            </h3>

                                        </a>
                                    </Link>
                                </>
                            ))}
                        </div>
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

                            className="absolute -right-20 top-1/2 text-[#131313] bg-white px-3 py-1 rounded"
                        >
                            <p class="flex justify-center items-center bg-[#920406] hover:bg-[#7e1d1e] w-6 h-6">
                                <img src="/img/right-arrow.svg" alt="" />
                            </p>
                        </a>
                    </div>
                </section>


            </section>





        </>
    );
};

export default News_Detail_component;
