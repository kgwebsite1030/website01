<script setup lang="ts">
import { useRequest } from 'alova/client'
import { getIndexCases } from '~/api'

defineOptions({
  name: 'IndexPage',
})

const params = reactive({
  key: '513817480b6713e45eaa59c3037017db',
  id: '9872ed9fc22fc182',
})

const { data } = useRequest(() => getIndexCases(params), { immediately: true })
</script>

<template>
  <div class="mx-auto px-6 max-w-7xl">
    11111111{{ data }}
    <div class="px-6 pt-14 relative isolate lg:px-8">
      <div
        aria-hidden="true"
        class="transform-gpu inset-x-0 absolute overflow-hidden blur-3xl -top-40 -z-10 sm:-top-80"
      >
        <div
          style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
          class="opacity-30 w-144.5 aspect-1155/678 rotate-30 left-[calc(50%-11rem)] relative from-[#ff80b5] to-[#9089fc] bg-linear-to-tr sm:w-288.75 -translate-x-1/2 sm:left-[calc(50%-30rem)]"
        />
      </div>
      <div class="mx-auto py-32 max-w-2xl lg:py-56 sm:py-48">
        <div class="hidden sm:mb-8 sm:flex sm:justify-center">
          <div class="text-sm/6 text-gray-400 px-3 py-1 rounded-full ring-1 ring-white/10 relative hover:ring-white/20">
            Announcing our next round of funding. <a href="#" class="text-indigo-400 font-semibold"><span
              aria-hidden="true" class="inset-0 absolute"
            />Read more <span aria-hidden="true">&rarr;</span></a>
          </div>
        </div>
        <div class="text-center">
          <h1 class="text-5xl tracking-tight font-semibold text-balance sm:text-7xl">
            Data to enrich your
            online business
          </h1>
          <p class="text-lg text-gray-400 font-medium mt-8 text-pretty sm:text-xl/8">
            Anim aute id magna aliqua ad ad non
            deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.
          </p>
          <div class="mt-10 flex gap-x-6 items-center justify-center">
            <a
              href="#"
              class="text-sm font-semibold px-3.5 py-2.5 rounded-md bg-indigo-500 shadow-xs focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2 hover:bg-indigo-400"
            >Get
              started</a>
            <a href="#" class="text-sm/6 font-semibold">Learn more <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        class="transform-gpu inset-x-0 top-[calc(100%-13rem)] absolute overflow-hidden blur-3xl sm:top-[calc(100%-30rem)] -z-10"
      >
        <div
          style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
          class="opacity-30 w-144.5 aspect-1155/678 left-[calc(50%+3rem)] relative from-[#ff80b5] to-[#9089fc] bg-linear-to-tr sm:w-288.75 -translate-x-1/2 sm:left-[calc(50%+36rem)]"
        />
      </div>
    </div>
  </div>
</template>
