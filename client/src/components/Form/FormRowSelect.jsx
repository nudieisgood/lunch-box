const FormRowSelect = ({
  name,
  labelText,
  list,
  defaultValue = "",
  onChange,
}) => {
  return (
    <div className="">
      <label className="" htmlFor={name}>
        {labelText}
      </label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        className=""
        onChange={onChange}
      >
        {list.map((item) => {
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
export default FormRowSelect;
