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

// plugins.
export const AvailablePlugins = [
  {
    splatoon2: {
      modes: [
        { display_name: "splatoon2.guruguru", class_namespace: "ProconBypassMan::Splatoon2::Mode::Guruguru" },
      ],
      macros: [
        { display_name: "splatoon2.fast_return", class_namespace: "ProconBypassMan::Splatoon2::Macro::FastReturn" },
      ],
    }
  } as Plugin,
]
