export default function Shortcuts({ show, close }) {
  return (
    <div
      className={`shortcuts-overlay${show ? ' show' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div className="shortcuts-box">
        <h3>Keyboard Shortcuts</h3>
        <div className="shortcut-row">
          <span className="shortcut-desc">Next slide</span>
          <span className="shortcut-key">
            <span className="kbd">&rarr;</span>
            <span className="kbd">Space</span>
            <span className="kbd">Enter</span>
          </span>
        </div>
        <div className="shortcut-row">
          <span className="shortcut-desc">Previous slide</span>
          <span className="shortcut-key">
            <span className="kbd">&larr;</span>
            <span className="kbd">Backspace</span>
          </span>
        </div>
        <div className="shortcut-row">
          <span className="shortcut-desc">First / Last</span>
          <span className="shortcut-key">
            <span className="kbd">Home</span>
            <span className="kbd">End</span>
          </span>
        </div>
        <div className="shortcut-row">
          <span className="shortcut-desc">Slide overview</span>
          <span className="shortcut-key"><span className="kbd">G</span></span>
        </div>
        <div className="shortcut-row">
          <span className="shortcut-desc">Toggle edit mode</span>
          <span className="shortcut-key"><span className="kbd">E</span></span>
        </div>
        <div className="shortcut-row">
          <span className="shortcut-desc">This help</span>
          <span className="shortcut-key"><span className="kbd">?</span></span>
        </div>
        <div className="shortcut-row">
          <span className="shortcut-desc">Close overlay</span>
          <span className="shortcut-key"><span className="kbd">Esc</span></span>
        </div>
        <div className="shortcut-row">
          <span className="shortcut-desc">Media gallery</span>
          <span className="shortcut-key"><span className="kbd">M</span></span>
        </div>
      </div>
    </div>
  );
}
