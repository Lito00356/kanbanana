import { useRef, useState } from "react";

export function DisplayTask({ task = [], tags = [], handleDelete }) {
  const dialogTask = useRef(null);
  const dialogConfirm = useRef(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [styleDialog, setStyleDialog] = useState(false);

  function openDialog() {
    setStyleDialog(true);
    if (dialogTask.current) {
      dialogTask.current.showModal();
    }
  }

  function closeDialog() {
    setStyleDialog(false);
    if (dialogTask.current) {
      dialogTask.current.close();
    }
  }

  function openConfirm() {
    setShowConfirm(true);
    dialogConfirm.current?.showModal();
  }

  function closeConfirm() {
    setShowConfirm(false);
    dialogConfirm.current?.close();
  }

  function editTask() {
    alert("You are trying to edit the task");
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

      <dialog className={`modal ${styleDialog ? "open" : ""}`} ref={dialogTask}>
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
          <button className="button" onClick={openConfirm}>
            delete task
          </button>
        </div>
      </dialog>

      <dialog className={`confirm-modal ${showConfirm ? "open" : ""}`} ref={dialogConfirm}>
        <p>Are you sure you want to delete this task?</p>
        <div className="button-container">
          <button className="button button__confrim" onClick={closeConfirm}>
            No
          </button>
          <button
            className="button button__confrim"
            onClick={() => {
              handleDelete(task);
              closeConfirm();
              closeDialog();
            }}
          >
            Yes
          </button>
        </div>
      </dialog>
    </>
  );
}
