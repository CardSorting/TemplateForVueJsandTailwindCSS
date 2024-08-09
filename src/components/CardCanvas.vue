<template>
  <div class="overflow-hidden">
    <div 
      class="relative border border-gray-300 mx-auto"
      :style="canvasStyle"
      @mousedown="onCanvasMouseDown"
      @mousemove="onCanvasMouseMove"
      @mouseup="onCanvasMouseUp"
      @mouseleave="onCanvasMouseUp"
    >
      <div 
        v-for="(card, index) in cards" 
        :key="index"
        class="absolute shadow-md cursor-move"
        :style="getCardStyle(card)"
        @mousedown.stop="startDrag(index, $event)"
      >
        <img :src="card.imageUrl" :alt="'Card ' + (index + 1)" class="w-full h-full object-cover">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardCanvas',
  props: {
    canvasWidth: {
      type: Number,
      default: 800
    },
    canvasHeight: {
      type: Number,
      default: 600
    },
    cardWidth: {
      type: Number,
      default: 63
    },
    cardHeight: {
      type: Number,
      default: 88
    }
  },
  data() {
    return {
      cards: [],
      draggingCardIndex: null,
      startX: 0,
      startY: 0
    }
  },
  computed: {
    canvasStyle() {
      return {
        width: `${this.canvasWidth}px`,
        height: `${this.canvasHeight}px`
      }
    }
  },
  methods: {
    addCard(imageUrl) {
      this.cards.push({
        imageUrl,
        x: 0,
        y: 0
      })
    },
    getCardStyle(card) {
      return {
        width: `${this.cardWidth}mm`,
        height: `${this.cardHeight}mm`,
        left: `${card.x}px`,
        top: `${card.y}px`
      }
    },
    startDrag(index, event) {
      this.draggingCardIndex = index
      const card = this.cards[index]
      this.startX = event.clientX - card.x
      this.startY = event.clientY - card.y
    },
    onCanvasMouseDown(event) {
      if (event.target === event.currentTarget) {
        this.draggingCardIndex = null
      }
    },
    onCanvasMouseMove(event) {
      if (this.draggingCardIndex !== null) {
        const card = this.cards[this.draggingCardIndex]
        card.x = Math.max(0, Math.min(event.clientX - this.startX, this.canvasWidth - this.cardWidth))
        card.y = Math.max(0, Math.min(event.clientY - this.startY, this.canvasHeight - this.cardHeight))
      }
    },
    onCanvasMouseUp() {
      this.draggingCardIndex = null
    },
    getCardPositions() {
      return this.cards.map(card => ({ x: card.x, y: card.y }))
    },
    clearCanvas() {
      this.cards = []
    }
  }
}
</script>