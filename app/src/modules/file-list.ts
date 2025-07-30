import { ref, Ref } from 'vue';

interface UploadableFile {
  file: File;
  id: string;
  status: string;
}

interface FileListReturn {
  files: Ref<UploadableFile[]>;
  addFiles: (newFiles: FileList | File[]) => void;
  removeFile: (file: UploadableFile) => void;
  clearAllFiles: () => void;
  modifyStatus: (index: number, status: string) => void;
}

export default function useFileList(): FileListReturn {
  const files = ref<UploadableFile[]>([]);

  function addFiles(newFiles: FileList | File[]) {
    const newUploadableFiles = [...newFiles]
      .map((file) => new UploadableFileClass(file))
      .filter((file) => !fileExists(file.id));
    files.value = files.value.concat(newUploadableFiles);
  }

  function fileExists(otherId: string): boolean {
    return files.value.some(({ id }) => id === otherId);
  }

  function removeFile(file: UploadableFile): void {
    const index = files.value.indexOf(file);
    if (index > -1) files.value.splice(index, 1);
  }

  function clearAllFiles(): void {
    files.value = [];
  }

  function modifyStatus(index: number, status: string): void {
    files.value[index].status = status;
  }

  return { files, addFiles, removeFile, clearAllFiles, modifyStatus };
}

class UploadableFileClass implements UploadableFile {
  file: File;
  id: string;
  status: string;

  constructor(file: File) {
    this.file = file;
    if (/\s/g.test(file.name)) {
      this.file = new File([file], file.name.replace(/ /g, '_'), {
        type: file.type,
        lastModified: file.lastModified,
      });
    } else {
      this.file = file;
    }
    this.id = `${this.file.name}-${file.size}-${file.lastModified}-${file.type}`;
    this.status = 'incomplete';
  }
}

export type { UploadableFile, FileListReturn };
