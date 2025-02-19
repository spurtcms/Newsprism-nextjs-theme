"use client"
import React, { useEffect, useState } from 'react';
import { GET_POSTS_CHANNELLIST_QUERY, GET_POSTS_LIST_QUERY } from '@/app/api/query';
// import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchGraphQl } from '@/app/api/graphicql';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { EntryList_Redux_function, header_slug_Reduc_function } from '@/StoreConfiguration/slices/customer';

function Header_component({ Header_Api_data, Listdata }) {

    const header_data = Header_Api_data?.CategoryList?.categorylist
    const headerslug = useSelector((s) => s.customerRedux.header_slug)


    const [headerData_activesState, setheaderData_activesState] = useState(-1)


    const dispatch = useDispatch()

    let newObject = { id: 1, categoryName: 'Home', categorySlug: "news" };
    header_data?.unshift(newObject);
    let uniqueArr = [...new Map(header_data?.map(item => [item.categorySlug, item])).values()];

    console.log("categorySlug", uniqueArr)



    const [header_categorySlug, setheader_categorySlug] = useState()
    // const router = useRouter()
    const firstfour_channelEntry = Listdata?.ChannelEntriesList?.channelEntriesList?.slice(0, 4); // First 3 objects

    const [startIndex, setStartIndex] = useState(0);
    const visibleCount = 1;

    const handleNext = () => {
        if (startIndex + visibleCount < firstfour_channelEntry?.length) {
            setStartIndex(startIndex + 1);
        }
        console.log("startIndex", startIndex)
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    const router = useRouter()

    const handleclick_trendingTitle = (e, val) => {
        e.preventDefault();
        router.push(`/news/${val?.slug}`)
    }

    console.log("router", router)

    const handleclick_headerData = (e, val, index) => {
        console.log("ewewew", index)
        setheaderData_activesState(val?.categorySlug)
        setheader_categorySlug([undefined, null, ""].includes(val?.categorySlug) ? "news" : val?.categorySlug)

        // header_category_api([undefined, null, ""].includes(val?.categorySlug) ? "news" : val?.categorySlug)
        router.push(`/`)

        // router.push({
        //     pathname: '/', // The page to navigate to
        //     query: {
        //         name: `${val?.categorySlug || "news"}`, // Query parameters
        //     });
        dispatch(header_slug_Reduc_function(val?.categorySlug || "news"))
    }




    // const header_category_api = async (val) => {


    //     let variable_list = {
    //         "entryFilter": {
    //             "categorySlug": `${val}`
    //         },
    //         "commonFilter": {
    //             // "limit": 10,
    //             // "offset": 0
    //         },
    //         "AdditionalData": {
    //             "categories": true,
    //             "authorDetails": true
    //         }

    //     }

    //     const Listdata = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_list)
    //     dispatch(EntryList_Redux_function(Listdata?.ChannelEntriesList?.channelEntriesList))
    //     // setchannelEntriesList_Array(Listdata?.ChannelEntriesList?.channelEntriesList)

    // }

    // const Entrylist_api = async (val) => {


    //     let variable_list = {
    //         "entryFilter": {
    //             "categorySlug": "news"
    //         },
    //         "commonFilter": {
    //             // "limit": 10,
    //             // "offset": 0
    //         },
    //         "AdditionalData": {
    //             "categories": true,
    //             "authorDetails": true
    //         }

    //     }

    //     const Listdata = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_list)
    //     setentryList_Apidata(Listdata?.ChannelEntriesList?.channelEntriesList)
    // }

    // useEffect(() => {
    //     Entrylist_api()
    // }, [])
    // console.log("entryList_Apidata", entryList_Apidata)

    return (
        <>
            <header className="mx-auto px-4 max-w-[1280px]">
                <h1
                    className="border-[#131313] p-[13px] border-b border-solid font-normal text-[#131313] text-[40px] text-center leading-[54px]">
                    News Everyday</h1>

                <div
                    className="flex justify-between items-center border-[#131313] py-[10px] lg:py-0 border-b border-solid w-full max-w-[1280px]">
                    <div
                        className="top-0 left-[-100%] z-10 lg:z-0 lg:static fixed flex flex-col lg:items-center gap-[1.5vw] bg-white lg:bg-[transparent] px-5 lg:px-0 py-5 lg:py-0 w-[50%] lg:w-auto max-[400px]:w-full h-full lg:h-auto duration-500 navLinks">
                        <ul className="flex lg:flex-row flex-col gap-[30px] lg:py-[20px] w-full lg:w-auto">
                            <li className="flex justify-end lg:hidden w-full">
                                <a onClick="{onMenuToggle(this)}" className="ml-auto w-4 text-[30px] cursor-pointer">
                                    <img src="/img/modal-close.svg" alt="" />
                                </a>
                            </li>

                            {uniqueArr?.map((val, index) => (
                                <>
                                 {console.log(val,"dvnjdf")}
                                    {["Letter To The Editor", "Obituaries", "Cartoon","Audio Files"].includes(val?.categoryName) ? <></> : <>


                                        <li onClick={(e) => handleclick_headerData(e, val, index)} style={{ cursor: "pointer" }}>


                                                <a
                                                    className={val.categorySlug == headerslug ?
                                                        "font-inter font-medium text-[#131313] text-[14px] [&.active]:text-[#920406] leading-[17px] active" :
                                                        "font-inter font-medium text-[#131313] text-[14px] [&.active]:text-[#920406] leading-[17px] "
                                                    }

                                                >

                                                    {val?.categoryName}
                                                    {console.log(val?.categoryName,"ncdjfnsjdf")}
                                                </a>

                                        </li>
                                    </>}
                                </>
                            ))}
                        </ul >
                        {/* 
                        <ul
                            className="flex flex-col space-y-[30px] border-[#131313] lg:hidden mt-auto pt-4 border-t border-solid">
                            <li>
                                <a href="#" className="font-inter font-medium text-[#646464] text-sm no-underline">About</a>
                            </li>
                            <li>
                                <a href="#" className="font-inter font-medium text-[#646464] text-sm no-underline">Write for
                                    Us</a>
                            </li>
                            <li>
                                <a href="#" className="font-inter font-medium text-[#646464] text-sm no-underline">Advertise</a>
                            </li>
                            <li>
                                <a href="#" className="font-inter font-medium text-[#646464] text-sm no-underline">Contact</a>
                            </li>
                        </ul> */}
                    </div>

                    {/* <div className="flex items-center space-x-[20px] ml-auto lg:ml-[unset]">
                        <a href="" className="font-inter font-medium text-[#920406] text-[14px]"> Log In</a>
                        <a href=""
                            className="bg-[#920406] hover:bg-[#7e1d1e] p-[10px_20px] font-inter font-medium text-[#FFFFFF] text-[14px] leading-normal">Subscribe
                            now</a>

                        <a onClick="onMenuToggle(this)" className="lg:hidden mr-[20px] w-4 text-[30px] cursor-pointer">
                            <img src="/img/menu-black.svg" alt="" />
                        </a>
                    </div> */}
                </div>


                <div
                    className="flex justify-between items-center space-x-3 border-[#131313] px-4 lg:px-0 py-[20px] border-b border-solid">
                    {firstfour_channelEntry?.slice(startIndex, startIndex + visibleCount)?.map((val, index) => (
                        <>
                            <div className="flex items-center space-x-6" key={index}>


                                <a
                                    className="flex justify-center items-center bg-[#920406] hover:bg-[#7e1d1e] px-2 h-[25px] font-inter font-medium text-sm text-white no-underline">TRENDING</a>
                                <Link href={`/news/${val?.slug}`} legacyBehavior>
                                    <p className="line-clamp-1 font-inter font-medium text-[#131313] text-base cursor-pointer"
                                        onClick={(e) => handleclick_trendingTitle(e, val)}>

                                        {val?.title}
                                    </p>
                                </Link>
                            </div>

                        </>
                    ))}
                    <div className="flex items-center space-x-1">
                        <a className="flex justify-center items-center bg-[#920406] hover:bg-[#7e1d1e] w-6 h-6"
                            onClick={(e) => handlePrev(e)}
                            disabled={startIndex === 0}
                            // className="absolute -left-20 top-1/2 text-[#131313]  bg-white px-3 py-1 rounded"

                            // className={`px-4 py-2 rounded mr-2 transition-all duration-200 ${startIndex > 0
                            //     ? "bg-gray-300 cursor-pointer hover:bg-gray-400"
                            //     : "bg-gray-200 cursor-default opacity-50"
                            //     }`}
                            style={{ cursor: startIndex > 0 ? "pointer" : "default" }}

                        >
                            <img src="/img/left-arrow.svg" alt="" />
                        </a>
                        <a className="flex justify-center items-center bg-[#920406] hover:bg-[#7e1d1e] w-6 h-6"
                            onClick={(e) => handleNext(e)}
                            disabled={startIndex + visibleCount >= firstfour_channelEntry?.length}

                            // className={`px-4 py-2 rounded transition-all duration-200 ${startIndex + visibleCount < BlogCards.length
                            //         ? "bg-gray-300 cursor-pointer hover:bg-gray-400"
                            //         : "bg-gray-200 cursor-default opacity-50"
                            //     }`}
                            style={{
                                cursor:
                                    startIndex + visibleCount < firstfour_channelEntry?.length ? "pointer" : "default",

                            }}

                        >
                            <img src="/img/right-arrow.svg" alt="" />
                        </a>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header_component;
