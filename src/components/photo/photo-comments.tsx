"use client";

import { useUserContext } from "@/contexts/userContext";
import { useEffect, useRef, useState } from "react";
import PhotoCommentsForm from "./photo-comments-form";
import { Comment } from "@/actions/photo-get";
import styles from "./photo-comments.module.css";

export default function PhotoComments(props: {
  single: boolean;
  id: number;
  comments: Comment[];
}) {
  const [comments, setComments] = useState(() => props.comments);
  const { user } = useUserContext();
  const commentsSection = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (commentsSection.current) {
      commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
    }
  }, [comments]);

  return (
    <>
      <ul
        className={`${styles.comments} ${props.single ? styles.single : ""}`}
        ref={commentsSection}
      >
        {comments.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {user && (
        <PhotoCommentsForm
          id={props.id}
          single={props.single}
          setComments={setComments}
        />
      )}
    </>
  );
}
