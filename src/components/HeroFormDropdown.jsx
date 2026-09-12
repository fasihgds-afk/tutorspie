/**
 * HeroFormDropdown - Renders dropdowns from dropdown-fields.config.js
 */
export default function HeroFormDropdown({ config, value, onChange, id }) {
  if (config.groups) {
    // Grouped dropdown (like assignmentType, subject)
    return (
      <select id={id} value={value} onChange={onChange} className="form-control">
        {config.groups.map((group) => (
          <optgroup key={group.group} label={group.group}>
            {group.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    );
  } else {
    // Flat dropdown (like academicLevel)
    return (
      <select id={id} value={value} onChange={onChange} className="form-control">
        {config.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
}
