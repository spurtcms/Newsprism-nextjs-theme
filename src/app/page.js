import Image from "next/image";
import News_Index from "./news/page";
import { fetchGraphQl } from "./api/graphicql";
import { GET_POSTS_CHANNELLIST_QUERY, GET_POSTS_LIST_QUERY } from "./api/query";
import { Suspense } from "react";

export default async function Home({ searchParams }) {



  let variable_category = {
    "categoryFilter": {
      "categoryGroupSlug": "news",
      "excludeGroup": true,
      "hierarchyLevel": 2

    }
  }
  const Header_Api_data = await fetchGraphQl(GET_POSTS_CHANNELLIST_QUERY, variable_category)

  // let  variable_list={ "commonFilter": {"limit": 10,"offset": 0}, "entryFilter": { "categorySlug": "",}, "AdditionalData": { "authorDetails": true, "categories": true }};

  console.log("searchParams", searchParams.type)

  let variable_list = {
    "entryFilter": {
      "categorySlug": `${searchParams.type || "news"}`
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

  const Listdata = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_list)



  let variable_todays_cartoon = {
    "entryFilter": {
      "categorySlug": "cartoon"
    },
    "AdditionalData": {
      "categories": true,
      "authorDetails": true
    }

  }

  const todays_cartoon = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_todays_cartoon)


  let variable_todays_obituaries = {
    "entryFilter": {
      "categorySlug": "obituaries"
    },
    "AdditionalData": {
      "categories": true,
      "authorDetails": true
    }

  }

  const obituaries = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_todays_obituaries)


  let variable_letter_to_the_editor = {
    "entryFilter": {
      "categorySlug": "letter-to-the-editor"
    },
    "AdditionalData": {
      "categories": true,
      "authorDetails": true
    }

  }

  const letter_to_editor = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_letter_to_the_editor)




  return (
    <>
      <Suspense fallback={null}>
        <News_Index
          Header_Api_data={Header_Api_data}
          Listdata={Listdata}
          todays_cartoon={todays_cartoon}
          obituaries={obituaries}
          letter_to_editor={letter_to_editor}
        />
      </Suspense>
    </>
  );
}
