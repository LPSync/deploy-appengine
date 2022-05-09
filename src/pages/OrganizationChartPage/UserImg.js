import React from "react";
import { useQuery } from "@apollo/client";
import { GET_GOOGLE_USER_IMG } from "../../operations/queries/getGoogleUserImg";
import handleError from "../../data/handleError";
import { useHistory } from "react-router-dom";

const UserImg = (props) => {
  const history = useHistory();
  const email = props.email;
  const { error: imgError, data: imgData } = useQuery(GET_GOOGLE_USER_IMG, {
    variables: { search: email },
    onError: error => handleError(error)(history)
  });

  if (imgError) return <p>`Error! ${imgError.message}`</p>;

  const userImg =
    "data:image/jpeg;base64," + imgData.get_google_user_img.photoData;

  return userImg;
};

export default UserImg;
