import "bootstrap/dist/css/bootstrap.min.css";
const Loader = () => {
  return (
    <div className="spinner-border text-light" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};
export default Loader;
