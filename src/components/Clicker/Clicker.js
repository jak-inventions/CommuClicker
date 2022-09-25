import "./Clicker.css";

const Clicker = (props) => {
    const {
        onClick
    } = props;

    return (
        <div id="clicker" onClick={onClick}></div>
    );
};

export default Clicker
