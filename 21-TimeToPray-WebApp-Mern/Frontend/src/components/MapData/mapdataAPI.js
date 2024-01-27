export async function createData(formData) {
  // console.log(formData);
  const mapId = formData.map_id;
  const token = localStorage.getItem('token')
  const response = await fetch('http://localhost:3000/mosqueData/' + mapId, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = response.status;
    error.info = await response.json(); 
    throw error;
  }

  const data = await response.json();
  return data;
}

export async function updateData({formData, mapId}) {
  const token = localStorage.getItem('token')
  const response = await fetch('http://localhost:3000/mosqueData/' + mapId, {
    method: 'PATCH',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = response.status;
    error.info = await response.json(); 
    throw error;
  }

  const data = await response.json();
  return data;
}

export async function fetchData(mapId) {
  // console.log("mapdataAPI "+mapId);
  const response = await fetch('http://localhost:3000/mosqueData/' + mapId);
  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = response.status;
    error.info = response.statusText
    throw error;
  }

  const data = await response.json();
  // console.log(data);
  return data;
}

export async function deleteData(mapId) {
  // console.log('mapId');
  // console.log(formData);
  const token = localStorage.getItem('token')
  const response = await fetch('http://localhost:3000/mosqueData/' + mapId, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
}
