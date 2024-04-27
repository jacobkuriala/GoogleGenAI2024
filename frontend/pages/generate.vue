<template>
  <div
    class="page-generate w-full h-full flex justify-center items-center px-16 pt-16 pb-12 gap-x-5"
  >
    <div class="generate-ui w-full grid grid-cols-12 gap-5 h-full">
      <GeminiOutput
        :output="output"
        placeholder="Lorem ipsum dolor sit amet consectetur. Nulla vitae scelerisque
        dignissim a..."
      />
      <aside
        class="input col-span-3 flex flex-col items-start gap-4 border bg-gradient-to-br from-[#131B2D] to-[#0A1021] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] p-4 rounded-xl border-solid border-slate-500/30"
      >
        <div
          class="input-group input__text-prompt flex flex-col items-start gap-3 self-stretch"
        >
          <label for="text-prompt" class="input-label"
            >Create a story from text prompt</label
          >
          <textarea
            id="text-prompt"
            class="text-area"
            v-model="inputPrompt"
            placeholder="Enter your text prompt"
          ></textarea>
          <div
            class="text-prompt__actions flex justify-center items-end gap-2 self-stretch"
          >
            <button
              class="btn icon-btn flex justify-center items-center gap-2 self-stretch border px-4 rounded-full border-solid border-corporate-500 hover:bg-corporate-500/20 transition-colors duration-150"
              @click="variateTextOutput"
            >
              <Icon
                name="heroicons:arrow-path-rounded-square-solid"
                class="text-corporate-500 h-5 w-5"
                
              />
            </button>
            <button
              class="btn icon-btn flex justify-center items-center flex-[1_0_0] px-10 py-1 gap-2 self-stretch border rounded-full border-solid border-corporate-500 bg-corporate-500 text-black hover:border-corporate-500/80 hover:bg-corporate-500/80 transition-colors duration-150 text-base font-normal"
              @click="generateTextOutput"
              >
              Generate
            </button>
          </div>
        </div>
        <!-- Genre -->
        <div
          class="input-group input__genre flex flex-col items-start gap-3 self-stretch"
        >
          <label for="genre" class="input-label">Choose a genre</label>
          <div
            class="flex items-start content-start gap-2 self-stretch flex-wrap text-slate-50/60"
          >
            <Pill
              v-for="genre in genres"
              :key="genre.text"
              :text="genre.text"
              @click="selectGenre(genre.text)"
              :selected="selectedGenre && selectedGenre.text === genre.text"
              :color="genre.color"
            />
            <button
              class="custom-genre__button w-fit flex items-center gap-1 px-2 pl-1 py-0.5 rounded-full text-xs font-normal leading-4 hover:bg-slate-500/20 transition-colors duration-150"
              v-if="!isCustomGenre"
              @click="toggleCustomGenre"
            >
              <Icon name="heroicons:plus-solid" class="" />
              Other
            </button>
            <input
              id="genre"
              type="text"
              class="custom-genre__input w-fit text-slate-50/60shadow-custom px-2 py-0.5 rounded-lg border-solid border-black bg-black focus:outline-none focus:border-corporate-500 focus:ring-1 focus:ring-corporate-500 placeholder:text-slate-600 text-slate-600 text-xs font-normal leading-4"
              placeholder="Enter custom genre"
              v-model="customGenreText"
              @keydown.enter="addCustomGenre"
              v-else
            />
          </div>
        </div>
        <!-- Audience -->
        <div
          class="input-group input__audience flex flex-col items-start gap-3 self-stretch"
        >
          <label for="audience" class="input-label"
            >Choose a target audience</label
          >
          <div
            class="flex items-start content-start gap-2 self-stretch flex-wrap text-slate-50/60"
          >
            <Pill
              v-for="audience in audiences"
              :key="audience.text"
              :text="audience.text"
              @click="selectAudience(audience.text)"
              :selected="
                selectedAudience && selectedAudience.text === audience.text
              "
              :color="audience.color"
            />
            <button
              class="custom-audience__button w-fit flex items-center gap-1 px-2 pl-1 py-0.5 rounded-full text-xs font-normal leading-4 hover:bg-slate-500/20 transition-colors duration-150"
              v-if="!isCustomAudience"
              @click="toggleCustomAudience"
            >
              <Icon name="heroicons:plus-solid" class="" />
              Other
            </button>
            <input
              id="audience"
              type="text"
              class="custom-audience__input w-fit text-slate-50/60shadow-custom px-2 py-0.5 rounded-lg border-solid border-black bg-black focus:outline-none focus:border-corporate-500 focus:ring-1 focus:ring-corporate-500 placeholder:text-slate-600 text-slate-600 text-xs font-normal leading-4"
              placeholder="Enter custom audience"
              v-model="customAudienceText"
              @keydown.enter="addCustomAudience"
              v-else
            />
          </div>
        </div>
        <!-- Word Length -->
        <div
          class="input-group input__audience flex flex-col items-start gap-3 self-stretch"
        >
          <label for="audience" class="input-label"
            >What should the word length be?</label
          >

          <div class="audience__range relative mb-6 w-full">
            <input
              id="audience"
              type="range"
              v-model="wordLength"
              min="100"
              max="1500"
              class="w-full h-2 bg-slate-700 rounded-lg cursor-pointer appearance-none"
            />
            <span
              class="text-sm text-slate-500 dark:text-slate-400 absolute start-0 -bottom-6"
              >100</span
            >
            <span
              class="text-sm text-slate-500 dark:text-slate-400 absolute start-1/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6"
              >500</span
            >
            <span
              class="text-sm text-slate-500 dark:text-slate-400 absolute start-2/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6"
              >1000</span
            >
            <span
              class="text-sm text-slate-500 dark:text-slate-400 absolute end-0 -bottom-6"
              >1500</span
            >
          </div>
        </div>
        <!-- Cover Image -->
        <div
          class="input-group input__audience w-full flex flex-col items-between gap-3 "
        >
          <label for="audience" class="input-label">Cover Image</label>
          <div
            class="w-full flex flex-col justify-center items-center gap-2 px-0 py-3 "
          >
            <button
              class="btn flex justify-center items-center text-center w-fit px-4 py-1 gap-2 border rounded-full border-solid border-corporate-500 bg-corporate-500 text-black hover:border-corporate-500/80 hover:bg-corporate-500/80 transition-colors duration-150 text-base font-normal"
              @click="generateAICover"
            >
              Generate AI Cover
            </button>
            <span class="text-slate-600 text-lg font-normal">or</span>
            <button
              class="btn flex justify-center items-center text-center w-fit px-4 py-1 gap-2 border rounded-full text-corporate-500 border-solid border-corporate-500 hover:bg-corporate-500/20 transition-colors duration-15 text-base font-normal"
              @click="uploadCoverImage"
            >
              Upload your own
            </button>
          </div>
        </div>
        <!-- Submit Button -->
        <div
          class="input-group input__submit flex flex-col justify-end items-center gap-2  self-stretch flex-[1_0_0]"
        >
          <button
            class="btn flex h-10 justify-center items-center gap-2 self-stretch bg-slate-400 hover:bg-slate-400/80 trasition-colors duration-150 px-10 py-1.5 rounded-lg"
            @click="submit"
          >
            Generate
          </button>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// If you want to limit access to this page to authenticated users only, uncomment the following line
// definePageMeta({
//   middleware: "auth",
// });
const output = ref<string | undefined | null>("");
const inputPrompt = ref<string | undefined | null>("");

//Text promt
const variateTextOutput = () => {
  console.log("Variate Text Output");
};
const generateTextOutput = () => {
  console.log("Generate Text Output");
};

//Genres
const genres = ref([
  { text: "Adventure", color: "indigo-400" },
  { text: "Fantasy", color: "green-400" },
  { text: "Sci-Fi", color: "purple-400" },
  { text: "Romance", color: "pink-400" },
  { text: "Thriller", color: "yellow-400" },
]);
const selectedGenre = ref<{ text: string; color: string } | null>(null);
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
  { text: "Kids", color: "indigo-400" },
  { text: "Teens", color: "green-400" },
  { text: "Adults", color: "purple-400" },
  { text: "Elders", color: "pink-400" },
  { text: "All", color: "yellow-400" },
]);
const selectedAudience = ref<{ text: string; color: string } | null>(null);
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

//Word Length
const wordLength = ref(1000);

// watch(wordLength, (newLength, oldLength) => {
//   console.log(
// `The word length has changed from ${oldLength} to ${newLength}`
//   );
// });

//Cover Image
const generateAICover = () => {
  console.log("Generate AI Cover");
};
const uploadCoverImage = () => {
  console.log("Upload Cover Image");
};

//Submit Button
const submit = () => {
  console.log("Submit");
};
</script>

<style lang="postcss" scoped>
.input-label {
  @apply text-slate-400 text-sm font-normal leading-4;
}
.text-area {
  @apply flex w-full h-20 items-start gap-2 self-stretch border bg-black shadow-custom p-2 rounded-lg border-solid border-black focus:outline-none focus:border-corporate-500 focus:ring-1  focus:ring-corporate-500 placeholder:text-slate-600 text-slate-600 text-xs font-normal leading-4;
}
</style>
