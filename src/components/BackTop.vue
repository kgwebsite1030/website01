<script setup lang="ts">
const props = withDefaults(defineProps<{
    target?: string
    right?: number
    bottom?: number
    visibilityHeight?: number
}>(), {
    target: '',
    right: 40,
    bottom: 40,
    visibilityHeight: 200,
})

const isVisible = ref(false)
let scrollTargetEl: HTMLElement | Window | null = null

function getScrollTop(): number {
    if (scrollTargetEl === window || scrollTargetEl === null) {
        return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0
    }
    return (scrollTargetEl as HTMLElement).scrollTop
}

function handleScroll() {
    isVisible.value = getScrollTop() > props.visibilityHeight
}

function bindScrollListener() {
    unbindScrollListener()
    if (typeof window === 'undefined') return
    if (props.target) {
        const el = document.querySelector(props.target) as HTMLElement | null
        scrollTargetEl = el ?? window
    }
    else {
        scrollTargetEl = window
    }
    ;(scrollTargetEl as HTMLElement | Window).addEventListener?.('scroll', handleScroll)
    handleScroll()
}

function unbindScrollListener() {
    if (scrollTargetEl) {
        ;(scrollTargetEl as HTMLElement | Window).removeEventListener?.('scroll', handleScroll)
    }
}

onMounted(() => {
    bindScrollListener()
})

onUnmounted(() => {
    unbindScrollListener()
})

function scrollToTop() {
    if (scrollTargetEl && scrollTargetEl !== window) {
        (scrollTargetEl as HTMLElement).scrollTo({ top: 0, behavior: 'smooth' })
    }
    else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

watch(() => props.target, () => {
    bindScrollListener()
})
</script>

<template>
    <div v-show="isVisible" @click="scrollToTop" class="fixed cursor-pointer" :style="{ right: right + 'px', bottom: bottom + 'px' }">
        <slot>
            <div i-carbon-arrow-up />
        </slot>
    </div>
</template>
