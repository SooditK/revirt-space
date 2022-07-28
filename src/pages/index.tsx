import React from "react";
import { trpc } from "../utils/trpc";

const Home = () => {
  const hello = trpc.useQuery(["todo.allTodo"]);
  const utils = trpc.useContext();
  const addTodo = trpc.useMutation(["todo.createTodo"]);
  const deleteTodo = trpc.useMutation(["todo.deleteTodo"]);
  const updateTodo = trpc.useMutation(["todo.updateTodo"]);
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

  async function handleUpdate(e: React.SyntheticEvent, id: string) {
    e.preventDefault();
    updateTodo.mutate(
      {
        id: id,
      },
      {
        onSuccess() {
          utils.invalidateQueries(["todo.allTodo"]);
        },
      }
    );
  }

  async function handleDelete(e: React.SyntheticEvent, id: string) {
    e.preventDefault();
    deleteTodo.mutate(
      {
        id: id,
      },
      {
        onSuccess() {
          utils.invalidateQueries(["todo.allTodo"]);
        },
      }
    );
  }

  return (
    <>
      <div className="bg-[#171717] min-w-full min-h-screen">
        <h1 className="text-center py-10 text-white text-3xl">To-Do List</h1>
        <div className="container mx-24 w-full">
          <div className="block mb-2 font-bold py-6 text-gray-900 dark:text-gray-300">
            Add a new task in the list
          </div>
          <div className="flex gap-x-6">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter the task here"
              className="block p-2 w-2/3 text-gray-900 bg-gray-50 rounded-md border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <button
              onClick={handleSubmit}
              className="bg-[#C620A7] text-white px-10 py-1 rounded-md"
            >
              Submit
            </button>
          </div>
          <div className="block mb-2 font-bold pt-10 pb-6 text-gray-900 dark:text-gray-300">
            Added task in to-do list
          </div>
          <div className="grid grid-cols-3 gap-x-4 gap-y-12">
            {hello.data?.map((card) => (
              <div key={card.id}>
                <div
                  className={`p-6 max-w-sm rounded-lg border shadow-md  bg-gray-800 border-gray-700 ${
                    card.completed ? "border-[1px] border-green-500" : ""
                  }`}
                >
                  <h5 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                    {card.title}
                  </h5>
                  <div className="border-t border-gray-700 dark:border-gray-600"></div>
                  <div className="flex gap-x-6">
                    <div className="font-normal text-gray-700 dark:text-gray-400">
                      {!card.completed ? (
                        <button
                          className="text-center bg-[#C620A7] text-white px-10 rounded-md py-1 mt-6"
                          onClick={(e) => handleUpdate(e, card.id)}
                        >
                          Mark as Completed
                        </button>
                      ) : (
                        <button
                          onClick={(e) => handleUpdate(e, card.id)}
                          className="text-center text-white px-10 rounded-md py-1 mt-6"
                        >
                          Mark as incomplete
                        </button>
                      )}
                    </div>
                    <div>
                      <button
                        className="text-center text-white hover:text-[#C620A7] rounded-md py-1 mt-6"
                        onClick={(e) => handleDelete(e, card.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
