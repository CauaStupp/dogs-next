"use client";

import { useFormState, useFormStatus } from "react-dom";
import Button from "@/components/forms/button";
import Input from "@/components/forms/input";
import ErrorMessage from "../utils/error-message";
import styles from "./login-form.module.css";
import passwordLost from "@/actions/password-lost";

function FormButton() {
  const { pending } = useFormStatus();

  return pending ? (
    <Button disabled={pending}>Enviando...</Button>
  ) : (
    <Button>Enviar Email</Button>
  );
}

export default function LoginLostForm() {
  const [state, action] = useFormState(passwordLost, {
    ok: false,
    error: "",
    data: null,
  });

  return (
    <>
      <form action={action} className={styles.form}>
        <Input type="text" label="Email / Usuário" name="login" />
        <input
          type="hidden"
          name="url"
          value={`${window.location.href.replace("perdeu", "resetar")}`}
        />
        {state.data ? (
          <p style={{ color: "#4c1" }}>Email enviado.</p>
        ) : (
          <FormButton />
        )}
        <ErrorMessage error={state.error} />
      </form>
    </>
  );
}
