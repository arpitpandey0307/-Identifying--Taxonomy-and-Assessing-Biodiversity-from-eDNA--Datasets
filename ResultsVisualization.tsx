import React, { useState } from 'react';
import { BarChart3, TrendingUp, Eye, Download, Layers } from 'lucide-react';

interface TaxonomicData {
  name: string;
  abundance: number;
  confidence: number;
  isNovel: boolean;
}

interface DepthProfile {
  depth: number;
  diversity: number;
  abundance: number;
}

interface ResultsData {
  totalSequences: number;
  identifiedTaxa: number;
  novelTaxa: number;
  shannonDiversity: string;
  simpsonDiversity: string;
  taxonomicData: TaxonomicData[];
  depthProfile: DepthProfile[];
}

interface ResultsVisualizationProps {
  results: ResultsData;
}

export const ResultsVisualization: React.FC<ResultsVisualizationProps> = ({ results }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const maxAbundance = Math.max(...results.taxonomicData.map(d => d.abundance));

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-2 sm:space-x-4 lg:space-x-8 px-4 sm:px-6 overflow-x-auto" aria-label="Tabs">
          {[
            { id: 'overview', name: 'Overview', icon: BarChart3 },
            { id: 'taxonomy', name: 'Taxonomy', icon: Layers },
            { id: 'novel', name: 'Novel Taxa', icon: Eye },
            { id: 'depth', name: 'Depth Profile', icon: TrendingUp }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-1 sm:space-x-2 py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="p-4 sm:p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                <h3 className="text-xs sm:text-sm font-medium text-blue-600">Total Sequences</h3>
                <p className="text-lg sm:text-2xl font-bold text-blue-900">{results.totalSequences.toLocaleString()}</p>
              </div>
              <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
                <h3 className="text-xs sm:text-sm font-medium text-green-600">Identified Taxa</h3>
                <p className="text-lg sm:text-2xl font-bold text-green-900">{results.identifiedTaxa}</p>
              </div>
              <div className="bg-purple-50 p-3 sm:p-4 rounded-lg">
                <h3 className="text-xs sm:text-sm font-medium text-purple-600">Novel Taxa</h3>
                <p className="text-lg sm:text-2xl font-bold text-purple-900">{results.novelTaxa}</p>
              </div>
              <div className="bg-orange-50 p-3 sm:p-4 rounded-lg">
                <h3 className="text-xs sm:text-sm font-medium text-orange-600">Shannon Diversity</h3>
                <p className="text-lg sm:text-2xl font-bold text-orange-900">{results.shannonDiversity}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border rounded-lg p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-semibold mb-4">Taxonomic Abundance</h3>
                <div className="space-y-2 max-h-48 sm:max-h-64 overflow-y-auto">
                  {results.taxonomicData.map((taxon, index) => (
                    <div key={index} className="flex items-center justify-between space-x-2">
                      <div className="flex items-center space-x-2 min-w-0 flex-1">
                        <span className="text-xs sm:text-sm font-medium truncate">{taxon.name}</span>
                        {taxon.isNovel && (
                          <span className="px-1 sm:px-2 py-0.5 sm:py-1 text-xs bg-purple-100 text-purple-800 rounded flex-shrink-0">
                            Novel
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                        <div className="w-12 sm:w-20 bg-gray-200 rounded-full h-1.5 sm:h-2">
                          <div 
                            className="bg-blue-600 h-1.5 sm:h-2 rounded-full" 
                            style={{ width: `${(taxon.abundance / maxAbundance) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs sm:text-sm text-gray-600 w-8 sm:w-12 text-right">
                          {taxon.abundance}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border rounded-lg p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-semibold mb-4">Diversity Metrics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs sm:text-sm font-medium">Shannon Diversity</span>
                      <span className="text-xs sm:text-sm text-gray-600">{results.shannonDiversity}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                      <div 
                        className="bg-green-600 h-1.5 sm:h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${(parseFloat(results.shannonDiversity) / 4) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs sm:text-sm font-medium">Simpson Diversity</span>
                      <span className="text-xs sm:text-sm text-gray-600">{results.simpsonDiversity}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                      <div 
                        className="bg-blue-600 h-1.5 sm:h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${parseFloat(results.simpsonDiversity) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'taxonomy' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
              <h3 className="text-base sm:text-lg font-semibold">Taxonomic Classification Results</h3>
              <button className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Export Data</span>
                <span className="sm:hidden">Export</span>
              </button>
            </div>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Taxon</th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Abundance</th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Confidence</th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {results.taxonomicData.map((taxon, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-900">{taxon.name}</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{taxon.abundance.toLocaleString()}</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <div className="w-12 sm:w-16 bg-gray-200 rounded-full h-1.5 sm:h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                taxon.confidence > 0.8 ? 'bg-green-500' :
                                taxon.confidence > 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${taxon.confidence * 100}%` }}
                            />
                          </div>
                          <span className="text-xs">{(taxon.confidence * 100).toFixed(1)}%</span>
                        </div>
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                        {taxon.isNovel ? (
                          <span className="px-1 sm:px-2 py-0.5 sm:py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                            Novel
                          </span>
                        ) : (
                          <span className="px-1 sm:px-2 py-0.5 sm:py-1 text-xs bg-green-100 text-green-800 rounded-full">
                            Known
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'novel' && (
          <div className="space-y-6">
            <div className="text-center py-6 sm:py-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
              <Eye className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-purple-500 mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Novel Taxa Discovery</h3>
              <p className="text-sm sm:text-base text-gray-600 px-4">
                {results.novelTaxa} potentially new species discovered through unsupervised learning
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.taxonomicData.filter(t => t.isNovel).map((taxon, index) => (
                <div key={index} className="border-2 border-purple-200 rounded-lg p-3 sm:p-4 bg-purple-50 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-purple-900 mb-2 text-sm sm:text-base">Novel Taxon {index + 1}</h4>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">Closest match: {taxon.name}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span>Abundance:</span>
                      <span className="font-medium">{taxon.abundance}</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span>Similarity:</span>
                      <span className="font-medium">{(taxon.confidence * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                  <button className="mt-3 w-full px-3 py-2 bg-purple-600 text-white text-xs sm:text-sm rounded hover:bg-purple-700 transition-colors">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'depth' && (
          <div className="space-y-6">
            <h3 className="text-base sm:text-lg font-semibold">Depth Distribution Analysis</h3>
            <div className="border rounded-lg p-3 sm:p-4">
              <div className="space-y-4">
                {results.depthProfile.map((profile, index) => (
                  <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="w-full sm:w-16 text-xs sm:text-sm font-medium text-gray-600">
                      {profile.depth}m
                    </div>
                    <div className="flex-1 space-y-2 w-full">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Diversity Index</span>
                        <span>{profile.diversity.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-blue-100 rounded-full h-1.5 sm:h-2">
                        <div 
                          className="bg-blue-600 h-1.5 sm:h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${(profile.diversity / 4) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex-1 space-y-2 w-full">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Abundance</span>
                        <span>{profile.abundance.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-green-100 rounded-full h-1.5 sm:h-2">
                        <div 
                          className="bg-green-600 h-1.5 sm:h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${(profile.abundance / 11000) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};