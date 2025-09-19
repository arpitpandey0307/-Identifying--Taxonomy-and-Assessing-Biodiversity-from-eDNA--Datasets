import React, { useState } from 'react';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { ProcessingPipeline } from './components/ProcessingPipeline';
import { ResultsVisualization } from './components/ResultsVisualization';
import { Play, RefreshCw, Info } from 'lucide-react';

function App() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
    setResults(null);
  };

  const startProcessing = () => {
    if (selectedFiles.length === 0) return;
    setIsProcessing(true);
    setResults(null);
  };

  const handleProcessingComplete = (processingResults: any) => {
    setResults(processingResults);
    setIsProcessing(false);
  };

  const resetAnalysis = () => {
    setSelectedFiles([]);
    setResults(null);
    setIsProcessing(false);
  };

  const acceptedFormats = ['.fasta', '.fastq', '.fa', '.fq', '.fas'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introduction Section */}
        <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-blue-200">
          <div className="flex items-start space-x-2 sm:space-x-3">
            <Info className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-blue-900 mb-2">
                AI-Driven Deep-Sea eDNA Analysis Pipeline
              </h2>
              <p className="text-sm sm:text-base text-blue-800 mb-3">
                Our advanced pipeline addresses critical challenges in marine biodiversity research by minimizing 
                reliance on incomplete reference databases and dramatically reducing computational time through 
                optimized deep learning workflows.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-4">
                <div className="bg-white p-3 rounded border border-blue-200 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-blue-900 text-sm sm:text-base">Deep Learning Classification</h3>
                  <p className="text-xs sm:text-sm text-blue-700">Neural networks for direct sequence analysis</p>
                </div>
                <div className="bg-white p-3 rounded border border-blue-200 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-blue-900 text-sm sm:text-base">Novel Taxa Discovery</h3>
                  <p className="text-xs sm:text-sm text-blue-700">Unsupervised learning identifies new species</p>
                </div>
                <div className="bg-white p-3 rounded border border-blue-200 hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
                  <h3 className="font-semibold text-blue-900 text-sm sm:text-base">Real-time Analysis</h3>
                  <p className="text-xs sm:text-sm text-blue-700">Optimized workflows for rapid results</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - File Upload & Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Upload eDNA Data</h2>
              <FileUpload
                onFilesSelected={handleFilesSelected}
                acceptedFormats={acceptedFormats}
              />
              
              <div className="mt-4 sm:mt-6 space-y-3">
                <button
                  onClick={startProcessing}
                  disabled={selectedFiles.length === 0 || isProcessing}
                  className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    selectedFiles.length === 0 || isProcessing
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:from-blue-700 hover:to-teal-700 transform hover:scale-105'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                      <span className="text-sm sm:text-base">Processing...</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="text-sm sm:text-base">Start AI Analysis</span>
                    </>
                  )}
                </button>

                {(results || isProcessing) && (
                  <button
                    onClick={resetAnalysis}
                    disabled={isProcessing}
                    className="w-full px-4 py-2 border border-gray-300 text-gray-700 text-sm sm:text-base rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
                  >
                    Reset Analysis
                  </button>
                )}
              </div>
            </div>

            {/* Analysis Parameters */}
            {selectedFiles.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Analysis Parameters</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Files Selected:</span>
                    <span className="font-medium">{selectedFiles.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Size:</span>
                    <span className="font-medium">
                      {(selectedFiles.reduce((sum, file) => sum + file.size, 0) / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">AI Model:</span>
                    <span className="font-medium">DeepTaxa-v2.1</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Clustering:</span>
                    <span className="font-medium">UMAP + DBSCAN</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Processing & Results */}
          <div className="lg:col-span-2">
            {!isProcessing && !results ? (
              <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="mb-6">
                    <div className="flex justify-center space-x-2 mb-4">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-teal-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                    Ready for Deep-Sea Discovery
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-6">
                    Upload your eDNA sequence files to begin AI-powered taxonomic classification 
                    and biodiversity analysis. Our pipeline will identify both known and novel taxa 
                    while providing abundance estimates and ecological insights.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                    <div className="bg-blue-50 p-3 rounded hover:shadow-md transition-shadow">
                      <p className="font-semibold text-blue-900 text-sm sm:text-base">Fast Processing</p>
                      <p className="text-blue-700 text-xs sm:text-sm">~2-5 min per sample</p>
                    </div>
                    <div className="bg-teal-50 p-3 rounded hover:shadow-md transition-shadow">
                      <p className="font-semibold text-teal-900 text-sm sm:text-base">High Accuracy</p>
                      <p className="text-teal-700 text-xs sm:text-sm">95%+ classification rate</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <ProcessingPipeline
                  isRunning={isProcessing}
                  onComplete={handleProcessingComplete}
                  files={selectedFiles}
                />

                {results && (
                  <ResultsVisualization results={results} />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer Information */}
        <div className="mt-8 sm:mt-12 bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Technical Specifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-900 text-sm sm:text-base">Deep Learning Engine</h4>
              <p className="text-gray-600 text-xs sm:text-sm">Transformer-based sequence embeddings with attention mechanisms</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 text-sm sm:text-base">Clustering Algorithm</h4>
              <p className="text-gray-600 text-xs sm:text-sm">UMAP dimensionality reduction with DBSCAN clustering</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 text-sm sm:text-base">Classification Model</h4>
              <p className="text-gray-600 text-xs sm:text-sm">Ensemble neural networks trained on marine eDNA datasets</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 text-sm sm:text-base">Database Independence</h4>
              <p className="text-gray-600 text-xs sm:text-sm">Minimal reliance on reference databases through learned representations</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;