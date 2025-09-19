import React, { useState, useRef } from 'react';
import { Upload, File, X, FileText } from 'lucide-react';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  acceptedFormats: string[];
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFilesSelected, acceptedFormats }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => 
      acceptedFormats.some(format => file.name.toLowerCase().endsWith(format))
    );
    setSelectedFiles(prev => [...prev, ...validFiles]);
    onFilesSelected(validFiles);
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onFilesSelected(newFiles);
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full space-y-4">
      <div
        className={`relative border-2 border-dashed rounded-lg p-4 sm:p-6 lg:p-8 text-center transition-all duration-300 ${
          dragActive 
            ? 'border-blue-500 bg-blue-50 scale-105' 
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          onChange={handleChange}
          accept={acceptedFormats.join(',')}
          className="hidden"
        />
        
        <Upload className="mx-auto h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-gray-400 mb-2 sm:mb-4" />
        <p className="text-base sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2">
          Upload eDNA Sequence Files
        </p>
        <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-4 px-2">
          Drag and drop your files here, or click to browse
        </p>
        <p className="text-xs text-gray-400 mb-2 sm:mb-0">
          Supported formats: {acceptedFormats.join(', ')}
        </p>
        
        <button
          onClick={onButtonClick}
          className="mt-2 sm:mt-4 px-4 sm:px-6 py-2 bg-blue-600 text-white text-sm sm:text-base rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
        >
          Select Files
        </button>
      </div>

      {selectedFiles.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 flex items-center">
            <FileText className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Selected Files ({selectedFiles.length})
          </h3>
          <div className="space-y-2 max-h-48 sm:max-h-64 overflow-y-auto">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-white p-2 sm:p-3 rounded-lg shadow-sm border">
                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                  <File className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{file.name}</p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors flex-shrink-0"
                >
                  <X className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};