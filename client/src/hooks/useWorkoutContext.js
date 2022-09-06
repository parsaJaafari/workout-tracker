import { useContext } from "react";
import { workoutContext } from "../context/WorkoutContext";

export const useWorkoutContext = () => {
  const context = useContext(workoutContext);

  if (!context) {
    throw Error(
      "useWorkoutContexts must be used inside a workoutContext provider"
    );
  }

  return context;
};
