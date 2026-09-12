/**
 * Converts dropdown config from dropdown-fields.config.js to flat label arrays
 * for use in simple select dropdowns
 */

/**
 * Extracts all option labels from a grouped config structure
 * @param {Object} config - The dropdown config object (e.g., assignmentType, subject)
 * @returns {string[]} - Array of option labels
 */
export function extractLabelsFromConfig(config) {
  if (!config) return [];

  // Handle grouped structure (assignmentType, subject)
  if (config.groups) {
    return config.groups.flatMap((group) =>
      group.options.map((opt) => opt.label)
    );
  }

  // Handle flat structure (academicLevel, deadline)
  if (config.options) {
    return config.options.map((opt) => opt.label);
  }

  return [];
}

/**
 * Finds the default/selected option label from config
 * @param {Object} config - The dropdown config object
 * @returns {string|null} - The selected option label or null
 */
export function getDefaultLabel(config) {
  if (!config) return null;

  // Handle grouped structure
  if (config.groups) {
    for (const group of config.groups) {
      const selected = group.options.find((opt) => opt.selected);
      if (selected) return selected.label;
    }
  }

  // Handle flat structure
  if (config.options) {
    const selected = config.options.find((opt) => opt.selected);
    if (selected) return selected.label;
  }

  return null;
}

/**
 * Creates optgroup elements for grouped configs
 * Useful for rendering <optgroup> in select elements
 * @param {Object} config - The dropdown config object with groups
 * @returns {Array} - Array of {group: string, options: Array} objects
 */
export function getGroupedOptions(config) {
  if (!config || !config.groups) return [];
  
  return config.groups.map((group) => ({
    group: group.group,
    options: group.options.map((opt) => opt.label),
  }));
}
