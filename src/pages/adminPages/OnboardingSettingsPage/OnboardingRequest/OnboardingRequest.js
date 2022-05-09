import React, {memo, useState} from "react";
import {
    Box,
    makeStyles,
    Toolbar,
    Grid,
    Button,
    TextField,
    Snackbar,
} from "@material-ui/core";
import TopTypography from "../../../../components/typographies/TopTypography";
import {
    DEFAULT_BU_DEPT_INFO,
    DEFAULT_ERRORS_INFO,
    DEFAULT_TOAST_INFO,
    INPUTS_CONFIG_FOR_BU_DEPT_FORM,
    ULTI_BU_DEPT_FAILED_REQUEST_TEXT,
    ULTI_BU_DEPT_SUCCESS_REQUEST_TEXT,
    ULTI_BU_DEPT_VALIDATION_ERROR_TEXT
} from "../../../../data/constants/OnboardingSettingsPage";
import {useMutation} from "@apollo/client";
import {ADD_ULTI_BU_DEPT} from "../../../../operations/mutations/addUltiBUDept";
import handleError from "../../../../data/handleError";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles(() => ({
    box: {
        width: "100%",
    },
    inputBox: {
        marginBottom: "32px",
        width: "700px"
    },
    saveButton: {
        marginTop: "16px"
    }
}));

const OnboardingRequest = () => {
    const classes = useStyles();
    const history = useHistory();
    const [buDeptInfo, setBuDeptInfo] = useState(DEFAULT_BU_DEPT_INFO);
    const [toastInfo, setToastInfo] = useState(DEFAULT_TOAST_INFO);
    const [isSaving, setIsSaving] = useState(false);

    const [addUltiBUDept] = useMutation(ADD_ULTI_BU_DEPT, {
        onCompleted: () => {
            setToastInfo({ shown: true, text: ULTI_BU_DEPT_SUCCESS_REQUEST_TEXT, severity: 'success' });
            resetData();
        },
        onError: (error) => {
            handleError(error)(history);
            setToastInfo({ shown: true, text: ULTI_BU_DEPT_FAILED_REQUEST_TEXT, severity: 'error' });
            resetData();
        },
    });

    const handleToastClose = () => {
        setToastInfo({ ...DEFAULT_TOAST_INFO });
    };

    const resetData = () => {
        setIsSaving(false);
        setBuDeptInfo({ ...DEFAULT_BU_DEPT_INFO });
    }

    const validateBUDeptInfo = () => Object.values(buDeptInfo).every(value => Boolean(value.length));

    const saveBuDept = () => {
        if (validateBUDeptInfo()) {
            setIsSaving(true);

            addUltiBUDept({
                variables: {
                    input: buDeptInfo,
                },
            });
        } else {
            setToastInfo({ shown: true, text: ULTI_BU_DEPT_VALIDATION_ERROR_TEXT, severity: 'error' });
        }
    };

    const handleChange = (inputId, event) => {
        setBuDeptInfo({
            ...buDeptInfo,
            [inputId]: event.target.value
        });
    };

    return (
        <Box className={classes.box}>
            <Snackbar
                open={toastInfo.shown}
                autoHideDuration={6000}
                severity={toastInfo.severity}
                onClose={handleToastClose}
                message={toastInfo.text ?? '...'}
            />
            <Toolbar>
                <div>
                    <TopTypography>Onboarding Request</TopTypography>
                </div>
                <Box flexGrow={1} />
            </Toolbar>
            <>
                <Grid item container className={classes.inputBox} xs={12}>
                    <form autoComplete="off">
                        {INPUTS_CONFIG_FOR_BU_DEPT_FORM.map(config => {
                            return <Grid item xs={12}><TextField
                                required
                                color="secondary"
                                id={config.id}
                                label={config.label}
                                value={buDeptInfo[config.id]}
                                onChange={value => handleChange(config.id, value)}
                            />
                            </Grid>
                        })}
                        <Button variant="contained"
                                className={classes.saveButton}
                                disabled={isSaving}
                                onClick={saveBuDept}
                        >Save</Button>
                    </form>
                </Grid>
            </>
        </Box>
    );
};

export default memo(OnboardingRequest);