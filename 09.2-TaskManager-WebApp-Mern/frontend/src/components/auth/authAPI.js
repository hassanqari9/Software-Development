export async function authApi(formData, l) {
    // console.log(formData);
    const response = await fetch('http://localhost:3001/users'+l, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })

    if (!response.ok) {
        const error = new Error('An error occurred while signing up');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    console.log('hi');
    const data = await response.json()
    localStorage.setItem('token', data.token)
    window.location.reload(false);
    return data
}