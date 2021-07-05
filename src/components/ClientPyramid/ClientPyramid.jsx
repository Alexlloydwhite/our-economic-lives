import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { makeStyles, Typography } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
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
      fontSize: '5vh',
    }
  });

  const classes = useStyles();

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_INDUSTRY_PYRAMID" });
    dispatch({
      type: "FETCH_PYRAMID_PROGRESS",
      payload: user.industry_pyramid,
    });
  }, [dispatch, user]);

  const pyramidProgress = useSelector((store) => store.pyramidProgress);
  const pyramidList = useSelector((store) => store.industry_pyramid);
  const [currentPyramid, setCurrentPyramid] = useState(user.industry_pyramid);

  const handleChange = (event) => {
    setCurrentPyramid(event.target.value);
    dispatch({ type: "FETCH_PYRAMID_PROGRESS", payload: event.target.value });
  };
  console.log(pyramidList);
  return (
    <>
        <div className={classes.center}>

          <InputLabel id="pyramid">Current Pyramid</InputLabel>
          <Select className={classes.selectText}
            variant="outlined"
            labelId="pyramid"
            value={currentPyramid}
            onChange={handleChange}
            >
            {pyramidList ? (
              pyramidList.map((thisPyramid) => {console.log(thisPyramid);
                return <MenuItem key={thisPyramid.id} value={thisPyramid.id}>{thisPyramid.name}</MenuItem>;
              })
              ) : (
                ''
                )}
          </Select>
                </div>
      {pyramidProgress.progress ? (
        <Pyramid progress={pyramidProgress.progress} pyramidId={currentPyramid} />
      ) : (
        ""
      )}
      <RecommendedButton />
    </>
  );
}
