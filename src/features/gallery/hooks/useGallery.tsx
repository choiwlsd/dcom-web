import { useEffect, useState } from "react";
import { getGalleryPosts } from "../api/gallery.api";
import { type GalleryPost } from "../types/gallery-post.type";

// 활동사진 전체 조회
export const useGallery = () => {
    const [data, setData] = useState<GalleryPost[]>([]);

    useEffect(() => {
        getGalleryPosts().then(setData);
    }, []);

    return { data };
};
