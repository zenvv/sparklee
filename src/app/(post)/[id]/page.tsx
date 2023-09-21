import { FC } from "react";

interface pageProps {
  params: { id: string };
}

const page: FC<pageProps> = ({ params }) => {
  return (
    <div>
      <h1>id do post: {params.id}</h1>
    </div>
  );
};

export default page;
