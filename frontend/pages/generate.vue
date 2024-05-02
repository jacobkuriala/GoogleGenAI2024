<template>
  <AuthGuard :isLoggedIn="isLoggedIn">
    <div
      class="page-generate w-full h-screen max-h-screen flex justify-center items-center px-16 pt-20 pb-12 gap-x-5"
    >
      <div
        class="generate-ui w-full grid grid-cols-12 grid-rows-1 gap-5 h-full max-h-full"
      >
        <GeminiOutput
          :output="output"
          placeholder="Lorem ipsum dolor sit amet consectetur. Nulla vitae scelerisque
         dignissim a..."
          :loading="isOutputLoading"
          class="col-span-7"
        />
        <aside
          class="input col-span-5 row-span-1 flex flex-col gap-0 items-start border bg-gradient-to-b from-[#131B2D] to-[#0A1021] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] p-4 px-0 rounded-xl border-solid border-slate-500/30 max-h-full"
        >
          <StepHeader :step="currentStep" :totalSteps="totalSteps" />
          <!-- Step 0 Author-->
          <template v-if="currentStep.index === 0">
            <main
              class="scroll-container relative overflow-y-auto flex flex-col items-start gap-4 h-full w-full px-4 pb-14"
            >
              <!-- Genre -->
              <div
                class="input-group input__genre w-full flex flex-col items-start gap-3 self-stretch"
              >
                <label for="genre" class="input-label">Choose a genre</label>
                <div
                  class="flex items-start content-start gap-2 self-stretch flex-wrap text-slate-50/80 py-2 px-1"
                >
                  <Pill
                    v-for="genre in genres"
                    :key="genre.text"
                    :text="genre.text"
                    @click="selectGenre(genre.text)"
                    :selected="
                      selectedGenre && selectedGenre.text === genre.text
                    "
                    :color="genre.color"
                  />
                  <button
                    class="custom-genre__button w-fit flex items-center gap-1 px-2 pl-1 py-0.5 rounded-full text-base font-normal hover:bg-slate-500/20 transition-colors duration-150"
                    v-if="!isCustomGenre"
                    @click="toggleCustomGenre"
                  >
                    <Icon name="heroicons:plus-solid" class="" />
                    Other
                  </button>
                  <input
                    id="genre"
                    type="text"
                    class="custom-genre__input w-fit text-slate-50/80shadow-custom px-2 py-0.5 rounded-lg border-solid border-black bg-black focus:outline-none focus:border-corporate-500 focus:ring-1 focus:ring-corporate-500 placeholder:text-slate-600 text-slate-600 text-base font-normal"
                    placeholder="Enter custom genre"
                    v-model="customGenreText"
                    @keydown.enter="addCustomGenre"
                    v-else
                  />
                </div>
              </div>

              <!-- Audience -->
              <div
                class="input-group input__audience w-full flex flex-col items-start gap-3 self-stretch"
              >
                <label for="audience" class="input-label"
                  >Choose a target audience</label
                >
                <div
                  class="flex items-start content-start gap-2 self-stretch flex-wrap text-slate-50/80 py-2 px-1"
                >
                  <Pill
                    v-for="audience in audiences"
                    :key="audience.text"
                    :text="audience.text"
                    @click="selectAudience(audience.text)"
                    :selected="
                      selectedAudience &&
                      selectedAudience.text === audience.text
                    "
                    :color="audience.color"
                  />
                  <button
                    class="custom-audience__button w-fit flex items-center gap-1 px-2 pl-1 py-0.5 rounded-full text-base font-normal hover:bg-slate-500/20 transition-colors duration-150"
                    v-if="!isCustomAudience"
                    @click="toggleCustomAudience"
                  >
                    <Icon name="heroicons:plus-solid" class="" />
                    Other
                  </button>
                  <input
                    id="audience"
                    type="text"
                    class="custom-audience__input w-fit text-slate-50/80shadow-custom px-2 py-0.5 rounded-lg border-solid border-black bg-black focus:outline-none focus:border-corporate-500 focus:ring-1 focus:ring-corporate-500 placeholder:text-slate-600 text-slate-600 text-base font-normal"
                    placeholder="Enter custom audience"
                    v-model="customAudienceText"
                    @keydown.enter="addCustomAudience"
                    v-else
                  />
                </div>
                <div
                  class="flex flex-col items-center gap-2 self-stretch px-0 py-4"
                >
                  <button
                    class="flex h-10 justify-center items-center gap-2 bg-corporate-500 hover:bg-corporate-500/60 px-10 py-1.5 rounded-full"
                    @click="generateAuthor"
                  >
                    <span
                      class="text-slate-300 text-xl font-normal uppercase"
                      v-if="!isLoading"
                      >Generate Author</span
                    >
                    <div role="status" v-else>
                      <svg
                        aria-hidden="true"
                        class="w-14 h-4 text-slate-800 animate-spin fill-corporate-500"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>
                  </button>
                </div>
                <!-- Author Prom -->
                <div
                  class="input-group input__text-prompt w-full flex flex-col items-start gap-3"
                >
                  <label for="text-prompt" class="input-label"
                    >Author definition:</label
                  >
                  <textarea
                    id="text-prompt"
                    class="text-area"
                    placeholder="Choose a genre and an audience and click 'Generate Author'"
                    v-model="author"
                    :disabled="isLoading || isOutputLoading"
                  ></textarea>
                </div>
              </div>
            </main>
            <!-- form actions -->
            <div
              class="form-actions flex flex-col justify-end items-center gap-2 flex-[1_0_0] self-stretch px-4 pb-2 shadow-[0px_-84px_23px_0px_rgba(12,17,34,0.1),0px_-54px_21px_0px_rgba(12,17,34,0.4),0px_-30px_18px_0px_rgba(12,17,34,0.7),0px_-13px_13px_0px_rgba(12,17,34,0.8),0px_-3px_7px_0px_rgba(12,17,34,1)] z-20"
            >
              <div class="flex flex-col items-start gap-2 self-stretch">
                <div class="flex items-start gap-2 self-stretch">
                  <button
                    class="btn flex h-14 justify-center items-center gap-2 flex-[1_0_0] bg-corporate-500 hover:bg-corporate-500/80 px-10 py-1.5 rounded-full"
                    @click="setAuthor(author)"
                  >
                    <div class="flex flex-col justify-center items-center">
                      <span
                        class="top text-slate-300 text-xl font-normal leading-[normal] uppercase"
                      >
                        Next
                      </span>
                      <span
                        class="text-slate-400 text-sm font-normal leading-4"
                      >
                        Premise
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </template>
          <!-- Step 1 Premise-->
          <template v-if="currentStep.index === 1">
            <main
              class="scroll-container relative overflow-y-auto flex flex-col items-start gap-4 h-full w-full px-4 pb-14"
            >
              <!-- Premise Prompt -->
              <div
                class="input-group input__text-prompt w-full flex flex-col items-start gap-3"
              >
                <label for="text-prompt" class="input-label">Premise:</label>
                <textarea
                  id="text-prompt"
                  class="text-area"
                  placeholder="Premise Placeholder"
                  v-model="premise"
                  :disabled="isLoading || isOutputLoading"
                ></textarea>
              </div>
              <div
                class="flex flex-col items-center gap-2 self-stretch px-0 py-4"
              >
                <button
                  class="flex h-10 justify-center items-center gap-2 border border-solid border-corporate-500 hover:bg-corporate-500/30 px-10 py-1.5 rounded-full"
                  @click="regeneratePremise"
                >
                  <Icon
                    name="heroicons:arrow-path-rounded-square-solid"
                    class="w-6 h-6 text-corporate-500"
                  />
                  <span
                    class="text-corporate-400 text-xl font-normal uppercase"
                    v-if="!isLoading"
                  >
                    Regenerate Premise</span
                  >
                  <div role="status" v-else>
                    <svg
                      aria-hidden="true"
                      class="w-14 h-4 text-slate-800 animate-spin fill-corporate-500"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span class="sr-only">Loading...</span>
                  </div>
                </button>
              </div>
            </main>
            <!-- form actions -->
            <div
              class="form-actions flex flex-col justify-end items-center gap-2 flex-[1_0_0] self-stretch px-4 pb-2 shadow-[0px_-84px_23px_0px_rgba(12,17,34,0.1),0px_-54px_21px_0px_rgba(12,17,34,0.4),0px_-30px_18px_0px_rgba(12,17,34,0.7),0px_-13px_13px_0px_rgba(12,17,34,0.8),0px_-3px_7px_0px_rgba(12,17,34,1)] z-20"
            >
              <div class="flex flex-col items-start gap-2 self-stretch">
                <div class="flex items-start gap-4 self-stretch">
                  <button
                    class="btn flex h-14 justify-center items-center gap-2 flex-[1_0_0] border px-10 py-1.5 rounded-full border-solid border-corporate-500 hover:bg-corporate-500/30"
                    @click="backStep"
                  >
                    <div class="flex flex-col justify-center items-center">
                      <span
                        class="top text-corporate-400 text-xl font-normal leading-[normal] uppercase"
                      >
                        Back
                      </span>
                      <span
                        class="text-corporate-500 text-sm font-normal leading-4"
                      >
                        Author
                      </span>
                    </div>
                  </button>
                  <button
                    class="btn flex h-14 justify-center items-center gap-2 flex-[1_0_0] bg-corporate-500 hover:bg-corporate-500/80 px-10 py-1.5 rounded-full"
                    @click="setPremise(premise)"
                  >
                    <div class="flex flex-col justify-center items-center">
                      <span
                        class="top text-slate-300 text-xl font-normal leading-[normal] uppercase"
                      >
                        Next
                      </span>
                      <span
                        class="text-slate-400 text-sm font-normal leading-4"
                      >
                        Outline
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </template>
          <!-- Step 2 Outline-->
          <template v-if="currentStep.index === 2">
            <main
              class="scroll-container relative overflow-y-auto flex flex-col items-start gap-4 h-full w-full px-4 pb-14"
            >
              <!-- Outline Prompt -->
              <div
                class="input-group input__text-prompt w-full flex flex-col items-start gap-3"
              >
                <label for="text-prompt" class="input-label">Outline:</label>
                <textarea
                  id="text-prompt"
                  class="text-area"
                  placeholder="Outline Placeholder"
                  v-model="outline"
                  :disabled="isLoading || isOutputLoading"
                ></textarea>
              </div>
              <div
                class="flex flex-col items-center gap-2 self-stretch px-0 py-4"
              >
                <button
                  class="flex h-10 justify-center items-center gap-2 border border-solid border-corporate-500 hover:bg-corporate-500/30 px-10 py-1.5 rounded-full"
                  @click="regenerateOutline"
                >
                  <Icon
                    name="heroicons:arrow-path-rounded-square-solid"
                    class="w-6 h-6 text-corporate-500"
                  />
                  <span
                    class="text-corporate-400 text-xl font-normal uppercase"
                    v-if="!isLoading"
                  >
                    Regenerate Outline</span
                  >
                  <div role="status" v-else>
                    <svg
                      aria-hidden="true"
                      class="w-14 h-4 text-slate-800 animate-spin fill-corporate-500"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span class="sr-only">Loading...</span>
                  </div>
                </button>
              </div>
            </main>
            <!-- form actions -->
            <div
              class="form-actions flex flex-col justify-end items-center gap-2 flex-[1_0_0] self-stretch px-4 pb-2 shadow-[0px_-84px_23px_0px_rgba(12,17,34,0.1),0px_-54px_21px_0px_rgba(12,17,34,0.4),0px_-30px_18px_0px_rgba(12,17,34,0.7),0px_-13px_13px_0px_rgba(12,17,34,0.8),0px_-3px_7px_0px_rgba(12,17,34,1)] z-20"
            >
              <div class="flex flex-col items-start gap-2 self-stretch">
                <div class="flex items-start gap-4 self-stretch">
                  <button
                    class="btn flex h-14 justify-center items-center gap-2 flex-[1_0_0] border px-10 py-1.5 rounded-full border-solid border-corporate-500 hover:bg-corporate-500/30"
                    @click="backStep"
                  >
                    <div class="flex flex-col justify-center items-center">
                      <span
                        class="top text-corporate-400 text-xl font-normal leading-[normal] uppercase"
                      >
                        Back
                      </span>
                      <span
                        class="text-corporate-500 text-sm font-normal leading-4"
                      >
                        Premise
                      </span>
                    </div>
                  </button>
                  <button
                    class="btn flex h-14 justify-center items-center gap-2 flex-[1_0_0] bg-corporate-500 hover:bg-corporate-500/80 px-10 py-1.5 rounded-full"
                    @click="setOutline(outline)"
                  >
                    <div class="flex flex-col justify-center items-center">
                      <span
                        class="top text-slate-300 text-xl font-normal leading-[normal] uppercase"
                      >
                        Next
                      </span>
                      <span
                        class="text-slate-400 text-sm font-normal leading-4"
                      >
                        Story
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </template>
          <!-- Step 3 Story-->
          <template v-if="currentStep.index === 3">
            <main
              class="scroll-container relative overflow-y-auto flex flex-col items-start gap-4 h-full w-full px-4 pb-14"
            >
              <TabGroup v-model="selectedTabIndex" as="div" class="w-full">
                <TabList
                  class="flex items-center gap-2 self-stretch border bg-[#020617] bg-opacity-90 p-1 rounded-lg border-solid border-slate-300/20 mb-4"
                >
                  <Tab
                    v-for="(tab, index) in tabs"
                    :key="tab"
                    as="button"
                    class="flex justify-center items-center gap-2 flex-[1_0_0] rounded p-2 text-sm font-normal leading-4"
                    :class="
                      selectedTabIndex === index
                        ? '!bg-corporate-500 ring-2 ring-corporate-400 text-white'
                        : 'text-corporate-500 bg-transparent ring-2 ring-transparent'
                    "
                    @click="selectedTabIndex = index"
                    >{{ tab }}</Tab
                  >
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <div
                      class="input-group input__text-prompt w-full flex flex-col items-start gap-3 relative"
                    >
                      <textarea
                        id="text-prompt"
                        class="text-area"
                        placeholder="Final Story Placeholder"
                        v-model="finalStory"
                        :disabled="isLoading || isOutputLoading"
                      ></textarea>
                      <button
                        class="flex h-10 justify-center items-center gap-2 absolute bg-corporate-500 px-6 py-1.5 rounded-full right-3 bottom-4"
                        v-if="showContinueButton"
                      >
                        <span
                          class="text-slate-300 text-base font-normal leading-[normal] uppercase"
                          >Continue</span
                        >
                      </button>
                    </div>
                  </TabPanel>
                  <!-- tab 2: guidelines -->
                  <TabPanel>
                    <div
                      class="input-group input__text-prompt w-full flex flex-col items-start gap-3 relative"
                    >
                      <textarea
                        id="text-prompt"
                        class="text-area"
                        placeholder="Choose a genre and an audience and click 'Generate Author'"
                        v-model="guidelines"
                        :disabled="isLoading || isOutputLoading"
                      ></textarea>
                    </div>
                  </TabPanel>
                </TabPanels>
              </TabGroup>
              <div
                class="flex flex-col items-center gap-2 self-stretch px-0 py-4"
              >
                <button
                  class="flex h-10 justify-center items-center gap-2 border border-solid border-corporate-500 hover:bg-corporate-500/30 px-10 py-1.5 rounded-full"
                  @click="regenerateStory"
                >
                  <Icon
                    name="heroicons:arrow-path-rounded-square-solid"
                    class="w-6 h-6 text-corporate-500"
                  />
                  <span
                    class="text-corporate-400 text-xl font-normal uppercase"
                    v-if="!isLoading"
                  >
                    Regenerate Story</span
                  >
                  <div role="status" v-else>
                    <svg
                      aria-hidden="true"
                      class="w-14 h-4 text-slate-800 animate-spin fill-corporate-500"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span class="sr-only">Loading...</span>
                  </div>
                </button>
              </div>
            </main>
            <!-- form actions -->
            <div
              class="form-actions flex flex-col justify-end items-center gap-2 flex-[1_0_0] self-stretch px-4 pb-2 shadow-[0px_-84px_23px_0px_rgba(12,17,34,0.1),0px_-54px_21px_0px_rgba(12,17,34,0.4),0px_-30px_18px_0px_rgba(12,17,34,0.7),0px_-13px_13px_0px_rgba(12,17,34,0.8),0px_-3px_7px_0px_rgba(12,17,34,1)] z-20"
            >
              <div class="flex flex-col items-start gap-2 self-stretch">
                <div class="flex items-start gap-4 self-stretch">
                  <button
                    class="btn flex h-14 justify-center items-center gap-2 flex-[1_0_0] border px-4 py-1.5 rounded-full border-solid border-corporate-500 hover:bg-corporate-500/30"
                    @click="backStep"
                  >
                    <div class="flex flex-col justify-center items-center">
                      <span
                        class="top text-corporate-400 text-xl font-normal leading-[normal] uppercase"
                      >
                        Back
                      </span>
                      <span
                        class="text-corporate-500 text-sm font-normal leading-4"
                      >
                        Premise
                      </span>
                    </div>
                  </button>
                  <button
                    class="btn flex h-14 justify-center items-center gap-2 flex-[1_0_0] bg-corporate-500 hover:bg-corporate-500/80 px-4 py-1.5 rounded-full"
                    @click="setFinalStory(finalStory)"
                  >
                    <div class="flex flex-col justify-center items-center">
                      <span
                        class="top text-slate-300 text-xl font-normal leading-[normal] uppercase"
                      >
                        Finish Story
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </template>
        </aside>
      </div>
    </div>
  </AuthGuard>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";

const { fetchAuthor, fetchPremise, fetchOutline, fetchFinalStory } =
  useStoryApi();

const mainStore = useMainStore();
const storyStore = useStoryStore();
const isLoggedIn = ref(true);
const isOutputLoading = ref(false);
const isLoading = ref(false);
const output = ref("");

//api debug
const debug = ref(false);
// If you want to limit access to this page to authenticated users only, uncomment the following line
// definePageMeta({
//   middleware: ["auth"],
// });

/**
 * Steps
 */
const steps = [
  {
    index: 0,
    title: "Meet the author",
    description:
      "Lorem ipsum dolor sit amet consectetur. Enim malesuada facilisi sed tortor sed vehicula. Duis.",
  },
  {
    index: 1,
    title: "Craft your premise",
    description:
      "Lorem ipsum dolor sit amet consectetur. Enim malesuada facilisi sed tortor sed vehicula. Duis.",
  },
  {
    index: 2,
    title: "Outline your story",
    description:
      "Lorem ipsum dolor sit amet consectetur. Enim malesuada facilisi sed tortor sed vehicula. Duis.",
  },

  {
    index: 3,
    title: "Expand your story",
    description:
      "Lorem ipsum dolor sit amet consectetur. Enim malesuada facilisi sed tortor sed vehicula. Duis.",
  },
];
const currentStep = ref(steps[0]);
const totalSteps = steps.length - 1;

const nextStep = () => {
  const nextIndex = currentStep.value.index + 1;
  if (nextIndex < steps.length) {
    currentStep.value = steps[nextIndex];
  }
};
const backStep = () => {
  const prevIndex = currentStep.value.index - 1;
  if (prevIndex >= 0) {
    currentStep.value = steps[prevIndex];
  }
};
/**
 * Step 0: Author
 */

//Genres
const genres = ref([
  { text: "Adventure", color: "bg-indigo-400/80" },
  { text: "Fantasy", color: "bg-green-400/80" },
  { text: "Sci-Fi", color: "bg-purple-400/80" },
  { text: "Romance", color: "bg-pink-400/80" },
  { text: "Thriller", color: "bg-yellow-400/80" },
]);
const selectedGenre = ref<{ text: string; color: string } | null>(
  genres.value[0]
);
const customGenreText = ref(""); // Nueva referencia para el texto del input
const isCustomGenre = ref(false);

const selectGenre = (genre: string) => {
  selectedGenre.value = { text: genre, color: "" };
  isCustomGenre.value = false;
};
const toggleCustomGenre = () => {
  isCustomGenre.value = !isCustomGenre.value;
  selectedGenre.value = null;
};
const addCustomGenre = () => {
  if (customGenreText.value) {
    genres.value.push({ text: customGenreText.value, color: "slate-50" });
    selectedGenre.value = { text: customGenreText.value, color: "slate-50" };
    customGenreText.value = "";
  }
  isCustomGenre.value = false;
};

//Audiences
const audiences = ref([
  { text: "Kids", color: "bg-indigo-40/80" },
  { text: "Teens", color: "bg-green-400/80" },
  { text: "Adults", color: "bg-purple-400/80" },
  { text: "Elders", color: "bg-pink-400/80" },
  { text: "All", color: "bg-yellow-400/80" },
]);
const selectedAudience = ref<{ text: string; color: string } | null>(
  audiences.value[0]
);
const customAudienceText = ref(""); // Nueva referencia para el texto del input
const isCustomAudience = ref(false);

const selectAudience = (audience: string) => {
  selectedAudience.value = { text: audience, color: "" };
  isCustomAudience.value = false;
};
const toggleCustomAudience = () => {
  isCustomAudience.value = !isCustomAudience.value;
  selectedAudience.value = null;
};
const addCustomAudience = () => {
  if (customAudienceText.value) {
    audiences.value.push({ text: customAudienceText.value, color: "slate-50" });
    selectedAudience.value = {
      text: customAudienceText.value,
      color: "slate-50",
    };
    customAudienceText.value = "";
  }
  isCustomAudience.value = false;
};

const author = ref(storyStore.author || "");

const generateAuthor = async () => {
  isLoading.value = true;
  author.value = await fetchAuthor(
    selectedGenre.value?.text || "",
    selectedAudience.value?.text || ""
  );
  // Here implement the logic to generate the author via AI
  console.log("Author generated", author.value);
  isLoading.value = false;
};

const regenerateAuthor = async () => {
  isLoading.value = true;
  author.value = await fetchAuthor(
    selectedGenre.value?.text || "",
    selectedAudience.value?.text || ""
  );
  console.log("Author regenerated", author.value);
  isLoading.value = false;
};
const setAuthor = (text: string) => {
  storyStore.setAuthor(text);
  output.value =
    '<h2 class="step-label ">Step 0: Author</h2>' +
    "<div>" +
    text +
    "</div>" +
    '<span class="spacer"></span>';
  isOutputLoading.value = true;
  handleGeneratePremise();
  nextStep();
  setTimeout(() => {
    isOutputLoading.value = false;
  }, 2000);
};

/**
 * Step 1: Premise
 */
const premise = ref(storyStore.premise || "");
const setPremise = (text: string) => {
  output.value =
    '<h2 class="step-label ">Step 0: Author</h2>' +
    "<div>" +
    storyStore.author +
    "</div>" +
    '<span class="spacer"></span>' +
    '<h2 class="step-label ">Step 1: Premise</h2>' +
    "<div>" +
    text +
    "</div>" +
    '<span class="spacer"></span>';
  handleGenerateOutline();
  isOutputLoading.value = true;
  nextStep();
  setTimeout(() => {
    isOutputLoading.value = false;
  }, 2000);
};
const handleGeneratePremise = async () => {
  premise.value = await fetchPremise(storyStore.author, debug.value);
};
const regeneratePremise = async () => {
  isLoading.value = true;
  premise.value = await fetchPremise(storyStore.author, debug.value);
  isLoading.value = false;
};

/**
 * Step 2: Outline
 */
const outline = ref(storyStore.outline || "");
const setOutline = (text: string) => {
  output.value =
    '<h2 class="step-label ">Step 0: Author</h2>' +
    "<div>" +
    storyStore.author +
    "</div>" +
    '<span class="spacer"></span>' +
    '<h2 class="step-label ">Step 1: Premise</h2>' +
    "<div>" +
    storyStore.premise +
    "</div>" +
    '<span class="spacer"></span>' +
    '<h2 class="step-label ">Step 2: Outline</h2>' +
    "<div>" +
    text +
    "</div>" +
    '<span class="spacer"></span>';
  storyStore.setOutline(text);
  isOutputLoading.value = true;
  handleGenerateFinalStory();
  nextStep();
  setTimeout(() => {
    isOutputLoading.value = false;
  }, 2000);
};

const handleGenerateOutline = async () => {
  premise.value = await fetchOutline(
    storyStore.author,
    storyStore.premise,
    debug.value
  );
};
const regenerateOutline = async () => {
  isLoading.value = true;
  outline.value = await fetchOutline(
    storyStore.author,
    storyStore.premise,
    debug.value
  );
  isLoading.value = false;
};

/**
 * Step 3: Story
 */
const tabs = ref(["Story Generation", "Guideline prompt"]);
const selectedTabIndex = ref(0);
const showContinueButton = ref(false);

const finalStory = ref(storyStore.finalStory || "");
const guidelines = ref("");
const regenerateStory = () => {
  isLoading.value = true;
  // finalStory.value = await fetchFinalStory(
  //   storyStore.author,
  //   storyStore.premise,
  //   debug.value
  // );
  isLoading.value = false;
};
//Dont know how to implement this
const handleGenerateFinalStory = async () => {
  console.log("Generating final story");
  // finalStory.value = await fetchFinalStory(
  //   storyStore.author,
  //   storyStore.premise,
  //   debug.value
  // );
};
const regenerateFinalStory = async () => {
  isLoading.value = true;
  // finalStory.value = await fetchFinalStory(
  //   storyStore.author,
  //   storyStore.premise,
  //   debug.value
  // );
  isLoading.value = false;
};
const setFinalStory = (text: string) => {
  storyStore.setFinalStory(text);
  output.value =
    '<h2 class="step-label ">Step 0: Author</h2>' +
    "<div>" +
    storyStore.author +
    "</div>" +
    '<span class="spacer"></span>' +
    '<h2 class="step-label ">Step 1: Premise</h2>' +
    "<div>" +
    storyStore.premise +
    "</div>" +
    '<span class="spacer"></span>' +
    '<h2 class="step-label ">Step 2: Outline</h2>' +
    "<div>" +
    storyStore.outline +
    "</div>" +
    '<span class="spacer"></span>' +
    '<h2 class="story-label">Generated Story</h2>' +
    "<div>" +
    text +
    "</div>";
  isOutputLoading.value = true;
  finishStep();
  setTimeout(() => {
    isOutputLoading.value = false;
  }, 2000);
};

const finishStep = () => {
  // Here implement the logic to finish the story
  console.log("Story finished");
};
</script>

<style lang="postcss" scoped>
.input-label {
  @apply text-slate-400 text-base font-normal leading-6;
}
.input-group {
  @apply pr-1;
}

.text-area {
  @apply flex w-full min-h-32  items-start gap-2 self-stretch  px-3 py-4 border bg-black shadow-custom rounded-lg border-solid border-black focus:outline-none focus:border-corporate-500 focus:ring  focus:ring-corporate-500 placeholder:text-slate-600 text-slate-600 text-base font-normal leading-6;
}
.shadow-overlay__bottom {
  @apply [background:linear-gradient(180deg,rgba(0,0,0,0.00)_94.81%,#2E2E2E_100%)];
}
.shadow-overlay__top {
  @apply [background:,linear-gradient(180deg,#2E2E2E_0%,rgba(0,0,0,0.00)_7.08%)];
}
</style>
