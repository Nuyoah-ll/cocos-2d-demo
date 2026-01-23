// [start, end)
export const getRandomIntExclusiveEnd = (start: number, end: number) => Math.floor(start + (end - start) * Math.random())

// [start, end]
export const getRandomIntInclusiveEnd = (start: number, end: number) => Math.floor(start + (end - start + 1) * Math.random())