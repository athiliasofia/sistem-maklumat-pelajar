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
}

// Create global instance
const apiService = new APIService();
