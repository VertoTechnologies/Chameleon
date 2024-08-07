'use client'

import React, { useState } from 'react';
import axios from 'axios';

interface User {
    userId: string;
    name: string;
    nativeLanguage: string;
    learningLanguages: string[];
    fluentLanguages: string[];
}

const SearchPage: React.FC = () => {
    const [input, setInput] = useState('');
    const [option, setOption] = useState('');
    const [filters, setFilters] = useState<any>({});
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const userId = localStorage.getItem('userId')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOption(e.target.value);
    };

    const handleAddFilter = () => {
        setFilters((prevFilters: any) => ({
            ...prevFilters,
            [option]: input,
        }));
        setInput('');
    };

    const handleSearch = async () => {
        try {
            const response = await axios.post(`/api/users/searchAndSuggestUsers?userId=${userId}`, {
 // Replace with the actual user ID
                filters,
                currentPage,
            });
            setUsers(response.data.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        handleSearch();
    };

    return (
        <div>
            <h1>Search Users</h1>
            <div>
                <select value={option} onChange={handleOptionChange}>
                    <option value="">Select Filter</option>
                    <option value="name">Name</option>
                    <option value="nativeLanguage">Native Language</option>
                    <option value="learningLanguages">Learning Language</option>
                    <option value="fluentLanguages">Fluent Language</option>
                </select>
                <input type="text" value={input} onChange={handleInputChange} />
                <button onClick={handleAddFilter}>Add Filter</button>
            </div>
            <div>
                <button onClick={handleSearch}>Search</button>
            </div>
            <div>
                {Object.keys(filters).map((key) => (
                    <div key={key}>
                        <strong>{key}:</strong> {filters[key]}
                    </div>
                ))}
            </div>
            <div>
                {users.map((user) => (
                    <div key={user.userId}>
                        <h2>{user.name}</h2>
                        <p>Native Language: {user.nativeLanguage}</p>
                        <p>Learning Languages: {user.learningLanguages.join(', ')}</p>
                        <p>Fluent Languages: {user.fluentLanguages.join(', ')}</p>
                    </div>
                ))}
            </div>
            <div>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            </div>
        </div>
    );
};

export default SearchPage;
