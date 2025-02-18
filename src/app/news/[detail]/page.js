import { fetchGraphQl } from "@/app/api/graphicql";
import { GET_POSTS_CHANNELLIST_QUERY, GET_POSTS_LIST_QUERY, GET_POSTS_SLUG_QUERY } from "@/app/api/query";
import Header_component from "@/component/Header";
import News_Detail_component from "@/component/News/News_Detail_component";
import { notFound } from "next/navigation";
import React from "react";

const News_Detail = async ({ params }) => {
    let variable_slug = { "slug": params?.detail, "AdditionalData": { "authorDetails": true, "categories": true } };

    const detail_result = await fetchGraphQl(GET_POSTS_SLUG_QUERY, variable_slug)
    // if (!postes) {
    //     return notFound();
    // }
    console.log("params1", detail_result)

    let variable_category = {
        "categoryFilter": {
            "categoryGroupSlug": "news",
            "excludeGroup": true,
            "hierarchyLevel": 2

        }
    }
    const Header_Api_data = await fetchGraphQl(GET_POSTS_CHANNELLIST_QUERY, variable_category)


    let variable_list_1 = {
        "entryFilter": {
            "categorySlug": "news"
        },
        "commonFilter": {
            // "limit": 10,
            // "offset": 0
        },
        "AdditionalData": {
            "categories": true,
            "authorDetails": true
        }

    }

    const Listdata = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_list_1)




    let variable_list = {
        "entryFilter": {
            "categorySlug": detail_result?.ChannelEntryDetail?.categories?.[0]?.[0]?.categorySlug
        },
        "commonFilter": {
            // "limit": 10,
            // "offset": 0
        },
        "AdditionalData": {
            "categories": true,
            "authorDetails": true
        }

    }

    const moreStories_data = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_list)



    let variable_morenews = {
        "entryFilter": {
            "categorySlug": "news"
        },
        "commonFilter": {
            // "limit": 10,
            // "offset": 0
        },
        "AdditionalData": {
            "categories": true,
            "authorDetails": true
        }

    }

    const More_news = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_morenews)


    console.log("moreStories_dsata", moreStories_data)


    let variable_list_2 = {
        "entryFilter": {
            "categorySlug": "news"
        },
        "commonFilter": {
            // "limit": 10,
            // "offset": 0
        },
        "AdditionalData": {
            "categories": true,
            "authorDetails": true
        },
        "sort": {
            "sortBy": "view_count",
            "order": 1
        }

    }

    const popular_stories = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_list_2)


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
                <Header_component Header_Api_data={Header_Api_data} Listdata={Listdata} />
                <News_Detail_component
                    params={params}
                    detail_result={detail_result}
                    moreStories_data={moreStories_data}
                    More_news={More_news}
                    popular_stories={popular_stories}
                />
            </div>
        </>
    );
};

export default News_Detail;


