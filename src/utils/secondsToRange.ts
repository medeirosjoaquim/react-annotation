const secondsToRange = (duration: number): string[] => {
  let x = 0
  const step = 1
  const range: string[] = []
  let hours: number | string
  let minutes: number | string
  let seconds: number | string
  while (x < duration) {
    hours = Math.floor(x / 3600)
    minutes = Math.floor((x - hours * 3600) / 60)
    seconds = Math.ceil(x - hours * 3600 - minutes * 60)
    if (hours < 10) {
      hours = `0${hours}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    if (seconds < 10) {
      seconds = `0${seconds}`
    }
    x += step
    range.push(`${hours}:${minutes}:${seconds}`)
  }
  return range
}

export default secondsToRange
