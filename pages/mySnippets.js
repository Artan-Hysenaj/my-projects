import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import useSWR from "swr";
import Snippet from "../components/Snippet";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
const MySnippets = (props) => {
  const { data: snippets, mutate } = useSWR("/api/mySnippets");
  console.log(snippets);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <div className="my-12">
          <Header title="My Snippets" />
        </div>
        {snippets &&
          snippets.map((snippet) => (
            <Snippet
              key={snippet.id}
              snippet={snippet}
              snippetDeleted={mutate}
            />
          ))}
      </main>
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired();

export default MySnippets;
