import React from 'react'

const Searchbar = () => {
  return (
    <div className='search'>
        <div className='searchForm'>
            <input type='text' placeholder='Find a user' />
        </div>
        <div className='userChat'>
            <img src='https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800' />
            <div className='userChatInfo'>
                <span>Jane</span>
            </div>
        </div>
    </div> 
  )
}

export default Searchbar