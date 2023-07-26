import fs from "fs";
import semver from "semver";

import {
	ChangelogEntry,
	Changelog as TChangelog
} from "./types";

export class Changelog {
	private object: TChangelog;
	private version: string;
	
	constructor(public filepath: string, public initialVersion?: string) {
		if (fs.existsSync(this.filepath)) {
			const rawContent = fs.readFileSync(this.filepath, "utf-8");
			this.object = JSON.parse(rawContent);
		} else {
			this.object = {};
		}

		if (Object.keys(this.object).length < 1) {
			const defaultInitialVersion = "1.0.0";
			if (initialVersion) {
				if (semver.valid(initialVersion)) {
					this.version = initialVersion;
				} else {
					console.warn(`[Changelog] Given initial version "${initialVersion}" does not fit semver requirements.`);
					this.version = defaultInitialVersion;
				}
			} else {
				this.version = defaultInitialVersion;
			}
		} else {
			this.version = this._computeCurrentVersion();
		}
	}

	private _computeCurrentVersion() {
		const versions = Object.keys(this.object);
		let latestVersion = versions[0];
		for (let i = 1; i < versions.length; i++) {
			if (semver.gt(versions[i], latestVersion)) {
				latestVersion = versions[i];
			}
		}
		return latestVersion;
	}

	pushVersion(type: "major" | "minor" | "patch", identifier?: string) {
		const nextVersion = semver.inc(this.version, type, identifier);
		if (!nextVersion) {
			throw new Error("Cannot update version.");
		}

		this.version = nextVersion;
		this.object[nextVersion] = [];
	}

	getVersions() {
		return Object.keys(this.object);
	}

	getEntries(version?: string) {
		if (!version) {
			version = this.version;
		}

		const entries = this.object[version];
		return entries;
	}

	entry(entry: ChangelogEntry) {
		const array = this.getEntries(this.version) || [];
		array.push(entry);
		this.object[this.version] = array;
	}

	save() {
		const content = JSON.stringify(this.object, undefined, 4);
		fs.writeFileSync(this.filepath, content, { encoding: "utf-8" });
	}
}

export function formatToString(changelogObject: Changelog) {
	const versions = changelogObject.getVersions();
	const maxIdx = versions.length - 1;
	return versions
		.map((version, idx) => ({
			version,
			index: idx,
			entries: changelogObject.getEntries(version),
		}))
		.map(({ version, index, entries }) => `# v${version}
${entries.map((entry) => `- [${entry.timestamp}] {#${entry.commitId}} <${entry.author}> ${entry.description}`).join("\n")}${maxIdx !== index ? "\n" : ""}`)
		.join("\n");
}
