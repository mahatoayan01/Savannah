/**
 * Calculates whether Savannah is currently Open or Closed
 * based on operating hours in restaurant.js.
 */
export function getOpenStatus(operatingHours) {
  try {
    const now = new Date();
    // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const daysMap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDayName = daysMap[now.getDay()];
    
    const todaySchedule = operatingHours.find(h => h.day.toLowerCase() === currentDayName.toLowerCase()) || operatingHours[0];
    
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const openMinutes = todaySchedule.openHour * 60 + todaySchedule.openMin;
    const closeMinutes = todaySchedule.closeHour * 60 + todaySchedule.closeMin;

    const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

    return {
      isOpen,
      currentDay: todaySchedule.day,
      hoursToday: `${todaySchedule.open} – ${todaySchedule.close}`,
      statusText: isOpen ? "Open Now" : "Closed Now",
      subText: isOpen ? `Closes at ${todaySchedule.close}` : `Opens at ${todaySchedule.open}`
    };
  } catch (e) {
    return {
      isOpen: true,
      currentDay: "Today",
      hoursToday: "10:00 AM – 11:00 PM",
      statusText: "Open Now",
      subText: "Closes at 11:00 PM"
    };
  }
}
