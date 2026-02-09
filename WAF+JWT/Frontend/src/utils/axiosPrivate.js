import axios from 'axios';
import { endpoints } from './api';

// 1. Create the base private instance
const axiosPrivate = axios.create({
    // We don't set a baseURL here because your endpoints object already contains full URLs
    headers: { 'Content-Type': 'application/json',
        'x-client-id':'web-client'
     },
    withCredentials: true // Important for sending cookies/session data if needed
});

// 2. Request Interceptor: Attach the Access Token to every outgoing request
axiosPrivate.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken');
        config.headers['x-client-id'] = 'web-client';
        // Only set the header if it hasn't been set by previous logic
        if (token && !config.headers['Authorization']) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// 3. Response Interceptor: Handle 401 (Unauthorized/Expired Token) errors
axiosPrivate.interceptors.response.use(
    response => response,
    async (error) => {
        const prevRequest = error.config;

        // Check for 401 error and ensure we haven't already retried this request
        if (error.response?.status === 401 && !prevRequest._retry) {
            prevRequest._retry = true; // Mark as retried
            
            try {
                // Get the Refresh Token from local storage
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    console.error("No Refresh Token found.");
                    throw new Error("No refresh token"); // Go to catch block
                }

                // Call the refresh endpoint using the specific URL from your endpoints object
                // *** IMPORTANT: Use the standard 'axios' instance here to avoid recursion ***
                const response = await axios.post(endpoints.refresh, { 
                    refreshToken 
                });

                const newAccessToken = response.data.accessToken;

                // Save the new token locally
                localStorage.setItem('accessToken', newAccessToken);

                // Update the Authorization header for the original failed request
                prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                // Retry the original request with the new token
                return axiosPrivate(prevRequest);

            } catch (refreshError) {
                // If the refresh fails (refresh token expired or invalid)
                console.error("Token refresh failed. Clearing tokens.", refreshError);
                
                // Clear all tokens
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                
                // Propagate the error so the Dashboard component can handle the final redirect
                return Promise.reject(error); 
            }
        }

        // For all other errors (404, 500, etc.), reject normally
        return Promise.reject(error);
    }
);

export default axiosPrivate;
