<template>
  <div class="q-pa-md q-gutter-sm">
    <q-editor
      v-model="content"
      min-height="30rem"
      max-height="30rem"
      :dense="$q.screen.lt.md"
      :toolbar="[
        [
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify'],
          },
        ],
        ['bold', 'italic', 'strike', 'underline', 'hr', 'link'],
        ['print', 'fullscreen'],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'],
          },
          {
            label: $q.lang.editor.fontSize,
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7',
            ],
          },
          {
            label: $q.lang.editor.defaultFont,
            icon: $q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana',
            ],
          },
        ],
        ['unordered', 'ordered'],

        ['undo', 'redo'],
      ]"
      :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana',
      }"
    />
  </div>
</template>

<script>
import { useContentStore } from "../stores/content";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const store = useContentStore();
    const { content } = storeToRefs(store);

    // whatever

    return {
      content,
    };
  },
  name: "EditorForm",
};
</script>
