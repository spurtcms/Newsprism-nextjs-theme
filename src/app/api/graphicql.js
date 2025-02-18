
"use server"

import { apiinstance } from "./interceptor";

export const fetchGraphQl = async (GET_POSTS_QUERY,varia) => {
 
  try {
    const entries = await apiinstance("",{
      method: 'POST',
      body: JSON.stringify({
        query: GET_POSTS_QUERY,
        variables: varia
      }),
      cache: 'no-cache'
    });
     return entries?.data
  } catch (error) {
    throw error;
  }
};


