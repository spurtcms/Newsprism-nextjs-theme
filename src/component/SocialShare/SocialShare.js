"use client"
import { useRouter } from 'next/navigation';

const SocialShare = () => {
    const router = useRouter();
    const currentURL = `https://spurtcms.com${router.asPath}`; // Replace with your actual domain

    // Social share URLs
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentURL)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(currentURL)}`,
        instagram: `https://www.instagram.com/?url=${encodeURIComponent(currentURL)}`, // Note: Instagram doesn't support direct sharing URLs
    };

    return (
        <ul className="flex items-center space-x-[30px]">
            <li>
                <a href={shareUrls.facebook} target="_blank" rel="noopener noreferrer">
                    <img src="/img/facebook.svg" alt="facebook" />
                </a>
            </li>
            <li>
                <a href={shareUrls.whatsapp} target="_blank" rel="noopener noreferrer">
                    <img src="/img/whatsapp.svg" alt="whatsapp" />
                </a>
            </li>
            <li>
                <a href={shareUrls.instagram} target="_blank" rel="noopener noreferrer">
                    <img src="/img/instagram.svg" alt="instagram" />
                </a>
            </li>
        </ul>
    );
};

export default SocialShare;
