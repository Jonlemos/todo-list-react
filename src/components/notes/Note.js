import React from "react";

export default ({ message, id, done, deleteTodo, editTodo, finishTodo }) => (
    <div className="note">
        <span>{message}</span>
        <div>
            <button onClick={() => deleteTodo(id)}>Excluir</button>
            <button onClick={() => editTodo(id)}>Editar</button>
            {!done && <button onClick={() => finishTodo(id)}>Concluir</button>}
        </div>
    </div>
);
