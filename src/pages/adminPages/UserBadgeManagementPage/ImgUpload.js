import React, {useState} from "react";
import {Button, Input, InputLabel, Box, Typography} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import BadgeIcon from "../../../components/badges/BadgeIcon";

const styles = {
  hidden: {
    display: "none",
  },
  importLabel: {
    color: "black",
  },
  box: {
    display: "flex",
  },
};

const ImgUpload = ({image, setImage, setBadgeFile}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleAlert = (msg, open) => {
    setAlertMessage(msg);
    setIsAlertOpen(open);
  };

  const handleFileUpload = async (e) => {
    setIsAlertOpen(false);
    const imgTypes = ["jpg", "jpeg", "png", "svg"];
    const file = e.target.files[0];
    const type = file?.type;

    if (file) {
      if (file.size > 5000) {
        setImage("");
        handleAlert("image size is too big", true);
      } else if (!imgTypes.some((el) => type.includes(el))) {
        setImage("");
        handleAlert("invalid image type", true);
      } else {
        const base64 = await convertToBase64(file);
        setImage(base64);
        setBadgeFile(file);
      }
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div>
      {isAlertOpen && (
        <Box my={1}>
          <Alert severity="warning">{alertMessage}</Alert>
        </Box>
      )}
      <Typography variant={"subtitle1"}>
        Select a PNG, JPG or SVG image ( maximum size: 5 KB ):
      </Typography>
      <Box style={styles.box}>
        <Box mr={2}>
          <Button color="secondary" variant="contained">
            <InputLabel htmlFor="import-button">
              <Input
                id="import-button"
                inputProps={{
                  accept: ".jpeg, .png, .jpg, .svg",
                }}
                onChange={(e) => handleFileUpload(e)}
                style={styles.hidden}
                type="file"
              />
              Select Image
            </InputLabel>
          </Button>
        </Box>
        <Box>{image?.length > 0 && <BadgeIcon image={image} />}</Box>
      </Box>
    </div>
  );
};

export default ImgUpload;
