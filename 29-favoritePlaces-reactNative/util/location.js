const GOOGLE_API_KEY = 'AIzaSyAvXmVi0_Kpo3Dh4-Ye2jnzbINuuK4NRQg'

export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`

  return imagePreviewUrl
}

//https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY

export async function getAddress(lat, lng) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
  const response = await fetch(url);
  if (!response.ok) {
  throw new Error('Failed to fetch address!');
  }

  const data = await response.json();
  const address = data. results [0].formatted_address;
  return address;
}