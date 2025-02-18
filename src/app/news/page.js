"use client"
import React, { useEffect, useState } from "react";
import { GET_POSTS_CHANNELLIST_QUERY, GET_POSTS_LIST_QUERY } from "../api/query";
import { fetchGraphQl } from "../api/graphicql";
import moment from "moment";
import Link from "next/link";
import Header_component from "@/component/Header";
import { imageUrl } from "@/component/Image/image_path";
import { useDispatch, useSelector } from "react-redux";
import { EntryList_Redux_function } from "@/StoreConfiguration/slices/customer";

const News_Index = ({ Header_Api_data, Listdata, todays_cartoon, obituaries, letter_to_editor }) => {


    const [searchParams, setSearchParams] = useState({ type: 'news' });
    const [data, setData] = useState(null);
    const [channelEntriesList_Array, setchannelEntriesList_Array] = useState()

    const dispatch = useDispatch()

    // dispatch(EntryList_Redux_function(Listdata?.ChannelEntriesList?.channelEntriesList))

    const headerslug = useSelector((s) => s.customerRedux.header_slug)


    useEffect(() => {
        const fetchData = async () => {
            const variable_list = {
                "entryFilter": {
                    "categorySlug": `${[undefined, null, ""].includes(headerslug) ? "news" : headerslug}`
                },
                "commonFilter": {
                    // "limit": 10,
                    // "offset": 0
                },
                "AdditionalData": {
                    "categories": true,
                    "authorDetails": true
                }
            };

            try {
                const Listdata_1 = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_list);
                setData(Listdata_1); // Set the result in state to render
                setchannelEntriesList_Array(Listdata_1?.ChannelEntriesList?.channelEntriesList)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [searchParams.type, headerslug]); // This will trigger whenever searchParams.type changes

    console.log("dasstwea", data)











    console.log("headerslug", headerslug)

    const cartoon_Array = todays_cartoon?.ChannelEntriesList?.channelEntriesList
    const obituaries_Array = obituaries?.ChannelEntriesList?.channelEntriesList
    const letter_to_edit_Array = letter_to_editor?.ChannelEntriesList?.channelEntriesList

    const authors_data = ![undefined, null, "", 0].includes(channelEntriesList_Array?.length) ? channelEntriesList_Array?.filter((item) => item?.authorDetails?.roleId !== 2) : []


    const firstThree_authors = authors_data.slice(0, 3); // First 3 objects
    const nextFour_authors = authors_data.slice(3, 7);  // Next 4 objects
    const remaining_authors = authors_data.slice(7);    // All other objects



    const [startIndex, setStartIndex] = useState(0);
    const visibleCount = 5;

    // Step 1: Segregate into four arrays
    const array1 = channelEntriesList_Array?.filter(obj => obj.featuredEntry === 1);
    const remainingAfterArray1 = channelEntriesList_Array?.filter(obj => obj.featuredEntry !== 1);

    const array2 = remainingAfterArray1?.slice(0, 3);
    const remainingAfterArray2 = remainingAfterArray1?.slice(3);

    const array3 = remainingAfterArray2?.slice(0, 17);
    const array4 = remainingAfterArray2?.slice(11);

    console.log("filteredData", array3);


    console.log("channelEntriesList_Array1", channelEntriesList_Array)


    const handleNext = () => {
        if (startIndex + visibleCount < array4?.length) {
            setStartIndex(startIndex + 1);
        }
        console.log("startIndex", startIndex)
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };




    return (
        <>
            <div class="bg-[#FFF6E3]">
                {/* <div
                    class="top-0 z-10 sticky border-[#6464641F] bg-[#FFF6E3] px-4 lg:px-0 py-[17px] border-b border-solid h-[53px]">
                    <div class="flex items-center space-x-4 mx-auto px-4 max-w-[1280px]">
                        <div class="flex items-center space-x-1">
                            <img src="img/date.svg" alt="" class="mb-[3px]" />
                            <p class="font-inter font-medium text-[#646464] text-sm">January 1, 2025</p>
                        </div>
                        <h4 class="lg:block hidden font-inter font-medium text-[#646464] text-base">|</h4>
                        <div class="lg:flex items-center space-x-[30px] hidden">
                            <a href="#"
                                class="font-inter font-medium text-[#646464] text-sm hover:text-[#131313] no-underline">About</a>
                            <a href="#"
                                class="font-inter font-medium text-[#646464] text-sm hover:text-[#131313] no-underline">Write
                                for Us</a>
                            <a href="#"
                                class="font-inter font-medium text-[#646464] text-sm hover:text-[#131313] no-underline">Advertise</a>
                            <a href="#"
                                class="font-inter font-medium text-[#646464] text-sm hover:text-[#131313] no-underline">Contact</a>
                        </div>
                    </div>
                </div> */}

                <Header_component
                    Header_Api_data={Header_Api_data}
                    Listdata={Listdata}
                    setchannelEntriesList_Array={setchannelEntriesList_Array}

                />
                <section class="mx-auto px-4 py-3 lg:p-[13px_16px_32px] max-w-[1280px]">

                    <section class="gap-[24px] grid grid-cols-[2fr_1.4fr] max-[1024px]:grid-cols-1 mb-[18px]">
                        <div>
                            <img
                                src={array1?.[0]?.coverImage || '/img/no-image.png'}  // Set a fallback directly in the src
                                alt="banner one"
                                className="w-full"
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null;  // Prevent infinite loop if fallback fails
                                    currentTarget.src = "/img/no-image.png";  // Fallback to a default image
                                }}
                            />
                        </div>
                        <div class="flex flex-col gap-[20px]">
                            {array2?.map((val, index) => (
                                <>
                                    <div class="gap-[18px] grid grid-cols-[auto_1fr] max-[500px]:grid-cols-1">
                                        <img src={val?.coverImage || "/img/no-image.png"} class="max-[500px]:w-full h-[134px]" alt={val?.title}
                                            onError={({ currentTarget }) => {
                                                currentTarget.onerror = null;  // Prevent infinite loop if fallback fails
                                                currentTarget.src = "/img/no-image.png";  // Fallback to a default image
                                            }}
                                            width={212}
                                            height={134}
                                        />
                                        {console.log("assasa2", val)}

                                        <div class="flex flex-col justify-between h-full">
                                            <Link href={`/news/${val?.slug}`} legacyBehavior>
                                                <a href="" class="mb-[16px] font-normal text-[#131313] text-[20px] hover:underline">
                                                    {val?.title}</a>
                                            </Link>
                                            <p class="font-inter font-normal text-[#131313] text-[14px]">
                                                {moment(
                                                    val?.createdOn
                                                ).format(
                                                    "MMM DD, YYYY"
                                                )}

                                            </p>
                                        </div>
                                    </div>

                                </>
                            ))}

                        </div>
                    </section>

                    <section
                        class="gap-[12px] grid grid-cols-[2.1fr_auto_1fr] max-[700px]:grid-cols-1 max-[768px]:grid-cols-[1.5fr_auto_1fr]">

                        <div>
                            {/* {console.log("8932988932", array1?.[0]?.categories, array1?.[0]?.categories.length)} */}
                            {[undefined, null, "", 0].includes(array1?.[0]?.categories?.length) ? <></> :
                                <>
                                    <div className="flex gap-[12px] flex-wrap ">

                                        {array1?.[0]?.categories.map((val1, index) => (
                                            <>
                                                {val1.map((cat_name, cat_index) => (
                                                    <>

                                                        <p class="bg-[#131313] mb-[10px] p-[6px_12px] w-fit font-inter font-normal text-[12px] text-white">

                                                            {cat_name?.categoryName}
                                                            {console.log("893298893ssss2", cat_name)}
                                                        </p>
                                                    </>
                                                ))}

                                            </>
                                        ))}
                                    </div>


                                </>
                            }

                            <Link href={`/news/${array1?.[0]?.slug}`} legacyBehavior>

                                <a
                                    class="mb-[10px] text-[#131313] text-[32px] hover:underline no-underline leading-[43px]">
                                    {[undefined, null, ""].includes(array1?.[0]?.title) ? <></> : array1?.[0]?.title}
                                </a>
                            </Link>
                            {[undefined, null, ""].includes(array1?.[0]?.authorDetails?.firstName) ? <></> :
                                <>

                                    <p class="mb-[70px] font-inter font-normal text-[#131313] text-[14px]"> By <span class="">
                                        {`${array1?.[0]?.authorDetails?.firstName} ${array1?.[0]?.authorDetails?.lastName}`}
                                    </span>
                                        {/* -June 2, 2024 */}
                                        {moment(
                                            array1?.[0]?.createdOn
                                        ).format(
                                            "MMM DD, YYYY"
                                        )}
                                    </p>
                                </>
                            }

                            {array3?.length < 17 ?
                                <>
                                    {array3?.map((val, i) => (
                                        <>
                                            <div
                                                class="gap-[24px] border-[#131313] border-y-[1px] grid grid-cols-[1fr_1.7fr] max-[1024px]:grid-cols-1 p-[20px_0px] border-solid">
                                                <div>
                                                    <Link href={`/news/${val?.slug}`} legacyBehavior>
                                                        <a
                                                            class="mb-[10px] font-normal text-[#131313] text-[26px] hover:underline no-underline leading-[32px]">
                                                            {val?.title}
                                                        </a>
                                                    </Link>
                                                    <div>

                                                        <p
                                                            class="line-clamp-4 font-inter font-normal text-[#131313] text-base leading-[24px]"
                                                            dangerouslySetInnerHTML={{
                                                                __html: val?.description
                                                                    ?.replaceAll("<br>", " ") // Replace <br> tags with spaces
                                                                    .replaceAll(/<div class="card[^"]*"(.*?)<\/div>/g, '') // Remove specific <div> tags
                                                                    .replaceAll(/<img[^>]*>/g, "") // Remove all <img> tags
                                                                    .replace(/p-\[24px_60px_10px\]/g, "") // Remove specific styles
                                                                    .replace(/<\/?[^>]+(>|$)/g, "") // Remove all remaining HTML tags
                                                                    .split(/\s+/) // Split text into words
                                                                    .slice(0, 35) // Limit to the first 100 words
                                                                    .join(" ") // Join the words back into a string
                                                                    .concat("...") // Add ellipsis if text is truncated
                                                                // .substring(0, 100) // Take the first 1000 characters (approx. for 100 words)

                                                            }}
                                                        ></p>

                                                    </div>
                                                </div>
                                                <div>
                                                    <img
                                                        src={val.coverImage}
                                                        alt={val?.title} class="w-full "
                                                        onError={({ currentTarget }) => {
                                                            currentTarget.onerror = null;  // Prevent infinite loop if fallback fails
                                                            currentTarget.src = "/img/no-image.png";  // Fallback to a default image
                                                        }}
                                                        style={{ height: "360px" }}
                                                    />
                                                </div>
                                            </div>

                                        </>
                                    ))}

                                </> :
                                <>
                                    <div
                                        class="gap-[24px] border-[#131313] border-y-[1px] grid grid-cols-[1fr_1.7fr] max-[1024px]:grid-cols-1 p-[20px_0px] border-solid">
                                        <div>
                                            <Link href={`/news/${array3?.[0]?.slug}`} legacyBehavior>
                                                <a href="#"
                                                    class="mb-[10px] font-normal text-[#131313] text-[26px] hover:underline no-underline leading-[32px]">
                                                    {array3?.[0]?.title}
                                                </a>
                                            </Link>
                                            <div>

                                                <p
                                                    class="line-clamp-4 font-inter font-normal text-[#131313] text-base leading-[24px]"
                                                    dangerouslySetInnerHTML={{
                                                        __html: array3?.[0]?.description
                                                            ?.replaceAll("<br>", " ") // Replace <br> tags with spaces
                                                            .replaceAll(/<div class="card[^"]*"(.*?)<\/div>/g, '') // Remove specific <div> tags
                                                            .replaceAll(/<img[^>]*>/g, "") // Remove all <img> tags
                                                            .replace(/p-\[24px_60px_10px\]/g, "") // Remove specific styles
                                                            .replace(/<\/?[^>]+(>|$)/g, "") // Remove all remaining HTML tags
                                                            .split(/\s+/) // Split text into words
                                                            .slice(0, 35) // Limit to the first 100 words
                                                            .join(" ") // Join the words back into a string
                                                            .concat("...") // Add ellipsis if text is truncated
                                                        // .substring(0, 100) // Take the first 1000 characters (approx. for 100 words)

                                                    }}
                                                ></p>

                                            </div>
                                        </div>
                                        <div>
                                            <img
                                                src={array3?.[0]?.coverImage}
                                                alt={array3?.[0]?.title} class="w-full"
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null;  // Prevent infinite loop if fallback fails
                                                    currentTarget.src = "/img/no-image.png";  // Fallback to a default image
                                                }}

                                            />
                                        </div>
                                    </div>

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
                                                        .replace(/p-\[24px_60px_10px\]/g, "") // Remove specific styles
                                                        .replace(/<\/?[^>]+(>|$)/g, "") // Remove all remaining HTML tags
                                                        .split(/\s+/) // Split text into words
                                                        .slice(0, 35) // Limit to the first 100 words
                                                        .join(" ") // Join the words back into a string
                                                        .concat("...") // Add ellipsis if text is truncated
                                                    // .substring(0, 100) // Take the first 1000 characters (approx. for 100 words)

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

                                                    <h4 class="mb-[1px] font-normal text-[#5A5A5A] text-[22px] leading-[32px]">

                                                        {`${array3?.[2]?.authorDetails?.firstName} ${array3?.[2]?.authorDetails?.lastName}`}
                                                    </h4>
                                                    <Link href={`/news/${array3?.[2]?.slug}`} legacyBehavior>
                                                        <a class="font-normal text-[#131313] text-[22px] hover:underline no-underline leading-[26px]">

                                                            {array3?.[2]?.title}
                                                        </a>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div
                                        class="gap-[24px] border-[#131313] grid grid-cols-[1fr_1.7fr] max-[1024px]:grid-cols-1 p-[20px_0px] border-b-[1px] border-solid">
                                        <div>
                                            <Link href={`/news/${array3?.[3]?.slug}`} legacyBehavior>
                                                <a
                                                    class="mb-[10px] font-normal text-[#131313] text-[26px] hover:underline no-underline leading-[32px]">
                                                    {array3?.[3]?.title}
                                                </a>
                                            </Link>
                                            <p
                                                class="line-clamp-4 font-inter font-normal text-[#131313] text-base leading-[24px]"
                                                dangerouslySetInnerHTML={{
                                                    __html: array3?.[3]?.description
                                                        ?.replaceAll("<br>", " ") // Replace <br> tags with spaces
                                                        .replaceAll(/<div class="card[^"]*"(.*?)<\/div>/g, '') // Remove specific <div> tags
                                                        .replaceAll(/<img[^>]*>/g, "") // Remove all <img> tags
                                                        .replace(/p-\[24px_60px_10px\]/g, "") // Remove specific styles
                                                        .replace(/<\/?[^>]+(>|$)/g, "") // Remove all remaining HTML tags
                                                        .split(/\s+/) // Split text into words
                                                        .slice(0, 35) // Limit to the first 100 words
                                                        .join(" ") // Join the words back into a string
                                                        .concat("...") // Add ellipsis if text is truncated
                                                    // .substring(0, 100) // Take the first 1000 characters (approx. for 100 words)

                                                }}
                                            ></p>


                                        </div>
                                        <div>
                                            <img
                                                src={array3?.[3]?.coverImage}
                                                alt={array3?.[3]?.title} class="w-full"
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null;  // Prevent infinite loop if fallback fails
                                                    currentTarget.src = "/img/no-image.png";  // Fallback to a default image
                                                }}

                                            />
                                        </div>
                                    </div>

                                    <div
                                        class="gap-[24px] border-[#131313] grid grid-cols-[1fr_1.7fr] max-[1024px]:grid-cols-1 p-[20px_0px] border-b-[1px] border-solid">
                                        <div>
                                            <Link href={`/news/${array3?.[4]?.slug}`} legacyBehavior>
                                                <a
                                                    class="mb-[10px] font-normal text-[#131313] text-[26px] hover:underline no-underline leading-[32px]">
                                                    {array3?.[4]?.title}

                                                </a>
                                            </Link>

                                            <p
                                                class="line-clamp-4 font-inter font-normal text-[#131313] text-base leading-[24px]"
                                                dangerouslySetInnerHTML={{
                                                    __html: array3?.[4]?.description
                                                        ?.replaceAll("<br>", " ") // Replace <br> tags with spaces
                                                        .replaceAll(/<div class="card[^"]*"(.*?)<\/div>/g, '') // Remove specific <div> tags
                                                        .replaceAll(/<img[^>]*>/g, "") // Remove all <img> tags
                                                        .replace(/p-\[24px_60px_10px\]/g, "") // Remove specific styles
                                                        .replace(/<\/?[^>]+(>|$)/g, "") // Remove all remaining HTML tags
                                                        .split(/\s+/) // Split text into words
                                                        .slice(0, 35) // Limit to the first 100 words
                                                        .join(" ") // Join the words back into a string
                                                        .concat("...") // Add ellipsis if text is truncated
                                                    // .substring(0, 100) // Take the first 1000 characters (approx. for 100 words)

                                                }}
                                            ></p>

                                            <h4 class="font-normal text-[#131313] text-[14px] leading-[19px]">

                                                {`${array3?.[4]?.authorDetails?.firstName} ${array3?.[4]?.authorDetails?.lastName}`}
                                            </h4>
                                        </div>

                                        <div class="gap-[10px] grid grid-cols-[1fr_auto_1fr] max-[768px]:grid-cols-1">
                                            <div>
                                                <img
                                                    src={array3?.[5]?.coverImage}
                                                    alt={array3?.[5]?.title}
                                                    class="w-full"
                                                    onError={({ currentTarget }) => {
                                                        currentTarget.onerror = null;  // Prevent infinite loop if fallback fails
                                                        currentTarget.src = "/img/no-image.png";  // Fallback to a default image
                                                    }}

                                                />
                                            </div>
                                            <span class="bg-[#13131366] w-[1px] max-[768px]:w-full h-hull max-[768px]:h-[1px]"></span>
                                            <ul>
                                                <li
                                                    class="border-[#13131366] last-of-type:border-0 mb-[10px] last-of-type:mb-0 pb-[10px] last-of-type:pb-0 border-b-[1px] border-solid">
                                                    <Link href={`/news/${array3?.[5]?.slug}`} legacyBehavior>
                                                        <a
                                                            class="font-normal text-[#131313] text-[18px] hover:underline no-underline leading-[22px]">

                                                            {array3?.[5]?.title}
                                                        </a>
                                                    </Link>
                                                </li>
                                                <li
                                                    class="border-[#13131366] last-of-type:border-0 mb-[10px] last-of-type:mb-0 pb-[10px] last-of-type:pb-0 border-b-[1px] border-solid">
                                                    <Link href={`/news/${array3?.[6]?.slug}`} legacyBehavior>
                                                        <a
                                                            class="font-normal text-[#131313] text-[18px] hover:underline no-underline leading-[22px]">
                                                            {array3?.[6]?.title}

                                                        </a>
                                                    </Link>
                                                </li>
                                                <li
                                                    class="border-[#13131366] last-of-type:border-0 mb-[10px] last-of-type:mb-0 pb-[10px] last-of-type:pb-0 border-b-[1px] border-solid">
                                                    <Link href={`/news/${array3?.[7]?.slug}`} legacyBehavior>

                                                        <a
                                                            class="font-normal text-[#131313] text-[18px] hover:underline no-underline leading-[22px]">

                                                            {array3?.[7]?.title}
                                                        </a>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div
                                        class="gap-[24px] border-[#131313] grid grid-cols-[1fr_1.7fr] max-[1024px]:grid-cols-1 p-[20px_0px] border-b-[1px] border-solid">
                                        <div>
                                            <Link href={`/news/${array3?.[8]?.slug}`} legacyBehavior>
                                                <a
                                                    class="mb-[10px] font-normal text-[#131313] text-[26px] hover:underline no-underline leading-[32px]">
                                                    {array3?.[8]?.title}

                                                </a>
                                            </Link>
                                        </div>

                                        <div class="gap-[10px] grid grid-cols-[1fr_auto_1fr] max-[768px]:grid-cols-1">
                                            <div>
                                                <img
                                                    src={array3?.[8]?.coverImage}
                                                    alt={array3?.[8]?.title} class="w-full"
                                                    onError={({ currentTarget }) => {
                                                        currentTarget.onerror = null;  // Prevent infinite loop if fallback fails
                                                        currentTarget.src = "/img/no-image.png";  // Fallback to a default image
                                                    }}

                                                />
                                            </div>
                                            <span class="bg-[#13131366] w-[1px] max-[768px]:w-full h-hull max-[768px]:h-[1px]"></span>
                                            <ul>
                                                <li
                                                    class="border-[#13131366] last-of-type:border-0 mb-[10px] last-of-type:mb-0 pb-[10px] last-of-type:pb-0 border-b-[1px] border-solid">
                                                    <Link href={`/news/${array3?.[9]?.slug}`} legacyBehavior>
                                                        <a
                                                            class="font-normal text-[#131313] text-[18px] hover:underline no-underline leading-[22px]">
                                                            {array3?.[9]?.title}

                                                        </a>
                                                    </Link>
                                                </li>
                                                <li
                                                    class="border-[#13131366] last-of-type:border-0 mb-[10px] last-of-type:mb-0 pb-[10px] last-of-type:pb-0 border-b-[1px] border-solid">
                                                    <Link href={`/news/${array3?.[10]?.slug}`} legacyBehavior>
                                                        <a
                                                            class="font-normal text-[#131313] text-[18px] hover:underline no-underline leading-[22px]">
                                                            {array3?.[10]?.title}

                                                        </a>
                                                    </Link>
                                                </li>
                                                <li
                                                    class="border-[#13131366] last-of-type:border-0 mb-[10px] last-of-type:mb-0 pb-[10px] last-of-type:pb-0 border-b-[1px] border-solid">
                                                    <Link href={`/news/${array3?.[11]?.slug}`} legacyBehavior>
                                                        <a
                                                            class="font-normal text-[#131313] text-[18px] hover:underline no-underline leading-[22px]">
                                                            {array3?.[11]?.title}
                                                        </a>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div
                                        class="border-[#131313] grid grid-cols-[1fr_1.7fr] max-[1024px]:grid-cols-1 p-[20px_0px] border-b-[1px] border-solid">
                                        <div>
                                            <Link href={`/news/${array3?.[12]?.slug}`} legacyBehavior>
                                                <a
                                                    class="mb-[20px] font-normal text-[#131313] text-[24px] hover:underline no-underline leading-[32px]">

                                                    {array3?.[12]?.title}
                                                </a>
                                            </Link>
                                            <ul>
                                                <li class="border-[#13131366] mt-[10px] pt-[10px] border-t-[1px] border-solid">
                                                    <Link href={`/news/${array3?.[13]?.slug}`} legacyBehavior>
                                                        <a
                                                            class="font-normal text-[#131313] text-[18px] hover:underline no-underline leading-[22px]">
                                                            {array3?.[13]?.title}
                                                        </a>
                                                    </Link>
                                                </li>
                                                <li class="border-[#13131366] mt-[10px] pt-[10px] border-t-[1px] border-solid">
                                                    <Link href={`/news/${array3?.[14]?.slug}`} legacyBehavior>
                                                        <a
                                                            class="font-normal text-[#131313] text-[18px] hover:underline no-underline leading-[22px]">

                                                            {array3?.[14]?.title}
                                                            {console.log("qwqw221", array3?.[14]?.title)}
                                                        </a>
                                                    </Link>
                                                </li>

                                            </ul>

                                        </div>
                                        <div
                                            class="gap-[8px] border-[#13131366] min-[1025px]:border-s-[1px] grid grid-cols-[1fr_1fr] max-[1024px]:mt-[16px] max-[1024px]:pt-[16px] max-[1024px]:border-t-[1px] border-solid min-[1025px]:ms-[16px] min-[1025px]:ps-[16px]">
                                            <div>
                                                <Link href={`/news/${array3?.[15]?.slug}`} legacyBehavior>
                                                    <a
                                                        class="mb-[10px] font-normal text-[#131313] text-[26px] hover:underline no-underline leading-[32px]">

                                                        {array3?.[15]?.title}
                                                    </a>
                                                </Link>

                                                <p
                                                    class="line-clamp-4 font-inter font-normal text-[#131313] text-base leading-[24px]"
                                                    dangerouslySetInnerHTML={{
                                                        __html: array3?.[15]?.description
                                                            ?.replaceAll("<br>", " ") // Replace <br> tags with spaces
                                                            .replaceAll(/<div class="card[^"]*"(.*?)<\/div>/g, '') // Remove specific <div> tags
                                                            .replaceAll(/<img[^>]*>/g, "") // Remove all <img> tags
                                                            .replace(/p-\[24px_60px_10px\]/g, "") // Remove specific styles
                                                            .replace(/<\/?[^>]+(>|$)/g, "") // Remove all remaining HTML tags
                                                            .split(/\s+/) // Split text into words
                                                            .slice(0, 35) // Limit to the first 100 words
                                                            .join(" ") // Join the words back into a string
                                                            .concat("...") // Add ellipsis if text is truncated
                                                        // .substring(0, 100) // Take the first 1000 characters (approx. for 100 words)

                                                    }}
                                                ></p>


                                            </div>
                                            <div>
                                                <img
                                                    src={array3?.[15]?.coverImage || "/img/no-image.png"}
                                                    alt={array3?.[15]?.title} class="w-full"
                                                    onError={({ currentTarget }) => {
                                                        currentTarget.onerror = null;  // Prevent infinite loop if fallback fails
                                                        currentTarget.src = "/img/no-image.png";  // Fallback to a default image
                                                    }}

                                                />
                                            </div>

                                        </div>
                                    </div>

                                    <div
                                        class="gap-[24px] border-[#131313] grid grid-cols-[1fr_1.7fr] max-[1024px]:grid-cols-1 p-[20px_0px] border-b-[1px] border-solid">
                                        <div>
                                            <Link href={`/news/${array3?.[16]?.slug}`} legacyBehavior>

                                                <a
                                                    class="mb-[10px] font-normal text-[#131313] text-[26px] hover:underline no-underline leading-[32px]">
                                                    {array3?.[16]?.title}
                                                </a>
                                            </Link>
                                            <p
                                                class="line-clamp-4 font-inter font-normal text-[#131313] text-base leading-[24px]"
                                                dangerouslySetInnerHTML={{
                                                    __html: array3?.[16]?.description
                                                        ?.replaceAll("<br>", " ") // Replace <br> tags with spaces
                                                        .replaceAll(/<div class="card[^"]*"(.*?)<\/div>/g, '') // Remove specific <div> tags
                                                        .replaceAll(/<img[^>]*>/g, "") // Remove all <img> tags
                                                        .replace(/p-\[24px_60px_10px\]/g, "") // Remove specific styles
                                                        .replace(/<\/?[^>]+(>|$)/g, "") // Remove all remaining HTML tags
                                                        .split(/\s+/) // Split text into words
                                                        .slice(0, 35) // Limit to the first 100 words
                                                        .join(" ") // Join the words back into a string
                                                        .concat("...") // Add ellipsis if text is truncated
                                                    // .substring(0, 100) // Take the first 1000 characters (approx. for 100 words)

                                                }}
                                            ></p>



                                        </div>
                                        <div>
                                            <img
                                                src={array3?.[16]?.coverImage || "/img/no-image.png"}
                                                alt={array3?.[16]?.title} class="w-full"
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null;  // Prevent infinite loop if fallback fails
                                                    currentTarget.src = "/img/no-image.png";  // Fallback to a default image
                                                }}

                                            />
                                        </div>
                                    </div>

                                </>}


                        </div>

                        <span class="bg-[#13131366] w-[0.5px] h-full"></span>

                        <div>

                            <div
                                class="flex max-[700px]:justify-center items-center space-x-[16px] border-[#13131366] py-[20px] border-b last-of-type:border-b-0 border-solid">
                                <div>
                                    <h3 class="mb-[7px] font-[600] font-inter text-[#920406] text-[14px] leading-[24px]">MICK
                                        BROWN
                                        REWIND: DAVID BOWIE</h3>
                                    <p class="mb-[18px] font-inter font-medium text-[#131313] text-[14px] leading-[20px]">Mick
                                        reflect on his 1996 interview with a musical icon</p>
                                    <div class="flex items-center space-x-[16px]">
                                        <a href=""
                                            class="flex justify-center items-center gap-[4px] bg-[#131313] hover:bg-[#2c2c2c] p-[8px_16px_8px_12px] rounded-[50px] min-w-[97px]">
                                            <img src="/img/listen.svg" alt="listem" />
                                            <p class="font-inter font-normal text-[#FFFFFF] text-[14px] leading-[20px]">Listen
                                            </p>
                                        </a>
                                        <p class="font-inter font-medium text-[#131313B0] text-[14px] leading-[20px]">63 Mins
                                        </p>
                                    </div>

                                </div>
                                <div>
                                    <img src="/img/sampleImage10.svg" alt="sample image" />
                                </div>
                            </div>
                            {firstThree_authors.map((val, index) => (
                                <>
                                    <div
                                        class="flex flex-col items-center border-[#13131366] py-[20px] border-b last-of-type:border-b-0 border-solid">
                                        <img src={`${imageUrl}${val?.authorDetails?.profileImagePath}`} alt={val?.title} style={{ borderRadius: "50%", height: "60px", width: "60px" }} />
                                        <h3 class="mt-[10px] mb-[7px] font-[600] font-inter text-[#920406] text-[14px] leading-[24px]">


                                            {`${val?.authorDetails?.firstName} ${val?.authorDetails?.lastName}`}
                                        </h3>

                                        <a href={`/news/${val?.slug}`}
                                            class="font-normal text-[#131313] text-[24px] text-center max-[1024px]:text-[20px] hover:underline no-underline leading-[32px] max-[1024px]:leading-normal">
                                            {val?.title}
                                        </a>
                                    </div>

                                </>
                            ))}


                            {/* <div
                                class="flex flex-col items-center border-[#13131366] py-[20px] border-b last-of-type:border-b-0 border-solid">
                                <img src="/img/profileImage2.svg" alt="profile" />
                                <h3 class="mt-[10px] mb-[7px] font-[600] font-inter text-[#920406] text-[14px] leading-[24px]">
                                    TOM HARRIS
                                </h3>
                                <a href="#"
                                    class="font-normal text-[#131313] text-[24px] text-center max-[1024px]:text-[20px] hover:underline no-underline leading-[32px] max-[1024px]:leading-normal">
                                    Why would a
                                    self-proclaimed feminist refuse to hold an inquiry into the Oldham ‘rape gangs’?</a>
                            </div>

                            <div
                                class="flex flex-col items-center border-[#13131366] py-[20px] border-b last-of-type:border-b-0 border-solid">
                                <img src="/img/profileImage3.svg" alt="profile" />
                                <h3 class="mt-[10px] mb-[7px] font-[600] font-inter text-[#920406] text-[14px] leading-[24px]">
                                    TOM SHARPE
                                </h3>
                                <a href="#"
                                    class="font-normal text-[#131313] text-[24px] text-center max-[1024px]:text-[20px] hover:underline no-underline leading-[32px] max-[1024px]:leading-normal">
                                    There has been a
                                    big mistake in the Navy’s latest medals list</a>



                            </div> */}

                            <div
                                class="gap-[10px] border-[#13131366] grid grid-cols-[1fr_auto_1fr] max-[1024px]:grid-cols-1 py-[20px] border-b-[0.5px] last-of-type:border-b-0 border-solid">

                                {[undefined, null, ""].includes(nextFour_authors?.[0]?.title) ? <></> : <>
                                    <div class="flex flex-col items-center">
                                        <img src={`${imageUrl}${nextFour_authors?.[0]?.authorDetails?.profileImagePath}`} alt={nextFour_authors?.[0]?.title}
                                            style={{ borderRadius: "50%", height: "60px", width: "60px" }}
                                        />
                                        <h3
                                            class="mt-[10px] mb-[7px] font-[600] font-inter text-[#920406] text-[14px] leading-[24px]">


                                            {`${nextFour_authors?.[0]?.authorDetails?.firstName} ${nextFour_authors?.[0]?.authorDetails?.lastName}`}
                                        </h3>
                                        <Link href={`/news/${nextFour_authors?.[0]?.slug}`} legacyBehavior>
                                            <p class="font-normal text-[#131313] text-[18px] text-center leading-[24px] cursor-pointer">
                                                {nextFour_authors?.[0]?.title}

                                            </p>
                                        </Link>


                                    </div>
                                </>}

                                <span class="bg-[#13131366] w-[0.5px] max-[1024px]:w-full h-full max-[1024px]:h-[0.5px]"></span>
                                {[undefined, null, ""].includes(nextFour_authors?.[1]?.title) ? <></> : <>
                                    <div class="flex flex-col items-center">
                                        <img src={`${imageUrl}${nextFour_authors?.[1]?.authorDetails?.profileImagePath}`} alt={nextFour_authors?.[1]?.title}
                                            style={{ borderRadius: "50%", height: "60px", width: "60px" }}
                                        />
                                        <h3
                                            class="mt-[10px] mb-[7px] font-[600] font-inter text-[#920406] text-[14px] leading-[24px]">


                                            {`${nextFour_authors?.[1]?.authorDetails?.firstName} ${nextFour_authors?.[1]?.authorDetails?.lastName}`}
                                        </h3>
                                        <Link href={`/news/${nextFour_authors?.[1]?.slug}`} legacyBehavior>
                                            <p class="font-normal text-[#131313] text-[18px] text-center leading-[24px] cursor-pointer">
                                                {nextFour_authors?.[1]?.title}

                                            </p>
                                        </Link>
                                    </div>
                                </>}
                            </div>

                            <div
                                class="gap-[10px] border-[#13131366] grid grid-cols-[1fr_auto_1fr] max-[1024px]:grid-cols-1 py-[20px] border-b last-of-type:border-b-0 border-solid">
                                {[undefined, null, ""].includes(nextFour_authors?.[2]?.title) ? <></> : <>
                                    <div class="flex flex-col items-center">
                                        <img src={`${imageUrl}${nextFour_authors?.[2]?.authorDetails?.profileImagePath}`} alt={nextFour_authors?.[2]?.title}
                                            style={{ borderRadius: "50%", height: "60px", width: "60px" }}
                                        />
                                        <h3
                                            class="mt-[10px] mb-[7px] font-[600] font-inter text-[#920406] text-[14px] leading-[24px]">


                                            {`${nextFour_authors?.[2]?.authorDetails?.firstName} ${nextFour_authors?.[2]?.authorDetails?.lastName}`}
                                        </h3>
                                        <Link href={`/news/${nextFour_authors?.[2]?.slug}`} legacyBehavior>
                                            <p class="font-normal text-[#131313] text-[18px] text-center leading-[24px] cursor-pointer">
                                                {nextFour_authors?.[2]?.title}

                                            </p>
                                        </Link>
                                    </div>
                                </>}
                                <span class="bg-[#13131366] w-[0.5px] max-[1024px]:w-full h-full max-[1024px]:h-[0.5px]"></span>

                                {[undefined, null, ""].includes(nextFour_authors?.[3]?.title) ? <></> : <>

                                    <div class="flex flex-col items-center">
                                        <img src={`${imageUrl}${nextFour_authors?.[3]?.authorDetails?.profileImagePath}`} alt={nextFour_authors?.[3]?.title}
                                            style={{ borderRadius: "50%", height: "60px", width: "60px" }}
                                        />
                                        <h3
                                            class="mt-[10px] mb-[7px] font-[600] font-inter text-[#920406] text-[14px] leading-[24px]">


                                            {`${nextFour_authors?.[3]?.authorDetails?.firstName} ${nextFour_authors?.[3]?.authorDetails?.lastName}`}
                                        </h3>
                                        <Link href={`/news/${nextFour_authors?.[3]?.slug}`} legacyBehavior>
                                            <p class="font-normal text-[#131313] text-[18px] text-center leading-[24px] cursor-pointer">
                                                {nextFour_authors?.[3]?.title}

                                            </p>

                                        </Link>
                                    </div>
                                </>}

                            </div>



                            <div class="border-[#13131366] py-[20px] border-b last-of-type:border-b-0 border-solid">

                                <h2
                                    class="border-[#920406] mx-auto mb-[12px] pb-[6px] border-b border-solid w-fit font-normal text-[#131313] text-base leading-[21px]">
                                    TODAY’S CARTOON </h2>
                                <div>
                                    <img src={cartoon_Array?.[0]?.coverImage}
                                        alt={cartoon_Array?.[0]?.title}
                                        class="max-[700px]:mx-auto" />
                                </div>

                            </div>


                            <div class="border-[#13131366] py-[20px] border-b last-of-type:border-b-0 border-solid">

                                <h2
                                    class="border-[#920406] mx-auto mb-[12px] pb-[6px] border-b border-solid w-fit font-normal text-[#131313] text-base leading-[21px]">
                                    LETTER TO THE EDITOR </h2>
                                <div class="flex justify-center items-center mt-[30px] mb-[16px]">
                                    <img src="/img/sample-template12.svg" alt="sample template" />
                                </div>
                                <a href="#" class="hover:underline no-underline">
                                    <Link href={`/news/${letter_to_edit_Array?.[1]?.slug}`} legacyBehavior>
                                        <h3 class="mb-[10px] font-normal text-[#131313] text-[24px] text-center leading-[32px]">
                                            {letter_to_edit_Array?.[0]?.title}
                                        </h3>
                                    </Link>
                                </a>
                                {/* <p class="mb-[18px] line-clamp-3 font-inter font-normal text-[#131313] text-base text-center">
                                    I’d tried so many diets unsuccesfull,
                                    but reading one lady’s weight loss story in the Telegram led me to one that actually
                                    worked....

                                </p> */}

                                <p
                                    class="mb-[18px] line-clamp-3 font-inter font-normal text-[#131313] text-base text-center"
                                    dangerouslySetInnerHTML={{
                                        __html: letter_to_edit_Array?.[0]?.description
                                            ?.replaceAll("<br>", " ") // Replace <br> tags with spaces
                                            .replaceAll(/<div class="card[^"]*"(.*?)<\/div>/g, '') // Remove specific <div> tags
                                            .replaceAll(/<img[^>]*>/g, "") // Remove all <img> tags
                                            .replace(/p-\[24px_60px_10px\]/g, "") // Remove specific styles
                                            .replace(/<\/?[^>]+(>|$)/g, "") // Remove all remaining HTML tags
                                            .split(/\s+/) // Split text into words
                                            .slice(0, 35) // Limit to the first 100 words
                                            .join(" ") // Join the words back into a string
                                            .concat("...") // Add ellipsis if text is truncated
                                        // .substring(0, 100) // Take the first 1000 characters (approx. for 100 words)

                                    }}
                                ></p>


                            </div>


                            <div class="border-[#13131366] py-[20px] border-b last-of-type:border-b-0 border-solid">

                                <h2
                                    class="border-[#920406] mx-auto mb-[12px] pb-[6px] border-b border-solid w-fit font-normal text-[#131313] text-base leading-[21px]">
                                    OBITUARIES </h2>
                                <div class="flex justify-center items-center mt-[30px] mb-[16px]">
                                    <img src={obituaries_Array?.[0]?.coverImage}
                                        alt={obituaries_Array?.[0]?.title} />
                                </div>

                                <a href={`/news/${obituaries_Array?.[0]?.slug}`}
                                    class="block border-[#13131366] mb-[10px] pb-[16px] border-b-[0.5px] border-solid font-normal text-[#131313] text-[24px] text-center hover:underline no-underline leading-[32px]">
                                    {obituaries_Array?.[0]?.title}

                                </a>
                                <div class="gap-[12px] grid grid-cols-[1fr_auto_1fr] max-[1024px]:grid-cols-1">
                                    <Link href={`/news/${obituaries_Array?.[1]?.slug}`} legacyBehavior>
                                        <p class="font-normal text-[#131313] text-[18px] text-center leading-[25px]" style={{ cursor: "pointer" }}>
                                            {obituaries_Array?.[1]?.title}
                                        </p>
                                    </Link>
                                    <span class="bg-[#13131366] w-[0.5px] w-full h-full max-[1024px]:h-[0.5px]"></span>
                                    <Link href={`/news/${obituaries_Array?.[2]?.slug}`} legacyBehavior>
                                        <p class="font-normal text-[#131313] text-[18px] text-center leading-[25px]" style={{ cursor: "pointer" }}>
                                            {obituaries_Array?.[2]?.title}
                                        </p>
                                    </Link>
                                </div>

                            </div>


                        </div>




                    </section>

                    {[undefined, null, 0].includes(array4?.length) ? <></> : <>
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

                                    {console.log("qqwwqwq", array4)}
                                    {array4?.slice(startIndex, startIndex + visibleCount).map((val, index) => (
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
                                    disabled={startIndex + visibleCount >= array4?.length}

                                    // className={`px-4 py-2 rounded transition-all duration-200 ${startIndex + visibleCount < BlogCards.length
                                    //         ? "bg-gray-300 cursor-pointer hover:bg-gray-400"
                                    //         : "bg-gray-200 cursor-default opacity-50"
                                    //     }`}
                                    style={{
                                        cursor:
                                            startIndex + visibleCount < array4.length ? "pointer" : "default",

                                    }}

                                    className="absolute -right-20 top-1/2 text-[#131313] bg-white px-3 py-1 rounded"
                                >
                                    <p class="flex justify-center items-center bg-[#920406] hover:bg-[#7e1d1e] w-6 h-6">
                                        <img src="/img/right-arrow.svg" alt="" />
                                    </p>
                                </a>
                            </div>
                        </section>
                    </>}
                </section>
            </div >
        </>
    );
};

export default News_Index;
