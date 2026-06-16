// API Configuration
const API_CONFIG = {
    BASE_URL: "https://jsonplaceholder.typicode.com",
    ENDPOINTS: {
        USERS: "/users",
        POSTS: "/posts",
        COMMENTS: "/comments"
    },
    TIMEOUT: 10000, // 10 seconds
    HEADERS: {
        'Content-Type': 'application/json'
    }
};

// API Service
class APIService {
    constructor(config = API_CONFIG) {
        this.config = config;
    }

    /**
     * Construct full URL for API endpoint
     */
    getUrl(endpoint) {
        return `${this.config.BASE_URL}${endpoint}`;
    }

    /**
     * Generic fetch with error handling
     */
    async fetchData(endpoint, options = {}) {
        try {
            const url = this.getUrl(endpoint);
            const response = await fetch(url, {
                timeout: this.config.TIMEOUT,
                headers: this.config.HEADERS,
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`API Error (${endpoint}):`, error);
            throw error;
        }
    }

    /**
     * Get all users
     */
    async getUsers() {
        return this.fetchData(this.config.ENDPOINTS.USERS);
    }

    /**
     * Get specific user by ID
     */
    async getUserById(id) {
        return this.fetchData(`${this.config.ENDPOINTS.USERS}/${id}`);
    }

    /**
     * Search users by keyword
     */
    async searchUsers(keyword) {
        const users = await this.getUsers();
        const lowerKeyword = keyword.toLowerCase();
        
        return users.filter(user =>
            user.name.toLowerCase().includes(lowerKeyword) ||
            user.email.toLowerCase().includes(lowerKeyword) ||
            user.username.toLowerCase().includes(lowerKeyword) ||
            (user.phone && user.phone.includes(keyword)) ||
            (user.company && user.company.name.toLowerCase().includes(lowerKeyword))
        );
    }

    /**
     * Get user posts
     */
    async getUserPosts(userId) {
        return this.fetchData(`${this.config.ENDPOINTS.POSTS}?userId=${userId}`);
    }

    /**
     * POST/Create new user (Register)
     */
    async createUser(userData) {
        try {
            const url = this.getUrl(this.config.ENDPOINTS.USERS);
            const response = await fetch(url, {
                method: 'POST',
                headers: this.config.HEADERS,
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Error (POST /users):', error);
            throw error;
        }
    }

    /**
     * Verify login credentials
     */
    async verifyLogin(username, email) {
        try {
            // Check localStorage first
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            const localUser = registeredUsers.find(u => 
                u.username === username && u.email === email
            );
            
            if (localUser) {
                return { success: true, user: localUser };
            }
            
            // Then check API
            const users = await this.getUsers();
            const apiUser = users.find(u => 
                u.username === username && u.email === email
            );
            
            if (apiUser) {
                return { success: true, user: apiUser };
            }
            
            return { success: false, error: 'Username atau email tidak ditemukan' };
        } catch (error) {
            console.error('Login verification error:', error);
            throw error;
        }
    }

    /**
     * Get all registered users (from localStorage + API)
     */
    async getAllRegisteredUsers() {
        try {
            // Get from localStorage
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            
            // Get from API
            const apiUsers = await this.getUsers();
            
            // Combine both arrays
            return [...registeredUsers, ...apiUsers];
        } catch (error) {
            console.error('Error getting all users:', error);
            throw error;
        }
    }

    /**
     * Search across registered users (localStorage + API)
     */
    async searchRegisteredUsers(keyword) {
        try {
            const allUsers = await this.getAllRegisteredUsers();
            const lowerKeyword = keyword.toLowerCase();
            
            return allUsers.filter(user =>
                (user.name && user.name.toLowerCase().includes(lowerKeyword)) ||
                (user.username && user.username.toLowerCase().includes(lowerKeyword)) ||
                (user.email && user.email.toLowerCase().includes(lowerKeyword)) ||
                (user.phone && user.phone.includes(keyword)) ||
                (user.company && user.company.name && user.company.name.toLowerCase().includes(lowerKeyword))
            );
        } catch (error) {
            console.error('Search error:', error);
            throw error;
        }
    }
}

// Create global instance
const apiService = new APIService();
