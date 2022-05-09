import React, {memo} from "react";
import {Button, Input, InputLabel, Box, Typography} from "@material-ui/core";

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

const ImageUpload = ({
  setBaseImage,
  setImageFile,
  sizeLimit,
  setIsAlertOpen,
  handleAlert,
}) => {
  const handleFileUpload = async (e) => {
    {
      setIsAlertOpen && setIsAlertOpen(false);
    }
    const imgTypes = ["jpg", "jpeg", "png", "svg"];
    const file = e.target.files[0];
    const type = file?.type;

    const setImage = async (file) => {
      const base64 = await convertToBase64(file);
      setBaseImage(base64);
      {
        setImageFile && setImageFile(file);
      }
    };

    if (file) {
      if (sizeLimit) {
        // sizeLimit = kb size
        const byteSize = sizeLimit * 1000;

        if (file.size > byteSize) {
          setBaseImage("");
          {
            handleAlert &&
              handleAlert("image size is too big", true, "warning");
          }
        } else if (!imgTypes.some((el) => type.includes(el))) {
          setBaseImage("");
          {
            handleAlert && handleAlert("invalid image type", true, "warning");
          }
        } else {
          await setImage(file);
        }
      } else {
        await setImage(file);
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
      <Typography variant={"subtitle1"}>
        Select a PNG, JPG or SVG image{" "}
        {sizeLimit && `( maximum size: ${sizeLimit} KB )`}:
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
      </Box>
    </div>
  );
};

export default memo(ImageUpload);
