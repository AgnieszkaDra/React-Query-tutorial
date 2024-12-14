import React from 'react';
import { Todo } from '../entities/Todo';

interface TodoCardProps {
  todo: Todo;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
  return (
    <div className="border p-2 rounded mb-2 flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{todo.title}</h3>
        <p>Status: {todo.completed ? 'Completed ✅' : 'Incomplete ❌'}</p>
      </div>
      <button className="text-sm text-blue-500">Edit</button>
    </div>
  );
};

export default TodoCard;