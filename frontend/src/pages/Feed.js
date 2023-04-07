import React, { useState, useEffect } from 'react';

const Feed = (user_id) => {
    const [searchEmail, setSearchEmail] = useState(''); // State to capture search input
    const [users, setUsers] = useState([]); // State to store all users
    const [filteredUsers, setFilteredUsers] = useState([]); // State to store filtered users
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch all users on component mount
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

    // Function to handle search input change
    const handleSearchChange = (e) => {
        setSearchEmail(e.target.value);
    };

    // Function to handle search button click
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
    // Function to handle adding a friend
    const handleAddFriend = async (friendEmail) => {
        try {
            const response = await fetch(`/api/user/${user_id}/friends/${friendEmail}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ friendEmail })
            });
    
            if(response.ok){
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
        <div>
          <div className="friends">
            <h2>Add Friend</h2>
            <div>
              <input type="text" value={searchEmail} onChange={handleSearchChange} />
              <button onClick={handleSearchClick}>Search</button>
              <button onClick={handleCancelAddFriend}>Cancel</button>
            </div>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <div key={user._id}>
                  <p>{user.email}</p>
                  <button onClick={() => handleAddFriend(user.email)}>Add Friend</button>
               
                </div>
              ))
            ) : (
              <p>{errorMessage}</p>
            )}
          </div>
        </div>
      );
    };

export default Feed;