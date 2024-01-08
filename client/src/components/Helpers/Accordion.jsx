import { useState } from "react";
function Icon({ open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={
        open ? "accordion__icon accordion__icon--open" : "accordion__icon"
      }
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const Accordion = ({ section, key }) => {
  const [isOpen, setOpenState] = useState(false);

  return (
    <div key={key} className="accordion">
      <div
        className="accordion__title"
        onClick={() => setOpenState((state) => !state)}
      >
        <h4 className="heading-4">{section.date}</h4>
        <h2 className="heading-2">{section.title}</h2>
        <button className="heading-2">
          <Icon open={isOpen} />
        </button>
      </div>
      {isOpen && (
        <div className="accordion__content paragraph">
          <div>{section.content}</div>
        </div>
      )}
    </div>
  );
};

export default Accordion;
