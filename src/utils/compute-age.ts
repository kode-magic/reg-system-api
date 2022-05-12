import moment = require("moment");

export const computeAge = (date: Date) => {

  const newDate = new Date(date);

  const checker: number = moment().diff(moment(date, "YYYY-MM-DD"), "years");

  const age: string = `${checker} Years`

  return age;

}