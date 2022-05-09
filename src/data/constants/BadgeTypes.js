export const badgesUrl = "https://storage.googleapis.com/lpsync-staging-badges/categorised_badges/";

const BadgeTypes = {
  SYSTEM_OWNER: "system-owner",
  HOBBIES_INTERESTS: "hobbies-interests",
  SUBJECT_MATTER_EXPERT: "subject-matter-expert",
  TOVUTI: "tovuti",
};


export const BadgeNames = {
  [BadgeTypes.SYSTEM_OWNER]: "System Owner",
  [BadgeTypes.HOBBIES_INTERESTS]: "Hobbies/Interests",
  [BadgeTypes.SUBJECT_MATTER_EXPERT]: "Subject Matter Expert",
  [BadgeTypes.TOVUTI]: "Tovuti",
};

export const BadgeImages = {
  [BadgeTypes.SYSTEM_OWNER]: "system_owner.png",
  [BadgeTypes.HOBBIES_INTERESTS]: "hobbies_interests.png",
  [BadgeTypes.SUBJECT_MATTER_EXPERT]: "sme.png",
  [BadgeTypes.TOVUTI]: "tovuti.png"
};

export const BadgeTypesObj = [
  {
    idType: BadgeTypes.SYSTEM_OWNER,
    nameType: "System Owner",
    iconName: "system_owner.png"
  },
  {
    idType: BadgeTypes.HOBBIES_INTERESTS,
    nameType: "Hobbies/Interests",
    iconName: "hobbies_interests.png"
  },
  {
    idType: BadgeTypes.SUBJECT_MATTER_EXPERT,
    nameType: "Subject Matter Expert",
    iconName: "sme.png"
  },
  {
    idType: BadgeTypes.TOVUTI,
    nameType: "Tovuti",
  } // TODO CHECK
];

export default BadgeTypes;
