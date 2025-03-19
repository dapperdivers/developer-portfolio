# Accessibility Guidelines

This document outlines the accessibility guidelines and standards for the Developer Portfolio project. Following these guidelines ensures that the portfolio is usable by as many people as possible, including those with disabilities.

## Accessibility Standards

The project aims to meet the following accessibility standards:

- **WCAG 2.1 Level AA**: Web Content Accessibility Guidelines 2.1 at Level AA compliance
- **Section 508**: U.S. federal regulations requiring accessibility for people with disabilities
- **ADA**: Americans with Disabilities Act requirements for digital accessibility

## Core Principles

### 1. Perceivable

Information and user interface components must be presentable to users in ways they can perceive.

#### Text Alternatives

- Provide text alternatives for non-text content
- Use `alt` attributes for images
- Provide transcripts for audio content
- Describe complex visualizations

```jsx
// Good example
<img src="logo.png" alt="Developer Portfolio Logo" />

// For decorative images
<img src="decoration.png" alt="" role="presentation" />
```

#### Time-Based Media

- Provide captions for videos
- Provide audio descriptions for videos
- Provide transcripts for audio content

#### Adaptable Content

- Create content that can be presented in different ways
- Use semantic HTML elements
- Maintain a logical reading order
- Don't rely solely on sensory characteristics

```jsx
// Good: Using semantic HTML
<article>
  <h2>Project Title</h2>
  <p>Project description...</p>
  <footer>
    <time datetime="2025-03-19">March 19, 2025</time>
  </footer>
</article>

// Bad: Using non-semantic elements
<div>
  <div>Project Title</div>
  <div>Project description...</div>
  <div>March 19, 2025</div>
</div>
```

#### Distinguishable Content

- Make it easy for users to see and hear content
- Use sufficient color contrast
- Don't use color alone to convey information
- Make text resizable up to 200% without loss of content
- Control audio automatically playing

```css
/* Ensure sufficient color contrast */
.button {
  /* WCAG AA requires 4.5:1 contrast ratio for normal text */
  color: var(--color-white); /* #ffffff */
  background-color: var(--color-primary); /* #007bff */
}

/* Don't rely on color alone */
.status {
  color: var(--color-success);
}

.status::before {
  content: "✓ "; /* Add a checkmark symbol */
}
```

### 2. Operable

User interface components and navigation must be operable.

#### Keyboard Accessibility

- Make all functionality available from a keyboard
- Avoid keyboard traps
- Provide visible focus indicators
- Use logical tab order

```jsx
// Good: Custom button with keyboard support
const CustomButton = ({ onClick, children }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };
  
  return (
    <div 
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className="custom-button"
    >
      {children}
    </div>
  );
};
```

#### Enough Time

- Provide users enough time to read and use content
- Allow users to pause, stop, or hide moving content
- Avoid content that flashes more than three times per second

#### Navigable

- Help users navigate and find content
- Use descriptive page titles
- Use descriptive headings and labels
- Make focus order logical
- Provide multiple ways to find pages
- Use descriptive link text

```jsx
// Good: Descriptive link text
<a href="/projects">View all projects</a>

// Bad: Non-descriptive link text
<a href="/projects">Click here</a>
```

#### Input Modalities

- Make functionality available through various input devices
- Ensure touch targets are large enough (at least 44x44 pixels)
- Provide alternatives to complex gestures

### 3. Understandable

Information and operation of the user interface must be understandable.

#### Readable

- Make text content readable and understandable
- Use clear and simple language
- Explain abbreviations and technical terms
- Identify the language of the page and any language changes

```jsx
// Specify the language of the page
<html lang="en">
  {/* Page content */}
</html>

// Specify when language changes
<p>
  The French word for hello is <span lang="fr">bonjour</span>.
</p>
```

#### Predictable

- Make pages appear and operate in predictable ways
- Be consistent with navigation and component behavior
- Don't change context automatically
- Provide consistent identification for components with the same functionality

#### Input Assistance

- Help users avoid and correct mistakes
- Provide clear labels and instructions
- Provide error messages that identify the error and suggest corrections
- Provide validation before submitting forms

```jsx
// Good: Form with clear labels and error handling
const ContactForm = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  
  const validateEmail = () => {
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };
  
  return (
    <form>
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={validateEmail}
          aria-describedby={emailError ? 'email-error' : undefined}
          aria-invalid={!!emailError}
        />
        {emailError && (
          <div id="email-error" className="error">
            {emailError}
          </div>
        )}
      </div>
      {/* Other form fields */}
    </form>
  );
};
```

### 4. Robust

Content must be robust enough to be interpreted by a wide variety of user agents, including assistive technologies.

#### Compatible

- Maximize compatibility with current and future user agents
- Use valid HTML
- Provide name, role, and value for custom components
- Use ARIA attributes appropriately

```jsx
// Good: Custom dropdown with ARIA attributes
const Dropdown = ({ label, options, selectedOption, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownId = useId();
  
  return (
    <div className="dropdown">
      <button
        id={`${dropdownId}-button`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${dropdownId}-listbox`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption || label}
      </button>
      {isOpen && (
        <ul
          id={`${dropdownId}-listbox`}
          role="listbox"
          aria-labelledby={`${dropdownId}-button`}
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === selectedOption}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
```

## Implementation Guidelines

### Semantic HTML

Use semantic HTML elements to provide meaning and structure to content:

- `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>` for page structure
- `<h1>` through `<h6>` for headings in a logical hierarchy
- `<ul>`, `<ol>`, `<li>` for lists
- `<button>` for interactive elements that trigger actions
- `<a>` for navigation links
- `<form>`, `<label>`, `<input>`, `<select>`, `<textarea>` for form elements
- `<table>`, `<caption>`, `<thead>`, `<tbody>`, `<th>`, `<tr>`, `<td>` for tabular data

### Keyboard Navigation

Ensure all interactive elements are keyboard accessible:

- Use native HTML elements when possible
- Add `tabIndex="0"` to custom interactive elements
- Implement keyboard event handlers for custom controls
- Maintain a logical tab order
- Provide visible focus indicators
- Implement keyboard shortcuts for common actions

### ARIA Attributes

Use ARIA (Accessible Rich Internet Applications) attributes to enhance accessibility:

- Use `aria-label` to provide a label for elements without visible text
- Use `aria-labelledby` to associate an element with its label
- Use `aria-describedby` to associate an element with its description
- Use `aria-expanded` for expandable elements
- Use `aria-hidden="true"` to hide decorative elements from screen readers
- Use `aria-live` regions for dynamic content updates

```jsx
// Example of ARIA attributes
<button
  aria-label="Close dialog"
  aria-describedby="close-description"
>
  <span aria-hidden="true">×</span>
</button>
<div id="close-description" hidden>
  Closes the current dialog and returns to the main page
</div>
```

### Focus Management

Manage focus for a better user experience:

- Set initial focus when opening dialogs or modals
- Trap focus within modals and dialogs
- Return focus to the triggering element when closing dialogs
- Provide skip links for keyboard users

```jsx
// Example of focus management in a modal
const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      modalRef.current?.focus();
      
      // Trap focus within the modal
      const handleTabKey = (e) => {
        if (e.key === 'Tab') {
          // Implementation of focus trapping
        }
      };
      
      document.addEventListener('keydown', handleTabKey);
      return () => {
        document.removeEventListener('keydown', handleTabKey);
      };
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      className="modal"
    >
      <button
        onClick={onClose}
        aria-label="Close modal"
        className="modal-close"
      >
        ×
      </button>
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};
```

### Color and Contrast

Ensure sufficient color contrast and don't rely on color alone:

- Maintain a contrast ratio of at least 4.5:1 for normal text (WCAG AA)
- Maintain a contrast ratio of at least 3:1 for large text (WCAG AA)
- Use additional indicators besides color (icons, patterns, text)
- Provide a high contrast mode or theme

### Images and Media

Make images and media accessible:

- Add descriptive `alt` text for informative images
- Use empty `alt` attributes for decorative images
- Provide captions and transcripts for audio and video content
- Ensure videos have captions and audio descriptions
- Make sure content is understandable without sound

### Forms

Create accessible forms:

- Associate labels with form controls using the `for` attribute
- Group related form controls with `fieldset` and `legend`
- Provide clear instructions and error messages
- Validate input and provide feedback
- Support keyboard navigation within forms

```jsx
// Example of an accessible form
<form>
  <fieldset>
    <legend>Contact Information</legend>
    
    <div className="form-group">
      <label htmlFor="name">Name</label>
      <input id="name" type="text" required />
    </div>
    
    <div className="form-group">
      <label htmlFor="email">Email</label>
      <input id="email" type="email" required />
      <div className="form-hint">
        We'll never share your email with anyone else.
      </div>
    </div>
  </fieldset>
  
  <button type="submit">Submit</button>
</form>
```

### Testing for Accessibility

Regularly test for accessibility:

- Use automated testing tools (axe, Lighthouse, WAVE)
- Perform keyboard-only testing
- Test with screen readers (NVDA, JAWS, VoiceOver)
- Conduct user testing with people with disabilities
- Perform regular accessibility audits

## Component-Specific Guidelines

### Buttons

- Use the `<button>` element for clickable actions
- Provide descriptive text that indicates the action
- Ensure sufficient size for touch targets (at least 44x44 pixels)
- Make button state visually apparent (focus, hover, active)

### Links

- Use descriptive link text that makes sense out of context
- Indicate when links open in a new window or download files
- Style links to be visually distinguishable from surrounding text
- Maintain consistent link styling throughout the application

### Navigation

- Use the `<nav>` element for navigation menus
- Provide a skip link to bypass navigation
- Make the current page or section apparent
- Implement responsive navigation that works on all devices

### Modals and Dialogs

- Trap focus within the modal when open
- Set initial focus to an appropriate element
- Allow closing with the Escape key
- Return focus to the triggering element when closed
- Use `aria-modal="true"` and `role="dialog"`

### Tables

- Use proper table markup with `<caption>`, `<thead>`, `<tbody>`, `<th>`, etc.
- Associate data cells with headers using `scope` or `headers` attributes
- Provide a caption or summary for complex tables
- Avoid using tables for layout purposes

### Form Controls

- Associate labels with form controls
- Group related controls with `fieldset` and `legend`
- Provide clear error messages
- Use appropriate input types (`email`, `tel`, `date`, etc.)
- Support keyboard navigation and operation

### Custom Components

- Implement appropriate ARIA roles and attributes
- Ensure keyboard accessibility
- Manage focus appropriately
- Test with assistive technologies
- Document accessibility features and usage

## Resources

- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/)
- [MDN Web Docs: Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [Inclusive Components](https://inclusive-components.design/)