<template>
  <div class="home">
    <h1 class="text-4xl font-bold mb-8">Card Imposition Tool</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-4">Recent Projects</h2>
        <ul v-if="recentProjects.length">
          <li v-for="project in recentProjects" :key="project.id" class="mb-2">
            <button @click="loadProject(project.id)" class="text-blue-600 hover:underline">
              {{ project.name }}
            </button>
          </li>
        </ul>
        <p v-else class="text-gray-500">No recent projects</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-4">Quick Start</h2>
        <button @click="startNewProject" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Start New Project
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectStore } from '@/stores/project'

export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    const projectStore = useProjectStore()
    const recentProjects = ref([])

    onMounted(() => {
      recentProjects.value = projectStore.getRecentProjects()
    })

    const startNewProject = () => {
      const projectId = projectStore.createNewProject()
      router.push({ name: 'Editor', params: { id: projectId } })
    }

    const loadProject = (projectId) => {
      projectStore.loadProject(projectId)
      router.push({ name: 'Editor', params: { id: projectId } })
    }

    return {
      recentProjects,
      startNewProject,
      loadProject
    }
  }
}
</script>