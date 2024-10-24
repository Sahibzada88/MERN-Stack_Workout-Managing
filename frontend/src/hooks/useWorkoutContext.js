import { useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContext";

export const useWorkoutContext = () => {
    const context = useContext(WorkoutContext)
    if (!context) {
        throw Error('usecontext workout must be inside')
    }

    return context

}