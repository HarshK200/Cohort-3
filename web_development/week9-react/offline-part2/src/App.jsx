import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([
    { title: "go to jym", done: false },
    { title: "go boom", done: false },
  ]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTodos((prev) => {
        const popped = prev.pop();
        return [popped, ...prev];
      });
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div>
      <MyComp>
        <h1>Hello world</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </MyComp>

      {todos.length != 0
        ? todos.map((todo, idx) => {
            return <Todo key={idx} title={todo.title} done={todo.done} />;
          })
        : null}
    </div>
  );
}

// children is a special prop that is all the content inside the component
function MyComp({ children }) {
  return <div>{children}</div>;
}

function Todo({ title, done }) {
  return (
    <div>
      {title} - {done ? "done" : "not done"}
    </div>
  );
}

export default App;
