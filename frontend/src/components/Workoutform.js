import { useState } from "react"
import { useWorkoutContext } from "../hooks/useWorkoutContext.js";


const Workoutform = () => {
    const { dispatch } = useWorkoutContext();
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyField, setEmptyField] = useState([])
    
    const Handlesubmit = async (e) => {
        e.preventDefault();

        const workout = {title, load, reps};
        const response = await fetch('/api/workouts', {
            method : "POST",
            body : JSON.stringify(workout),
            headers : {
                "Content-type" : "application/json"
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error);
            setEmptyField(json.emptyField);
        }

        if (response.ok) {
            setTitle("")
            setLoad("")
            setReps("")
            setError(null)
            setEmptyField([])
            console.log("New workout added", json)
            dispatch({type : "CREATE_WORKOUT", payload : json})
        }
    }

    return (
      <form className="create" onSubmit={Handlesubmit}>
        <h3>Add a new Workout</h3>

        <label>Exercise Title : </label>
        <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} 
        className={emptyField.includes('title') ? 'error' : ""} />

        <label>Load (kg) : </label>
        <input type="number" onChange={(e) => setLoad(e.target.value)} value={load} 
        className={emptyField.includes('load') ? 'error' : ""} />

        <label>Reps : </label>
        <input type="number" onChange={(e) => setReps(e.target.value)} value={reps} 
        className={emptyField.includes('reps') ? 'error' : ""} />

        <button>Add Workout</button>
        {error && <div className="error">{error}</div>}
      </form>
    )
}

export default Workoutform;