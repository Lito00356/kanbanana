export function BacklogList({ tasks }) {
  return (
    <ul className="backlog-list">
      {tasks.map((task) => {
        return (
          <li key={task.id} className="backlog-list-item">
            {task.title}
          </li>
        );
      })}
    </ul>
  );
}
