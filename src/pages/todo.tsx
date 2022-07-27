import React from "react";
import type { NextPage } from "next";
import { trpc } from "../utils/trpc";

const Home = () => {
  const hello = trpc.useQuery(["todo.allTodo"]);
  return (
    <>
      {hello.data ? (
        <pre>{JSON.stringify(hello.data.greeting, null, 2)}</pre>
      ) : (
        <>loading</>
      )}
    </>
  );
};

export default Home;
