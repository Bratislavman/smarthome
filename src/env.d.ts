export {} 

declare global {
  interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly DEV: boolean;
    readonly VITE_WS_URL: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// Добавь сюда декларацию для vue-virtual-scroller
declare module 'vue-virtual-scroller' {
  import { DefineComponent, Plugin } from 'vue';

  export const RecycleScroller: DefineComponent<any>;
  export const DynamicScroller: DefineComponent<any>;
  export const DynamicScrollerItem: DefineComponent<any>;
  
  const VueVirtualScroller: Plugin;
  export default VueVirtualScroller;
}