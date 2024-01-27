import axios from 'axios';

const URL = 'https://notekeeper-6f100-default-rtdb.firebaseio.com/';

export async function storeData(notes) {
    const response = await axios.post(URL + '/notes.json', {...notes, isPinned: false})
    return response.data.name
}

export async function getData() {
    const response = await axios.get(URL + '/notes.json')

    const notes = []
    for (const key in response.data) {
        const Obj = {
            id: key,
            title: response.data[key].title,
            tagline: response.data[key].tagline,
            body: response.data[key].body,
            isPinned: response.data[key].isPinned
        }
        notes.push(Obj)
    }
    return notes
}

export async function updateData(id, notes) {
    await axios.put(URL + '/notes/' + id + '.json', {...notes, isPinned: notes.isPinned})
}

export async function deleteData(id) {
    await axios.delete(URL + '/notes/' + id + '.json')
}