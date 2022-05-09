export const FteTrackerRows = (data) => {
  const {
    created,
    firstName,
    lastName,
    username,
    nonLpEmail,
    businessUnit,
    department,
    location,
  } = data || {};

  return [
    {
      id: "created",
      name: "Start Date",
      value: created,
    },
    {
      id: "fullName",
      name: "Full Name",
      value: `${firstName} ${lastName}`,
    },
    {
      id: "username",
      name: "Username",
      value: username,
    },
    {
      id: "nonLpEmail",
      name: "Non-LP Email",
      value: nonLpEmail,
    },
    {
      id: "businessUnit",
      name: "Business Unit",
      value: businessUnit,
    },
    {
      id: "department",
      name: "Department",
      value: department,
    },
    {
      id: "location",
      name: "Location",
      value: location,
    },
  ];
};

export const ShippingTrackerRows = (data) => {
  const {laptopType, laptopLanguage, postalAddress, phoneNumber} = data || {};

  return [
    {id: "laptopType", name: "Device Selected", value: laptopType || "-"},
    {
      id: "laptopLanguage",
      name: "Device Language",
      value: laptopLanguage || "-",
    },
    {id: "postalAddress", name: "Postal Address", value: postalAddress || "-"},
    {id: "phoneNumber", name: "Phone Number", value: phoneNumber || "-"},
  ];
};
