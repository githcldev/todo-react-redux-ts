import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTodo } from "../../reducers/todo/todoSlice";
import type { RootState } from "../../common/store";
import { AppDispatch } from "../../common/store"

export const AddPostForm = () => {
    const [title, setTitle] = useState("");
    // const [completed, setCompleted] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    // const [addRequestStatus, setAddRequestStatus] = useState("idle");

    const onTitleChanged = (e: React.FormEvent<HTMLInputElement>) =>
        setTitle((e.target as HTMLInputElement).value);

    const onToggleTodoStatus = async () => {
        console.log('onToggleTodoStatus')
    }

    const onSaveTodoClicked = async () => {
        console.log('onSaveTodoClicked')
        await dispatch(
            addNewTodo({ title, completed: false })
        ).unwrap();
        setTitle("");
        // setCompleted("");
    };

    return (
        <section className="add-new-post">
            <h2>Add/Edit Todo</h2>
            <form className="post-excerpt form-container">
                <label htmlFor="todoTitle">Post Title:</label>
                <input
                    type="text"
                    id="todoTitle"
                    name="todoTitle"
                    value={title}
                    onChange={onTitleChanged}
                    className="form-input"
                />
                {/* <input
                    type="checkbox"
                    onClick={onToggleTodoStatus}
                    className="input"
                    value={completed}
                >
                    Toggle Completed
                </input> */}
                <button
                    type="button"
                    onClick={onSaveTodoClicked}
                    className="button"
                >
                    Save Post
                </button>
            </form>
        </section>
    );
};
