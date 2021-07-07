import { InputLabel, makeStyles, MenuItem, Select } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pyramid from "./Pyramid";
import RecommendedButton from "./RecommendedButton";

export default function ClientPyramid() {
  const useStyles = makeStyles({
    text: {
      textAlign: "center",
    },
    center: {
      alignItems: 'center',
      textAlign: "center",
      width:'100vw',
    },
    selectText: {
      fontSize: '4vh',
    }
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    //dispatch to get the list of pyramids
    dispatch({ type: "FETCH_INDUSTRY_PYRAMID" });
    //dispatch to get a user's progress on his pyramid
    dispatch({
      type: "FETCH_PYRAMID_PROGRESS",
      payload: user.industry_pyramid,
    });
  }, [dispatch, user]);

  const pyramidProgress = useSelector((store) => store.pyramidProgress);
  const pyramidList = useSelector((store) => store.industry_pyramid);
  //sets the id for the users pyramid as the initial state
  //changes then the user selects a different pyramid
  //to change the default pyramid for a user the user
  //just needs to change it in their profile
  const [currentPyramid, setCurrentPyramid] = useState(user.industry_pyramid);

  //retrieves new pyramid when user selects a different one from 
  //the dropdown
  const handleChange = (event) => {
    setCurrentPyramid(event.target.value);
    dispatch({ type: "FETCH_PYRAMID_PROGRESS", payload: event.target.value });
  };
  console.log(pyramidList);
  return (
    <>
        <div className={classes.center}>

          <InputLabel id="pyramid">Current Pyramid</InputLabel>
          {/* drop down selector for pyramid */}
          <Select className={classes.selectText}
            variant="outlined"
            labelId="pyramid"
            value={currentPyramid}
            onChange={handleChange}
            >
              {/* loads the list of pyramids once it is received */}
            {pyramidList ? (
              pyramidList.map((thisPyramid) => {console.log(thisPyramid);
                return <MenuItem key={thisPyramid.id} value={thisPyramid.id}>{thisPyramid.name}</MenuItem>;
              })
              ) : (
                ''
                )}
          </Select> {/* end of selector */}
                </div>
      {/* loads pyramid once progress is received; passes progress and
      pyramid id as props */}
      {pyramidProgress.progress ? (
        <Pyramid progress={pyramidProgress.progress} pyramidId={currentPyramid} />
      ) : (
        ""
      )}
      {/* the button for the recommended building blocks selector */}
      <RecommendedButton />
    </>
  );
}
