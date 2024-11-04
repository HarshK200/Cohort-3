import { Component, useEffect, useState } from "react";

class ClassComponent extends Component {
  state = { count: 0 };

  // NOTE: you have to use arrow function here since if using an anonymous funciton the this keyword binding changes
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>+</button>
      </div>
    );
  }
}

function App() {
  const [todos, setTodos] = useState([
    { title: "go to jym", done: false },
    { title: "go boom", done: false },
  ]);

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

      <ClassComponent />
    </div>
  );
}

// children is a special prop that is all the content inside the component
function MyComp({ children }) {
  return <div>{children}</div>;
}

function Todo({ title, done }) {
  console.log("hi i rendered");
  return (
    <div>
      {title} - {done ? "done" : "not done"}
    </div>
  );
}

export default App;
