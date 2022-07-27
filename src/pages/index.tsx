import React from "react";
import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import CardWrapper from "../components/CardWrapper";

const Home = () => {
  const hello = trpc.useQuery(["todo.allTodo"]);
  const utils = trpc.useContext();
  const addTodo = trpc.useMutation(["todo.createTodo"]);
  const [input, setInput] = React.useState("");

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (input === "") alert("input is empty");
    else {
      addTodo.mutate(
        {
          title: input,
        },
        {
          onSuccess() {
            utils.invalidateQueries(["todo.allTodo"]);
            setInput("");
          },
        }
      );
    }
  }

  return (
    <>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Add Todo</button>
      {hello.data ? (
        <pre>
          <CardWrapper cards={hello.data} />
        </pre>
      ) : (
        <>loading</>
      )}
    </>
  );
};

export default Home;
