import { reactive, Reactive } from 'vue';

export default function MdReactive<T extends object>(data: T): Reactive<T> {
  return reactive(data);
}
