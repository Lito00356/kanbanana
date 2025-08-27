export function BacklogList({ tasks }) {
  return (
    <ul className="backlog-list">
      {tasks.map((task) => {
        if (task.progress_status.progStatus === "backlog") {
          return (
            <li key={task.id} className="backlog-list-item">
              {task.title}
            </li>
          );
        }
      })}
    </ul>
  );
}
