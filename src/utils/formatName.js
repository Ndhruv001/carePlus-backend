function capitalizeFirstLetter(name) {
  if (!name) return ""; // Handle empty input

  return name
    .split(" ")
    .map(
      (segment) =>
        segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase()
    )
    .join(" ");
}

export { capitalizeFirstLetter };
