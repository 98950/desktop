import * as Fs from 'fs'

/**
 * A found external editor on the user's machine
 */
export type FoundEditor = {
  /**
   * The friendly name of the editor, to be used in labels
   */
  name: string
  /**
   * The executable associated with the editor to launch
   */
  path: string
}

// labels for the editors, to reduce duplication in the codebase
export const AtomLabel = 'Atom'
export const VisualStudioCodeLabel = 'Visual Studio Code'
export const SublimeTextLabel = 'Sublime Text'

/**
 * Helper function to promisify fs.exists
 *
 * @param path Path to check for existence.
 */
export function pathExists(path: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    Fs.exists(path, exists => {
      resolve(exists)
    })
  })
}

interface IErrorMetadata {
  /** The error dialog should link off to the Atom website */
  suggestAtom?: boolean

  /** The error dialog should direct the user to open Preferences */
  openPreferences?: boolean
}

export class ExternalEditorError extends Error {
  /** The error's metadata. */
  public readonly metadata: IErrorMetadata

  public constructor(message: string, metadata: IErrorMetadata = {}) {
    super(message)

    this.metadata = metadata
  }
}
