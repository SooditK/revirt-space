import { Todo } from "@prisma/client";
import React from "react";
import { trpc } from "../utils/trpc";

interface CardWrapperProps {
  cards: Todo[] | undefined;
}

const CardWrapper = ({ cards }: CardWrapperProps) => {
  const utils = trpc.useContext();
  const deleteTodo = trpc.useMutation(["todo.deleteTodo"]);
  const updateTodo = trpc.useMutation(["todo.updateTodo"]);
  return (
    <>
      {cards?.map((card) => {
        return (
          <div key={card.id} className="flex gap-x-4">
            <h1>{card.title}</h1>
            <p>{JSON.stringify(card.completed)}</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                deleteTodo.mutate(
                  {
                    id: card.id,
                  },
                  {
                    onSuccess() {
                      utils.invalidateQueries(["todo.allTodo"]);
                    },
                  }
                );
              }}
            >
              Delete
            </button>
            <button>
              {card.completed ? (
                <>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      updateTodo.mutate(
                        {
                          id: card.id,
                        },
                        {
                          onSuccess() {
                            utils.invalidateQueries(["todo.allTodo"]);
                          },
                        }
                      );
                    }}
                  >
                    ❌
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      updateTodo.mutate(
                        {
                          id: card.id,
                        },
                        {
                          onSuccess() {
                            utils.invalidateQueries(["todo.allTodo"]);
                          },
                        }
                      );
                    }}
                  >
                    ✅
                  </button>
                </>
              )}
            </button>
          </div>
        );
      })}
    </>
  );
};

export default CardWrapper;
