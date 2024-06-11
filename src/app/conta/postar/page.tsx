import AccountPhotoPost from "@/components/account/account-photo-post";
import { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Postar | Dogs",
};

export default function PostingPage() {
  return (
    <div>
      <AccountPhotoPost />
    </div>
  );
}
