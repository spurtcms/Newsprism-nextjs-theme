import { fetchGraphQl } from "@/app/api/graphicql";
import { GET_POSTS_CHANNELLIST_QUERY, GET_POSTS_LIST_QUERY, GET_POSTS_SLUG_QUERY, GET_POSTS_visible_count_query } from "@/app/api/query";
import Header_component from "@/component/Header";
import News_Detail_component from "@/component/News/News_Detail_component";
import { notFound } from "next/navigation";
import React from "react";

const News_Detail = async ({ params }) => {
    let variable_slug = { "slug": params?.detail, "AdditionalData": { "authorDetails": true, "categories": true } };

    const detail_result = await fetchGraphQl(GET_POSTS_SLUG_QUERY, variable_slug)
    // if (!detail_result) {
    //     return notFound();
    // }

    let visible_count_slug = { "slug": params?.detail };

    const visible_count_api = await fetchGraphQl(GET_POSTS_visible_count_query, visible_count_slug)


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

            <div className="bg-[#FFF6E3]">

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


