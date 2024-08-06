export class Plugin {
  public name: string;
  public version: string;
  public author: string;

  constructor(name: string, version: string, author: string) {
    this.name = name;
    this.version = version;
    this.author = author;
  }

  public onLoad(): void {
    // Called when the plugin is loaded
  }

  public onEnable(): void {
    // Called when the plugin is enabled
  }

  public onDisable(): void {
    // Called when the plugin is disabled
  }

  public onUnload(): void {
    // Called when the plugin is unloaded
  }
}