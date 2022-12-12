import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function DifficultySelect() {
    const navigate = useNavigate();

    return (
        <div className="mainContainer">
            <div className="homeContainer">
                <div className="content">
                    <h1>Select Difficulty</h1>
                    <button className="buttons" onClick={()=>{navigate('/game', {state:{difficulty:'Easy', cont:false}})}}>
                        Easy
                    </button>
                    <button className="buttons" onClick={()=>{navigate('/game', {state:{difficulty:'Medium', cont:false}})}}>
                        Medium
                    </button>
                    <button className="buttons" onClick={()=>{navigate('/game', {state:{difficulty:'Hard', cont:false}})}}>
                        Hard
                    </button>
                    <button className="buttons" onClick={()=>{navigate('/game', {state:{difficulty:'Expert', cont:false}})}}>
                        Expert
                    </button>
                    <button className="buttons" onClick={()=> navigate(-1)}>Go Back</button>
                </div>
            </div>
        </div>
    );
}