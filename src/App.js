import { useState, useEffect } from "react";
function useTodoUpdate() {
  const [Todo, setTodo] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/todo", { method: "GET" }).then((response) => {
      response.json().then((data) => {
        console.log(data);
        setTodo(data);
      });
    });
    setInterval(() => {
      fetch("http://localhost:3001/todo", { method: "GET" }).then(
        (response) => {
          response.json().then((data) => {
            console.log(data);
            setTodo(data);
          });
        }
      );
    }, 1000);
  }, []);
  return Todo;
}
function App() {
  let Todo = useTodoUpdate();
  return (
    <div>
      {Todo.map((val) => {
        return (
          <div>
            {val.todoId} {val.todoName} {val.todoDescription}
            <button>Delete</button>
            <br />
          </div>
        );
      })}
    </div>
  );
}
export default App;
