export const getDataTime = () => {
  const date = new Date();
  const currentDate =
    date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
  const currentTime =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  return currentDate + " " + currentTime;
};
