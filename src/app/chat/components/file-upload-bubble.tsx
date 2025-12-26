import { Button } from "@/src/components/ui/button";
import React from "react";

type FileUploadBubbleProps = {
    uploadedFileUrl?: string;
    fileName?: string;
    isUploading?: boolean;
    onUploadClick: () => void;
    onRemoveFile: () => void;
};

function FileUploadBubble({
    uploadedFileUrl,
    fileName,
    isUploading,
    onUploadClick,
    onRemoveFile,
}: FileUploadBubbleProps) {
    return (
        <div className="flex items-center gap-2">
            {uploadedFileUrl && (
                <img src={uploadedFileUrl} alt="uploaded" className="w-8 h-8 rounded" />
            )}
            {fileName && (
                <span className="text-xs text-gray-500">{fileName}</span>
            )}
            {isUploading && (
                <span className="text-xs text-purple-500">Uploading...</span>
            )}
            <Button type="button" size="sm" onClick={onUploadClick}>
                Upload
            </Button>
            {fileName && (
                <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={onRemoveFile}
                    className="text-[#fff]"
                >
                    Remove
                </Button>
            )}
        </div>
    );
}

export default FileUploadBubble;