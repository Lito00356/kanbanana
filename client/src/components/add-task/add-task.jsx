import { useState } from "react";

export function AddTaskButton({ status, onAddTask }) {
  const [showForm, setShowForm] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [hideAddToList, setHideAddToList] = useState(false);
  const [title, setTitle] = useState("");

  function addTaskToList(event) {
    event.preventDefault();
    if (title.trim()) {
      onAddTask(title, status); // Pass title and status up
      setTitle("");
      setShowForm(false);
      setHideAddToList(true);
      setAddTask(false);
    }
  }

  function openForm() {
    setShowForm(true);
    setAddTask(true);
    setHideAddToList(false);
  }

  function closeForm(event) {
    event.preventDefault();
    setShowForm(false);
    setAddTask(false);
  }

  return (
    <>
      {showForm ? (
        <article className="task__item task__item--creation">
          <form className="form" type="POST">
            <label className={`form__label ${addTask ? "" : "form__label--none"}`}>
              <input className="form__input" type="text" placeholder="Title" vlaue={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <div
              className="form__commit"
              style={{
                display: hideAddToList ? "none" : "flex",
              }}
            >
              <button type="submit" className="button" onClick={addTaskToList}>
                Add to list
              </button>
              <button className="button form__close" onClick={closeForm}>
                X
              </button>
            </div>
          </form>
        </article>
      ) : null}
      <button className="button" onClick={openForm} style={{ display: addTask ? "none" : "inline-block" }}>
        + Add Task
      </button>
    </>
  );
}
