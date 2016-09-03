import * as atomPackageDeps from "atom-package-deps";

declare var global: any;
export function isAtomProcess(): boolean {
  return !!global.atom;
}

export interface PackageJSON {
  name: string;
}

export interface AtomPackageConfig {
  [key: string]: any;
}

export interface Beautifier {
  /**
  Unique identifying name of the beautifier.
  */
  name: string;
  /**
  Supports options of the beautifier.
  */
  options: any;
  /**
  Beautify the given code with the beautifier.
  */
  beautify(data: any): Promise<string>;
}

export function wrapBeautifier(pkg: PackageJSON, Beautifier: Beautifier, config: AtomPackageConfig) {
  return isAtomProcess() ?
    makeAtomBeautifier(pkg, Beautifier, config) :
    makeNodeBeautifier(Beautifier);
}

export interface AtomPackage {
  config: AtomPackageConfig;
  activate(): void;
  deactivate(): void;
  provideBeautifier(): Beautifier;
}

export function makeAtomBeautifier(pkg: PackageJSON, Beautifier: Beautifier, config: AtomPackageConfig): AtomPackage {
  return {
    config,
    activate: () => {
      atomPackageDeps.install(pkg.name)
        .then(function() {
          console.log("All dependencies installed, good to go");
        });
    },
    deactivate: () => {},
    provideBeautifier: () => {
      return Beautifier;
    }
  } as AtomPackage;
}

export function makeNodeBeautifier(Beautifier: Beautifier) {
  return Beautifier;
}