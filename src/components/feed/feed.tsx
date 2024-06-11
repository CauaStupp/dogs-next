"use client";

import photosGet, { Photo } from "@/actions/photos-get";
import FeedPhotos from "./feed-photos";
import { useEffect, useRef, useState } from "react";
import Loading from "../utils/loading";
import styles from "./feed.module.css";

export default function Feed({
  photos,
  user,
}: {
  photos: Photo[];
  user?: 0 | string;
}) {
  const [photoFeed, setPhotosFeed] = useState<Photo[]>(photos);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [infinity, setInfinity] = useState(photos.length < 6 ? false : true);
  const fetching = useRef(false);

  function infinityScroll() {
    if (fetching.current) return;
    fetching.current = true;
    setLoading(true);
    setTimeout(() => {
      setPage((currentPage) => currentPage + 1);
      fetching.current = false;
      setLoading(false);
    }, 1000);
  }

  useEffect(() => {
    if (page === 1) return;
    async function getPagePhotos(page: number) {
      const actionData = await photosGet(
        { page, total: 6, user: 0 },
        { cache: "no-store" }
      );

      if (actionData && actionData.data !== null) {
        const { data } = actionData;
        setPhotosFeed((currentPhotos) => [...currentPhotos, ...data]);
        if (data.length < 6) {
          setInfinity(false);
        }
      }
    }
    getPagePhotos(page);
  }, [page]);

  useEffect(() => {
    if (infinity) {
      window.addEventListener("scroll", infinityScroll);
      window.addEventListener("wheel", infinityScroll);
    } else {
      window.removeEventListener("scroll", infinityScroll);
      window.removeEventListener("wheel", infinityScroll);
    }

    return () => {
      window.removeEventListener("scroll", infinityScroll);
      window.removeEventListener("wheel", infinityScroll);
    };
  }, [infinity]);

  return (
    <div>
      <FeedPhotos photos={photoFeed} />
      <div className={styles.loadingWrapper}>
        {infinity ? loading && <Loading /> : <p>Não existem mais postagens.</p>}
      </div>
    </div>
  );
}
