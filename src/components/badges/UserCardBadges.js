import React, { memo, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_LPSYNC_USER_BADGES } from "../../operations/queries/getLpsyncUserBadges";
import handleError from "../../data/handleError";
import { useHistory } from "react-router-dom";
import UserCardBadgesBox from "./UserCardBadgesBox";

const UserCardBadges = ({ userEmail, ...props }) => {
  const history = useHistory();
  const [badges, setBadges] = useState();

  const [executeSearch, { loading, data }] = useLazyQuery(
    GET_LPSYNC_USER_BADGES, {
      onCompleted: (data) => setBadges(data.get_lpsync_user_badges),
      onError: (error) => handleError(error)(history),
    },
  );

  useEffect(() => {
    if (userEmail) {
      executeSearch({ variables: { user: userEmail } });
    }
  }, [userEmail, executeSearch]);

  useEffect(() => {
    if (userEmail && data?.get_lpsync_user_badges?.user?.[0]?.userEmail === userEmail) {
      setBadges(data.get_lpsync_user_badges);
    }
  }, [data, userEmail]);

    return <UserCardBadgesBox id={`badge-box-${userEmail}`} loading={loading} badges={badges} {...props}/>;
};

export default memo(UserCardBadges);