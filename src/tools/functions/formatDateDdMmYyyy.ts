export const formatDateDdMmYyyy = (date: Date): string => {
   const timeStamp = new Date(date);
   const day = timeStamp.getDate() < 10 ? `0${timeStamp.getDate()}` : timeStamp.getDate();
   const month = timeStamp.getMonth() + 1 < 10 ? `0${timeStamp.getMonth() + 1}` : timeStamp.getMonth() + 1;
   return `${day}/${month}/${timeStamp.getFullYear()}`;
};
