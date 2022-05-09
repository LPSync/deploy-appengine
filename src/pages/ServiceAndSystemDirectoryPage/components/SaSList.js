import SaSListItem from "./SaSListItem/SaSListItem";
import NoResultsTypography from "../../../components/typographies/NoResultsTypography";
import {LinearProgress, Box} from "@material-ui/core";

const SaSList = ({data, openModal, loading}) => {
  if (loading) return <LinearProgress color="secondary" />;
  return data?.length ? (
    <Box style={{maxHeight: 600, overflowY: "auto"}}>
      {data.map((item, index) => (
        <SaSListItem key={index} data={item} openModal={openModal} />
      ))}
    </Box>
  ) : (
    <NoResultsTypography />
  );
};
export default SaSList;
