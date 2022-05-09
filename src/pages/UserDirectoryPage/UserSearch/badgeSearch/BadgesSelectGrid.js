import React, { memo } from "react";
import BoxGridWrapper from "../../../../components/grid/BoxGridWrapper";
import BadgeIconGridItem from "../../../../components/grid/BadgeIconGridItem";
import { Box } from "@material-ui/core";
import BackPaginationButton from "../../../../components/buttons/BackPaginationButton";
import NextPaginationButton from "../../../../components/buttons/NextPaginationButton";

const BadgesSelectGrid = ({loading, badges, handleClick,
  isBackBtnDisabled, handleBackBtn,
  isNextBtnDisabled, handleNextBtn
}) => {
  return (
    <>
      <BoxGridWrapper loading={loading} dataLength={badges?.length}>
        {badges?.map((badge) => (
          <BadgeIconGridItem
            key={badge?.id}
            id={badge?.id}
            image={badge?.badgeIcon?.badgeIconImg}
            name={badge?.badgeName}
            onClick={() => handleClick(badge)}
          />
        ))}
      </BoxGridWrapper>
      <Box mt={1}>
        <BackPaginationButton
          disabled={isBackBtnDisabled}
          onClick={handleBackBtn}
        />
        <NextPaginationButton
          disabled={isNextBtnDisabled}
          onClick={handleNextBtn}
        />
      </Box>
    </>
  );
};

export default memo(BadgesSelectGrid);