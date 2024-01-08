const FormSelect = ({ name, labelText, list, defaultValue = "" }) => {
  return (
    <div className="form__select">
      <label className="form__filed-title" htmlFor={name}>
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        className="heading-3"
      >
        {list.map((item) => {
          if (Object.entries(item)[0][0] === "fe")
            return (
              <option value={item.be} key={item.fe}>
                {item.fe}
              </option>
            );

          return (
            <option value={item} key={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelect;
