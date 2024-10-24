import { useWorkoutContext } from "../hooks/useWorkoutContext"

const Workoutdetails = ({workout}) => {
    const {dispatch} = useWorkoutContext()

    const handleClick = async () => {
        const response = await fetch("https://mern-stack-workout-managing-backend.vercel.app/api/workouts/" + workout._id, {
            method : "DELETE"
        })
        const json = await response.json()
        if (response.ok) {
            dispatch({type: "DELETE_WORKOUT", payload : json})
        }
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg) : </strong> <strong>{workout.load}</strong></p>
            <p><strong>Reps : </strong> <strong>{workout.reps}</strong></p>
            <p><strong> {workout.createdat} </strong></p>
            <span onClick={handleClick}>Delete</span>
        </div>
    )
}

export default Workoutdetails;
