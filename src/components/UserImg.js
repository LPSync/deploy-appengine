import React, {memo} from "react";
import {useQuery} from "@apollo/client";
import {makeStyles} from "@material-ui/core";
import {GET_GOOGLE_USER_IMG} from "../operations/queries/getGoogleUserImg";
import handleError from "../data/handleError";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  smallImgDiv: {
    marginRight: theme.spacing(1),
    height: "3rem",
  },
  smallImg: {
    width: "3rem",
    borderRadius: "5%",
    boxShadow: "0px 10px 25px 0px rgba(0, 0, 0, 0.2)",
  },
  mediumImgDiv: {
    marginRight: theme.spacing(1),
    height: "5rem",
  },
  mediumImg: {
    width: "5rem",
    borderRadius: "5%",
    boxShadow: "0px 10px 25px 0px rgba(0, 0, 0, 0.2)",
  },
  largeImgDiv: {
    marginTop: ".2rem",
    marginRight: theme.spacing(1),
    height: "7rem",
  },
  largeImg: {
    width: "7rem",
    borderRadius: "10%",
    boxShadow: "0px 10px 25px 0px rgba(0, 0, 0, 0.2)",
  },
}));

const UserImg = ({
  email,
  imgClass,
  imgDivClass,
  small,
  medium,
  large,
  ...props
}) => {
  const classes = useStyles();
  const history = useHistory();

  const {data} = useQuery(GET_GOOGLE_USER_IMG, {
    variables: {search: email},
    onError: (error) => handleError(error)(history),
  });

  return (
    <div
      className={
        small
          ? classes.smallImgDiv
          : medium
          ? classes.mediumImgDiv
          : large
          ? classes.largeImgDiv
          : imgDivClass
      }
      {...props}
    >
      {data && (
        <img
          src={data?.get_google_user_img?.photoData}
          alt="profile img"
          className={
            small
              ? classes.smallImg
              : medium
              ? classes.mediumImg
              : large
              ? classes.largeImg
              : imgClass
          }
        />
      )}
    </div>
  );
};

export default memo(UserImg);
