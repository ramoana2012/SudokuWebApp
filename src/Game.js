import { onValue, update, ref } from "firebase/database";
import {useContext, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSudoku } from "sudoku-gen";
import { AuthContext } from "./AuthProvider";
import { db } from "./base";

var progress;

// Columns for the grid
function OneCell(props) {
    const cell = props.cell;
    const data = props.data;
    const count = props.count
    if (cell === '-')
        return (
            <td>
            <input
                 type='number'
                 max='9'
                 min='1'
                 defaultValue={data}
                 onChange={(event)=> {
                    let val = event.target.value;
                    if (val === '')
                        progress[count] = '-';
                    else
                        progress[count] = val;
                }}
            />
            </td>
        );
    else
        return (<td>{cell}</td>);
}

// Rows for the grid
function OneRow(props) {
    const row = props.row;
    return (<tr>{row}</tr>);
}

export default function Game() {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const location = useLocation();
    const difficulty = location.state.difficulty;
    const cont = location.state.cont;
    const updates = {};

    const setup = ()=> {
        const obj = {};
        onValue(ref(db, `users/${currentUser.uid}`), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                obj.puzzle = data.currentPuzzle;
                obj.solution = data.puzzleSolution;
                obj.progress = data.puzzleProgress;
                obj.arr = obj.puzzle.split('');
            }
        });
        if (!cont) {
            const sudoku = getSudoku(difficulty.toLowerCase())
            obj.puzzle = sudoku.puzzle;
            obj.solution = sudoku.solution;
            obj.progress = obj.puzzle.split('');
            obj.arr = obj.puzzle.split('');
            updates['currentPuzzle'] = obj.puzzle;
            updates['puzzleSolution'] = obj.solution;
            updates['puzzleProgress'] = obj.progress.join('');
    
            update(ref(db, `users/${currentUser.uid}`), updates);
        }
        return obj;
    };

    const obj = useMemo(()=> setup(), []);
    progress = obj.progress.split('');
    const solution = obj.solution;
    const arr = obj.arr;

    // Makes 9x9 grid based on puzzle
    const grid = [];
    for (let i=0; i < 9; i++) {
        let data = [];
        for (let j=0; j < 9; j++) {
            let count = (i*9)+j;
            data.push(<OneCell cell={arr[count]} data={progress[count]} count={count}/>)
        }
        grid.push(<OneRow row={data}/>)
    }

    // Save progress to database
    const clickSave = ()=> {
        update(ref(db, `users/${currentUser.uid}`), {puzzleProgress: progress.join('')});
    }

    // Check if solution is correct
    const clickCheck = ()=> {
        if (progress.join('') === solution) {
            alert("Congratulations! You solved it!");
            update(ref(db, `users/${currentUser.uid}`), {currentPuzzle: ""});
            navigate('/');
        }
        else
            alert("Puzzle is not solved.")
    }

    // Go back to homepage (alerts user if progress isn't saved)
    const clickHome = ()=> {
        let prog;
        onValue(ref(db, `users/${currentUser.uid}`), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                prog = data.puzzleProgress;
            }
        });
        if (prog === progress.join('') || window.confirm("Your progress is unsaved. Are you sure you want to go back?"))
            navigate('/');
        }

    return (<div>
                <h1>Sudoku Puzzle</h1>
                <table>
                    <tbody>
                        {grid}
                    </tbody>
                </table>
                <button onClick={clickSave}>Save</button>
                <button onClick={clickCheck}>Check Solution</button>
                <button onClick={clickHome}>Back Home</button>
            </div>
    );
}