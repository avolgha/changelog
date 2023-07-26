export interface Changelog {
    [version: string]: ChangelogEntry[];
}

export interface ChangelogEntry {
    author: string;
    description: string;
    timestamp: number;
    commitId: string;
}
