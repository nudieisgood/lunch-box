const FormTextarea = ({
  name,
  des,
  rows = 5,
  labelText,
  defaultValue,
  required = true,
}) => {
  return (
    <div>
      <label htmlFor={name} className="form__filed-title">
        {labelText || name}
      </label>
      <p className="heading-4">{des}</p>
      <textarea
        className="heading-3"
        required={required}
        defaultValue={defaultValue}
        name={name}
        id={name}
        rows={rows}
      ></textarea>
    </div>
  );
};
export default FormTextarea;
