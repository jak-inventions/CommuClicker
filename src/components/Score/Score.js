import "./Score.css";

const Score = (props) => {
    const {
        score
    } = props;

    return (
        <div id="score">
            <h2>World Score</h2>
            <h3>{score === null ? "Loading" : score}</h3>
        </div>
    );
};

export default Score;