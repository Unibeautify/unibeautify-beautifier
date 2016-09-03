declare module "atom-package-deps" {
  /**
  Install other Atom packages as dependencies for this package.
  */
  export function install(packageName: string): Promise<string>;
}
