import React from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutDetails = ({ workout }) => {
  const { title, reps, load, createdAt, _id } = workout;
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  const deleteWorkout = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(`/api/workouts/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };
  return (
    <div className="workout-details">
      <h4>{title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {load}
      </p>
      <p>
        <strong>reps: </strong>
        {reps}
      </p>
      <p>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={deleteWorkout}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
