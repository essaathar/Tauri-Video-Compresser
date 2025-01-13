import { IoArrowBackCircle } from "react-icons/io5";

export default function BackButton({ onClick }) {
  return (
    <button className="back-button" onClick={onClick}>
      <IoArrowBackCircle className="back-icon" />
      <span className="back-text">Back</span>
    </button>
  );
}
