function snakeCaseToCamelCase (string) {
  return string.replace(/(\_[a-z])/g, function ($1) {
    return $1.toUpperCase().replace('_', '');
  });
}

export default snakeCaseToCamelCase;
