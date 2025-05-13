export const loadTasks = () => {
  const data = localStorage.getItem('habitTasks')
  return data ? JSON.parse(data) : []
}

export const saveTasks = tasks => {
  localStorage.setItem('habitTasks', JSON.stringify(tasks))
}
