const handleError = (error) => (history) => {
  console.log(JSON.stringify(error, null, 2));
  console.error(error.message);
  if (error.message === "Bad Permission") {
    history.push("/");
  }
};

export default handleError;
