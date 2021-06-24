import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';



export default function AdminDashboard() {
    const dispatch = useDispatch();
    const [careerPath, setCareerPath] = useState();
    const setCareerPaths = useSelector(store => store.career_path)
    useEffect(() => {
        dispatch({type: 'FETCH_CAREER_PATH'})
    }, [dispatch])




    return <>
            <h3>I'm an admin hehehehehehehehehe</h3>
            <form>
                <input type="file" name="file" accept=".csv" />
                <select name="Career Path" onChange={(event) => setCareerPath(event.target.id)}>
                    {setCareerPaths ? setCareerPaths.map((path, i) => {
                        return (<option key={i} value={path.id}>{path.name}</option>)
                    }): <option>No Career Paths</option>}
                </select> 
                <button type="submit">Add Blocks</button>
            </form>
           </>
}