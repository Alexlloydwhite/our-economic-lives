import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';



export default function AdminDashboard() {
    const dispatch = useDispatch();
    const [careerPath, setCareerPath] = useState(0);
    let routerPath = '/api/upload/' + careerPath;
    const setCareerPaths = useSelector(store => store.career_path)
    useEffect(() => {
        dispatch({ type: 'FETCH_CAREER_PATH' })
    }, [dispatch])


    return (
        <div>
            <h2>Pyramid List</h2>
            <form action={routerPath} method="POST" enctype="multipart/form-data">
                <input type="file" name="file" accept=".csv" />
                <select name="Career Path" onChange={(event) => setCareerPath(event.target.value)}>
                    <option>Choose a Career Path</option>
                    {setCareerPaths ? setCareerPaths.map((path, i) => {
                        return (<option key={i} value={path.id}>{path.name}</option>)
                    }) : <option>No Career Paths</option>}
                </select>
                <button type="submit">Add Blocks</button>
            </form>
        </div>
    )
}