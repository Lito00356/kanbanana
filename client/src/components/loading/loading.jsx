export function Loading({ label = "Loading", message, fullscreen = false, className = "" }) {
  const classes = ["loading-state", fullscreen ? "loading-state--fullscreen" : "loading-state--inline", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} role="status" aria-live="polite" aria-busy="true">
      <div className="loading-state__spinner" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="loading-state__copy">
        <strong>{label}</strong>
        {message ? <p>{message}</p> : null}
      </div>
    </div>
  );
}
