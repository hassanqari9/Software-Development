export async function createUser(formData) {
    console.log(formData);

    const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        const error = new Error('An error occurred while signing up');
        error.code = response.status;
        error.info = await response.json();
        // console.log(error.info);
        throw error;
    }

    const data = await response.json();
    localStorage.setItem('token', data.token)
    return data;
    
}

export async function loginUser(formData) {
    // console.log(formData);

    const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        const error = new Error('An error occurred while logging in');
        error.code = response.status;
        error.info = await response.json();
        // console.log(error.info);
        throw error;
    }

    const data = await response.json();
    localStorage.setItem('token', data.token)
    return data
}