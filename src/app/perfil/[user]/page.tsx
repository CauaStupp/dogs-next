import photosGet from "@/actions/photos-get";
import Feed from "@/components/feed/feed";

export default async function ProfileUserPage({
  params,
}: {
  params: { user: string };
}) {
  const { data } = await photosGet({ user: params.user });

  if (!data) return null;
  return (
    <section className="container mainContainer">
      <h1 className="title">{params.user}</h1>
      <Feed photos={data} user={params.user} />
    </section>
  );
}