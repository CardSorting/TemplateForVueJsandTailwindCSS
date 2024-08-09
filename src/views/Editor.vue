<template>
  <div class="editor-container p-4">
    <h2 class="text-2xl font-bold mb-4">Card Imposition Editor</h2>
    <div class="flex flex-col md:flex-row gap-8">
      <div class="w-full md:w-2/3">
        <CardCanvas 
          ref="cardCanvas"
          :canvasWidth="canvasWidth"
          :canvasHeight="canvasHeight"
          :cardWidth="cardWidth"
          :cardHeight="cardHeight"
        />
      </div>
      <div class="w-full md:w-1/3 space-y-8">
        <CardUploader @card-uploaded="handleCardUpload" />
        <LayoutSelector @layout-change="handleLayoutChange" />
        <div>
          <button @click="generateImposition" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Generate Imposition</button>
        </div>
        <div>
          <button @click="saveImposition" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Save Imposition</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardCanvas from '@/components/CardCanvas.vue'
import CardUploader from '@/components/CardUploader.vue'
import LayoutSelector from '@/components/LayoutSelector.vue'

export default {
  name: 'Editor',
  components: {
    CardCanvas,
    CardUploader,
    LayoutSelector
  },
  data() {
    return {
      canvasWidth: 816, // 8.5 inches at 96 DPI
      canvasHeight: 1056, // 11 inches at 96 DPI
      cardWidth: 240, // 2.5 inches at 96 DPI
      cardHeight: 336, // 3.5 inches at 96 DPI
      currentLayout: null,
      uploadedCardUrl: null
    }
  },
  methods: {
    handleCardUpload(cardUrl) {
      this.uploadedCardUrl = cardUrl
      this.$refs.cardCanvas.addCard(cardUrl)
    },
    handleLayoutChange(layout) {
      this.currentLayout = layout
      // You might want to update canvas or card dimensions based on the layout
    },
    generateImposition() {
      if (!this.uploadedCardUrl || !this.currentLayout) return

      const { layoutId, options } = this.currentLayout
      // Use the CardCanvas component to apply the layout
      this.$refs.cardCanvas.applyLayout(layoutId, options)
    },
    saveImposition() {
      // Use the CardCanvas component to get the final imposition
      const impositionDataUrl = this.$refs.cardCanvas.getImpositionImage()

      // Create a download link
      const link = document.createElement('a')
      link.download = 'card_imposition.png'
      link.href = impositionDataUrl
      link.click()
    }
  }
}
</script>