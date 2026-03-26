

export function hasAnyFileProcessed(files: KnowledgeBaseFile[]) {
    return files.some(file => file.status === 'processed');
}