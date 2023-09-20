export function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => {
    setCounter(counter + 1)
    window.NotificationCenter.postMessage({
      content: "Counter value change",
      variant: "info",
    });
  })
  setCounter(0)
}
