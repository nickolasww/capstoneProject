import { Link } from 'react-router-dom';

export default function ExamplesPage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Examples</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="mb-4">This is the examples page. Here you can showcase different features.</p>
          <div className="space-y-2">
            <Link 
              to="/examples/create" 
              className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center"
            >
              Create New Example
            </Link>
            <Link 
              to="/" 
              className="block px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
