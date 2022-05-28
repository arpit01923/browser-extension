import { useState } from "react";
import { v4 as uuid } from "uuid";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import "./todo.css";

export const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [content, setContent] = useState("");
  const [editContent, setEditContent] = useState("");

  const addTodoHandler = (e) => {
    if (e.key === "Enter") {
      setTodo([
        ...todo,
        { id: uuid(), data: content, strike: false, edit: false },
      ]);
      setContent("");
    }
  };

  const strikeThroughHandler = (todoId) => {
    const strikeTodo = todo.map((item) =>
      item.id === todoId ? { ...item, strike: !item.strike } : item
    );
    setTodo(strikeTodo);
  };

  const editHandler = (todoId) => {
    const editTodo = todo.map((item) =>
      item.id === todoId
        ? (setEditContent(item.data), { ...item, edit: true })
        : item
    );
    setTodo(editTodo);
  };

  const deleteHandler = (todoId) => {
    setTodo(todo.filter((item) => item.id !== todoId));
  };

  const editTodoHandler = (e, todoId) => {
    if (e.key === "Enter") {
      const editedTodo = todo.map((item) =>
        item.id === todoId
          ? ({ ...item, data: editContent, edit: false }, setEditContent(""))
          : item
      );
      console.log({editedTodo});
    }
  };

  return (
    <div className="todo-container">
      <input
        type="text"
        placeholder="Add Todo"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => addTodoHandler(e)}
      />
      <ul className="list">
        {todo.map((item) => (
          <li className="list-item" key={item.id}>
            {!item.edit ? (
              <>
                <input
                  className="input"
                  type="checkbox"
                  checked={item.strike}
                  onChange={() => strikeThroughHandler(item.id)}
                />
                <span
                  style={{
                    textDecoration: item.strike ? "line-through" : "none",
                  }}
                >
                  {item.data}
                </span>
                <AiFillEdit
                  className="edit"
                  onClick={() => editHandler(item.id)}
                />
                <AiFillDelete
                  className="delete"
                  onClick={() => deleteHandler(item.id)}
                />
              </>
            ) : (
              <input
                type="text"
                placeholder="edit data"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                onKeyDown={(e) => editTodoHandler(e, item.id)}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
