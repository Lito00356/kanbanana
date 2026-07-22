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
      <button className="button tag-manager__toggle" onClick={openDialog} title="Manage Tags">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="tag-manager__icon">
          <path d="M7.5 8.5H7.51M3 12.5L9.39 18.89C9.83 19.33 10.05 19.55 10.3 19.63C10.52 19.7 10.76 19.7 10.98 19.63C11.23 19.55 11.45 19.33 11.89 18.89L20 10.78C20.45 10.33 20.67 10.11 20.79 9.85C20.9 9.62 20.95 9.37 20.95 9.11V5.2C20.95 4.08 20.95 3.52 20.73 3.09C20.54 2.72 20.23 2.41 19.86 2.22C19.43 2 18.87 2 17.75 2H13.84C13.58 2 13.33 2.05 13.1 2.16C12.84 2.28 12.62 2.5 12.17 2.95L3 12.5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
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
