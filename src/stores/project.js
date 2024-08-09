import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useProjectStore = defineStore('project', () => {
  const currentProject = ref(null)
  const projects = ref([])

  function getRecentProjects() {
    return projects.value
      .slice()
      .sort((a, b) => b.lastModified - a.lastModified)
      .slice(0, 5)
  }

  function createNewProject() {
    const newProject = {
      id: Date.now().toString(),
      name: `New Project ${projects.value.length + 1}`,
      cards: [],
      layout: null,
      lastModified: Date.now()
    }
    projects.value.push(newProject)
    currentProject.value = newProject
    saveProjects()
    return newProject.id
  }

  function loadProject(projectId) {
    const project = projects.value.find(p => p.id === projectId)
    if (project) {
      currentProject.value = project
      project.lastModified = Date.now()
      saveProjects()
    }
  }

  function saveCurrentProject() {
    if (currentProject.value) {
      currentProject.value.lastModified = Date.now()
      const index = projects.value.findIndex(p => p.id === currentProject.value.id)
      if (index !== -1) {
        projects.value[index] = { ...currentProject.value }
      } else {
        projects.value.push({ ...currentProject.value })
      }
      saveProjects()
    }
  }

  function deleteProject(projectId) {
    const index = projects.value.findIndex(p => p.id === projectId)
    if (index !== -1) {
      projects.value.splice(index, 1)
      if (currentProject.value && currentProject.value.id === projectId) {
        currentProject.value = null
      }
      saveProjects()
    }
  }

  function addCardToCurrentProject(card) {
    if (currentProject.value) {
      currentProject.value.cards.push(card)
      saveCurrentProject()
    }
  }

  function updateLayoutForCurrentProject(layout) {
    if (currentProject.value) {
      currentProject.value.layout = layout
      saveCurrentProject()
    }
  }

  function saveProjects() {
    localStorage.setItem('cardImpositionProjects', JSON.stringify(projects.value))
  }

  function loadProjects() {
    const savedProjects = localStorage.getItem('cardImpositionProjects')
    if (savedProjects) {
      projects.value = JSON.parse(savedProjects)
    }
  }

  loadProjects()

  return { 
    currentProject,
    getRecentProjects,
    createNewProject,
    loadProject,
    saveCurrentProject,
    deleteProject,
    addCardToCurrentProject,
    updateLayoutForCurrentProject
  }
})