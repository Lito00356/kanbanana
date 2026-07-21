import { useRef, useState } from "react";

export function TagManager({ tags = [], onAddTag, onDeleteTag }) {
  const dialogRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);

  function openDialog() {
    setIsOpen(true);
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    setIsOpen(false);
    setNewTagName("");
    setConfirmDelete(null);
    dialogRef.current?.close();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!newTagName.trim()) return;

    await onAddTag(newTagName);
    setNewTagName("");
  }

  async function handleDelete(tag) {
    await onDeleteTag(tag);
    setConfirmDelete(null);
  }

  return (
    <>
      <button className="button tag-manager__toggle" onClick={openDialog}>
        Manage Tags
      </button>

      <dialog className={`modal tag-manager__modal ${isOpen ? "open" : ""}`} ref={dialogRef}>
        <div className="tag-manager__content">
          <h2>Project Tags</h2>

          <form className="tag-manager__form" onSubmit={handleSubmit}>
            <input
              className="tag-manager__input"
              type="text"
              placeholder="New tag name"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
            />
            <button className="button tag-manager__add-btn" type="submit">
              + Add
            </button>
          </form>

          <ul className="tag-manager__list">
            {tags.length === 0 && <li className="tag-manager__empty">No tags yet</li>}
            {tags.map((tag) => (
              <li className="tag-manager__item" key={tag.id}>
                <span className="modal__tags-item">{tag.tagName}</span>
                {confirmDelete === tag.id ? (
                  <span className="tag-manager__confirm">
                    <button className="button tag-manager__confirm-btn" onClick={() => handleDelete(tag)}>
                      Yes
                    </button>
                    <button className="button tag-manager__confirm-btn" onClick={() => setConfirmDelete(null)}>
                      No
                    </button>
                  </span>
                ) : (
                  <button className="button tag-manager__delete-btn" onClick={() => setConfirmDelete(tag.id)}>
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="tag-manager__sidebar">
          <button className="button modal__close" onClick={closeDialog}>
            X
          </button>
        </div>
      </dialog>
    </>
  );
}
