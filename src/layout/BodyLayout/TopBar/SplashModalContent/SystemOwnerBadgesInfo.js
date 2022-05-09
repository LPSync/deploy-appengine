import React, {memo, useState} from "react";
import {useQuery} from "@apollo/client";
import {GET_LPSYNC_USER_BADGES} from "../../../../operations/queries/getLpsyncUserBadges";
import handleError from "../../../../data/handleError";
import {useHistory} from "react-router-dom";
import BadgeTypes from "../../../../data/constants/BadgeTypes";
import {Typography} from "@material-ui/core";
import InfoTooltip from "../../../../components/tooltips/InfoTooltip";
import ColorBorderBox from "../../../../components/blocks/ColorBorderBox";
import BadgeChip from "../../../../components/badges/BadgeChip";

const SystemOwnerBadgesInfo = () => {
  const history = useHistory();
  const [soBadges, setSoBadges] = useState([]);

  useQuery(GET_LPSYNC_USER_BADGES, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => getSoBadges(data?.get_lpsync_user_badges),
    onError: (error) => handleError(error)(history),
  });

  const getSoBadges = (data) => {
    const so = data.filter(
      (x) => x.badge.badgeType === BadgeTypes.SYSTEM_OWNER
    );

    setSoBadges(so);
  };

  if (!soBadges?.length) return null;

  return (
    <div>
      <Typography>
        You have the following System Owner badges...{" "}
        <span>
          <InfoTooltip placement={"right-start"}>
            System Owner Badges are automatically assigned <br />
            to you based on your role at LivePerson.
          </InfoTooltip>
        </span>
      </Typography>

      {soBadges?.length ? (
        <ColorBorderBox height={"auto"}>
          {soBadges?.map((bge) => (
            <BadgeChip
              key={bge.badge?.id}
              id={bge.badge?.id}
              label={bge.badge?.badgeName}
              image={bge.badge?.badgeIcon?.badgeIconImg}
            />
          ))}
        </ColorBorderBox>
      ) : (
        <Typography>No badges</Typography>
      )}
    </div>
  );
};

export default memo(SystemOwnerBadgesInfo);
