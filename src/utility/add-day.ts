export const addDay = (date: Date, amount = 1) => {
    return new Date(date.setDate(date.getDate() + amount))
}
