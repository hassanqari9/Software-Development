import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createData, fetchData, updateData, deleteData } from './mapdataAPI';
import { useParams, Link } from "react-router-dom";
import { useState } from 'react';

export default function MapData() {
  const params = useParams();
  const queryClient = useQueryClient();

  const mapId = params.mapId;
  const mapName = params.mapName;

  const [displayForm, setDisplayForm] = useState('hidden');
  const [formData, setFormData] = useState({});
  const [update, setUpdate] = useState(false);

  let content;

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['mapFetch', { mapId }],
    queryFn: () => fetchData(mapId),
  });

  const { mutate: mutateCreate, isPending: createPending, isError: createIsError, error: createError } = useMutation({
    mutationFn: createData,
    onSuccess: () => {
      setDisplayForm('hidden');
      queryClient.invalidateQueries({ queryKey: ['mapFetch'] });
    },
  });

  const { mutate: mutateUpdate } = useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      setDisplayForm('hidden');
      queryClient.invalidateQueries({ queryKey: ['mapFetch'] });
    },
  });

  const { mutate: mutateDel } = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mapFetch'] });
    },
  });

  const handleCreate = () => {
    setDisplayForm('block');
    setUpdate(false);
  };

  const handleUpdate = () => {
    setDisplayForm('block');
    setUpdate(true);
  };

  const handleDel = () => {
    mutateDel(mapId);
    setFormData({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutateCreate({ ...formData, map_id: mapId });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    mutateUpdate({ formData, mapId });
  };

  if (isPending || createPending) {
    content = "LoadingIndicator";
  }

  if (createIsError) {
    content = createError.info.authentication;
  }
  if (isError) {
    content = "Error: " + error.info;
  }

  if (!error && !createError && data) {
    content = data.description;
  }

  return (
    <section>
      <header className='flex justify-between p-5'>
        <div className='flex flex-col md:flex-row'>
          <Link to='/map'>
            <h1 className='text-[2rem] font-bold pr-5'>⬅</h1>
          </Link>
          <h1 className='text-[2rem] font-bold'>{mapName}</h1>
        </div>
        <div className='mt-2 md:mt-0'>
          {content === 'empty' && <button onClick={handleCreate} className='mx-1 border border-black p-2 hover:bg-black hover:text-white'>Create</button>}
          {content !== 'empty' && <button onClick={handleUpdate} className='mx-1 border border-black p-2 hover:bg-black hover:text-white'>Update</button>}
          {content !== 'empty' && <button onClick={handleDel} className='mx-1 border border-black p-2 hover:bg-black hover:text-white'>Delete</button>}
        </div>
      </header>

      <form className={`${displayForm}`}>
        <div className="space-y-8 p-4 md:p-[50px] md:w-[40%] mx-auto">
          <div className="border-b border-gray-900/10 pb-8">
            <p className="text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>

            <div className="mt-8">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
              <div className="mt-2">
                <input
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  type="text"
                  name="username"
                  id="username"
                  value={formData.description !== undefined ? formData.description : ''}
                  className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Description"
                />
              </div>
            </div>
          </div>
          {!update && <button onClick={handleSubmit} type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>}
          {update && <button onClick={handleUpdateSubmit} type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update</button>}
        </div>
      </form>

      <div className='m-5 p-4 border border-green-600 mx-auto md:w-[50%]'>
        {content}
      </div>
    </section>
  );
}
