import React, { useState } from 'react';
import './FeedFilter.css';

export const FeedFilter = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'All Posts' },
    { id: 'forYou', label: 'For You' },
    { id: 'mostLiked', label: 'Most Liked' },
    { id: 'recent', label: 'Recent' },
    { id : 'mostCommented', label : 'Most Commented'},
    {id : 'most shared',label : 'Most Shared'}
  ]

  return (
    <div className="feed-filter">
      {filters.map((filter) => (
        <button
          key={filter.id}
          className={activeFilter === filter.id ? 'filter-active' : ''}
          onClick={() => setActiveFilter(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
