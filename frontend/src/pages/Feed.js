import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/userAuthContext';
import jwt from 'jwt-decode' 
import Friends from '../components/Friends'


const Feed = () => {
  // console.log("hitting Feed page")
  const {user} = useAuthContext()
  const userId =jwt(user.token)._id


    const [searchEmail, setSearchEmail] = useState(''); // State to capture search input
    const [users, setUsers] = useState([]); // State to store all users
    const [filteredUsers, setFilteredUsers] = useState([]); // State to store filtered users
    const [errorMessage, setErrorMessage] = useState('');
    const [successMesssage, setSuccessMessage] = useState('')

    // Fetch all users 
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/user/');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    // handle search input change
    const handleSearchChange = (e) => {
        setSearchEmail(e.target.value);
        setSuccessMessage("")
    };

    //  handle search button click
    const handleSearchClick = async () => {
        // Filter users based on search input
        const filtered = users.filter(user => user.email.includes(searchEmail));
        setFilteredUsers(filtered);
        if (filtered.length === 0) {
            setErrorMessage('No users found with the provided email');
          } else {
            setErrorMessage('');
          }
        };
    //  handle adding a friend
    const handleAddFriend = async (friendId) => {
      try {
        const response = await fetch(`/api/user/${userId}/friends/${friendId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        
          body: JSON.stringify({ friendId})
        });
            console.log(friendId)
            if(response.ok){
              setSuccessMessage("Succesfully added to your friend list!");
              setSearchEmail('')
              setFilteredUsers([])
              console.log('Friend Added')
           
            }
        } catch (error) {
            console.error('Error adding friend:', error);
        }
        
    };

    const handleCancelAddFriend = () => {
        setFilteredUsers([]);
        setErrorMessage('');
        
      };
      
    return (
        <div className='friends-home' >
          <div className="friends">
            <h1 className='friend-header'>Search User</h1>
            <div>
              <input className='friend-search' 
               type="text" 
               placeholder='Enter Username'
               value={searchEmail} onChange={handleSearchChange} />
               <div className='button-wrapper'>
              <button className='search-button' onClick={handleSearchClick}>Search</button>
              <button className='cancel-button' onClick={handleCancelAddFriend}>Cancel</button>
              </div>
            </div>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <div key={user._id}>
                  <div className='addFriendContainer'>
                  <p className='addFriendUser'>{user.email}</p>
                  <button className='addFriendButton' onClick={() => handleAddFriend(user._id)}>
                  <span class="material-symbols-outlined">person_add</span>
                  
                  </button>
                  </div>
               
                </div>
              ))
            ) : (
              <p>{errorMessage}</p>
            )}
            <p>{successMesssage}</p>
          </div>
          <div className='friend-goal'>
            <Friends />
          </div>
        </div>
      );
    };

export default Feed;