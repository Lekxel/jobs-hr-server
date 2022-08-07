export const randomString = (length: number) => {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const randomInteger = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};
