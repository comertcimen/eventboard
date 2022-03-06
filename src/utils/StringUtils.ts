export const nameAvatarize = (name: string): string => {
  const seperate = name.split(" ");
  switch (seperate.length) {
    case 0:
      return "";
    case 1:
      return seperate[0][0];
    default:
      return `${seperate[0][0]}${seperate[1][0]}`;
  }
};
