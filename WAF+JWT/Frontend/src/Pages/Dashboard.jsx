// Pages/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import axiosPrivate from '../utils/axiosPrivate'; // Import the secure instance
import { endpoints } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Function to fetch secured data
        const fetchUserData = async () => {
            try {
                // *** Using the secured axiosPrivate instance ***
                const response = await axiosPrivate.get(endpoints.userInfo);
                setUserData(response.data.user);
                setError('');
            } catch (err) {
                // If the interceptor failed (i.e., refresh token was also expired),
                // the user is logged out and redirected.
                setError("Welcome to the Dashboard");
                console.error("Dashboard fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // --- Logout Logic (Next Step) ---
    const handleNavigate = () => {
        navigate("/portfolio");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                Loading Dashboard...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4 py-6">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-700 mb-6 border-b pb-2">
                    User Dashboard
                </h1>

                {error && (
                    <div
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm sm:text-base"
                        role="alert"
                    >
                        {error}
                    </div>
                )}

                {userData ? (
                    <div className="space-y-4 break-words">
                        <p className="text-base sm:text-lg font-medium text-gray-800">
                            Welcome,{" "}
                            <span className="text-indigo-600 font-bold">
                                {userData.username}!
                            </span>
                        </p>

                        <p className="text-sm sm:text-base text-gray-600">
                            Your secure session is active and automatically refreshing.
                        </p>

                        <div className="border-t pt-4 mt-4">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                                User Details
                            </h2>

                            <p className="text-xs sm:text-sm text-gray-500 break-all">
                                Email:{" "}
                                <span className="font-mono text-gray-900">
                                    {userData.email}
                                </span>
                            </p>

                            <p className="text-xs sm:text-sm text-gray-500 break-all">
                                ID:{" "}
                                <span className="font-mono text-gray-900">
                                    {userData.id}
                                </span>
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500"></p>
                )}

                <button
                    onClick={handleNavigate}
                    className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 shadow-md transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                    Click here for the Portfolio
                </button>
            </div>
        </div>
    );
};

export default Dashboard;




