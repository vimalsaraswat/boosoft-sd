<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    numInputs: {
      type: Number,
      default: 6,
      validator: (v: number) => v > 0 && v <= 10,
    },
  },

  emits: ['update:modelValue'],

  data() {
    return {
      digits: [] as string[],
    }
  },

  computed: {
    otpValue(): string {
      return this.digits.join('')
    },
  },

  watch: {
    modelValue: {
      immediate: true,
      handler(newVal: string) {
        if (newVal !== this.otpValue) {
          this.syncFromProp(newVal)
        }
      },
    },
    numInputs: {
      immediate: true,
      handler() {
        this.initializeDigits()
        this.syncFromProp(this.modelValue)
      },
    },
  },

  methods: {
    initializeDigits() {
      this.digits = Array(this.numInputs).fill('')
    },
    syncFromProp(value: string) {
      const cleaned = (value || '').replace(/\D/g, '').slice(0, this.numInputs)
      const newDigits = cleaned.split('')
      while (newDigits.length < this.numInputs) {
        newDigits.push('')
      }
      this.digits = newDigits
    },
    emitValue() {
      this.$emit('update:modelValue', this.otpValue)
    },
    focusInput(index: number) {
      this.$nextTick(() => {
        const inputs = this.$refs.inputs as HTMLInputElement[]
        if (inputs && inputs[index]) {
          inputs[index].focus()
        }
      })
    },
    focusFirstInput() {
      this.focusInput(0)
    },
    handleInput(e: Event, index: number) {
      const input = e.target as HTMLInputElement
      const value = input.value

      if (value.length > 1) {
        this.handlePasteData(value, index)
        return
      }

      if (/^\d?$/.test(value)) {
        this.digits[index] = value

        if (value && index < this.numInputs - 1) {
          this.focusInput(index + 1)
        }
        this.emitValue()
      } else {
      }
    },
    handleKeydown(e: KeyboardEvent, index: number) {
      switch (e.key) {
        case 'Backspace':
          if (!this.digits[index] && index > 0) {
            e.preventDefault()
            this.focusInput(index - 1)
          }

          break
        case 'ArrowLeft':
          if (index > 0) {
            e.preventDefault()
            this.focusInput(index - 1)
          }
          break
        case 'ArrowRight':
          if (index < this.numInputs - 1) {
            e.preventDefault()
            this.focusInput(index + 1)
          }
          break
      }
    },
    handlePaste(e: ClipboardEvent) {
      e.preventDefault()
      const pastedData = e.clipboardData?.getData('text') || ''
      this.handlePasteData(pastedData, 0)
    },
    handlePasteData(pastedData: string, startIndex: number) {
      const digitsToPaste = pastedData.replace(/\D/g, '').slice(0, this.numInputs - startIndex)

      if (!digitsToPaste) return

      const newDigits = [...this.digits]
      for (let i = 0; i < digitsToPaste.length; i++) {
        if (startIndex + i < this.numInputs) {
          newDigits[startIndex + i] = digitsToPaste[i] ?? ''
        }
      }
      this.digits = newDigits
      this.emitValue()

      const focusIndex = Math.min(startIndex + digitsToPaste.length, this.numInputs - 1)
      this.focusInput(focusIndex)
    },
    handleFocus(e: Event) {
      ;(e.target as HTMLInputElement).select()
    },
  },

  mounted() {
    this.focusFirstInput()
  },
})
</script>

<template>
  <div class="flex justify-center gap-3">
    <input
      v-for="(_, index) in Array.from({ length: numInputs })"
      :key="index"
      ref="inputs"
      :value="digits[index]"
      type="text"
      inputmode="numeric"
      maxlength="1"
      class="w-14 h-14 text-center text-2xl font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
      @input="handleInput($event, index)"
      @keydown="handleKeydown($event, index)"
      @paste="handlePaste"
      @focus="handleFocus"
    />
  </div>
</template>
