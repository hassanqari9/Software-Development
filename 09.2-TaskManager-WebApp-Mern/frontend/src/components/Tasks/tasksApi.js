export async function createTaskData(formData) {
    // console.log(formData);
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:3001/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(formData)
    })

    if (!response.ok) {
        const error = new Error('An error occurred while signing up');
        error.code = response.status;
        error.info = await response.json();
        console.log(error.info);
        throw error;
    }

    const data = await response.json()
    // console.log(data);
    return data
}

export async function fetchTaskData() {
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:3001/tasks', {
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    if (!response.ok) {
        const error = new Error('An error occurred while signing up');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const data = await response.json()
    // console.log(data);
    return data
}

export async function updateTaskData(id, newTask) {
    // console.log(id);
    // console.log(newTask);
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:3001/tasks/'+id, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(newTask)
    })

    if (!response.ok) {
        const error = new Error('An error occurred while signing up');
        error.code = response.status;
        error.info = await response.json();
        console.log(error.info);
        throw error;
    }

    const data = await response.json()
    // console.log(data);
    return data
}

export async function deleteTaskData(id) {
    // console.log(id);
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:3001/tasks/'+id, {
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    if (!response.ok) {
        const error = new Error('An error occurred while signing up');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const data = await response.json()
    // console.log(data);
    return data
}