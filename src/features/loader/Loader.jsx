import "./loader.css";

export const Loader = ({ text }) => {
  return (
    <div className="container-loader">
      <div className="loader">{text ? text : "Loading..."}</div>
    </div>
  );
};
