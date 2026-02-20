const API_URL = import.meta.env.VITE_API_URL;

const apiRequest = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'x-auth-token': token }),
        ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.msg || response.statusText);
    }

    return data;
};

export const authAPI = {
    register: (userData) => apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
    }),
    login: (credentials) => apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    }),
    getUser: () => apiRequest('/auth/user'),
};

export const loansAPI = {
    getAll: () => apiRequest('/loans'),
    create: (loanData) => apiRequest('/loans', {
        method: 'POST',
        body: JSON.stringify(loanData),
    }),
    update: (id, updateData) => apiRequest(`/loans/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updateData),
    }),
};

export const offersAPI = {
    getAll: () => apiRequest('/offers'),
    create: (offerData) => apiRequest('/offers', {
        method: 'POST',
        body: JSON.stringify(offerData),
    }),
    update: (id, updateData) => apiRequest(`/offers/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updateData),
    }),
    delete: (id) => apiRequest(`/offers/${id}`, {
        method: 'DELETE',
    }),
};
