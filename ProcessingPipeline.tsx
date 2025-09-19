import React, { useState, useEffect } from 'react';
import { Play, Pause, CheckCircle, Clock, AlertCircle, Activity } from 'lucide-react';

interface PipelineStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  progress: number;
  duration?: number;
}

interface ProcessingPipelineProps {
  isRunning: boolean;
  onComplete: (results: any) => void;
  files: File[];
}

export const ProcessingPipeline: React.FC<ProcessingPipelineProps> = ({ 
  isRunning, 
  onComplete,
  files 
}) => {
  const [steps, setSteps] = useState<PipelineStep[]>([
    {
      id: 'preprocessing',
      name: 'Data Preprocessing',
      description: 'Quality filtering, adapter removal, and sequence cleaning',
      status: 'pending',
      progress: 0
    },
    {
      id: 'embedding',
      name: 'Deep Learning Embedding',
      description: 'Neural network feature extraction from raw sequences',
      status: 'pending',
      progress: 0
    },
    {
      id: 'clustering',
      name: 'Unsupervised Clustering',
      description: 'Identifying sequence clusters and potential novel taxa',
      status: 'pending',
      progress: 0
    },
    {
      id: 'classification',
      name: 'AI Classification',
      description: 'Deep learning taxonomy prediction and confidence scoring',
      status: 'pending',
      progress: 0
    },
    {
      id: 'abundance',
      name: 'Abundance Estimation',
      description: 'Statistical abundance calculation and normalization',
      status: 'pending',
      progress: 0
    },
    {
      id: 'annotation',
      name: 'Functional Annotation',
      description: 'Ecological role prediction and pathway analysis',
      status: 'pending',
      progress: 0
    }
  ]);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [totalProgress, setTotalProgress] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const processSteps = async () => {
      for (let i = 0; i < steps.length; i++) {
        setCurrentStepIndex(i);
        
        // Update step to running
        setSteps(prev => prev.map((step, index) => 
          index === i 
            ? { ...step, status: 'running', progress: 0 }
            : step
        ));

        // Simulate progress for current step
        for (let progress = 0; progress <= 100; progress += 2) {
          await new Promise(resolve => setTimeout(resolve, 50));
          
          setSteps(prev => prev.map((step, index) => 
            index === i 
              ? { ...step, progress }
              : step
          ));

          setTotalProgress(((i * 100) + progress) / steps.length);
        }

        // Mark step as completed
        setSteps(prev => prev.map((step, index) => 
          index === i 
            ? { ...step, status: 'completed', progress: 100 }
            : step
        ));
      }

      // Generate mock results
      const results = generateMockResults();
      onComplete(results);
    };

    processSteps();
  }, [isRunning]);

  const generateMockResults = () => {
    const taxa = [
      'Copepoda', 'Amphipoda', 'Euphausiacea', 'Appendicularia', 'Chaetognatha',
      'Cnidaria', 'Polychaeta', 'Ostracoda', 'Decapoda', 'Mysida',
      'Radiolaria', 'Foraminifera', 'Dinophyceae', 'Bacillariophyceae', 'Haptophyceae'
    ];

    return {
      totalSequences: Math.floor(Math.random() * 50000) + 30000,
      identifiedTaxa: taxa.length,
      novelTaxa: Math.floor(Math.random() * 8) + 3,
      shannonDiversity: (Math.random() * 2 + 2).toFixed(2),
      simpsonDiversity: (Math.random() * 0.3 + 0.7).toFixed(3),
      taxonomicData: taxa.map(taxon => ({
        name: taxon,
        abundance: Math.floor(Math.random() * 5000) + 100,
        confidence: Math.random() * 0.3 + 0.7,
        isNovel: Math.random() < 0.2
      })),
      depthProfile: Array.from({ length: 10 }, (_, i) => ({
        depth: 1000 + i * 500,
        diversity: Math.random() * 3 + 1,
        abundance: Math.random() * 10000 + 1000
      }))
    };
  };

  const getStatusIcon = (status: PipelineStep['status']) => {
    switch (status) {
      case 'running':
        return <Activity className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  if (!isRunning) {
    return (
      <div className="text-center py-8 sm:py-12">
        <Play className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mb-4" />
        <h3 className="text-lg sm:text-xl font-medium text-gray-900">Ready to Process</h3>
        <p className="text-sm sm:text-base text-gray-500 mt-2 px-4">Upload files and click start to begin analysis</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <div className="mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">AI Processing Pipeline</h3>
        <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 sm:h-3 rounded-full transition-all duration-300"
            style={{ width: `${totalProgress}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Overall Progress: {totalProgress.toFixed(1)}%
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div 
            key={step.id}
            className={`border rounded-lg p-3 sm:p-4 transition-all duration-300 ${
              index === currentStepIndex && isRunning
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : step.status === 'completed'
                ? 'border-green-200 bg-green-50 shadow-sm'
                : 'border-gray-200'
            }`}
          >
            <div className="flex items-start sm:items-center justify-between mb-3 flex-col sm:flex-row space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                {getStatusIcon(step.status)}
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-gray-900 text-sm sm:text-base">{step.name}</h4>
                  <p className="text-xs sm:text-sm text-gray-600 break-words">{step.description}</p>
                </div>
              </div>
              <div className="text-sm font-medium text-gray-900 flex-shrink-0 self-start sm:self-center">
                {step.progress}%
              </div>
            </div>
            
            {step.status === 'running' && (
              <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                <div 
                  className="bg-blue-500 h-1.5 sm:h-2 rounded-full transition-all duration-300"
                  style={{ width: `${step.progress}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};