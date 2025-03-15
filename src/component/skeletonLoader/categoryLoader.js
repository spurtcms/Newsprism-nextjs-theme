import React from "react";


function NavSkeleton() {


    return (
        <>
            <div role="status" class="animate-pulse">
                <div class="flex items-center justify-center mt-4">
                    <div class="w-20 h-8 bg-gray-300 rounded-full dark:bg-gray-300 me-3"></div>
                    <div class="w-24 h-8 bg-gray-300 rounded-full dark:bg-gray-300 me-3"></div>
                    <div class="w-20 h-8 bg-gray-300 rounded-full dark:bg-gray-300 me-3"></div>
                    <div class="w-24 h-8 bg-gray-300 rounded-full dark:bg-gray-300 me-3"></div>
                    <div class="w-20 h-8 bg-gray-300 rounded-full dark:bg-gray-300 me-3"></div>
                    <div class="w-24 h-8 bg-gray-300 rounded-full dark:bg-gray-300 me-3"></div>

                </div>
                <span class="sr-only">Loading...</span>
            </div>
        </>
    )
}
export default NavSkeleton;