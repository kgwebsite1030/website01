<script lang='ts' setup>
const sendList = reactive({

  name: '',
  email: '',
  subject: '',
  message: '',

})

function sendMessage(e: Event) {
  e.preventDefault()
  if (sendList.name && sendList.email && sendList.subject && sendList.message) {
    ElNotification({

      message: h('i', { style: 'color: teal' }, '发送成功'),
    })
    // 清空表单数据
    sendList.name = ''
    sendList.email = ''
    sendList.subject = ''
    sendList.message = ''
  }
}
</script>

<template>
  <div class="mx-auto px-6 max-w-7xl">
    <main class="py-12 flex-1">
      <div class="mx-auto px-6 container">
        <!-- <div class="text-sm text-gray-600 mb-8">
          <a class="transition-colors hover:text-gray-900" data-discover="true" href="/">Home</a>
          <span class="mx-2">/</span><span class="text-gray-900 font-medium">Contact Us</span>
        </div> -->
        <h1 class="text-2xl text-gray-800 font-medium mb-10">
          Contact Us
        </h1>
        <div class="flex flex-col gap-10 lg:flex-row">
          <div class="w-full lg:w-1/3">
            <div class="p-6 border border-gray-200 h-full">
              <h2 class="text-xl text-gray-800 font-medium mb-6">
                Contact
                Information
              </h2>
              <div class="space-y-6">
                <div class="flex items-start">
                  <div class="mr-4 p-3 rounded-full bg-gray-100">
                    <i
                      class="fa-solid fa-map-marker-alt text-gray-700"
                    />
                  </div>
                  <div>
                    <h3 class="text-gray-800 font-medium mb-1">
                      Address
                    </h3>
                    <p class="text-gray-600">
                      123 Commerce Street, Business District<br>New York, NY 10001, USA
                    </p>
                  </div>
                </div>
                <div class="flex items-start">
                  <div class="mr-4 p-3 rounded-full bg-gray-100">
                    <i class="fa-solid fa-phone text-gray-700" />
                  </div>
                  <div>
                    <h3 class="text-gray-800 font-medium mb-1">
                      Phone
                    </h3>
                    <p class="text-gray-600">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>
                <div class="flex items-start">
                  <div class="mr-4 p-3 rounded-full bg-gray-100">
                    <i class="fa-solid fa-envelope text-gray-700" />
                  </div>
                  <div>
                    <h3 class="text-gray-800 font-medium mb-1">
                      Email
                    </h3>
                    <p class="text-gray-600">
                      info@minimal.com
                    </p>
                  </div>
                </div>
                <div class="flex items-start">
                  <div class="mr-4 p-3 rounded-full bg-gray-100">
                    <i class="fa-solid fa-clock text-gray-700" />
                  </div>
                  <div>
                    <h3 class="text-gray-800 font-medium mb-1">
                      Hours
                    </h3>
                    <p class="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM<br>Saturday: 10:00 AM - 4:00 PM<br>Sunday:
                      Closed
                    </p>
                  </div>
                </div>
              </div>
              <div v-show="false" class="mt-8">
                <h3 class="text-gray-800 font-medium mb-3">
                  Follow Us
                </h3>
                <div class="flex space-x-4">
                  <a
                    class="text-gray-700 p-3 rounded-full bg-gray-100 transition-colors hover:bg-gray-200" href="#"
                  ><i
                    class="fa-brands fa-facebook-f"
                  /></a><a
                    class="text-gray-700 p-3 rounded-full bg-gray-100 transition-colors hover:bg-gray-200" href="#"
                  ><i
                    class="fa-brands fa-instagram"
                  /></a><a
                    class="text-gray-700 p-3 rounded-full bg-gray-100 transition-colors hover:bg-gray-200" href="#"
                  ><i
                    class="fa-brands fa-twitter"
                  /></a><a
                    class="text-gray-700 p-3 rounded-full bg-gray-100 transition-colors hover:bg-gray-200" href="#"
                  ><i
                    class="fa-brands fa-pinterest"
                  /></a>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full lg:w-2/3">
            <div class="p-6 border border-gray-200">
              <h2 class="text-xl text-gray-800 font-medium mb-6">
                Send Us a
                Message
              </h2>
              <form class="space-y-6" @submit="sendMessage">
                <div class="gap-6 grid grid-cols-1 md:grid-cols-2">
                  <div>
                    <label class="text-sm text-gray-700 mb-2 block">Your Name *</label><input
                      v-model="sendList.name" class="px-4 py-2 border border-gray-300 w-full focus:border-gray-400"
                      name="name" placeholder="John Doe" type="text" required
                    >
                  </div>
                  <div>
                    <label class="text-sm text-gray-700 mb-2 block">Your Email *</label><input
                      v-model="sendList.email" class="px-4 py-2 border border-gray-300 w-full focus:border-gray-400"
                      name="email" placeholder="john@example.com" type="email" required
                    >
                  </div>
                </div>
                <div>
                  <label class="text-sm text-gray-700 mb-2 block">Subject</label><input
                    v-model="sendList.subject" class="px-4 py-2 border border-gray-300 w-full focus:border-gray-400"
                    name="subject" placeholder="How can we help you?" type="text" required
                  >
                </div>
                <div>
                  <label class="text-sm text-gray-700 mb-2 block">Message *</label><textarea
                    v-model="sendList.message" class="px-4 py-2 border border-gray-300 w-full focus:border-gray-400"
                    name="message" placeholder="Please enter your message here..." required rows="5"
                  />
                </div>
                <button class="text-white py-3 bg-gray-800 w-full transition-colors hover:bg-gray-900" type="submit" plain>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
        <div class="mt-12">
          <div class="rounded-lg bg-gray-100 aspect-[16/9] relative overflow-hidden">
            <div class="flex items-center inset-0 justify-center absolute">
              <div class="text-center">
                <!-- <i class="fa-solid fa-map-marked-alt text-4xl text-gray-400 mb-4" /> -->
                <p class="text-gray-600">
                  <!-- Map view would appear here -->
                  <img src="/map.png" alt="">
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>

</style>
