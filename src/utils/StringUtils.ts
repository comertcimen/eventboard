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

export const hashCode = (str: string) => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

export const intToRGB = (i: number) => {
  var c = (i & 0x00ffffff).toString(16).toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
};

export const emailToUsername = (email: string) => {
  return email.slice(0, email.indexOf("@"));
};
