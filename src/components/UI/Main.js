export const dashboardStyles = {
  headerText: { color: "#14181F" },
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "red",
  },
  leftcontainer: {
    width: "74%",
    // height: "80vh",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    // backgroundColor: "blue",
  },
  barchartStyles: {
    width: "100%%",
    height: "36vh",
  },
  DashboardTableHeaderStyles: {
    width: "100%",
    height: "30vh",
    // backgroundColor: "yellow",
  },
  rightcontainer: {
    width: "25%",

    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  DashboardMaintenanceCardStyles: {
    width: "100%",
    height: "30vh",
  },
  DashboardLocationCardStyles: {
    width: "100%",
    height: "36vh",
    // backgroundColor: "red",
  },
};

export const addUserStyles = {
  mainContainerStyles: {
    // boxShadow: "none",
    // height: "86%",
    // width: "100%",
    // marginTop: "1%",
    flexGrow: 1 , position: 'absolute',
      width: "82%", 
      mt: { xs: 13, sm:12 , md: 12 , lg: 12 },
      // Adjust padding based on the screen size
      px: { xs: 2, sm:  2 ,md: 2, lg: 0 }, // Remove padding at larger screens where sidebar becomes toggle
      ml: { xs: 0, sm: 0 ,md: 0 , lg: 0 , xl: 0 }, // Leave space for the sidebar on larger screens
      overflow: "none", // Prevent overflowing horizontally and vertically
  },
  container: {
    height: "95%",
    width: "95%",
  },
  textFieldStyles: { width: "35%", marginLeft: "5px" },
  buttonStyles: {
    marginRight: "opx",
    marginLeft: "0px",
    width: "161px",
    height: "43px",
    backgroundColor: "#15294E",
    color: "white",
    textTransform: "none",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    "&:hover": {
      backgroundColor: "#15294E",
      border: "1px solid #15294E",
    },
    border: "1px solid #15294E",
  },
};

export const addVehicleStyles = {
  mainContainer: {
    boxShadow: "none",
    height: "86%",
    width: "100%",
    marginTop: "1%",
  },
  container: {
    height: "95%",
    width: "95%",
  },
  leftTextField: { width: "100%", marginLeft: "5px" },
  rightTextField: { width: "70%", marginLeft: "5px" },
  uploadImage: {
    width: "70%",
    height: "140px",
    border: "1px dashed #B7B7B7",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryText: {
    fontWeight: 600,
    color: "#494949",
    fontSize: "12px",
    fontStyle: "Inter",
  },
  secondaryText: {
    fontWeight: 400,
    color: "#4949494D",
    fontSize: "12px",
    fontStyle: "Inter",
  },
  label: { fontWeight: 500 },
  button: {
    marginRight: "opx",
    marginLeft: "0px",
    width: "161px",
    height: "43px",
    backgroundColor: "#15294E",
    color: "white",
    textTransform: "none",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    "&:hover": {
      backgroundColor: "#15294E",
      border: "1px solid #15294E",
    },
    border: "1px solid #15294E",
  },
};

export const addDeviceStyles = {
  mainContainer: {
    boxShadow: "none",
    height: "86%",
    width: "100%",
    marginTop: "1%",
  },
  container: {
    height: "95%",
    width: "95%",
  },
  label: { fontWeight: 500 },
  textField: { width: "35%", marginLeft: "5px" },
  button: {
    marginRight: "opx",
    marginLeft: "0px",
    width: "161px",
    height: "43px",
    backgroundColor: "#15294E",
    color: "white",
    textTransform: "none",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    "&:hover": {
      backgroundColor: "#15294E",
      border: "1px solid #15294E",
    },
    border: "1px solid #15294E",
  },
};

export const addDriverStyles = {
  mainContainer: {
    boxShadow: "none",
    height: "86%",
    width: "100%",
    marginTop: "1%",
  },
  container: {
    height: "95%",
    width: "95%",
  },
  label: { fontWeight: 500 },
  textField: { width: "35%", marginLeft: "5px" },
  button: {
    marginRight: "opx",
    marginLeft: "0px",
    width: "161px",
    height: "43px",
    backgroundColor: "#15294E",
    color: "white",
    textTransform: "none",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    "&:hover": {
      backgroundColor: "#15294E",
      border: "1px solid #15294E",
    },
    border: "1px solid #15294E",
  },
};

export const addTripStyles = {
  mainContainer: {
    boxShadow: "none",
    height: "86%",
    width: "100%",
    marginTop: "1%",
  },
  container: {
    height: "95%",
    width: "95%",
  },
  label: { fontWeight: 500 },
  textField: { width: "35%", marginLeft: "5px" },
  button: {
    marginRight: "opx",
    marginLeft: "0px",
    width: "161px",
    height: "43px",
    backgroundColor: "#15294E",
    color: "white",
    textTransform: "none",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    "&:hover": {
      backgroundColor: "#15294E",
      border: "1px solid #15294E",
    },
    border: "1px solid #15294E",
  },
};

export const maintenanceSchedulingStyles = {
  headerMainContainer: { boxShadow: "none" },
  boxContainer: {
    width: "44px",
    height: "40px",
    backgroundColor: "#FFF4F2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "2px",
    
  },
  mainenanceText: {
    fontSize: "16px",
    color: "#5A607F",
    fontWeight: 400,
    fontFamily: "Inter, sans-serif",
  },
  mainenanceText2: {
    fontSize: "24px",
    color: "#2A3547",
    fontWeight: 600,
    fontFamily: "Plus Jakarta Sans, sans-serif",
  },
  vehicalText: {
    fontSize: "12px",
    color: "#64748B",
    fontWeight: 400,
    fontFamily: "Inter, sans-serif",
  },
  historyText: {
    fontSize: "16px",
    color: "#F38712",
    fontWeight: 400,
    fontFamily: "Inter, sans-serif",
    cursor: "pointer",
  },
};

export const historyStyles = {
  mainContainer: { width: "100%", height: "77%" },
  container: { width: "100%", height: "100%" },
  paperContainer: { boxShadow: "none", width: "100%", height: "100%" },
  boxContainer: {
    width: "310px",
    height: "128px",
    backgroundColor: "#F4EFFF",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  time: {
    fontWeight: 500,
    color: "#6D28D9",
    fontSize: "12px",
  },
  date: {
    fontWeight: 500,
    color: "#6D28D9",
    fontSize: "12px",
  },
  driverText: {
    fontWeight: 400,
    color: "#6D28D9",
    fontSize: "10px",
  },
  secondBox: {
    width: "310px",
    height: "128px",
    backgroundColor: "#D4F2E8",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  secondDate: {
    fontWeight: 500,
    color: "#047857",
    fontSize: "12px",
  },
  middleText: {
    fontWeight: 400,
    color: "#6D28D9",
    fontSize: "10px",
  },
  secondMiddleText: {
    fontWeight: 400,
    color: "#047857",
    fontSize: "10px",
  },
  secondDriver: {
    fontWeight: 400,
    color: "#047857",
    fontSize: "10px",
  },
  endText: {
    fontWeight: 500,
    color: "#047857",
    fontSize: "12px",
  },
  endright: {
    fontWeight: 400,
    color: "#047857",
    fontSize: "10px",
  },
  endRightBottom: {
    fontWeight: 500,
    color: "#047857",
    fontSize: "12px",
  },
  secondTime: {
    fontWeight: 500,
    color: "#047857",
    fontSize: "12px",
  },
};
export const fuelManagmentStyles = {
  mainContainer: { flexGrow: 1 },
  topContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftContainer: {
    width: "29%",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  rightContainer: { width: "70%" },
  rightContainerPaper: { boxShadow: "none", elevation: "none" },
  arrow: { position: "relative", top: "20px", right: "30px" },
  arrowText: {
    fontSize: "12px",
    color: "#BEC0CA",
    fontWeight: 400,
    fontFamily: "Inter, sans-serif",
  },
};
export const settingStyles = {
  mainContainer: {
    boxShadow: "none",
    height: "86%",
    marginTop: "6rem",
  },
  header: { height: "100%", width: "100%" },
  profilePaper: {
    boxShadow: "none",
    height: "88%",
    width: "100%",
  },
  profileContainer: {
    height: "95%",
    width: "95%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  profileTextField: { width: "35%", marginLeft: "5px" },
  profileLabel: { fontWeight: 500 },
  addPhoto: {
    width: "110px",
    height: "44px",
    backgroundColor: "#F4F4F4",
    borderRadius: "40%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  profileButtonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: "24px",
  },
  resetButtomn: {
    marginRight: "opx",
    marginLeft: "0px",
    width: "185px",
    height: "53px",
    backgroundColor: "white",
    color: "#F38712",
    textTransform: "none",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    "&:hover": {
      backgroundColor: "white",
      border: "1px solid #F38712",
    },
    border: "1px solid #F38712",
  },
  updateButton: {
    marginRight: "opx",
    marginLeft: "0px",
    width: "247px",
    height: "53px",
    backgroundColor: "#F38712",
    color: "white",
    textTransform: "none",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    "&:hover": {
      backgroundColor: "#F38712",
      border: "1px solid #F38712",
    },
    border: "1px solid #F38712",
  },
  changePasswordPaper: {
    boxShadow: "none",
    height: "88%",
    width: "100%",
  },
  changePasswordContainer: {
    height: "95%",
    width: "95%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  textFieldBox: { width: "35%" },
  contactUsPaper: {
    boxShadow: "none",
    height: "88%",
    width: "100%",
  },
  contactUsBox: {
    height: "95%",
    width: "95%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  contactUsContainer: { width: "100%", height: "90%", display: "flex" },
  contactUsBoxWidth: { width: "50%" },
  conatactUsLeftLabel: {
    fontSize: "36px",
    color: "#383C3E",
    fontWeight: 700,
    fontFamily: "Inter, sans-serif",
  },
  conatactUsLeftbottomLabel: {
    fontSize: "14px",
    color: "#737B7D",
    fontWeight: 400,
    fontFamily: "Inter, sans-serif",
  },
  conatactUsTextField: { width: "80%", marginLeft: "5px", marginTop: "4px" },
  conatactUsTextFieldMessage: {
    width: "80%",
    marginLeft: "5px",
    height: "100%",
    marginTop: "4px",
  },
  contactUsContactBox: {
    width: "196px",
    height: "126px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px",
    boxShadow: "none",
    border: "1px solid #F2F2F2",
  },
  contactUsCallLabel: {
    fontWeight: 500,
    color: "#F38712",
    fontSize: "16px",
  },
  contactUsPhone: {
    fontWeight: 400,
    color: "#717171",
    fontSize: "14px",
  },
  contactUsButtonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: "24px",
  },
  contactUsButton: {
    marginRight: "opx",
    marginLeft: "0px",
    width: "247px",
    height: "53px",
    backgroundColor: "#F38712",
    color: "white",
    textTransform: "none",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    "&:hover": {
      backgroundColor: "#F38712",
      border: "1px solid #F38712",
    },
    border: "1px solid #F38712",
  },
  policyPaper: {
    boxShadow: "none",
    height: "88%",
    width: "100%",
  },
  policyBox: {
    height: "95%",
    width: "95%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  policyEdit: { display: "flex", justifyContent: "flex-end" },
  policyButtonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: "24px",
  },
  policyDisagree: {
    marginRight: "opx",
    marginLeft: "0px",
    width: "185px",
    height: "53px",
    backgroundColor: "white",
    color: "#F38712",
    textTransform: "none",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    "&:hover": {
      backgroundColor: "white",
      border: "1px solid #F38712",
    },
    border: "1px solid #F38712",
  },
  policyAcceptAll: {
    marginRight: "opx",
    marginLeft: "0px",
    width: "247px",
    height: "53px",
    backgroundColor: "#F38712",
    color: "white",
    textTransform: "none",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    "&:hover": {
      backgroundColor: "#F38712",
      border: "1px solid #F38712",
    },
    border: "1px solid #F38712",
  },
  termsPaper: {
    boxShadow: "none",
    height: "88%",
    width: "100%",
  },
  termsBox: {
    height: "95%",
    width: "95%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
};
