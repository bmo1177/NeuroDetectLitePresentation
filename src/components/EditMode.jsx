import { useState, useCallback } from 'react';

export default function EditMode({ slides }) {
  const [editMode, setEditMode] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hovered, setHovered] = useState(false);

  const enableEditing = useCallback(() => {
    document.querySelectorAll(
      '.slide h1, .slide h2, .slide h3, .slide h4, .slide p, .slide .metric-val, .slide .metric-lbl, .slide .c h3, .slide .c p, .slide .fut h4, .slide .fut p, .slide .lim h4, .slide .lim .iss, .slide .lim .fix, .slide .tbadge, .slide .meta'
    ).forEach((el) => {
      el.setAttribute('contenteditable', 'true');
      el.setAttribute('spellcheck', 'false');
    });
  }, []);

  const disableEditing = useCallback(() => {
    document.querySelectorAll('[contenteditable="true"]').forEach((el) => {
      el.removeAttribute('contenteditable');
    });
  }, []);

  const saveToStorage = useCallback(() => {
    const data = {};
    slides.forEach((slide, i) => {
      data[i] = slide.innerHTML;
    });
    try {
      localStorage.setItem('neurodetect-slides', JSON.stringify(data));
      setShowHint(true);
      setTimeout(() => setShowHint(false), 2000);
    } catch (e) { /* quota exceeded */ }
  }, [slides]);

  const toggle = useCallback(() => {
    setEditMode((prev) => {
      const next = !prev;
      if (next) {
        document.body.classList.add('edit-mode');
        enableEditing();
      } else {
        document.body.classList.remove('edit-mode');
        disableEditing();
        saveToStorage();
      }
      return next;
    });
  }, [enableEditing, disableEditing, saveToStorage]);

  return (
    <>
      <div
        className="edit-hotzone"
        onMouseEnter={() => { setHovered(true); }}
        onMouseLeave={() => { if (!editMode) setHovered(false); }}
        onClick={toggle}
      />
      <button
        className={`edit-toggle${hovered || editMode ? ' show' : ''}${editMode ? ' active' : ''}`}
        title="Edit mode (E)"
        onClick={toggle}
      >
        &#9998;&#65039;
      </button>
      <div className={`edit-save-hint${showHint ? ' show' : ''}`}>Saved to localStorage</div>
    </>
  );
}
