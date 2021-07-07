import { makeStyles, Typography, Card, Container } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../Theme/Theme";
import BlockSlider from "./BlockSlider";

export default function Pyramid(props) {
  //these settings can be used to adjust the pyramid dimensions
  //this adjusts how thick each tier is
  let pyramidTierHeight = 50;
  //this controls the space between each tier
  let pyramidTierMargin = 10;
  //this adjusts the width of each tier
  let pyramidBaseWidth = 310;

  //the following two equations adjust the dimensions for tiers 6 and 7. They should
  //work automatically for small adjustments but may need altered for larger onesŒ
  //sets how thick each tier is
  let pyramidTier67Height = pyramidTierHeight * 2 + pyramidTierMargin;
  // sets how wide each tier is
  let pyramidTier67Width = (pyramidBaseWidth - 100) / 2 - 10;

  //prevents the left edge of a tier from being green at 0% complete
  const getLeftBoarderColor = (leftWidth) => {
    if (leftWidth > 0) {
      return pyramidTierHeight + "px solid " + theme.palette.success.main;
    } else {
      return pyramidTierHeight + "px solid " + theme.palette.secondary.light;
    }
  };

  //prevents the right edge of a tier from staying gray at 100% complete
  const getRightBoarderColor = (rightWidth) => {
    if (rightWidth > 0) {
      return pyramidTierHeight + "px solid " + theme.palette.secondary.light;
    } else {
      return pyramidTierHeight + "px solid " + theme.palette.success.main;
    }
  };

  //an array of decimals used to calculate the completion percent of each tier
  let progress = props.progress;
  // database id of the pyramid used to get the information about each tier
  let pyramidId = props.pyramidId;

  const useStyles = makeStyles({
    pyramid: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100vw",
      margin: 0,
      padding: 0,
    },
    row: {
      display: "flex",
      flexDirection: "row",
      marginBottom: pyramidTierMargin,
    },
    tier6: {
      display: "flex",
      flexDirection: "column",
      height: pyramidTier67Height,
      width: pyramidTier67Width,
      alignItems: "center",
      justifyContent: "center",
      fontSize: 0,
      marginRight: pyramidTierMargin / 2,
    },
    tier6Title: {
      zIndex: 1000,
    },
    // controls how tall the incomplete part (gray) of pyramid 6's tier is
    tier6Remaining: {
      marginBottom: pyramidTier67Height * progress[6 - 1],
      width: pyramidTier67Width - 20 * progress[6 - 1],
      marginLeft: 20 * progress[6 - 1],
      borderBottom:
      pyramidTier67Height -
      pyramidTier67Height * progress[6 - 1] +
      "px solid " +
      theme.palette.secondary.light,
      borderLeft: 20 - 20 * progress[6 - 1] + "px solid transparent",
      zIndex: 500,
      position: "absolute",
      // controls how tall the complete (green) part of pyramid 6's tier is
    },
    tier6Progress: {
      width: pyramidTier67Width,
      marginTop: pyramidTier67Height - pyramidTier67Height * progress[6 - 1],
      borderLeft: 20 * progress[6 - 1] + "px solid transparent",
      borderBottom:
        pyramidTier67Height * progress[6 - 1] +
        "px solid " +
        theme.palette.success.main,
      zIndex: 500,
      position: "absolute",
    },
    tier7: {
      display: "flex",
      flexDirection: "column",
      height: pyramidTier67Height,
      width: pyramidTier67Width,
      alignItems: "center",
      justifyContent: "center",
      fontSize: 0,
      marginLeft: pyramidTierMargin / 2,
    },
    tier7Title: {
      zIndex: 1000,
    },
    // controls how tall the incomplete part (gray) of pyramid 7's tier is
    tier7Remaining: {
      marginBottom: pyramidTier67Height * progress[7 - 1],
      width: pyramidTier67Width - 20 * progress[7 - 1],
      marginRight: 20 * progress[7 - 1],
      borderBottom:
        pyramidTier67Height -
        pyramidTier67Height * progress[7 - 1] +
        "px solid " +
        theme.palette.secondary.light,
      borderRight: 20 - 20 * progress[7 - 1] + "px solid transparent",
      zIndex: 500,
      position: "absolute",
    },
    // controls how tall the complete (green) part or pyramid 7's tier is
    tier7Progress: {
      width: pyramidTier67Width,
      marginTop: pyramidTier67Height - pyramidTier67Height * progress[7 - 1],
      borderRight: 20 * progress[7 - 1] + "px solid transparent",
      borderBottom:
        pyramidTier67Height * progress[7 - 1] +
        "px solid " +
        theme.palette.success.main,
      zIndex: 500,
      position: "absolute",
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  });

   // Setting state for backdrop that the tier slider loads on
    const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = (num) => {
    dispatch({
      // gets the building blocks for a tier when clicked
      type: "FETCH_BLOCKS",
      payload: { tier: num, pyramid: pyramidId },
    });
    setOpen(!open);
  };

  // this is the component used for tiers 1-5
  function Tier(props) {
    const dispatch = useDispatch();
    let num = props.tier;
    const width = pyramidBaseWidth - (num - 1) * 20;
    // how wide the complete (green) section of a pyramid's tier is
    const tierProgress = progress[num - 1];
    // how wide the incomplete (grey) section of a pyramid's tier is
    const tierRemaining = 1 - progress[num - 1];

    const useStyles = makeStyles({

      /*****************************************************
      **  Use settings at the top of document to adjust   **
      **  pyramid size before changing margin and height  **
      **  values. Changing these will cause the settings  ** 
      ** variables to cease functioning.                  **
      *****************************************************/

      tier: {
        display: "flex",
        flexDirection: "row",
        width: width,
        marginBottom: pyramidTierMargin,
      },
      tierTitle: {
        zIndex: 100,
        position: "absolute",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: width,
        height: pyramidTierHeight,
      },
      tierRemaining: {
        // Use the function near the beginning of this document to adjust the
        // incomplete color
        borderBottom: getRightBoarderColor(tierRemaining),
        // width of the corner of the tiers wider =
        borderRight: "10px solid transparent",
        height: pyramidTierHeight,
        width: tierRemaining * 100 + "%",
        zIndex: 0,
      },
      tierProgress: {
        // Use the function near the beginning of this document to adjust the
        // complete color
        borderBottom: getLeftBoarderColor(tierProgress),
        // width of the corner of the tiers wider =
        borderLeft: "10px solid transparent",
        height: pyramidTierHeight,
        width: tierProgress * 100 + "%",
        zIndex: 0,
      },
      backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
      },
    });
    const user = useSelector((store) => store.user);

    const classes = useStyles();

    // Setting state for backdrop
    const [open, setOpen] = useState(false);
    // Setting handle functions for backdrop functionality
    const handleClose = () => {
      setOpen(false);
    };
    const handleToggle = () => {
      dispatch({
        // gets blocks for a tier of the pyramid when clicked
        type: "FETCH_BLOCKS",
        payload: { tier: num, pyramid: pyramidId },
      });
      setOpen(!open);
    };

    let percent = Math.floor(tierProgress*100)

    return (
      <div className={classes.tier} onClick={handleToggle}>
        <div className={classes.tierTitle}>
          <Typography className="outlineText">Tier {num}: {percent}%</Typography>
        </div>
        {/* progress = right bar */}
        <div className={classes.tierProgress}></div>
        {/* remaining = left bar */}
        <div className={classes.tierRemaining}></div>
        {/* opens when a tier is clicked on */}
        <Backdrop
          className={classes.backdrop}
          open={open}
          onClick={handleClose}
        >
          <Card className={classes.card}>
            <BlockSlider tier={num} />
          </Card>
        </Backdrop>
      </div>
    );
  }

  const dispatch = useDispatch();
  let liveProgress = useSelector((store) => store.pyramidProgress);

  const classes = useStyles();

  // calculates progress for tiers 6 and 7
  let percent6 = Math.floor(progress[5] * 100)
  let percent7 = Math.floor(progress[6] * 100)

  return (
    <Container className={classes.pyramid}>
      <Typography>Please Select Your Tier: </Typography>
      {/* row for tier 6 and 7÷ */}
      {/* tier 6 and 7 are vertical rather than horizontal like 
        the others tiers  and are different from each other so
        making a reuseable component for them was not helpful*/}
      <div className={classes.row}>
        {/* begin tier 6 */}
        <div className={classes.tier6} onClick={() => handleToggle(6)}>
          <Typography progress={liveProgress} className={classes.tier6Title}>
            Tier 6: <br />{percent6}%
          </Typography>
          {/* remaining = top */}
          <div className={classes.tier6Remaining}></div>
          {/* progress = bottom */}
          <div className={classes.tier6Progress}></div>
          <Backdrop
            className={classes.backdrop}
            open={open}
            onClick={handleClose}
          >
            <BlockSlider tier={6} />
          </Backdrop>
        </div> {/*end tier 6*/}
        {/* begin tier 7 */}
        <div className={classes.tier7} onClick={() => handleToggle(7)}>
          <Typography progress={liveProgress} className={classes.tier7Title}>
            Tier 7: <br />{percent7}%
          </Typography>
          <div className={classes.tier7Remaining}></div>
          <div className={classes.tier7Progress}></div>
          <Backdrop
            className={classes.backdrop}
            open={open}
            onClick={handleClose}
          >
            <BlockSlider tier={7} />
          </Backdrop>
        </div> {/*end tier 7*/}
      </div>{/*ends row for tier 6 and 7*/}
      {/* tiers 1-5 use tier component set up above */}
      <Tier progress={liveProgress} tier={5} />
      <Tier progress={liveProgress} tier={4} />
      <Tier progress={liveProgress} tier={3} />
      <Tier progress={liveProgress} tier={2} />
      <Tier progress={liveProgress} tier={1} />
    </Container>
  );
}
