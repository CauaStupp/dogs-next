"use client";

import { useFormState, useFormStatus } from "react-dom";
import Button from "@/components/forms/button";
import Input from "@/components/forms/input";
import ErrorMessage from "../utils/error-message";
import { ChangeEvent, useState } from "react";
import styles from "./account-photo-post.module.css";
import photoPost from "@/actions/photo-post";

function FormButton() {
  const { pending } = useFormStatus();

  return pending ? (
    <Button disabled={pending}>Postando...</Button>
  ) : (
    <Button>Postar</Button>
  );
}

export default function AccountPhotoPost() {
  const [state, action] = useFormState(photoPost, {
    ok: false,
    error: "",
    data: null,
  });
  const [img, setImg] = useState("");

  function handleImageChange({ target }: ChangeEvent<HTMLInputElement>) {
    if (target.files) {
      const image = URL.createObjectURL(target.files[0]);
      setImg(image);
    }
  }

  return (
    <section className={`${styles.photoPost} fadeLeft`}>
      <form action={action}>
        <Input type="text" label="Nome" name="nome" />
        <Input type="number" label="Peso" name="peso" />
        <Input type="number" label="Idade" name="idade" />
        <input
          onChange={handleImageChange}
          type="file"
          name="img"
          id="img"
          className={styles.img}
        />
        <ErrorMessage error={state.error} />
        <FormButton />
      </form>
      <div>
        <div
          className={styles.preview}
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      </div>
    </section>
  );
}
