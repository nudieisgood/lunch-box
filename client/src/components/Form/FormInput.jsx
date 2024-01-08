const FormInput = ({
  type,
  name,
  labelText,
  placeHolder,
  des,
  classValue,
  defaultValue,
  value,
  onChange,
  noTitle,
  inputError,
  required = true,
  readOnly = false,
  max,
  min,
}) => {
  return (
    <div>
      {!noTitle && (
        <label className="form__filed-title" htmlFor={name}>
          {labelText}
        </label>
      )}

      <p className="heading-4">{des}</p>
      <input
        minLength={min}
        maxLength={max}
        readOnly={readOnly}
        required={required}
        className={inputError ? "heading-3 form__error" : "heading-3"}
        type={type}
        name={name}
        id={name}
        placeholder={placeHolder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormInput;
