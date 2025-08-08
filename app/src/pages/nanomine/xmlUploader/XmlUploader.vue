<template>
  <div class="main tool_page xmluploader wrapper md-layout md-alignment-top-center">
    <div class="md-layout-item md-size-80 md-layout md-alignment-top-left md-gutter">
      <dialog-box :active="dialogBoxActive">
        <template #title>{{ dialog && dialog.title }}</template>
        <template #content>{{ dialog && dialog.content }}</template>
        <template #actions>
          <md-button @click.prevent="dialog && dialog.closeHandler">Close</md-button>
        </template>
      </dialog-box>
      <div>
        <h1 class="header-nm">File Upload</h1>
      </div>
      <div>
        <h3>Description</h3>
        <p>
          The simplest method to curate your sample into the database is by uploading an MS Excel
          spreadsheet. For each sample, select or create a dataset for your sample group, upload a
          completed Excel template file using the first uploading box and other supplementary image
          and raw data files using the second uploading box. The master Excel template contains all
          possible fields for nanocomposite sample data and therefore many fields will remain blank
          for your sample. Fill in only the parameters applicable to your sample. Customized
          templates are available upon request, please contact
          <router-link to="/mm/contact">the NanoMine team</router-link> if customization is
          required.
        </p>
      </div>
      <div>
        <h3>Steps</h3>
        <p>
          NOTE: Filesets for samples are grouped into datasets. The files for a sample (images,
          auxiliary spreadsheet data, completed Excel template, etc) are uploaded as a set called a
          fileset. Uploading multiple samples requires multiple fileset uploads.
        </p>
        <ol>
          <li>
            Create a new dataset for the control sample and its related files, then when uploading
            each additional sample be sure to select the same dataset that was used for the control
            sample of the sample group.
          </li>
          <li>
            Click
            <a
              href="https://github.com/Duke-MatSci/nanomine-schema/blob/master/xls-input-forms/master_template.xlsx?raw=true"
              download
              >here</a
            >
            to download the blank MS Excel template (137 kB). (Click
            <a href="/nmstatic/xmlconv/example.zip" download>here</a> to see an example, 263 kB)
          </li>
          <li>
            Fill in the parameters for all applicable cells in the Excel template file. Prepare the
            supplementary images and raw data files.
          </li>
          <li>Select the completed Excel template file in the first uploading box.</li>
          <li>
            Select the supplementary images and other raw data files in the second uploading box
            (press "Ctrl" or "Command" when selecting multiple files), then click Submit to upload
            your data.
          </li>
          <li>
            Wait for the feedback message. Please read the message and follow the instructions if an
            error message is displayed.
          </li>
        </ol>
      </div>
      <div>
        <h3>Note</h3>
        <ol>
          <li>We recommend you to upload your control sample first and remember its sample ID.</li>
          <li>
            Upload one sample data at a time (one template Excel file along with supplementary
            files).
          </li>
          <li>
            Rows or sections followed by a "#" sign in the template Excel file can be duplicated.
            Copy them into additional rows if needed.
          </li>
          <li>
            Acceptable image file format: JPG, PNG, TIF(F). Indicate the full image file name
            including the extensions in the corresponding cells in the Excel template file.
          </li>
        </ol>
      </div>
      <div class="md-layout-item md-size-100">
        <h3>Inputs</h3>
        <div>
          <dataset-viewer
            selectHeader="Choose or create a dataset"
            :selectedHandler="datasetSelectedHandler"
            :datasetOptions="datasetOptions"
          ></dataset-viewer>
        </div>
        <div>
          <p>
            Select a completed Excel Template File
            <md-button class="md-primary md-raised" @click="pickTemplate">Browse</md-button>
            <input
              type="file"
              style="display: none"
              accept=".xlsx, .xls"
              ref="myTemplate"
              @change="onTemplatePicked"
            />
          </p>
          <p v-if="templateUploaded"><md-icon>check_circle_outline</md-icon> {{ templateName }}</p>
        </div>
        <div>
          <p>
            Select Other Files (including raw data files and image files)
            <md-button class="md-primary md-raised" @click="pickFile">Browse</md-button>
            <input
              type="file"
              style="display: none"
              :multiple="true"
              ref="myUpload"
              @change="onFilePicked"
            />
          </p>
          <md-list>
            <md-list-item v-for="file in filesDisplay" :key="file.fileName">
              <md-icon>check_circle_outline</md-icon>
              <span class="md-list-item-text">{{ file.fileName }}</span>
            </md-list-item>
          </md-list>
        </div>
        <md-button
          @click="submit()"
          :disabled="templateName.length < 1 || !datasetSelected"
          class="md-primary md-raised"
          >Submit</md-button
        >
        <md-button @click="goBack()" class="md-primary md-raised">Go Back</md-button>
      </div>
      <div class="md-layout-item md-size-80 md-layout md-alignment-top-center reference-container">
        <reference-container :references="references" :openOnLoad="false"></reference-container>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { JobMgr } from '@/modules/JobMgr';
import ReferenceContainer from '@/components/nanomine/ReferenceContainer.vue';
import Dialog from '@/components/Dialog.vue';
import DatasetViewer from '@/components/nanomine/DatasetViewer.vue';

// Component name for debugging
defineOptions({
  name: 'XMLUploader',
  components: {
    ReferenceContainer,
    dialogBox: Dialog,
    DatasetViewer,
  },
});

// Store and router
const store = useStore();
const router = useRouter();

// Template refs
const myTemplate = ref<HTMLInputElement>();
const myUpload = ref<HTMLInputElement>();

// Reactive data
const title = ref('File Upload');
const dialog = ref<
  | {
      title: string;
      content: string;
      closeHandler: () => void;
    }
  | false
>(false);
const templateName = ref('');
const templateUrl = ref('');
const template = ref<any>(null);
const files = ref<any[]>([]);
const filesDisplay = ref<any[]>([]);
const templateUploaded = ref(false);
const jobId = ref('');
const datasetOptions = ref({ mineOnly: 'always' });
const datasetSelected = ref<any>(null);
const references = ref(['10.1063/1.4943679', '10.1063/1.5046839']);

// Auth mock (as in original)
const auth = ref({
  isLoggedIn: () => false,
  isTestUser: () => false,
});

// Computed properties
const dialogBoxActive = computed(() => store.getters.dialogBox);

// Lifecycle hooks
onBeforeMount(() => {
  if (!auth.value.isLoggedIn()) {
    renderDialog('Login Required', 'Login is required before uploading files.');
  }
});

onMounted(() => {
  store.commit('setAppHeaderInfo', { icon: 'cloud_upload', name: 'Data Uploader' });
});

// Methods
const goBack = () => {
  return window.history.go(-1);
};

const datasetSelectedHandler = (dataset: any) => {
  datasetSelected.value = dataset;
};

const setLoading = () => {
  store.commit('isLoading');
};

const resetLoading = () => {
  store.commit('notLoading');
};

const pickFile = () => {
  myUpload.value?.click();
};

const pickTemplate = () => {
  myTemplate.value?.click();
};

const resetTemplate = () => {
  templateName.value = '';
  templateUrl.value = '';
  template.value = null;
  templateUploaded.value = false;
};

const resetFiles = () => {
  files.value = [];
  filesDisplay.value = [];
};

const onTemplatePicked = (e: Event) => {
  resetTemplate();
  const target = e.target as HTMLInputElement;
  const files = target.files;
  const file: any = {};
  const f = files?.[0];

  if (f !== undefined) {
    templateName.value = f.name;
    file.fileName = templateName.value;
    const fr = new FileReader();
    fr.readAsDataURL(f);
    fr.addEventListener('load', () => {
      templateUrl.value = fr.result as string;
      file.fileUrl = templateUrl.value;
      template.value = file;
      templateUploaded.value = true;
    });
  } else {
    resetTemplate();
  }
};

const onFilePicked = (e: Event) => {
  resetFiles();
  const target = e.target as HTMLInputElement;
  const fileList = target.files;

  if (fileList) {
    for (let i = 0; i < fileList.length; i++) {
      const file: any = {};
      const f = fileList[i];
      if (f !== undefined) {
        file.fileName = f.name;
        if (file.fileName.lastIndexOf('.') <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(f);
        fr.addEventListener('load', () => {
          file.fileUrl = fr.result;
          files.value.push(file);
          filesDisplay.value.push(file);
        });
      }
    }
  }
};

const successDlgClicked = () => {
  router.go(-1); // go back to previous page
};

const submit = () => {
  if (template.value != null) {
    files.value.unshift(template.value);
  } else {
    renderDialog('Upload Error', 'Missing Template File');
    return;
  }

  setLoading();
  const jm = new (JobMgr as any)();
  jm.setJobType('xmlconv');
  jm.setJobParameters({ datasetId: datasetSelected.value?._id, templateName: templateName.value });

  files.value.forEach(function (v: any) {
    jm.addInputFile(v.fileName, v.fileUrl);
  });

  return jm.submitJob(
    (jobIdParam: string) => {
      jobId.value = jobIdParam;
      resetLoading();
      renderDialog(
        'Uploader Job Submitted Successfully',
        `Your uploader job is: ${jobIdParam}
      You should receive an email with a link to the job output.`,
        successDlgClicked
      );
    },
    (errCode: string, errMsg: string) => {
      renderDialog(
        'Upload Error',
        `Error submitting files for upload: errCode: ${errCode} msg: ${errMsg}`
      );
      resetLoading();
    }
  );
};

const toggleDialogBox = () => {
  store.commit('setDialogBox');
};

const renderDialog = (title: string, content: string, closeHandler?: () => void) => {
  dialog.value = {
    title,
    content,
    closeHandler: closeHandler || toggleDialogBox,
  };
  toggleDialogBox();
};
</script>

<style scoped>
img {
  width: 240px;
}
h4 {
  text-transform: uppercase;
}
</style>
