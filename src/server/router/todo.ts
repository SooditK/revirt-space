import { createRouter } from "./context";
import { z } from "zod";
import { prisma } from "../db/client";

export const todoRouter = createRouter()
  .query("allTodo", {
    resolve() {
      const todos = prisma.todo.findMany();
      return todos;
    },
  })
  .mutation("createTodo", {
    input: z.object({
      title: z.string(),
    }),
    async resolve({ input }) {
      const todo = await prisma.todo.create({
        data: {
          title: input.title,
          completed: false,
        },
      });

      return {
        todo,
      };
    },
  })
  .mutation("updateTodo", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const todo = await prisma.todo.findUnique({
        where: {
          id: input.id,
        },
      });
      if (!todo) {
        throw new Error("Todo not found");
      } else {
        await prisma.todo.update({
          where: {
            id: input.id,
          },
          data: {
            completed: !todo.completed,
          },
        });
      }
      return {
        todo,
      };
    },
  })
  .mutation("deleteTodo", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const todo = await prisma.todo.findUnique({
        where: {
          id: input.id,
        },
      });
      if (!todo) {
        throw new Error("Todo not found");
      } else {
        await prisma.todo.delete({
          where: {
            id: input.id,
          },
        });
      }
      return {
        todo,
      };
    },
  });
