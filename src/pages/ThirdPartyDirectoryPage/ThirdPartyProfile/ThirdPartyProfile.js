import React, {memo, useContext, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/client";
import {Box} from "@material-ui/core";
import LoadingCircle from "../../../components/circularProgress/LoadingCircle";
import Page from "../../../components/Page";
import BreadcrumbLink from "../../../components/breadcrumbs/BreadcrumbLink";
import BreadcrumbText from "../../../components/breadcrumbs/BreadcrumbText";
import NoPermissionsError from "../../../components/NoPermissionsError";
import {AuthUserContext} from "../../../AuthUserContextProvider";
import {GET_THIRD_PARTY_BY_CODE} from "../../../operations/queries/getThirdPartyByCode";
import FrontendRoutes from "../../../data/constants/FrontendRoutes";
import BreadcrumbHomeBox from "../../../components/breadcrumbs/BreadcrumbHomeBox";
import handleError from "../../../data/handleError";
import ThirdPartyProfilePanel from "./ThirdPartyProfilePanel";
import ThirdPartyProfileInfo from "./ThirdPartyProfileInfo";
import {ADD_THIRD_PARTY_VIEW} from "../../../operations/mutations/addThirdPartyView";
import { useDispatch, useSelector } from "react-redux";
import PageTitleBox from "../../../components/blocks/PageTitleBox";
import { setThirdPartyData, setThirdPartyUsers } from "../../../data/redux/thirdParty/thirdPartyActions";

const ThirdPartyProfile = () => {
  const history = useHistory();
  const { thirdPartyId } = useParams();
  const { permThirdPartyDirectoryView, authUser } = useContext(AuthUserContext);
  const dispatch = useDispatch();
  const thirdPartyData = useSelector(state => state?.thirdParty?.get("thirdPartyData"));

  const { loading } = useQuery(GET_THIRD_PARTY_BY_CODE, {
    variables: { search: thirdPartyId },
    onCompleted: (data) => {
      dispatch(setThirdPartyData(data.get_third_party_by_code));
      dispatch(setThirdPartyUsers([]));
    },
    onError: error => handleError(error)(history),
  });

  const [addThirdPartyView] = useMutation(ADD_THIRD_PARTY_VIEW, {
    onError: (error) => console.error("Error: ", error),
  });


  useEffect(() => {
    if(thirdPartyData?.id && authUser?.profile?.userName && addThirdPartyView){
      addThirdPartyView({
        variables: {
            username: authUser?.profile?.userName,
            thirdPartyId: parseInt(thirdPartyData.id),
        },
      });
    }
  }, [thirdPartyData, authUser, addThirdPartyView])

  return (
    <Page title="Third Party Directory | LPSYNC">
      {thirdPartyData && (
        <BreadcrumbHomeBox>
          <BreadcrumbLink
            href={FrontendRoutes.THIRD_PARTY_DIRECTORY}
            title={"THIRD PARTY DIRECTORY"}
          />
          <BreadcrumbText title={`${thirdPartyData.name?.toUpperCase()}`}/>
        </BreadcrumbHomeBox>
      )}

      <Box mx={3}>
        <PageTitleBox title="Third Party Directory" />

        {permThirdPartyDirectoryView ? (
          <>
            {loading ? (
              <LoadingCircle/>
            ) : thirdPartyData && (
              <>
                <ThirdPartyProfileInfo/>

                <ThirdPartyProfilePanel/>
              </>
            )}
          </>
        ) : (
          <NoPermissionsError/>
        )}
      </Box>
    </Page>
  );
};

export default memo(ThirdPartyProfile);
