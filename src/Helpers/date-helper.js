function DateHelper(user) {
  try {
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth() + 1;
    const todayYear = today.getFullYear();

    const userDate = user.lastDayGym;

    const userCurr_date = userDate.getDate();
    const userCurr_month = userDate.getMonth() + 1;
    const userCurr_year = userDate.getFullYear();

    const formatedToday = `${todayDate}-${todayMonth}-${todayYear}`;
    const formatedUserDate = `${userCurr_date}-${userCurr_month}-${userCurr_year}`;

    if (formatedToday > formatedUserDate) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
    console.log(error);
  }
}

export { DateHelper };
