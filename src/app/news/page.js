"use client"
import React, { Fragment, useEffect, useState } from "react";
import { GET_POSTS_CHANNELLIST_QUERY, GET_POSTS_LIST_QUERY } from "../api/query";
import { fetchGraphQl } from "../api/graphicql";
import moment from "moment";
import Link from "next/link";
import Header_component from "@/component/Header";
import { imageUrl } from "@/component/Image/image_path";
import { useDispatch, useSelector } from "react-redux";
import { EntryList_Redux_function } from "@/StoreConfiguration/slices/customer";
import News_Layout1 from "@/component/News_layouts/News_Layout1";
import News_Layout2 from "@/component/News_layouts/News_Layout2";
import News_Layout3 from "@/component/News_layouts/News_Layout3";
import News_Layout4 from "@/component/News_layouts/News_Layout4";
import News_Layout5 from "@/component/News_layouts/News_Layout5";
import News_Layout6 from "@/component/News_layouts/News_Layout6";
import News_Layout7 from "@/component/News_layouts/News_Layout7";
import PageLoader from "@/component/skeletonLoader/Page_Loader";
import { Interweave } from "interweave";

const News_Index = ({ Header_Api_data, Listdata, todays_cartoon, obituaries, letter_to_editor, audio_files }) => {


    const [dataCount, setDataCount] = useState(0);
    const [channelEntriesList_Array, setchannelEntriesList_Array] = useState([])
    const [page_loader, setpage_loader] = useState(false)
    console.log(channelEntriesList_Array, "cjdbfsjdhfshf")
    const cartoon_Array = todays_cartoon?.ChannelEntriesList?.channelEntriesList
    const obituaries_Array = obituaries?.ChannelEntriesList?.channelEntriesList
    const letter_to_edit_Array = letter_to_editor?.ChannelEntriesList?.channelEntriesList
    const audio_files_Array = audio_files?.ChannelEntriesList?.channelEntriesList
    console.log(audio_files, "hsdshjdsds")
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
    const array3 = remainingAfterArray2?.slice(0, 12);
    const array4 = remainingAfterArray2?.slice(13);
    const [offset, setOffset] = useState(0);
    console.log(channelEntriesList_Array, "fdjvbdhv")
    console.log(dataCount, "djbchbf")
    const dispatch = useDispatch()

    const headerslug = useSelector((s) => s.customerRedux.header_slug)

    const handleScroll = (e) => {

        const scrollHeight = e.target.documentElement.scrollHeight;
        const currentHeight = Math.ceil(
            e.target.documentElement.scrollTop + window.innerHeight
        );
        if (currentHeight + 1 >= scrollHeight) {
            setOffset(offset + 5)
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, [handleScroll]);


    useEffect(() => {

        setpage_loader(true)
        const fetchData = async () => {
            const variable_list = {
                "entryFilter": {
                    "categorySlug": `${[undefined, null, ""].includes(headerslug) ? "news" : headerslug}`
                },
                // "commonFilter": {
                //     "limit": 5,
                //     "offset": offset
                // },
                "AdditionalData": {
                    "categories": true,
                    "authorDetails": true
                }
            };

            try {
                const Listdata_1 = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_list);
                console.log(Listdata_1, "jkdhfksdj")
                setDataCount(Listdata_1?.ChannelEntriesList?.count); // Set the result in state to render
                setchannelEntriesList_Array(Listdata_1?.ChannelEntriesList?.channelEntriesList)
                setpage_loader(false)
            } catch (error) {
                console.error("Error fetching data:", error);
                setpage_loader(false)
            }
        };
        fetchData();


    }, [headerslug])

    // useEffect(() => {

    //     setpage_loader(true)
    //     const fetchData = async () => {
    //         const variable_list = {
    //             "entryFilter": {
    //                 "categorySlug": `${[undefined, null, ""].includes(headerslug) ? "news" : headerslug}`
    //             },
    //             "commonFilter": {
    //                 "limit": 5,
    //                 "offset": offset
    //             },
    //             "AdditionalData": {
    //                 "categories": true,
    //                 "authorDetails": true
    //             }
    //         };

    //         try {
    //             const Listdata_1 = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_list);
    //             console.log(Listdata_1, "jkdhfksdj")
    //             setDataCount(Listdata_1?.ChannelEntriesList?.count); // Set the result in state to render

    //             setchannelEntriesList_Array((pre) => [...pre, Listdata_1?.ChannelEntriesList?.channelEntriesList])
    //             console.log("dchnfsdd")


    //             setpage_loader(false)


    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //             setpage_loader(false)
    //         }
    //     };


    //     fetchData();

    // }, [])



    const handleNext = () => {
        if (startIndex + visibleCount < array4?.length) {
            setStartIndex(startIndex + 1);
        }
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };




    return (
        <>

            <Header_component
                Header_Api_data={Header_Api_data}
                Listdata={Listdata}
                setchannelEntriesList_Array={setchannelEntriesList_Array}

            />
            {page_loader == true || [undefined, null, ""].includes(channelEntriesList_Array) ?
                <>
                    <PageLoader />

                </> : <>
                    <div className="bg-[#FFF6E3]">

                        <section className="mx-auto px-4 py-3 lg:p-[13px_16px_32px] max-w-[1280px]">

                            <section className="gap-[24px] grid grid-cols-[2fr_1.4fr] max-[1024px]:grid-cols-1 mb-[18px]">
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
                                <div className="flex flex-col gap-[20px]">
                                    {array2?.map((val, index) => (
                                        <Fragment key={index}>
                                            <div className="gap-[18px] grid grid-cols-[auto_1fr] max-[500px]:grid-cols-1">
                                                <img src={val?.coverImage || "/img/no-image.png"} className="max-[500px]:w-full h-[134px]" alt={val?.title}
                                                    onError={({ currentTarget }) => {
                                                        currentTarget.onerror = null;  // Prevent infinite loop if fallback fails
                                                        currentTarget.src = "/img/no-image.png";  // Fallback to a default image
                                                    }}
                                                    width={212}
                                                    height={134}
                                                />

                                                <div className="flex flex-col justify-between h-full">
                                                    <Link href={`/news/${val?.slug}`} legacyBehavior>
                                                        <a href="" className="mb-[16px] font-normal text-[#131313] text-[20px] hover:underline">
                                                            {val?.title}</a>
                                                    </Link>
                                                    <p className="font-inter font-normal text-[#131313] text-[14px]">
                                                        {moment(val?.createdOn).format("MMM DD, YYYY [-] hh:mm A")}
                                                    </p>
                                                </div>
                                            </div>

                                        </Fragment>
                                    ))}

                                </div>
                            </section>

                            <section
                                className="gap-[12px] grid grid-cols-[2.1fr_auto_1fr] max-[700px]:grid-cols-1 max-[768px]:grid-cols-[1.5fr_auto_1fr]">

                                <div>
                                    {[undefined, null, "", 0].includes(array1?.[0]?.categories?.length) ? <></> :
                                        <>
                                            <div className="flex gap-[12px] flex-wrap ">

                                                {array1?.[0]?.categories.map((val1, index) => (
                                                    <Fragment key={index}>
                                                        {val1.map((cat_name, cat_index) => (
                                                            <Fragment >

                                                                <p className="bg-[#131313] mb-[10px] p-[6px_12px] w-fit font-inter font-normal text-[12px] text-white">

                                                                    {cat_name?.categoryName}
                                                                </p>
                                                            </Fragment>
                                                        ))}

                                                    </Fragment>
                                                ))}
                                            </div>


                                        </>
                                    }

                                    <Link href={`/news/${array1?.[0]?.slug}`} legacyBehavior>

                                        <a
                                            className="mb-[10px] text-[#131313] text-[32px] hover:underline no-underline leading-[43px]">
                                            {[undefined, null, ""].includes(array1?.[0]?.title) ? <></> : array1?.[0]?.title}
                                        </a>
                                    </Link>
                                    {[undefined, null, ""].includes(array1?.[0]?.authorDetails?.firstName) ? <></> :
                                        <>

                                            <p className="mb-[70px] font-inter font-normal text-[#131313] text-[14px]"> By <span className="">
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


                                    {array3?.length == 1 ? <>
                                        <News_Layout1 array3={array3} />
                                    </> :
                                        array3?.length == 2 || array3?.length == 3 ?
                                            <>
                                                <News_Layout1 array3={array3} />
                                                <News_Layout2 array3={array3} />
                                            </> :
                                            array3?.length == 4 ?
                                                <>
                                                    <News_Layout1 array3={array3} />
                                                    <News_Layout2 array3={array3} />
                                                    <News_Layout3 array3={array3} />

                                                </> :
                                                array3?.length == 5 || array3?.length == 6 || array3?.length == 7 || array3?.length == 8 ?
                                                    <>
                                                        <News_Layout1 array3={array3} />
                                                        <News_Layout2 array3={array3} />
                                                        <News_Layout3 array3={array3} />
                                                        <News_Layout4 array3={array3} />

                                                    </> :

                                                    array3?.length == 9 || array3?.length == 10 || array3?.length == 11 || array3?.length == 12 ?
                                                        <>

                                                            <News_Layout1 array3={array3} />
                                                            <News_Layout2 array3={array3} />
                                                            <News_Layout3 array3={array3} />
                                                            <News_Layout4 array3={array3} />
                                                            <News_Layout5 array3={array3} />
                                                        </> :
                                                        array3?.length == 13 || array3?.length == 14 || array3?.length == 15 || array3?.length == 16 ?

                                                            <>
                                                                <News_Layout1 array3={array3} />
                                                                <News_Layout2 array3={array3} />
                                                                <News_Layout3 array3={array3} />
                                                                <News_Layout4 array3={array3} />
                                                                <News_Layout5 array3={array3} />
                                                                <News_Layout6 array3={array3} />

                                                            </>
                                                            :
                                                            array3?.length >= 12 ?
                                                                <>
                                                                    <News_Layout1 array3={array3} />
                                                                    <News_Layout2 array3={array3} />
                                                                    <News_Layout3 array3={array3} />
                                                                    <News_Layout4 array3={array3} />
                                                                    <News_Layout5 array3={array3} />
                                                                    {/* <News_Layout6 array3={array3} /> */}
                                                                    {/* <News_Layout7 array3={array3} /> */}
                                                                </>
                                                                :

                                                                <>

                                                                </>
                                    }
                                </div>

                                <span className="bg-[#13131366] w-[0.5px] h-full"></span>

                                <div>

                                    <div
                                        className="flex max-[700px]:justify-center items-center space-x-[16px] border-[#13131366] py-[20px] border-b last-of-type:border-b-0 border-solid justify-between">
                                        <div>
                                            <h3 className="mb-[7px] font-[600] font-inter text-[#920406] text-[14px] leading-[24px]">
                                                {audio_files_Array?.[0]?.title}
                                            </h3>
                                            {/* <p className="mb-[18px] font-inter font-medium text-[#131313] text-[14px] leading-[20px]">Mick
                                                reflect on his 1996 interview with a musical icon</p> */}

                                            {/* <p className="mb-[18px] font-inter font-medium text-[#131313] text-[14px] leading-[20px]">
                                                {audio_files_Array?.[0]?.description}
                                            </p> */}

                                            {/* <div
                                                className="pr-[12px] max-[700px]:pr-0"
                                                style={{ color: 'black' }}
                                                dangerouslySetInnerHTML={{
                                                    __html: audio_files_Array?.[0]?.description
                                                        ?.replace(/<h1[^>]*>.*?<\/h1>/, "") // Remove the first <h1> tag and its content
                                                        .replaceAll("<br>", " ") // Replace <br> tags with spaces
                                                        .replaceAll(/<div className="card[^"]*"(.*?)<\/div>/g, '') // Remove specific <div> tags
                                                        .replaceAll(/<img[^>]*>/g, "") // Remove all <img> tags
                                                        .replace(/p-\[24px_60px_10px\]/g, "") // Remove specific styles
                                                }}
                                            ></div> */}

                                            {/* <div className="" dangerouslySetInnerHTML={{ __html: audio_files_Array?.[0]?.description?.replaceAll("<br>", " ").replace(/p-\[24px_60px_10px\]/g, "") }} /> */}

                                            {/* <audio controls>
                                                    <source src="horse.ogg" type="audio/ogg" />
                                                    <source src="horse.mp3" type="audio/mpeg" />
                                                    Your browser does not support the audio element.
                                                </audio> */}

                                            {/* <div>
                                                <div
                                                    className=""
                                                    dangerouslySetInnerHTML={{
                                                        __html: audio_files_Array?.[0]?.description
                                                            ?.replaceAll("<br>", " ") // Replace <br> tags with spaces
                                                            .replace(/p-\[24px_60px_10px\]/g, "") // Remove unwanted styles/classes
                                                    }}
                                                />

                                            </div> */}

                                            <Interweave content={audio_files_Array?.[0]?.description} />


                                            {/* <div className="flex items-center space-x-[16px]">
                                                <a href=""
                                                    className="flex justify-center items-center gap-[4px] bg-[#131313] hover:bg-[#2c2c2c] p-[8px_16px_8px_12px] rounded-[50px] min-w-[97px]">
                                                    <img src="/img/listen.svg" alt="listem" />
                                                    <p className="font-inter font-normal text-[#FFFFFF] text-[14px] leading-[20px]">Listen
                                                    </p>
                                                </a>
                                                <p className="font-inter font-medium text-[#131313B0] text-[14px] leading-[20px]">63 Mins
                                                </p>
                                            </div> */}

                                        </div>
                                        <div >
                                            <img src={audio_files_Array?.[0]?.coverImage || "/img/no-image.png"} alt={audio_files_Array?.[0]?.title} style={{ width: "103px", height: "111px" }} />

                                        </div>
                                    </div>
                                    {firstThree_authors.map((val, index) => (
                                        <Fragment key={index}>
                                            <div
                                                className="flex flex-col items-center border-[#13131366] py-[20px] border-b last-of-type:border-b-0 border-solid">
                                                <img src={`${imageUrl}${val?.authorDetails?.profileImagePath}`} alt={val?.title} style={{ borderRadius: "50%", height: "60px", width: "60px" }} />
                                                <h3 className="mt-[10px] mb-[7px] font-[600] font-inter text-[#920406] text-[14px] leading-[24px]">


                                                    {`${val?.authorDetails?.firstName} ${val?.authorDetails?.lastName}`}
                                                </h3>

                                                <a href={`/news/${val?.slug}`}
                                                    className="font-normal text-[#131313] text-[24px] text-center max-[1024px]:text-[20px] hover:underline no-underline leading-[32px] max-[1024px]:leading-normal">
                                                    {val?.title}
                                                </a>
                                            </div>

                                        </Fragment>
                                    ))}



                                    <div
                                        className="gap-[10px] border-[#13131366] grid grid-cols-[1fr_auto_1fr] max-[1024px]:grid-cols-1 py-[20px] border-b-[0.5px] last-of-type:border-b-0 border-solid"
                                        style={{ display: [undefined, null, ""].includes(nextFour_authors?.[0]?.title) ? "none" : "" }}
                                    >

                                        {[undefined, null, ""].includes(nextFour_authors?.[0]?.title) ? <></> : <>
                                            <div className="flex flex-col items-center">
                                                <img src={`${imageUrl}${nextFour_authors?.[0]?.authorDetails?.profileImagePath}`} alt={nextFour_authors?.[0]?.title}
                                                    style={{ borderRadius: "50%", height: "60px", width: "60px" }}
                                                />
                                                <h3
                                                    className="mt-[10px] mb-[7px] font-[600] font-inter text-[#920406] text-[14px] leading-[24px]">


                                                    {`${nextFour_authors?.[0]?.authorDetails?.firstName} ${nextFour_authors?.[0]?.authorDetails?.lastName}`}
                                                </h3>
                                                <Link href={`/news/${nextFour_authors?.[0]?.slug}`} legacyBehavior>
                                                    <p className="font-normal text-[#131313] text-[18px] text-center leading-[24px] cursor-pointer">
                                                        {nextFour_authors?.[0]?.title}

                                                    </p>
                                                </Link>


                                            </div>
                                        </>}


                                        {[undefined, null, ""].includes(nextFour_authors?.[1]?.title) ? <></> : <>

                                            <span className="bg-[#13131366] w-[0.5px] max-[1024px]:w-full h-full max-[1024px]:h-[0.5px]"></span>
                                            <div className="flex flex-col items-center">
                                                <img src={`${imageUrl}${nextFour_authors?.[1]?.authorDetails?.profileImagePath}`} alt={nextFour_authors?.[1]?.title}
                                                    style={{ borderRadius: "50%", height: "60px", width: "60px" }}
                                                />
                                                <h3
                                                    className="mt-[10px] mb-[7px] font-[600] font-inter text-[#920406] text-[14px] leading-[24px]">


                                                    {`${nextFour_authors?.[1]?.authorDetails?.firstName} ${nextFour_authors?.[1]?.authorDetails?.lastName}`}
                                                </h3>
                                                <Link href={`/news/${nextFour_authors?.[1]?.slug}`} legacyBehavior>
                                                    <p className="font-normal text-[#131313] text-[18px] text-center leading-[24px] cursor-pointer">
                                                        {nextFour_authors?.[1]?.title}

                                                    </p>
                                                </Link>
                                            </div>
                                        </>}
                                    </div>

                                    <div
                                        className="gap-[10px] border-[#13131366] grid grid-cols-[1fr_auto_1fr] max-[1024px]:grid-cols-1 py-[20px] border-b last-of-type:border-b-0 border-solid"
                                        style={{ display: [undefined, null, ""].includes(nextFour_authors?.[2]?.title) ? "none" : "" }}
                                    >
                                        {[undefined, null, ""].includes(nextFour_authors?.[2]?.title) ? <></> : <>
                                            <div className="flex flex-col items-center">
                                                <img src={`${imageUrl}${nextFour_authors?.[2]?.authorDetails?.profileImagePath}`} alt={nextFour_authors?.[2]?.title}
                                                    style={{ borderRadius: "50%", height: "60px", width: "60px" }}
                                                />
                                                <h3
                                                    className="mt-[10px] mb-[7px] font-[600] font-inter text-[#920406] text-[14px] leading-[24px]">


                                                    {`${nextFour_authors?.[2]?.authorDetails?.firstName} ${nextFour_authors?.[2]?.authorDetails?.lastName}`}
                                                </h3>
                                                <Link href={`/news/${nextFour_authors?.[2]?.slug}`} legacyBehavior>
                                                    <p className="font-normal text-[#131313] text-[18px] text-center leading-[24px] cursor-pointer">
                                                        {nextFour_authors?.[2]?.title}

                                                    </p>
                                                </Link>
                                            </div>
                                        </>}


                                        {[undefined, null, ""].includes(nextFour_authors?.[3]?.title) ? <></> : <>

                                            <span className="bg-[#13131366] w-[0.5px] max-[1024px]:w-full h-full max-[1024px]:h-[0.5px]"></span>
                                            <div className="flex flex-col items-center">
                                                <img src={`${imageUrl}${nextFour_authors?.[3]?.authorDetails?.profileImagePath}`} alt={nextFour_authors?.[3]?.title}
                                                    style={{ borderRadius: "50%", height: "60px", width: "60px" }}
                                                />
                                                <h3
                                                    className="mt-[10px] mb-[7px] font-[600] font-inter text-[#920406] text-[14px] leading-[24px]">


                                                    {`${nextFour_authors?.[3]?.authorDetails?.firstName} ${nextFour_authors?.[3]?.authorDetails?.lastName}`}
                                                </h3>
                                                <Link href={`/news/${nextFour_authors?.[3]?.slug}`} legacyBehavior>
                                                    <p className="font-normal text-[#131313] text-[18px] text-center leading-[24px] cursor-pointer">
                                                        {nextFour_authors?.[3]?.title}

                                                    </p>

                                                </Link>
                                            </div>
                                        </>}

                                    </div>



                                    <div className="border-[#13131366] py-[20px] border-b last-of-type:border-b-0 border-solid">

                                        <h2
                                            className="border-[#920406] mx-auto mb-[12px] pb-[6px] border-b border-solid w-fit font-normal text-[#131313] text-base leading-[21px]">
                                            TODAY’S CARTOON </h2>
                                        <div>
                                            <img src={cartoon_Array?.[0]?.coverImage}
                                                alt={cartoon_Array?.[0]?.title}
                                                className="max-[700px]:mx-auto" />
                                        </div>

                                    </div>


                                    <div className="border-[#13131366] py-[20px] border-b last-of-type:border-b-0 border-solid">

                                        <h2
                                            className="border-[#920406] mx-auto mb-[12px] pb-[6px] border-b border-solid w-fit font-normal text-[#131313] text-base leading-[21px]">
                                            LETTER TO THE EDITOR </h2>
                                        <div className="flex justify-center items-center mt-[30px] mb-[16px]">
                                            <img src="/img/sample-template12.svg" alt="sample template" />
                                        </div>
                                        {/* <a href="#" className="hover:underline no-underline"> */}
                                        <Link href={`/news/${letter_to_edit_Array?.[1]?.slug}`} legacyBehavior className="hover:underline no-underline">
                                            <h3 className="mb-[10px] font-normal text-[#131313] text-[24px] text-center leading-[32px]">
                                                {letter_to_edit_Array?.[0]?.title}
                                            </h3>
                                        </Link>
                                        {/* </a> */}
                                        {/* <p className="mb-[18px] line-clamp-3 font-inter font-normal text-[#131313] text-base text-center">
                                    I’d tried so many diets unsuccesfull,
                                    but reading one lady’s weight loss story in the Telegram led me to one that actually
                                    worked....

                                </p> */}

                                        <p
                                            className="mb-[18px] line-clamp-3 font-inter font-normal text-[#131313] text-base text-center"
                                            dangerouslySetInnerHTML={{
                                                __html: letter_to_edit_Array?.[0]?.description
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


                                    <div className="border-[#13131366] py-[20px] border-b last-of-type:border-b-0 border-solid">

                                        <h2
                                            className="border-[#920406] mx-auto mb-[12px] pb-[6px] border-b border-solid w-fit font-normal text-[#131313] text-base leading-[21px]">
                                            OBITUARIES </h2>
                                        <div className="flex justify-center items-center mt-[30px] mb-[16px]">
                                            <img src={obituaries_Array?.[0]?.coverImage}
                                                alt={obituaries_Array?.[0]?.title} />
                                        </div>

                                        <a href={`/news/${obituaries_Array?.[0]?.slug}`}
                                            className="block border-[#13131366] mb-[10px] pb-[16px] border-b-[0.5px] border-solid font-normal text-[#131313] text-[24px] text-center hover:underline no-underline leading-[32px]">
                                            {obituaries_Array?.[0]?.title}

                                        </a>
                                        <div className="gap-[12px] grid grid-cols-[1fr_auto_1fr] max-[1024px]:grid-cols-1">
                                            <Link href={`/news/${obituaries_Array?.[1]?.slug}`} legacyBehavior>
                                                <p className="font-normal text-[#131313] text-[18px] text-center leading-[25px]" style={{ cursor: "pointer" }}>
                                                    {obituaries_Array?.[1]?.title}
                                                </p>
                                            </Link>
                                            <span className="bg-[#13131366] w-[0.5px] w-full h-full max-[1024px]:h-[0.5px]"></span>
                                            <Link href={`/news/${obituaries_Array?.[2]?.slug}`} legacyBehavior>
                                                <p className="font-normal text-[#131313] text-[18px] text-center leading-[25px]" style={{ cursor: "pointer" }}>
                                                    {obituaries_Array?.[2]?.title}
                                                </p>
                                            </Link>
                                        </div>

                                    </div>


                                </div>




                            </section>

                            {[undefined, null, 0].includes(array4?.length) ? <></> : <>
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
                                                disabled={startIndex + visibleCount >= array4?.length}

                                                // className={`px-4 py-2 rounded transition-all duration-200 ${startIndex + visibleCount < BlogCards.length
                                                //         ? "bg-gray-300 cursor-pointer hover:bg-gray-400"
                                                //         : "bg-gray-200 cursor-default opacity-50"
                                                //     }`}
                                                style={{
                                                    cursor:
                                                        startIndex + visibleCount < array4.length ? "pointer" : "default",
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

                                            {array4?.slice(startIndex, startIndex + visibleCount).map((val, index) => (
                                                <Fragment key={index}>
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
                                                </Fragment>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            </>}
                        </section>
                    </div >

                </>}
        </>
    );
};

export default News_Index;
