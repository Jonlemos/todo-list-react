import React, { useState } from "react";
import Note from "../notes/Note";

const initialValue = {
    id: null,
    message: "",
    done: false,
};

/**
 * <Form> component
 */
export default () => {
    // States
    const [todoList, setTodoList] = useState([]);
    const [currentItem, setCurrentItem] = useState(initialValue);
    const [hidden, setHiddem] = useState(true);

    // Handles the add note button
    const handleSubmit = (e) => {
        e.preventDefault();

        const { id, message } = currentItem;

        if (!message.length) return;

        setCurrentItem(initialValue);

        if (id) {
            setTodoList(
                todoList.map((todo) =>
                    todo.id === id ? { ...todo, message } : todo
                )
            );
            return;
        }

        const todo = {
            id: Date.now(),
            message,
            done: false,
        };

        setTodoList([...todoList, todo]);
    };

    const handlerAllTodos = (e) => {
        console.log(hidden);
        setHiddem(!hidden);
    };

    // Deletes the note
    const deleteTodo = (id) => {
        setTodoList(todoList.filter((note) => note.id != id));
    };

    // Edit the note
    const editTodo = (id) => {
        const item = todoList.find((todoList) => todoList.id === id);
        setCurrentItem(item);
    };

    // Sets the note state to done
    const finishTodo = (id) => {
        setTodoList(
            todoList.map((todo) =>
                todo.id === id ? { ...todo, done: true } : todo
            )
        );
    };

    return (
        <div className="container">
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <input
                        onChange={({ target: { value } }) =>
                            setCurrentItem({ ...currentItem, message: value })
                        }
                        value={currentItem.message || ""}
                        placeholder="insira sua nota aqui"
                    />
                    <button type="submit">
                        {currentItem.id ? "Modificar nota" : "Adicionar nota"}
                    </button>
                </form>
                <button onClick={handlerAllTodos}>
                    {hidden
                        ? "Ver todas as Tarefas"
                        : "Ver tarefas Separadamente"}
                </button>
            </div>
            {hidden ? (
                <>
                    <div className="todo">
                        <div>Tarefas a Fazer</div>
                        <div className="todoinfo">
                            {todoList.map(
                                ({ id, message, done }) =>
                                    !done && (
                                        <Note
                                            id={id}
                                            key={id}
                                            message={message}
                                            done={done}
                                            deleteTodo={deleteTodo}
                                            editTodo={editTodo}
                                            finishTodo={finishTodo}
                                        />
                                    )
                            )}
                        </div>
                    </div>

                    <div className="done">
                        <div>Tarefas Concluídas</div>
                        <div className="todoinfo">
                            {todoList.map(
                                ({ id, message, done }) =>
                                    done && (
                                        <Note
                                            id={id}
                                            key={id}
                                            message={message}
                                            done={done}
                                            deleteTodo={deleteTodo}
                                            editTodo={editTodo}
                                        />
                                    )
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div>Todos as Tarefas</div>
                    <div className="alltodos">
                        {todoList.map(({ id, message, done }) => (
                            <Note
                                id={id}
                                key={id}
                                message={message}
                                done={done}
                                deleteTodo={deleteTodo}
                                editTodo={editTodo}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
