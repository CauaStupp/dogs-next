"use client";

import Link from "next/link";
import styles from "./photo-content.module.css";
import { useUserContext } from "@/contexts/userContext";
import PhotoDelete from "./photo-delete";
import Image from "next/image";
import { PhotoData } from "@/actions/photo-get";
import PhotoComments from "./photo-comments";

export default function PhotoContent({
  data,
  single,
}: {
  data: PhotoData;
  single: boolean;
}) {
  const { user } = useUserContext();
  const { photo, comments } = data;

  return (
    <div className={`${styles.photo} ${single ? styles.single : ""}`}>
      <div className={styles.img}>
        <Image src={photo.src} alt={photo.title} width={1000} height={1000} />
      </div>
      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            {user && user.username === photo.author ? (
              <PhotoDelete id={photo.id} />
            ) : (
              <Link href={`/perfil/${photo.author}`}>@{photo.author}</Link>
            )}

            <span className={styles.views}>{photo.acessos}</span>
          </p>
          <h1 className="title">
            <Link href={`/foto/${photo.id}`}>{photo.title}</Link>
          </h1>
          <ul className={styles.attri}>
            <li>{photo.peso} kg</li>
            <li>
              {photo.idade} {photo.idade > 1 ? "anos" : "ano"}
            </li>
          </ul>
        </div>
      </div>
      <PhotoComments id={photo.id} comments={comments} single={single} />
    </div>
  );
}
