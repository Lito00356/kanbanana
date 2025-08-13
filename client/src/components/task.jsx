import { useState } from "react";

export function DisplayTask({ task = [], tags = [] }) {
  const [showDialog, setShowDialog] = useState(false);

  function openDialog() {
    setShowDialog(true);
  }

  function closeDialog() {
    setShowDialog(false);
  }

  function editTask() {
    alert("You are trying to edit the task");
  }

  function deleteTask() {
    alert("You are trying to delete the task");
  }

  return (
    <>
      <li className="task__item" key={task.id} onClick={openDialog}>
        <span>{task.title}</span>
        <ul className="modal__tags">
          {tags.map((tag) => {
            return (
              <li className="modal__tags-item" key={tag.id}>
                {tag.tagName}
              </li>
            );
          })}
        </ul>
      </li>

      {showDialog ? (
        <dialog className="modal" open>
          <div className="modal__section-1">
            <h2>{task.title}</h2>
            <div className="modal__list-order">
              <ul className="modal__tags">
                {tags.map((tag) => {
                  return (
                    <li className="modal__tags-item" key={tag.id}>
                      {tag.tagName}
                    </li>
                  );
                })}
              </ul>
              <button className="button button--add-tag">+ Tag</button>
            </div>
            <strong>Description</strong>
            <p className="modal__description">{task.description}</p>
          </div>
          <div className="modal__section-2">
            <button className="button modal__close" onClick={closeDialog}>
              X
            </button>
            <button className="button" onClick={editTask}>
              edit task
            </button>
            <button className="button" onClick={deleteTask}>
              delete task
            </button>
          </div>
        </dialog>
      ) : (
        ""
      )}
    </>
  );
}
