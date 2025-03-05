/**
 * Utilities for validating data structures at runtime
 */

/**
 * Validates a value against a schema and returns validation result
 * @template T
 * @param {T} value - Value to validate
 * @param {Object} schema - Validation schema
 * @param {string} [name='value'] - Name of the value for error messages
 * @returns {{ isValid: boolean, value: T, errors: string[] }} Validation result
 */
export const validateAgainstSchema = (value, schema, name = 'value') => {
  const result = {
    isValid: true,
    value,
    errors: []
  };

  // Handle null/undefined values if not allowed
  if (value == null) {
    if (schema.required) {
      result.isValid = false;
      result.errors.push(`${name} is required`);
    }
    return result;
  }

  // Type validation
  if (schema.type) {
    const actualType = Array.isArray(value) ? 'array' : typeof value;
    const expectedType = schema.type;
    
    if (
      (expectedType === 'array' && !Array.isArray(value)) ||
      (expectedType !== 'array' && actualType !== expectedType)
    ) {
      result.isValid = false;
      result.errors.push(`${name} should be a ${expectedType}, received ${actualType}`);
    }
  }

  // Enum validation
  if (schema.enum && result.isValid) {
    if (!schema.enum.includes(value)) {
      result.isValid = false;
      result.errors.push(`${name} must be one of: ${schema.enum.join(', ')}`);
    }
  }

  // Pattern validation
  if (schema.pattern && result.isValid && typeof value === 'string') {
    const regex = new RegExp(schema.pattern);
    if (!regex.test(value)) {
      result.isValid = false;
      result.errors.push(`${name} must match pattern: ${schema.pattern}`);
    }
  }

  // Property validation for objects
  if (schema.properties && result.isValid && typeof value === 'object' && !Array.isArray(value)) {
    Object.entries(schema.properties).forEach(([propName, propSchema]) => {
      const propValue = value[propName];
      const propResult = validateAgainstSchema(propValue, propSchema, `${name}.${propName}`);
      
      if (!propResult.isValid) {
        result.isValid = false;
        result.errors.push(...propResult.errors);
      }
    });
  }

  // Items validation for arrays
  if (schema.items && result.isValid && Array.isArray(value)) {
    value.forEach((item, index) => {
      const itemResult = validateAgainstSchema(item, schema.items, `${name}[${index}]`);
      
      if (!itemResult.isValid) {
        result.isValid = false;
        result.errors.push(...itemResult.errors);
      }
    });
  }

  return result;
};

/**
 * Create a validation schema from PropTypes
 * @param {Object} propTypes - PropTypes definitions
 * @returns {Object} Validation schema
 */
export const createSchemaFromPropTypes = (propTypes) => {
  const schema = {};
  
  Object.entries(propTypes).forEach(([propName, propType]) => {
    // Extract type from PropType
    const typeString = propType.toString();
    
    schema[propName] = {
      required: typeString.includes('isRequired'),
      type: getTypeFromPropType(typeString),
      // Add more schema attributes as needed
    };
  });
  
  return schema;
};

/**
 * Get type string from PropType
 * @param {string} propTypeString - String representation of PropType
 * @returns {string} Type string
 */
function getTypeFromPropType(propTypeString) {
  if (propTypeString.includes('PropTypes.string')) return 'string';
  if (propTypeString.includes('PropTypes.number')) return 'number';
  if (propTypeString.includes('PropTypes.bool')) return 'boolean';
  if (propTypeString.includes('PropTypes.func')) return 'function';
  if (propTypeString.includes('PropTypes.array')) return 'array';
  if (propTypeString.includes('PropTypes.object')) return 'object';
  if (propTypeString.includes('PropTypes.node')) return 'node';
  if (propTypeString.includes('PropTypes.element')) return 'element';
  if (propTypeString.includes('PropTypes.shape')) return 'object';
  if (propTypeString.includes('PropTypes.arrayOf')) return 'array';
  return 'unknown';
}

/**
 * Validate a component's props against PropTypes at runtime
 * @param {Object} props - Component props
 * @param {Object} propTypes - PropTypes definitions
 * @param {string} componentName - Component name for error messages
 * @returns {{ isValid: boolean, errors: string[] }} - Validation result
 */
export const validateProps = (props, propTypes, componentName = 'Component') => {
  const schema = createSchemaFromPropTypes(propTypes);
  const result = validateAgainstSchema(props, {
    type: 'object',
    properties: schema
  }, componentName);
  
  return {
    isValid: result.isValid,
    errors: result.errors
  };
};

/**
 * Logs validation errors in development mode
 * @param {Array<string>} errors - List of validation errors
 * @param {string} componentName - Name of the component
 */
export const logValidationErrors = (errors, componentName) => {
  if (errors.length === 0) return;
  
  if (process.env.NODE_ENV === 'development') {
    console.group(`Validation errors in ${componentName}:`);
    errors.forEach(error => console.warn(`- ${error}`));
    console.groupEnd();
  }
};

export default {
  validateAgainstSchema,
  createSchemaFromPropTypes,
  validateProps,
  logValidationErrors
};