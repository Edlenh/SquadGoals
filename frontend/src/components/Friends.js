import React, { useState, useEffect } from 'react';
import { useGoalContext } from "../hooks/userGoal";
import { useAuthContext } from '../hooks/userAuthContext';
const FriendGoals = () => {
  const {user} = useAuthContext()
  const {dispatch} = useGoalContext()
  const [friendGoals, setFriendGoals] = useState([]);

  useEffect(() => {
    const fetchFriendGoals = async () => {
      try {
        const response = await fetch('api/goal/friend/',{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization' :`Bearer ${user.token}`
            }
        });
        const data = await response.json();
        console.log(data)
        setFriendGoals(data.goals);
      } catch (error) {
        console.error('Error fetching friend goals:', error);
      }
    };

    fetchFriendGoals();
  }, [user]);

  return (
    <div>
      <h1>Friend Goals</h1>
      <ul>
      {friendGoals.map((goal, index) => (
          <li key={index}>
            <p>Title: {goal.title}</p>
            <p>Progress: {goal.progress}</p>
            <p>Created At: {goal.createdAt}</p>
            <h1>WOOHOO</h1>
          </li>
          ))}
      </ul>
    </div>
  );
};

export default FriendGoals;