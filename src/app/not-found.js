import Link from 'next/link';

export default function NotFound() {
    return (
        <div className=" px-5 lg:px-20  py-32 col-span-full grid place-items-center">
        <div className="flex flex-col items-center max-w-[642px] ">
            <img src="\img\404.svg" alt="nodata" className="dark:hidden" />
            <img
                src="\img\404-dark.svg"
                alt="nodata"
                className="dark:block hidden"
            />
            <h1 className=" text-2xl leading-6 font-medium text-black  mb-3 mt-6 text-center dark:dark:text-light-1">
                Oops! This obviously isn&apos;t a page you were looking for.
            </h1>
            <p className=" text-base leading-6 font-normal text-[#555555] text-center dark:text-light-2 max-w-[480px]">
                The page you&apos;re looking for isn&apos;t here. Meanwhile, feel free to explore other areas of our website. We apologize for any inconvenience caused and appreciate your understanding.
            </p>
            <Link href='/' className='h-[3rem] grid place-items-center bg-black text-base text-white  px-5 mt-4 rounded-md dark:bg-white dark:text-black'>Go to Home Page</Link>
        </div>
    </div>
);
}
