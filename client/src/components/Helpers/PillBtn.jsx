const PillBtn = ({ activeItem, available }) => {
  return (
    <label className="btn-pill ">
      <button
        type="button"
        onClick={activeItem}
        className={`btn-pill__shape ${
          available ? "btn-pill__available" : "btn-pill__unavailable"
        }  `}
      ></button>
    </label>
  );
};
export default PillBtn;
