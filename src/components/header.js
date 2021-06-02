import { useSelector } from "react-redux";

export const Header = (props) => {
  const image = useSelector((state) => state.fetchRed.image);
  return (
    <div>
      <div style={{ textAlign: "left", padding: ".8rem 0 0 .8rem" }}>
        <img src={image} alt="logo" style={{ width: "60px" }} />
      </div>
      {props.children}
    </div>
  );
};
