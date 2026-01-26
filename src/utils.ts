export function formatDate(date: Date) {
    return date.toISOString().split('T')[0].split('-').reverse().join('.')
}

export function formatSecondsToHours(seconds: number) {
    const newSecs = seconds
    const hours = Math.floor(newSecs / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    return `${hours} ч. ${minutes} м.`
}