<p><h2 align="center">changelog</h2></p>

## usage

```typescript
import { Changelog } from "@avolgha/changelog";

const changelog = new Changelog(".changelog.json");

changelog.entry({
    author: "avolgha",
    description: "initial commit",
    timestamp: 1690386289081,
    commitId: "b959d70",
});

changelog.save();
```

## methods

###### `Changelog.constructor`
> ```typescript
> constructor(
>    filepath: string,
>    initialVersion?: string
> );
> ```

Create the changelog from the stored object in the given filepath.  
If there is nothing stored in the changelog, there will be a version tag
created automatically. This will be the given initial version or `1.0.0`
if nothing was provided.

###### `Changelog.pushVersion()`
> ```typescript
> function pushVersion(
>     type: "major" | "minor" | "patch",
>     identifier?: string
> ): void;
> ```

Set a new changelog version recording to the `semver` version specs.  
You may find a more detailed description of the function in the source
code [here](https://github.com/npm/node-semver/blob/main/functions/inc.js).

###### `Changelog.getEntries(version?)`
> ```typescript
> function getEntries(
>     version?: string
> ): ChangelogEntry[];
> ```

Get all entries for a given version. If the version is not specified, we
default back to the current stored version.

###### `Changelog.getVersions()`
> ```typescript
> function getVersions(
>     type: "major" | "minor" | "patch",
>     identifier?: string
> ): string[];
> ```

Get all stored versions from the changelog.

###### `Changelog.entry(entry)`
> ```typescript
> function entry(
>     entry: ChangelogEntry
> ): void;
> ```

Save a new entry to the current selected version in the changelog.

###### `Changelog.save()`
> ```typescript
> function save(): void;
> ```

Store the current changelog object to the filepath given in the
constructor.

###### `formatToString(changelog)`
> ```typescript
> function formatToString(
>     changelog: Changelog
> ): string;
> ```

Save all entries of the changelog in a string.
