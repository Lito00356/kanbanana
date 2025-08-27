import { useEffect, useRef, useState } from "react";

export function DisplayTask({ task = [], allTags, tags = [], handleDelete, handleEdit, handleTags, handleDrag, handleStatusChange }) {
  const dialogTask = useRef(null);
  const dialogConfirm = useRef(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [styleDialog, setStyleDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [showTagWindow, setShowTagWindow] = useState(false);
  const [activeTags, setActiveTags] = useState(() => {
    return tags.map((tag) => tag.id);
  });
  const [showSaveTags, setShowSaveTags] = useState(false);

  const allStatus = { toDo: 7, inProgress: 3, readyForReview: 5, done: 1, backlog: 9 };

  const statusArray = Object.entries(allStatus).map(([progStatus, id]) => ({
    id,
    progStatus,
  }));

  function openDialog() {
    setStyleDialog(true);
    if (dialogTask.current) {
      dialogTask.current.showModal();
    }
  }

  function closeDialog() {
    setStyleDialog(false);
    setIsEditing(false);
    setShowTagWindow(false);
    if (dialogTask.current) {
      dialogTask.current.close();
    }
  }

  function closeEdit() {
    setIsEditing(false);
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
    setIsEditing(true);
  }

  async function handleTagWindow() {
    if (!showTagWindow) {
      setShowTagWindow(true);
    } else {
      setShowTagWindow(false);
    }
  }

  function handleActivateTag(tagId) {
    setActiveTags((prev) => {
      if (prev.includes(tagId)) {
        return prev.filter((id) => id !== tagId);
      } else {
        return [...prev, tagId];
      }
    });
  }

  useEffect(() => {
    const originalTags = tags.map((tag) => tag.id).sort();
    const currentTags = [...activeTags].sort();

    const isChanged = JSON.stringify(originalTags) !== JSON.stringify(currentTags);
    setShowSaveTags(isChanged);
  }, [activeTags, tags]);

  function handleDragStart(e) {
    e.stopPropagation();
    e.dataTransfer.setData("application/json", JSON.stringify(task));
    handleDrag(task);
  }

  function handleDragStop() {
    handleDrag(null);
  }

  return (
    <>
      <li className="task__item" key={task.id} onClick={openDialog} draggable onDragStart={handleDragStart} onDragEnd={handleDragStop}>
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
          {isEditing ? <input className="title-editing" value={title} onChange={(e) => setTitle(e.target.value)} /> : <h2 className="title-editing">{task.title}</h2>}
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
            <div>
              <button className="button button--add-tag" onClick={handleTagWindow}>
                + Tag
              </button>
              {showTagWindow ? (
                <div className="tags-window">
                  {allTags.map((tag) => (
                    <button key={tag.id} className={`button button--selection-tag ${activeTags.includes(tag.id) ? "active" : ""}`} onClick={() => handleActivateTag(tag.id)}>
                      {tag.tagName}
                    </button>
                  ))}
                  {showSaveTags ? <button onClick={() => handleTags(task, activeTags)}>Save</button> : ""}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <strong>Description</strong>
          {isEditing ? <textarea className="modal__description editing" value={description ?? ""} onChange={(e) => setDescription(e.target.value)} /> : <p className="modal__description">{task.description}</p>}
          {isEditing ? (
            <div className="flex">
              <button type="button" onClick={() => handleEdit(task, title, description)}>
                Save
              </button>
              <button onClick={closeEdit}>Cancel</button>
            </div>
          ) : (
            ""
          )}
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
          <div className="select-wrapper">
            <label htmlFor="">Change Status</label>
            <select name="status" id="status-select" className="button" onChange={(e) => handleStatusChange(e, task.documentId)}>
              <option value="null">Select status</option>
              {statusArray.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.progStatus}
                </option>
              ))}
            </select>
          </div>
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
