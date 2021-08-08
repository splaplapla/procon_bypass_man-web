export type PluginBody = {
  display_name: string;
  class_namespace: string;
}

export type Plugin = {
  [key in string] : {
    modes: Array<PluginBody>;
    macros: Array<PluginBody>;
  }
}
