import React, { useState, useEffect } from 'react';
import { MapPin, Route, ArrowRight, Loader2, AlertCircle, Navigation, Map } from 'lucide-react';
import CitySelector from './CitySelector';
import PathResult from './PathResult';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import MapVisualization from './MapVisualization';

interface PathResult {
  path: string[];
  distance: number;
}

interface ApiError {
  error: string;
}

const ShortestPathFinder: React.FC = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [source, setSource] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<PathResult | null>(null);
  const [error, setError] = useState<string>('');
  const [showMap, setShowMap] = useState<boolean>(true);

  // Mock cities data - in production, you'd fetch this from your Flask backend
  useEffect(() => {
    const cityList = [
      "Agiripalli", "Avanigadda", "Challapalli", "Gannavaram", "Gudivada", "Gudlavalleru",
      "Jaggayyapeta", "Kankipadu", "Koduru", "Kondapalli", "Machilipatnam", "Movva", 
      "Mudinepalli", "Nandigama", "Nuzvid", "Pamarru", "Pedana", "Penamaluru", 
      "Thotlavalluru", "Tiruvuru", "Vuyyuru", "Vissannapet", "Ibrahimpatnam", "Paritala", 
      "Kaikaluru", "Mandavalli", "Bantumilli", "Kruthivennu", "Kalidindi", "Mopidevi", 
      "Nagayalanka", "Veerullapadu", "Vijayawada (Rural)", "Kanchikacherla", 
      "Pamidimukkala", "Avutapalli Peda", "Machilipatnam (Rural)", "Edupugallu", 
      "Kanuru", "Ramavarappadu", "Tadanki", "Gollapudi", "Gunadala", "Penuganchiprolu", 
      "Musunuru", "Vallurupalem", "Pedaprolu"
    ];
    setCities(cityList.sort());
  }, []);

  const findShortestPath = async () => {
    if (!source || !destination) {
      setError('Please select both source and destination cities');
      return;
    }

    if (source === destination) {
      setError('Source and destination cannot be the same');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/find_shortest_path', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source,
          destination,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to find path');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const swapCities = () => {
    const temp = source;
    setSource(destination);
    setDestination(temp);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
            <Navigation className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Path Finder
          </h1>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Find the shortest route between cities in Krishna District, Andhra Pradesh using advanced graph algorithms
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Controls and Results */}
        <div className="space-y-6">
          {/* Controls Panel */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-8">
              {/* City Selection */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <MapPin className="w-4 h-4 text-green-600" />
                    Source City
                  </label>
                  <CitySelector
                    cities={cities}
                    value={source}
                    onChange={setSource}
                    placeholder="Select starting city"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <MapPin className="w-4 h-4 text-red-600" />
                    Destination City
                  </label>
                  <CitySelector
                    cities={cities}
                    value={destination}
                    onChange={setDestination}
                    placeholder="Select destination city"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <button
                  onClick={swapCities}
                  className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                  title="Swap cities"
                  disabled={loading}
                >
                  <ArrowRight className="w-5 h-5 text-gray-600 transform rotate-90" />
                </button>

                <button
                  onClick={findShortestPath}
                  disabled={loading || !source || !destination}
                  className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Route className="w-5 h-5" />
                  )}
                  {loading ? 'Finding Path...' : 'Find Shortest Path'}
                </button>
              </div>

              {/* Map Toggle */}
              <div className="flex items-center justify-center mb-6">
                <button
                  onClick={() => setShowMap(!showMap)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                >
                  <Map className="w-4 h-4" />
                  {showMap ? 'Hide Map' : 'Show Map'}
                </button>
              </div>

              {/* Loading State */}
              {loading && <LoadingSpinner />}

              {/* Error Message */}
              {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
              <p className="text-sm text-gray-500 text-center">
                Powered by NetworkX shortest path algorithms • Real-time route optimization
              </p>
            </div>
          </div>

          {/* Results */}
          {result && <PathResult result={result} source={source} destination={destination} />}
        </div>

        {/* Right Column - Map */}
        {showMap && (
          <div className="lg:sticky lg:top-8 lg:self-start">
            <MapVisualization
              cities={cities}
              source={source}
              destination={destination}
              path={result?.path}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ShortestPathFinder;