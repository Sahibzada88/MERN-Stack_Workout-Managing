import { useEffect } from "react";

import Workoutdetails from "../components/Workoutdetails";
import Workoutform from "../components/Workoutform";
import { useWorkoutContext } from "../hooks/useWorkoutContext.js";

const Home = () => {

    const {workouts, dispatch} = useWorkoutContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch("https://mern-stack-workout-managing-backend.vercel.app/api/workouts")
            const json = await response.json()

            if (response.ok) {
                dispatch({type : "SET_WORKOUT", payload : json})
            }
        }

        fetchWorkouts()
    }, [])


    return (
    <div className="Home">
        <div className="workouts">
            {workouts && workouts.map((workout) => (
                <Workoutdetails key={workout._id} workout={workout} />
            ))}
        </div>
        <Workoutform />
    </div>
    )
}

export default Home;
