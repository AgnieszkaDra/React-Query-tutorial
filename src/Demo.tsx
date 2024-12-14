import React, { useState } from "react";
import { useQuery, UseQueryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo, fetchTodos } from "./api";
import TodoCard from "./components/TodoCard";
import { Todo } from "./entities/Todo";

export default function Demo() {
    const queryClient = useQueryClient()

    const [search, setSearch] = useState("")
    const [title, setTitle] = useState("")

    const queryKey = ["todos", { search }] as const;

    const queryOptions: UseQueryOptions<Todo[], Error> = {
        queryFn: () => fetchTodos(search),
        queryKey,
        staleTime: Infinity, // Prevent fetching todos multiple times by keeping data fresh indefinitely
        cacheTime: 1000 * 60 * 5, // Optional: control how long data stays in the cache (5 minutes)
      };

  const { data: todos, isLoading } = useQuery(queryOptions
  );

    const { mutateAsync: addTodoMutation } = useMutation({
        mutationFn: addTodo,
        onSuccess: () => {
            queryClient.invalidateQueries(["todos"])
        }
    })

    if(isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <input 
                type="text" 
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <button
            onClick={async () => {
                try {
                    await addTodoMutation({title});
                    setTitle("")
                } catch (e) {
                    console.error(e)
                }
            }}
            >Add Todo</button>
            {todos?.map((todo) => {
                return <TodoCard key={todo.id} todo={todo}/>
            })}
        </div>
    )
}
